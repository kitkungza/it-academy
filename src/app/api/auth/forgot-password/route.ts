import {
  requestPasswordReset,
  verifyPasswordResetOtp,
  resetPasswordWithOtp,
} from "@/lib/server-db";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limiter";

export async function POST(req: Request) {
  try {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const body = await req.json().catch(() => ({}));
    const { action } = body;

    // -------------------------------------------------------------
    // Action 1: Request Password Reset (Send OTP)
    // -------------------------------------------------------------
    if (action === "request") {
      const { identifier } = body;
      if (!identifier || typeof identifier !== "string" || identifier.trim().length === 0) {
        return Response.json(
          { success: false, message: "กรุณาระบุอีเมลหรือชื่อผู้ใช้ของคุณ" },
          { status: 400 }
        );
      }

      const cleanId = identifier.trim().toLowerCase();

      // Rate limit by IP (max 10 requests / 15 mins) and by identifier (max 3 / 10 mins)
      const ipLimit = checkRateLimit(`forgot-req-ip:${clientIp}`, 10, 15 * 60 * 1000);
      if (!ipLimit.allowed) {
        return Response.json(
          {
            success: false,
            message: `มีการร้องขอรหัสผ่านถี่เกินไป กรุณารออีก ${ipLimit.resetInSeconds} วินาทีแล้วลองใหม่`,
          },
          { status: 429, headers: { "Retry-After": String(ipLimit.resetInSeconds) } }
        );
      }

      const userLimit = checkRateLimit(`forgot-req-user:${cleanId}`, 4, 10 * 60 * 1000);
      if (!userLimit.allowed) {
        return Response.json(
          {
            success: false,
            message: `บัญชีนี้มีการขอรหัส OTP ถี่เกินไป กรุณารออีก ${userLimit.resetInSeconds} วินาที`,
          },
          { status: 429, headers: { "Retry-After": String(userLimit.resetInSeconds) } }
        );
      }

      const result = await requestPasswordReset(identifier);

      if (!result.success) {
        return Response.json(
          { success: false, message: result.message },
          { status: 404 }
        );
      }

      return Response.json({
        success: true,
        message: result.message,
        email: result.email,
        emailMasked: result.emailMasked,
        otpCode: result.otpCode, // Available in local dev mode for convenience
      });
    }

    // -------------------------------------------------------------
    // Action 2: Verify OTP
    // -------------------------------------------------------------
    if (action === "verify") {
      const { email, code } = body;
      if (!email || !code || typeof email !== "string" || typeof code !== "string") {
        return Response.json(
          { success: false, message: "กรุณาระบุอีเมลและรหัส OTP ให้ครบถ้วน" },
          { status: 400 }
        );
      }

      const cleanEmail = email.trim().toLowerCase();
      const cleanCode = code.trim();

      const verifyLimit = checkRateLimit(`forgot-verify:${cleanEmail}`, 10, 15 * 60 * 1000);
      if (!verifyLimit.allowed) {
        return Response.json(
          {
            success: false,
            message: `คุณกรอกรหัสถี่เกินไป กรุณารออีก ${verifyLimit.resetInSeconds} วินาที`,
          },
          { status: 429 }
        );
      }

      const result = await verifyPasswordResetOtp(cleanEmail, cleanCode);
      if (!result.success) {
        return Response.json({ success: false, message: result.message }, { status: 400 });
      }

      return Response.json({ success: true, message: result.message });
    }

    // -------------------------------------------------------------
    // Action 3: Reset Password with OTP & Auto-login
    // -------------------------------------------------------------
    if (action === "reset") {
      const { email, code, newPassword } = body;
      if (!email || !code || !newPassword || typeof newPassword !== "string") {
        return Response.json(
          { success: false, message: "กรุณาระบุข้อมูลให้ครบถ้วน" },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return Response.json(
          { success: false, message: "รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร" },
          { status: 400 }
        );
      }

      const cleanEmail = email.trim().toLowerCase();
      const cleanCode = code.trim();

      const result = await resetPasswordWithOtp(cleanEmail, cleanCode, newPassword);

      if (!result.success || !result.user) {
        return Response.json({ success: false, message: result.message }, { status: 400 });
      }

      // Reset any forgot-password rate limits on success
      resetRateLimit(`forgot-req-user:${cleanEmail}`);
      resetRateLimit(`forgot-verify:${cleanEmail}`);
      resetRateLimit(`login:${cleanEmail}`);

      const safeUser = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        institution: result.user.institution,
        department: result.user.department,
        educationLevel: result.user.educationLevel,
        isVerified: result.user.isVerified,
        role: result.user.role,
      };

      return Response.json({
        success: true,
        message: result.message,
        user: safeUser,
        sessionToken: result.sessionToken,
      });
    }

    return Response.json(
      { success: false, message: "ไม่พบการกระทำ (action) ที่ระบุ" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Forgot password API error:", error);
    return Response.json(
      { success: false, message: "เกิดข้อผิดพลาดในการกู้คืนรหัสผ่าน กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
