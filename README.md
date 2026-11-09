# 🎓 IT Academy — แพลตฟอร์มการเรียนรู้ IT & วิทยาการคอมพิวเตอร์ครบวงจรระดับมืออาชีพ

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2.15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-VS_Code_Core-007ACC?style=for-the-badge&logo=visualstudiocode)](https://microsoft.github.io/monaco-editor/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas_Ready-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

**IT Academy** คือแพลตฟอร์มการเรียนรู้ด้านเทคโนโลยีสารสนเทศ วิศวกรรมเครือข่าย สถาปัตยกรรมระบบคอมพิวเตอร์ และการพัฒนาซอฟต์แวร์แบบ **Interactive Hands-on** ออกแบบขึ้นเป็นพิเศษสำหรับนักเรียน นักศึกษาแผนกวิชาเทคโนโลยีสารสนเทศ คอมพิวเตอร์ธุรกิจ วิทยาการคอมพิวเตอร์ ตลอดจนผู้สนใจสายงาน IT ยุคใหม่ โดยครอบคลุมหลักสูตรเข้มข้น **23 หลักสูตรวิชาชีพ รวมกว่า 207+ บทเรียน** พร้อมระบบจำลองการปฏิบัติงานบนบราวเซอร์ (In-browser Simulator) และแบบฝึกหัดแล็บบนโปรแกรมจริงระดับอุตสาหกรรม

---

## 🌟 จุดเด่นและฟีเจอร์สำคัญของระบบ (Key Highlights)

- 📚 **23 หลักสูตรวิชาชีพ (207+ บทเรียน):** แบ่งเป็น 7 หลักสูตรแกนหลักด้านวิศวกรรมระบบ และ 16 หลักสูตรภาษาโปรแกรมมิ่งยอดนิยมระดับสากล
- 🎯 **แบ่งระดับความยากชัดเจน:** ทุกหลักสูตรแบ่งโครงสร้างเป็น 3 ระดับ: **เริ่มต้น (Beginner) | ปานกลาง (Intermediate) | ขั้นสูง (Advanced)**
- 💻 **In-browser Interactive Practice:**
  - **Monaco Code Editor:** เอดิเตอร์มาตรฐานเดียวกับ VS Code รองรับการเขียนและไฮไลต์โค้ดหลากภาษา
  - **Cisco IOS CLI Simulator:** จำลองหน้าต่าง Terminal ของ Switch / Router สำหรับฝึกคอนฟิกเครือข่ายจริง
  - **Interactive Hardware & Architecture Diagrams:** แผนภาพวงจรไฟฟ้า, โทโพโลยีเครือข่าย, แผนผังหน่วยความจำ (Stack/Registers) และผังจำลองการทำงาน
  - **Rich Interactive Result Viewers:** หน้าต่างแสดงผลลัพธ์การทำงานแบบโต้ตอบได้
  - **Universal Playground (`/playground`):** สภาพแวดล้อมทดลองเขียนโค้ดอิสระ (HTML/JS, Cisco CLI, C/C++, Python, SQL, Dart)
- 🧪 **Hands-on Desktop Lab Guides:** คู่มือปฏิบัติงานแล็บบนซอฟต์แวร์จริงระดับมืออาชีพทีละขั้นตอน (Step-by-Step) ลิงก์ดาวน์โหลดตรง ปุ่มคัดลอกคำสั่งในคลิกเดียว และเกณฑ์ตรวจผลลัพธ์
- 🔐 **ระบบสมาชิกและความปลอดภัยระดับองค์กร (Auth & Security):**
  - ลงทะเบียนพร้อมระบุสถานศึกษา (รวบรวมรายชื่อวิทยาลัยอาชีวศึกษาและสถาบันการศึกษาทั่วประเทศ)
  - ระบบยืนยันตัวตนด้วยรหัส OTP ทางอีเมล (รองรับทั้ง Gmail SMTP และ Resend API)
  - เข้ารหัสผ่านด้วย PBKDF2 (100,000 Iterations) และตรวจสอบแบบ Constant-Time ป้องกัน Timing Attacks
  - ระบบบทบาทผู้ใช้งาน (Student, Instructor, Admin) และ Rate Limiting ป้องกัน Brute-force
- 🛡️ **ระบบจัดการสำหรับผู้ดูแลระบบ (Admin Console & Telemetry):**
  - หน้าบริหารจัดการที่ `/admin` จัดการรายชื่อผู้เรียน ตรวจสอบสถานะการยืนยันตัวตน บทบาทผู้ใช้
  - ส่งออกข้อมูลเป็นไฟล์ CSV (Export Student Data)
  - หน้าจอ Real-time Telemetry ตรวจสอบสถานะ RAM, Heap, Uptime, Database Status
- 🔄 **สถาปัตยกรรมฐานข้อมูลแบบ Dual-Engine:**
  - **Local High-Performance JSON DB:** บันทึกข้อมูลแบบ Atomic Lock ใช้งานได้ทันทีบนเครื่อง On-Premises หรือ Docker โดยไม่ต้องติดตั้งฐานข้อมูลภายนอก
  - **Cloud MongoDB Atlas:** รองรับการเชื่อมต่อ MongoDB Atlas แบบ Serverless สำหรับการ Deploy บน Vercel พร้อมเปิดให้บริการตลอด 24 ชั่วโมง
- 📈 **แดชบอร์ดติดตามความก้าวหน้า (Student Dashboard):** บันทึกประวัติบทเรียนที่เรียนสำเร็จ อัตราเปอร์เซ็นต์ความก้าวหน้า คำนวณชั่วโมงการเรียนรู้ และระบบเหรียญรางวัล

---

## 🚀 สารบัญหลักสูตรทั้ง 23 สาขาวิชาชีพ

### 📦 หมวดที่ 1: 7 หลักสูตรแกนหลักด้านวิศวกรรมระบบ (Core Fields)

| หลักสูตร | จำนวนบทเรียน | ระดับเนื้อหาและทักษะที่ได้รับ | เครื่องมือเฉพาะทางที่ใช้ |
| :--- | :---: | :--- | :--- |
| **1. 🌐 IoT & Embedded Systems** | 9 บทเรียน | • **เริ่มต้น:** 4-Tier IoT Architecture, Ohm's Law, Arduino UNO, GPIO, เซนเซอร์ DHT22/Ultrasonic<br>• **ปานกลาง:** ESP32 Dual-Core, Wi-Fi Web Server, MQTT Protocol, MicroPython<br>• **ขั้นสูง:** Raspberry Pi Edge Gateway, FreeRTOS บน ESP32, Home Assistant & ESPHome | Arduino IDE 2.x, Thonny, Wokwi, Raspberry Pi Imager |
| **2. 🔌 Network & Cisco** | 9 บทเรียน | • **เริ่มต้น:** LAN/WAN, Star Topology, UTP Cat6/Fiber, OSI 7 Layers, Subnetting & VLSM<br>• **ปานกลาง:** Cisco IOS CLI, VLAN, 802.1Q Trunking, Inter-VLAN Routing (Layer 3 Switch)<br>• **ขั้นสูง:** OSPF v2 Routing, Standard/Extended ACLs, NAT/PAT, Enterprise Campus Network | Cisco Packet Tracer, Wireshark, PuTTY / Tera Term |
| **3. 🖥️ Web Development** | 9 บทเรียน | • **เริ่มต้น:** Semantic HTML5, Modern CSS3 Flexbox & CSS Grid, JavaScript DOM & Events<br>• **ปานกลาง:** Asynchronous JS (async/await, Fetch), Tailwind CSS, React.js (Hooks & State)<br>• **ขั้นสูง:** Next.js 14 App Router, Server Actions, Auth & Database ORM, Full-Stack E-Commerce | VS Code, Chrome DevTools, Node.js & npm |
| **4. 🗄️ ระบบฐานข้อมูล & RMS** | 9 บทเรียน | • **เริ่มต้น:** RDBMS Concepts, Table, Primary/Foreign Key, SQL CRUD, การออกแบบ ER Diagram<br>• **ปานกลาง:** SQL JOINs ข้ามตาราง, Subqueries, Normalization (1NF-3NF), Aggregate & GPA<br>• **ขั้นสูง:** B-Tree Indexing, EXPLAIN Query Plan, ACID Transactions, ระบบทะเบียนนักเรียน (RMS) | DBeaver, MySQL Workbench, drawSQL |
| **5. 📱 Mobile Apps (Flutter)** | 9 บทเรียน | • **เริ่มต้น:** Cross-Platform vs Native, Impeller Engine, Dart Null Safety, Widget Layouts<br>• **ปานกลาง:** State Management (Provider), Navigation & Routing, REST API & JSON<br>• **ขั้นสูง:** Local SQLite (sqflite), ฮาร์ดแวร์มือถือ (Camera/GPS), Student Portal Mobile App | Android Studio, Flutter SDK, VS Code |
| **6. 🎮 Game Development** | 9 บทเรียน | • **เริ่มต้น:** Game Loop 60 FPS บน HTML5 Canvas, 2D Vectors, Sprites & Web Audio API<br>• **ปานกลาง:** Gravity Physics, AABB Collision Detection, Tilemap & Camera, Finite State Machine<br>• **ขั้นสูง:** Enemy AI Patrol & A* Pathfinding, Godot Engine 4 (GDScript), 2D Action Platformer | Godot Engine 4, Tiled Map Editor, Pixelorama |
| **7. 🔒 Cybersecurity & Hacking** | 9 บทเรียน | • **เริ่มต้น:** CIA Triad, Principle of Least Privilege, Cryptography (AES/RSA/SHA), Wireshark Analysis<br>• **ปานกลาง:** Network Scanning ด้วย Nmap, OWASP Top 10 (SQLi, XSS, CSRF Prevention)<br>• **ขั้นสูง:** Burp Suite Intercepting Proxy, Penetration Testing Methodology, Server Hardening (UFW, Fail2ban) | Kali Linux, Burp Suite, Nmap |

---

### 💻 หมวดที่ 2: 16 หลักสูตรภาษาโปรแกรมมิ่งเฉพาะทาง (Programming Languages)

| สัญลักษณ์ | ภาษาและหัวข้อหลักสูตร | จุดเน้นสำคัญของเนื้อหา (Key Topics Covered) |
| :---: | :--- | :--- |
| 🐍 | **Python for Data & AI** | Modern Python 3.12, OOP, Type Hinting, AsyncIO, FastAPI, Data Wrangling ด้วย Pandas & NumPy |
| 🔷 | **C# & .NET 8 Enterprise** | C# 12, .NET 8, LINQ, Task Parallel Library (TPL), ASP.NET Core Web API, Entity Framework Core 8 |
| 🐘 | **Modern PHP 8.3 & MVC** | PHP 8.3 Strict Types, Readonly Classes, Composer, PSR Standards, PDO Security, MVC Architecture |
| 🦫 | **Go (Golang) Microservices** | Goroutines, Channels, Pointers & Memory, Structs/Interfaces, Gin Web Framework, High-Concurrency APIs |
| ☕ | **Java 21 LTS & Spring Boot 3** | Java 21, JVM Internals, Records, Virtual Threads (Project Loom), Spring Boot 3, Hibernate JPA |
| ⚡ | **Modern C++ (C++23) Systems** | C++20/23, RAII, Smart Pointers, Move Semantics, Templates & Metaprogramming, Multithreading |
| 🟦 | **Advanced TypeScript 5** | Structural Typing, Generics, Utility Types, Conditional Types, Template Literals, Zod Schema Validation |
| 💎 | **Ruby & OOP Metaprogramming** | Ruby 3.x, Object Model, Blocks/Procs/Lambdas, Metaprogramming, Ruby on Rails Architectural Patterns |
| 🗄️ | **Advanced SQL & Query Engineering** | Window Functions, CTEs, Indexing Internals, EXPLAIN ANALYZE, Query Optimization & Tuning |
| 🟣 | **Kotlin & Modern Architecture** | Kotlin 2.0, Sound Null Safety, Coroutines & Flow, Ktor Framework, Clean Architecture |
| 🦀 | **Rust Systems & Memory Safety** | Ownership & Borrowing, Lifetimes, Zero-Cost Abstractions, Concurrency ปลอดภัย, Tokio Async Runtime |
| 🔴 | **Scala 3 & Big Data Engineering** | Scala 3, Functional Programming, Akka/Pekko Actors, Apache Spark Ecosystem, Typelevel Libraries |
| 🎯 | **Dart & Asynchronous Architecture** | Dart 3, Null Safety, Streams, Isolates, Records & Pattern Matching, Asynchronous Event Loop |
| 📊 | **MATLAB & Numerical Simulation** | Matrix Operations, Vectorization, Signal Processing, Digital Filters, Simulink & Data Visualization |
| 🐚 | **Shell Scripting & Linux Automation** | Bash, POSIX Compliance, Pipelines, Awk & Sed Text Processing, Cron, Systemd Service, CI/CD Scripting |
| ⚙️ | **x86-64 & ARM Assembly** | CPU Architecture, Registers, Stack Frame, Calling Conventions, POSIX Syscalls, SIMD & Reverse Engineering |

---

## 🛠️ สภาพแวดล้อมจำลองการปฏิบัติงานบนเว็บ (Interactive Lab Environments)

1. **Web Code Editor (ขับเคลื่อนด้วย Monaco Editor):**
   - พัฒนาต่อยอดจากแกนหลักของ VS Code รองรับ IntelliSense, Syntax Highlighting หลากภาษา
   - หน้าต่าง Live Sandbox Preview ทำงานแบบ Isolated Iframe ปลอดภัยและรวดเร็ว
2. **Cisco IOS CLI Simulator:**
   - หน้าต่าง Command Prompt เสมือนจริง จำลองการคอนฟิก Router และ Switch บนระบบ Cisco IOS
   - รองรับคำสั่งมาตรฐาน: `enable`, `configure terminal`, `hostname`, `interface`, `ip address`, `no shutdown`, `vlan`, `show ip int brief`, `ping`, `?` ฯลฯ
3. **Interactive Lesson Diagrams & Visual Result Viewers:**
   - ระบบแสดงแผนภาพวงจร โทโพโลยี และโครงสร้างทางวิศวกรรมแบบโต้ตอบได้
   - ตัวอย่างการทำงานจริงของโค้ดและอุปกรณ์ฮาร์ดแวร์จำลอง
4. **Desktop Lab Guides:**
   - แบบฝึกหัดสำหรับฝึกทำบนเครื่องคอมพิวเตอร์จริง พร้อมดาวน์โหลดและตรวจสอบผลลัพธ์อัตโนมัติ

---

## 📁 โครงสร้างโปรเจกต์ (Project Directory Structure)

```text
IT Academy/
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── admin/                # แผงควบคุมผู้ดูแลระบบ (Admin Console & Telemetry)
│   │   ├── api/                  # Backend REST APIs (Auth, Admin, Sessions, Stats)
│   │   │   ├── admin/            # APIs สำหรับจัดการสมาชิกและดู Telemetry
│   │   │   └── auth/             # APIs ล็อกอิน, สมัคร, OTP Verification
│   │   ├── auth/                 # หน้า UI เข้าสู่ระบบและลงทะเบียน (Login / Register)
│   │   ├── courses/              # หน้าแสดงรายการหลักสูตรและห้องเรียน
│   │   │   └── [courseId]/
│   │   │       └── [lessonId]/   # ห้องเรียน Interactive + Monaco Editor + Simulator
│   │   ├── dashboard/            # แดชบอร์ดติดตามความก้าวหน้าของผู้เรียน
│   │   ├── playground/           # พื้นที่ทดลองเขียนโค้ดอิสระหลากภาษา
│   │   ├── globals.css           # Styling หลักและการตั้งค่า CSS Variables
│   │   ├── layout.tsx            # Root Layout และ Theme Providers
│   │   └── page.tsx              # หน้าแรก (Landing Page)
│   ├── components/
│   │   ├── auth/                 # คอมโพเนนต์ฟอร์มยืนยันตัวตน
│   │   ├── content/              # LessonDiagram และ LessonResultViewer
│   │   ├── layout/               # Navbar, Footer
│   │   └── providers/            # ThemeProvider (Dark / Light Mode)
│   ├── data/
│   │   ├── courses/              # ฐานข้อมูลเนื้อหาหลักสูตรทั้ง 23 วิชา (.ts)
│   │   ├── courses.ts            # ตัวจัดการดึงข้อมูลหลักสูตรทั้งหมด
│   │   ├── institutions.ts       # รายชื่อสถานศึกษาและวิทยาลัยอาชีวะทั่วประเทศ
│   │   ├── types.ts              # TypeScript Interfaces (Course, Lesson, LabGuide)
│   │   └── db.json               # ฐานข้อมูล Local File-based JSON Database
│   ├── lib/
│   │   ├── admin-auth.ts         # ระบบยืนยันสิทธิ์สำหรับ Admin
│   │   ├── mailer.ts             # ระบบส่งอีเมล OTP (Gmail SMTP / Resend)
│   │   ├── mongodb.ts            # ตัวเชื่อมต่อ Cloud MongoDB Atlas
│   │   ├── progress.ts           # การจัดการ State ความก้าวหน้าผู้เรียน
│   │   ├── rate-limiter.ts       # ป้องกันการยิง Request ถี่เกินกำหนด (Rate Limit)
│   │   └── server-db.ts          # Dual-Engine Database Controller
│   └── middleware.ts             # Security & Request Middleware
├── Dockerfile                    # Container Definition สำหรับ Production
├── docker-compose.yml            # Docker Compose พร้อม Persistent Volume
├── setup-new-computer.bat        # สคริปต์คลิกเดียวติดตั้งทุกอย่างสำหรับเครื่องใหม่ (Windows)
├── start-server.bat              # สคริปต์คลิกเดียวเปิดรัน Production Server
├── start-dev.bat                 # สคริปต์คลิกเดียวเปิดรัน Development Mode
├── DEPLOYMENT_GUIDE.md           # คู่มือการติดตั้งบนเซิร์ฟเวอร์วิทยาลัย / Cloud VPS
└── VERCEL_MONGODB_DEPLOY_GUIDE.md# คู่มือการ Deploy บน Vercel + MongoDB Atlas ฟรี 100%
```

---

## 🏃 วิธีการติดตั้งและเริ่มต้นใช้งาน (Getting Started)

### 📌 ความต้องการพื้นฐานของระบบ (Prerequisites)
- **Node.js**: เวอร์ชัน `18.18.0` หรือ `20.x LTS` ขึ้นไป ([ดาวน์โหลดที่นี่](https://nodejs.org/))
- **npm** หรือ **yarn** หรือ **pnpm**

---

### ทางเลือกที่ 1: ติดตั้งและรันด้วยสคริปต์คลิกเดียว (Windows One-Click Setup) ⚡

หากใช้งานบนระบบปฏิบัติการ Windows คุณสามารถดับเบิ้ลคลิกไฟล์ Batch Script ที่เตรียมไว้ได้ทันที:

1. **สำหรับเครื่องใหม่ที่เพิ่งดาวน์โหลดโปรเจกต์:**
   - ดับเบิ้ลคลิกไฟล์ `setup-new-computer.bat`
   - ระบบจะตรวจสอบ Node.js, รัน `npm install` และสั่ง `npm run build` ให้อัตโนมัติ
2. **สำหรับเปิดใช้งานเว็บไซต์ (Production Mode):**
   - ดับเบิ้ลคลิกไฟล์ `start-server.bat`
   - ระบบจะเปิดเซิร์ฟเวอร์และเปิดหน้าเว็บ `http://localhost:3000` ให้อัตโนมัติ
3. **สำหรับนักพัฒนาที่ต้องการแก้ไขโค้ด (Development Mode):**
   - ดับเบิ้ลคลิกไฟล์ `start-dev.bat`

---

### ทางเลือกที่ 2: รันผ่าน Command Line (CLI) 💻

เปิด Terminal หรือ PowerShell ในโฟลเดอร์ของโปรเจกต์ แล้วใช้คำสั่งดังนี้:

```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. คัดลอกไฟล์ Environment Variables (หากต้องการปรับแต่งระบบส่งเมลหรือ Cloud DB)
cp .env.example .env.local

# 3. รันในโหมดพัฒนา (Development Mode มี Hot-reload)
npm run dev

# หรือ Build และรันในโหมด Production (เร็วและเสถียรที่สุด)
npm run build
npm run start
```

เข้าใช้งานผ่านบราวเซอร์ที่: **[http://localhost:3000](http://localhost:3000)**

---

### ทางเลือกที่ 3: รันด้วย Docker & Docker Compose 🐳

เหมาะสำหรับการรันบนเครื่อง Server วิทยาลัย หรือ Linux Server โดยไม่ต้องติดตั้ง Node.js ลงบนเครื่องแม่ข่าย:

```bash
# สั่ง Build และรัน Container ในโหมด Background
docker compose up -d --build

# ดูการทำงานของระบบ
docker compose logs -f

# หยุดการทำงาน
docker compose down
```

*หมายเหตุ: Docker Compose ได้ตั้งค่า Volume เชื่อมต่อไปยัง `src/data/db.json` ไว้แล้ว ทำให้ข้อมูลสมาชิกไม่สูญหายเมื่ออัปเดตหรือ Restart Container*

---

## ⚙️ การตั้งค่าระบบอีเมลและฐานข้อมูล (Environment Variables)

คัดลอกไฟล์ `.env.example` เป็น `.env.local` เพื่อปรับแต่งค่าตามต้องการ:

```env
# 1. เชื่อมต่อ MongoDB Atlas (จำเป็นเฉพาะเมื่อ Deploy บน Vercel หรือต้องการใช้ Cloud DB)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?appName=Cluster0

# 2. ระบบส่งอีเมล OTP ยืนยันตัวตน (เลือกใช้งานแบบใดแบบหนึ่ง):
# แบบที่ A: ใช้ Gmail SMTP (ฟรี ใช้บัญชี Gmail ทั่วไปพร้อมตั้ง App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
SMTP_FROM="IT Academy" <your_email@gmail.com>

# แบบที่ B: ใช้ Resend API (ฟรี 3,000 ฉบับ/เดือน สมัครที่ https://resend.com)
# RESEND_API_KEY=re_xxxxxxxxxxxx
```

> **ข้อสังเกต:** หากไม่กำหนดค่า `SMTP_*` หรือ `RESEND_API_KEY` ระบบจะทำงานในโหมด **Development Simulation** โดยแสดงรหัส OTP จำลองบนหน้าเว็บโดยตรง เพื่อความสะดวกในการทดสอบโดยไม่ต้องรอรับอีเมลจริง

---

## 🚀 คู่มือการนำขึ้นใช้งานจริง (Deployment Guides)

เราได้จัดทำเอกสารคู่มืออย่างละเอียดสำหรับแต่ละรูปแบบการใช้งาน:

1. **ติดตั้งบนเซิร์ฟเวอร์วิทยาลัย / On-Premises / Cloud VPS:**
   - ข้อมูลอยู่ในเครื่อง 100% ปลอดภัยตามมาตรฐาน PDPA ไม่เสียค่าบริการรายเดือน
   - 📖 อ่านคู่มือฉบับเต็มได้ที่: [DEPLOYMENT_GUIDE.md](file:///d:/IT%20Academy/DEPLOYMENT_GUIDE.md)

2. **Deploy บน Vercel + MongoDB Atlas (ออนไลน์ 24 ชม. ฟรี 100%):**
   - เหมาะสำหรับเปิดให้เข้าถึงได้จากทุกที่ทั่วโลกผ่าน Cloud CDN
   - 📖 อ่านคู่มือฉบับเต็มได้ที่: [VERCEL_MONGODB_DEPLOY_GUIDE.md](file:///d:/IT%20Academy/VERCEL_MONGODB_DEPLOY_GUIDE.md)

---

## 🛡️ ข้อมูลบัญชีผู้ดูแลระบบเริ่มต้น (Default Admin Credentials)

- **URL เข้าสู่ระบบผู้ดูแลระบบ:** `http://localhost:3000/admin/login`
- **รหัสผ่านเข้าสู่ระบบเริ่มต้น:** `admin1234` หรือ `itadmin2026` *(แนะนำให้เปลี่ยนรหัสผ่านทันทีหลังนำขึ้นใช้งานจริง)*

---

## 📄 ใบอนุญาตการใช้งาน (License)

โปรเจกต์นี้จัดทำขึ้นเพื่อการศึกษาและการพัฒนาทักษะวิชาชีพด้านเทคโนโลยีสารสนเทศ ภายใต้สัญญาอนุญาต [MIT License](https://opensource.org/licenses/MIT) สามารถนำไปประยุกต์ใช้ในการเรียนการสอน อบรมบุคลากร หรือพัฒนาต่อยอดได้อย่างอิสระ
