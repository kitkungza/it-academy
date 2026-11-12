"use client";

import React, { useState } from "react";
import Link from "next/link";
import { courses, coreCourses, languageCourses } from "@/data/courses";
import { Search, BookOpen, Tag, Sparkles, Code2, Briefcase, ChevronRight, X } from "lucide-react";

const courseCardThemes: Record<string, string> = {
  // Core Tracks
  iot: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
  network: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
  webdev: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
  database: "linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)",
  mobile: "linear-gradient(135deg, #06b6d4 0%, #0d9488 100%)",
  gamedev: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
  cybersecurity: "linear-gradient(135deg, #c026d3 0%, #db2777 100%)",
  // Programming Languages
  python: "linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #d97706 100%)",
  csharp: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #1d4ed8 100%)",
  php: "linear-gradient(135deg, #6366f1 0%, #7c3aed 50%, #2563eb 100%)",
  go: "linear-gradient(135deg, #06b6d4 0%, #0d9488 50%, #2563eb 100%)",
  java: "linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #b45309 100%)",
  cpp: "linear-gradient(135deg, #2563eb 0%, #4338ca 50%, #0f172a 100%)",
  typescript: "linear-gradient(135deg, #2563eb 0%, #0284c7 50%, #4338ca 100%)",
  ruby: "linear-gradient(135deg, #e11d48 0%, #be123c 50%, #881337 100%)",
  sql: "linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #0f172a 100%)",
  kotlin: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #f97316 100%)",
  rust: "linear-gradient(135deg, #ea580c 0%, #c2410c 50%, #431407 100%)",
  scala: "linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #7f1d1d 100%)",
  dart: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #0369a1 100%)",
  matlab: "linear-gradient(135deg, #d97706 0%, #b45309 50%, #1e3a8a 100%)",
  shell: "linear-gradient(135deg, #047857 0%, #0f766e 50%, #0f172a 100%)",
  assembly: "linear-gradient(135deg, #475569 0%, #334155 50%, #1e293b 100%)",
};

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("ทั้งหมด");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "core" | "language">("all");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty =
      filterDifficulty === "ทั้งหมด" || course.difficulty === filterDifficulty;
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const coreList = filteredCourses.filter((c) => c.category === "core");
  const langList = filteredCourses.filter((c) => c.category === "language");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "เริ่มต้น":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "ปานกลาง":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "ขั้นสูง":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const renderCourseCard = (course: (typeof courses)[0]) => (
    <Link href={`/courses/${course.id}`} key={course.id} className="block h-full">
      <div className="group h-full bg-white dark:bg-dark-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm shadow-amber-950/5 hover:shadow-xl hover:shadow-primary-500/10 border border-[#E8E1D5] dark:border-slate-800 transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
        <div
          className={`h-28 sm:h-32 bg-gradient-to-r ${course.gradient} relative overflow-hidden shrink-0`}
          style={{
            background:
              courseCardThemes[course.id] ||
              "linear-gradient(135deg, #3b82f6, #6366f1)",
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
            <span className="text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20">
              {course.category === "language" ? "💻 ภาษาโปรแกรมมิ่ง" : "🏢 สายงาน IT"}
            </span>
          </div>
          <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 flex items-center">
            <div className="bg-white/20 backdrop-blur-md p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-2xl sm:text-3xl shadow-sm">
              {course.icon}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2 sm:mb-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {course.title}
            </h3>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mb-4 sm:mb-5 line-clamp-2 sm:line-clamp-3 flex-grow leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-auto">
            <span
              className={`text-[11px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md ${getDifficultyColor(
                course.difficulty
              )}`}
            >
              {course.difficulty}
            </span>
            <div className="flex items-center text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 mr-1 text-primary-500" />
              {course.lessons.length} บทเรียน
            </div>
          </div>

          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
            {course.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="flex items-center text-[10px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-dark-800 px-2 py-0.5 rounded-md"
              >
                <Tag className="w-3 h-3 mr-1 opacity-70" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-dark-950 py-8 sm:py-12 px-3.5 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto pt-4 sm:pt-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-500/10 dark:bg-primary-950/60 text-blue-700 dark:text-primary-300 text-xs font-semibold mb-3 sm:mb-4 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>หลักสูตรมาตรฐานเข้มข้น {courses.length} สาขาวิชา</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text mb-3 sm:mb-4">
            หลักสูตรทั้งหมด
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            เลือกเรียนได้ทั้ง <strong>หลักสูตรสายงานวิชาชีพ IT</strong> สำหรับสร้างเส้นทางอาชีพวิศวกรซอฟต์แวร์ และ <strong>หลักสูตรภาษาโปรแกรมมิ่ง</strong> เพื่อฝึกฝนทักษะการเขียนโค้ดเชิงลึก
          </p>
        </div>

        {/* Category Switcher Tabs (Responsive for Mobile, iPad, and Desktop) */}
        <div className="flex justify-center mb-6 sm:mb-8 px-1 sm:px-0">
          <div className="w-full sm:w-auto inline-flex p-1 sm:p-1.5 rounded-2xl bg-white dark:bg-dark-900 border border-[#E8E1D5] dark:border-slate-800 shadow-sm gap-1 overflow-x-auto sm:overflow-visible hide-scrollbar">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-800"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>ทุกหลักสูตร</span>
              <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold shrink-0 ${
                selectedCategory === "all"
                  ? "bg-white/20 dark:bg-white/20 text-white"
                  : "bg-slate-200/70 dark:bg-dark-700 text-slate-700 dark:text-slate-300"
              }`}>
                {courses.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory("core")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === "core"
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-800"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
              <span>สายงาน<span className="hidden sm:inline">วิชาชีพ</span> IT</span>
              <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold shrink-0 ${
                selectedCategory === "core"
                  ? "bg-white/25 text-white"
                  : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
              }`}>
                {coreCourses.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory("language")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === "language"
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-800"
              }`}
            >
              <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 shrink-0" />
              <span>ภาษาโปรแกรม<span className="hidden sm:inline">มิ่ง</span></span>
              <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold shrink-0 ${
                selectedCategory === "language"
                  ? "bg-white/25 text-white"
                  : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
              }`}>
                {languageCourses.length}
              </span>
            </button>
          </div>
        </div>

        {/* Search and Difficulty Filter */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 justify-between items-center bg-white dark:bg-dark-900 p-3 sm:p-4 rounded-2xl shadow-sm border border-[#E8E1D5] dark:border-slate-800">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="ค้นหาหลักสูตร, เทคโนโลยี หรือแท็ก..."
              className="block w-full pl-9 sm:pl-10 pr-8 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm leading-5 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-4 gap-1.5 w-full sm:flex sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
            {["ทั้งหมด", "เริ่มต้น", "ปานกลาง", "ขั้นสูง"].map((diff) => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={`px-2 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap text-center transition-all ${
                  filterDifficulty === diff
                    ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-dark-800 dark:text-slate-300 dark:hover:bg-dark-700"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Course Views */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-dark-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-dark-800 mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              ไม่พบหลักสูตรที่ตรงกับเงื่อนไข
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              ลองเปลี่ยนคำค้นหา หรือเลือกตัวกรองระดับความยากเป็น &quot;ทั้งหมด&quot;
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterDifficulty("ทั้งหมด");
                setSelectedCategory("all");
              }}
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-colors"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        ) : selectedCategory === "all" ? (
          /* Dual Section Layout for "ทั้งหมด" */
          <div className="space-y-16">
            {/* Section 1: Core Career Tracks */}
            {coreList.length > 0 && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span>Core Career & Systems Tracks</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      หลักสูตรสายงานวิชาชีพ IT
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      หลักสูตรวิศวกรรมไอทีครบวงจร สำหรับผู้ที่ต้องการทำงานสายเทคโนโลยีและพัฒนาระบบจริง
                    </p>
                  </div>
                  <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {coreList.length} หลักสูตร
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {coreList.map((course) => renderCourseCard(course))}
                </div>
              </div>
            )}

            {/* Section 2: Programming Languages */}
            {langList.length > 0 && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                      <Code2 className="w-4 h-4" />
                      <span>Modern Programming Languages</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      หลักสูตรภาษาโปรแกรมมิ่งยอดนิยม
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      เจาะลึก 15 ภาษาโปรแกรมมิ่งระดับแนวหน้าของโลก ทั้ง Systems, Backend, Mobile, Big Data, Scientific Computing และ DevOps Automation
                    </p>
                  </div>
                  <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {langList.length} หลักสูตร
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {langList.map((course) => renderCourseCard(course))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Single Category Filtered View */
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {selectedCategory === "core" ? (
                  <>
                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                    <span>หลักสูตรสายงานวิชาชีพ IT</span>
                  </>
                ) : (
                  <>
                    <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                    <span>หลักสูตรภาษาโปรแกรมมิ่ง</span>
                  </>
                )}
              </h2>
              <span className="text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full bg-slate-200 dark:bg-dark-800 text-slate-700 dark:text-slate-300">
                พบ {filteredCourses.length} หลักสูตร
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredCourses.map((course) => renderCourseCard(course))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

