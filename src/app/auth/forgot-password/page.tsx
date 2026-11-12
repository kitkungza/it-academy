"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setUser } from "@/lib/progress";
import {
  KeyRound,
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  Check,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  // Wizard Step: 1 = Email/User, 2 = OTP, 3 = New Password, 4 = Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 State
  const [identifier, setIdentifier] = useState("");
  const [emailTarget, setEmailTarget] = useState("");
  const [emailMasked, setEmailMasked] = useState("");

  // Step 2 State (OTP)
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Step 3 State (New Password)
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // General Status State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Countdown for auto-redirect upon success
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (step === 4) {
      timerId = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            router.push("/dashboard");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [step, router]);

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "ยังไม่ได้กรอก", color: "bg-slate-300 dark:bg-slate-700" };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) {
      return { score: 25, label: "ง่ายเกินไป (ไม่ปลอดภัย)", color: "bg-red-500", text: "text-red-500" };
    }
    if (score === 2 || score === 3) {
      return { score: 60, label: "ปานกลาง", color: "bg-amber-500", text: "text-amber-500" };
    }
    if (score === 4) {
      return { score: 85, label: "ปลอดภัยและรัดกุม", color: "bg-blue-500", text: "text-blue-500" };
    }
    return { score: 100, label: "แข็งแกร่งมาก ยอดเยี่ยม!", color: "bg-green-500", text: "text-green-500" };
  };

  const strength = getPasswordStrength(newPassword);

  // -------------------------------------------------------------
  // Step 1: Request Password Reset OTP
  // -------------------------------------------------------------
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfoMessage("");

    if (!identifier.trim()) {
      setError("กรุณากรอกอีเมลหรือชื่อผู้ใช้ของคุณ");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "request",
          identifier: identifier.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "ไม่สามารถทำรายการได้ กรุณาลองใหม่อีกครั้ง");
        setLoading(false);
        return;
      }

      setEmailTarget(data.email || identifier.trim());
      setEmailMasked(data.emailMasked || data.email || identifier.trim());
      setStep(2);
      setTimer(60);
      setCanResend(false);
      setOtpValues(["", "", "", "", "", ""]);
      setInfoMessage(`ระบบได้ส่งรหัส OTP 6 หลักไปยัง ${data.emailMasked || "อีเมลของคุณ"} เรียบร้อย`);
      setLoading(false);

      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 200);
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Step 2: OTP Input Handlers & Verification
  // -------------------------------------------------------------
  const handleOtpChange = (index: number, val: string) => {
    const char = val.slice(-1);
    if (val && !/^\d+$/.test(char)) return;

    const newValues = [...otpValues];
    newValues[index] = char;
    setOtpValues(newValues);

    if (char && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handlePasteOtp = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      setOtpValues(pasteData.split(""));
      otpInputsRef.current[5]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const fullOtp = otpValues.join("");
    if (fullOtp.length !== 6) {
      setError("กรุณากรอกรหัส OTP ให้ครบ 6 หลัก");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify",
          email: emailTarget,
          code: fullOtp,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "รหัส OTP ไม่ถูกต้อง");
        setLoading(false);
        return;
      }

      // Valid OTP -> Proceed to set new password
      setStep(3);
      setError("");
      setInfoMessage("รหัส OTP ถูกต้อง กรุณาตั้งรหัสผ่านใหม่ของคุณ");
      setLoading(false);
    } catch (e) {
      setError("เกิดข้อผิดพลาดในการตรวจสอบ OTP");
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setError("");
    setInfoMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "request",
          identifier: emailTarget || identifier,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setTimer(60);
        setCanResend(false);
        setOtpValues(["", "", "", "", "", ""]);
        setInfoMessage("ส่งรหัส OTP ใหม่อีกครั้งเรียบร้อยแล้ว");
        otpInputsRef.current[0]?.focus();
      } else {
        setError(data.message || "ไม่สามารถส่งรหัสใหม่ได้");
      }
    } catch (e) {
      setError("เกิดข้อผิดพลาดในการส่งรหัสใหม่");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Step 3: Set New Password & Submit
  // -------------------------------------------------------------
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset",
          email: emailTarget,
          code: otpValues.join(""),
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "ไม่สามารถเปลี่ยนรหัสผ่านได้ กรุณาลองใหม่อีกครั้ง");
        setLoading(false);
        return;
      }

      // Save user & session in local storage for auto-login
      if (data.sessionToken) {
        localStorage.setItem("sessionToken", data.sessionToken);
      }
      if (data.user) {
        setUser(data.user);
      }

      setStep(4);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการบันทึกรหัสผ่านใหม่");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center dark:bg-slate-950 bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-slate-900 dark:to-slate-950 from-blue-50 to-white">
      <div className="w-full max-w-lg dark:bg-slate-900/90 bg-white backdrop-blur-xl border dark:border-slate-800 border-slate-200 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Step Indicator Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-8 bg-blue-600 dark:bg-blue-500"
                  : s < step
                  ? "w-4 bg-green-500"
                  : "w-4 bg-slate-200 dark:bg-slate-800"
              }`}
            />
          ))}
        </div>

        {/* Header Icon & Title */}
        <div className="flex flex-col items-center mb-7 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 via-orange-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-amber-500/20 text-white">
            <KeyRound className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {step === 1 && "กู้คืนรหัสผ่าน"}
            {step === 2 && "ยืนยันรหัสความปลอดภัย"}
            {step === 3 && "ตั้งรหัสผ่านใหม่"}
            {step === 4 && "เปลี่ยนรหัสผ่านสำเร็จ!"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
            {step === 1 && "ระบุอีเมลหรือชื่อผู้ใช้ที่คุณลงทะเบียนไว้เพื่อรับรหัสยืนยันตัวตน"}
            {step === 2 && "กรอกรหัส OTP 6 หลักที่ระบบส่งไปยังอีเมลของคุณเพื่อยืนยันสิทธิ์"}
            {step === 3 && "กำหนดรหัสผ่านใหม่ที่ปลอดภัยและจำได้ง่ายสำหรับบัญชีของคุณ"}
            {step === 4 && "ระบบได้อัปเดตรหัสผ่านใหม่และเข้าสู่ระบบให้ท่านเรียบร้อยแล้ว"}
          </p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 dark:text-red-400 text-xs sm:text-sm flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <div className="leading-relaxed">{error}</div>
          </div>
        )}

        {infoMessage && !error && (
          <div className="mb-5 p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-600 dark:text-blue-400 text-xs sm:text-sm flex items-start gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
            <div className="leading-relaxed">{infoMessage}</div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 1: Enter Email or Username                           */}
        {/* ========================================================= */}
        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-500" /> อีเมล หรือ ชื่อผู้ใช้
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 dark:text-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                placeholder="เช่น student@itacademy.ac.th หรือ kitsvcadmin"
                required
                autoFocus
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                💡 สามารถกรอกได้ทั้งที่อยู่อีเมล หรือชื่อผู้ใช้ที่คุณตั้งไว้
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 mt-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> กำลังตรวจสอบและส่งรหัส OTP...
                </>
              ) : (
                <>
                  <span>ส่งรหัส OTP กู้คืนรหัสผ่าน</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> กลับไปหน้าเข้าสู่ระบบ
              </Link>
            </div>
          </form>
        )}

        {/* ========================================================= */}
        {/* STEP 2: Enter 6-digit OTP Code                            */}
        {/* ========================================================= */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-center">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                รหัสความปลอดภัย 6 หลักถูกส่งไปยัง:
              </p>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5 font-mono">
                {emailMasked}
              </p>
            </div>

            <div className="flex justify-center gap-2 my-6">
              {otpValues.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    otpInputsRef.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  onPaste={idx === 0 ? handlePasteOtp : undefined}
                  className="w-12 h-14 text-center text-xl font-mono font-bold rounded-xl border-2 dark:border-slate-700 border-slate-300 dark:bg-slate-950 bg-slate-50 dark:text-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {timer > 0 ? (
                <span>รหัสจะหมดอายุใน {timer} วินาที</span>
              ) : (
                <span className="text-red-500 font-semibold">รหัสหมดอายุแล้ว</span>
              )}
              {canResend && (
                <button
                  onClick={handleResendOtp}
                  type="button"
                  disabled={loading}
                  className="ml-2 font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  ขอรหัสใหม่
                </button>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleVerifyOtp}
                disabled={loading || otpValues.join("").length !== 6}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> กำลังตรวจสอบรหัส...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> ยืนยันรหัส OTP
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setError("");
                  setInfoMessage("");
                }}
                className="w-full py-2.5 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-semibold"
              >
                ← เปลี่ยนอีเมลหรือชื่อผู้ใช้
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 3: Enter New Password & Confirm                      */}
        {/* ========================================================= */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-500" /> รหัสผ่านใหม่
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 dark:text-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                  placeholder="ความยาวอย่างน้อย 6 ตัวอักษร"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
                  aria-label={showNewPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {newPassword && (
                <div className="mt-2 space-y-1.5">
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strength.color}`}
                      style={{ width: `${strength.score}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400">ระดับความปลอดภัย:</span>
                    <span className={`font-bold ${strength.text}`}>{strength.label}</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> ยืนยันรหัสผ่านใหม่อีกครั้ง
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 dark:text-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                  placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
                  aria-label={showConfirmPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {confirmPassword && (
                <div className="mt-1.5 text-[11px] flex items-center gap-1.5">
                  {newPassword === confirmPassword ? (
                    <span className="text-green-500 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> รหัสผ่านตรงกันเรียบร้อย
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> รหัสผ่านยังไม่ตรงกัน
                    </span>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || newPassword.length < 6 || newPassword !== confirmPassword}
              className="w-full py-3.5 px-4 mt-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> กำลังบันทึกรหัสผ่านใหม่...
                </>
              ) : (
                <>
                  <span>บันทึกรหัสผ่านใหม่และเข้าสู่ระบบ</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ========================================================= */}
        {/* STEP 4: Success & Auto-login Redirect                     */}
        {/* ========================================================= */}
        {step === 4 && (
          <div className="py-6 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-20 h-20 mx-auto bg-green-500/20 text-green-500 rounded-3xl flex items-center justify-center shadow-xl shadow-green-500/20 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                ตั้งรหัสผ่านใหม่สำเร็จ!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                ระบบได้เข้าสู่ระบบให้ท่านเรียบร้อยแล้ว กำลังนำท่านเข้าสู่แดชบอร์ดใน{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400">{redirectCountdown}</span>{" "}
                วินาที...
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-left text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> คำแนะนำด้านความปลอดภัย:
              </div>
              <p>• ระบบได้ทำการยกเลิก Session เก่าทั้งหมดบนอุปกรณ์อื่นเพื่อความปลอดภัย</p>
              <p>• ท่านสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่นี้ได้ทันทีในครั้งถัดไป</p>
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>เข้าสู่แดชบอร์ดทันที</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
