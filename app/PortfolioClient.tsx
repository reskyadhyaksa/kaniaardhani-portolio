"use client";

import React, { useState, useEffect } from "react";
import ITSupportConsole from "./ITSupportConsole";
import FigmaStudio from "./FigmaStudio";

export default function PortfolioClient() {
  const [workMode, setWorkMode] = useState<"support" | "design">("support");
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [avatarAccessory, setAvatarAccessory] = useState<"none" | "headset" | "glasses" | "diy-cap">("none");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [assetCount, setAssetCount] = useState<number>(14);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);

  const [contactName, setContactName] = useState<string>("Kania Guest");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactMsg, setContactMsg] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage("");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) {
      setToastMessage("⚠️ Please load all input slots on the Pager console!");
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setToastMessage("📟 MESSAGE TRANSMITTED! Direct signal pinged to Kania.");
      setTimeout(() => {
        setSendSuccess(false);
        setContactName("");
        setContactEmail("");
        setContactMsg("");
      }, 4000);
    }, 1800);
  };

  return (
    <div className="flex flex-col flex-1 w-full max-w-full playground-grid min-h-screen relative selection:bg-pastel-blue selection:text-brand-dark">
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 border-3 border-brand-border bg-white rounded-2xl shadow-[4px_4px_0px_0px_#2C3E50] animate-bounce-slow text-sm font-semibold max-w-sm">
          <span className="text-xl">🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <header className="sticky top-4 z-40 w-full px-4 sm:px-6 md:px-8 mt-2">
        <nav className="max-w-6xl mx-auto flex items-center justify-between p-3 border-3 border-brand-border bg-[#FFFDF9] rounded-2xl shadow-[5px_5px_0px_0px_rgba(44,62,80,1)] relative">
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-pastel-blue border-2 border-brand-border font-fredoka text-lg font-bold shrink-0">
              KP
            </div>
            <div className="hidden sm:block">
              <h1 className="font-fredoka text-base font-semibold leading-tight flex items-center gap-1.5">
                KANIA ARDHANI
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-brand-border animate-pulse inline-block"></span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">Desktop Support & UI/UX Expert</p>
            </div>
            <div className="sm:hidden">
              <h1 className="font-fredoka text-xs font-semibold leading-tight">KANIA ARDHANI</h1>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1 sm:gap-2">
            {[
              { id: "hero", label: "Desk Console" },
              { id: "about", label: "Career Map" },
              { id: "skills", label: "Skills Box" },
              { id: "projects", label: "UX Projects" },
              { id: "achievements", label: "Trophy Shelf" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  const el = document.getElementById(tab.id);
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-3 py-1.5 rounded-xl font-fredoka text-xs sm:text-sm font-medium border-2 transition-all duration-150 ${
                  activeTab === tab.id
                    ? "bg-pastel-blue text-brand-dark border-brand-border translate-y-[-1px] shadow-[2px_2px_0px_0px_#2C3E50]"
                    : "border-transparent hover:bg-slate-100 text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 border-2 border-brand-border rounded-xl">
              <button
                onClick={() => {
                  setWorkMode("support");
                  setToastMessage("💻 Activated Desktop Executive Support Mode!");
                }}
                className={`flex items-center gap-1 px-1.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold font-fredoka transition-all ${
                  workMode === "support"
                    ? "bg-pastel-blue border-2 border-brand-border shadow-[1.5px_1.5px_0px_0px_#2C3E50] text-slate-800"
                    : "text-slate-500 border-2 border-transparent"
                }`}
              >
                <span>💻 <span className="hidden sm:inline">IT Support</span><span className="sm:hidden">IT</span></span>
              </button>
              <button
                onClick={() => {
                  setWorkMode("design");
                  setToastMessage("🎨 Activated UI/UX Figma Design Mode!");
                }}
                className={`flex items-center gap-1 px-1.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold font-fredoka transition-all ${
                  workMode === "design"
                    ? "bg-pastel-pink border-2 border-brand-border shadow-[1.5px_1.5px_0px_0px_#2C3E50] text-slate-800"
                    : "text-slate-500 border-2 border-transparent"
                }`}
              >
                <span>🎨 <span className="hidden sm:inline">Figma Studio</span><span className="sm:hidden">Figma</span></span>
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border-2 border-brand-border bg-pastel-blue-light hover:bg-pastel-blue active:scale-95 transition-all shadow-[2px_2px_0px_0px_#2C3E50]"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-brand-dark">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-brand-dark">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

        </nav>

        {isMobileMenuOpen && (
          <div className="absolute top-[calc(100%+8px)] left-4 right-4 z-30 lg:hidden border-3 border-brand-border bg-[#FFFDF9] rounded-2xl shadow-[5px_5px_0px_0px_rgba(44,62,80,1)] p-4 flex flex-col gap-2 animate-bounce-slow" style={{ animationDuration: "4s" }}>
            {[
              { id: "hero", label: "Desk Console", emoji: "💻" },
              { id: "about", label: "Career Map", emoji: "🗺️" },
              { id: "skills", label: "Skills Box", emoji: "🧰" },
              { id: "projects", label: "UX Projects", emoji: "🎨" },
              { id: "achievements", label: "Trophy Shelf", emoji: "🏆" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                  const el = document.getElementById(tab.id);
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-fredoka text-sm font-semibold border-2 transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-pastel-blue text-brand-dark border-brand-border shadow-[2px_2px_0px_0px_#2C3E50]"
                    : "border-transparent hover:bg-slate-100 text-slate-700"
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      <section id="hero" className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-4 w-full flex flex-col items-center">
        
        <div className="w-full neo-card bg-[#E1EFF6] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          
          <div className="absolute top-4 right-4 text-3xl opacity-20 font-fredoka animate-spin-slow">🌟</div>
          <div className="absolute bottom-6 left-4 text-3xl opacity-20 font-fredoka animate-wiggle">⭐</div>

          <div className="flex flex-col items-center gap-3 shrink-0">
            
            <div className="relative w-44 h-44 rounded-full border-4 border-brand-border bg-white shadow-[4px_4px_0px_0px_#2C3E50] overflow-hidden flex items-center justify-center">
              
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="50" fill="#E1EFF6" />
                
                <path d="M20,90 C25,75 35,68 50,68 C65,68 75,75 80,90 Z" fill="#3A6B88" stroke="#2C3E50" strokeWidth="2.5" />
                
                <path d="M42,68 C42,75 58,75 58,68" fill="none" stroke="#FFD5E5" strokeWidth="2.5" />
                <rect x="46" y="74" width="8" height="12" rx="1.5" fill="#FFF3B0" stroke="#2C3E50" strokeWidth="1.5" />
                <line x1="48" y1="77" x2="52" y2="77" stroke="#2C3E50" strokeWidth="1" />
                <line x1="48" y1="80" x2="52" y2="80" stroke="#2C3E50" strokeWidth="1" />

                <rect x="45" y="55" width="10" height="14" rx="2" fill="#FFD2B2" stroke="#2C3E50" strokeWidth="2.5" />
                
                <path d="M26,50 C22,35 30,22 50,22 C70,22 78,35 74,50 C74,55 76,62 76,65 L24,65 C24,62 26,55 26,50 Z" fill="#4B3B32" />

                <circle cx="50" cy="46" r="18" fill="#FFE2CC" stroke="#2C3E50" strokeWidth="2.5" />

                <path d="M31,38 C35,28 45,28 50,32 C55,28 65,28 69,38 C72,34 71,26 62,24 C50,22 42,24 31,38 Z" fill="#4B3B32" stroke="#2C3E50" strokeWidth="1.5" />
                
                <circle cx="31" cy="46" r="3.5" fill="#FFE2CC" stroke="#2C3E50" strokeWidth="1.5" />
                <circle cx="69" cy="46" r="3.5" fill="#FFE2CC" stroke="#2C3E50" strokeWidth="1.5" />

                <circle cx="44" cy="45" r="2" fill="#2C3E50" />
                <circle cx="56" cy="45" r="2" fill="#2C3E50" />
                
                <circle cx="41" cy="48" r="2" fill="#FFADAD" opacity="0.8" />
                <circle cx="59" cy="48" r="2" fill="#FFADAD" opacity="0.8" />

                <path d="M48,50 Q50,52 52,50" fill="none" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />

                {avatarAccessory === "headset" && (
                  <>
                    <path d="M32,36 A18,18 0 0,1 68,36" fill="none" stroke="#2C3E50" strokeWidth="3" />
                    <rect x="27" y="38" width="5" height="12" rx="2.5" fill="#FFD5E5" stroke="#2C3E50" strokeWidth="2" />
                    <rect x="68" y="38" width="5" height="12" rx="2.5" fill="#FFD5E5" stroke="#2C3E50" strokeWidth="2" />
                    <path d="M30,47 Q32,54 41,54" fill="none" stroke="#2C3E50" strokeWidth="1.5" />
                  </>
                )}

                {avatarAccessory === "glasses" && (
                  <>
                    <rect x="36" y="41" width="11" height="8" rx="2" fill="none" stroke="#D6C7FF" strokeWidth="2.5" />
                    <rect x="53" y="41" width="11" height="8" rx="2" fill="none" stroke="#D6C7FF" strokeWidth="2.5" />
                    <line x1="47" y1="45" x2="53" y2="45" stroke="#2C3E50" strokeWidth="2.5" />
                  </>
                )}

                {avatarAccessory === "diy-cap" && (
                  <>
                    <path d="M32,32 C34,18 66,18 68,32 Z" fill="#D00000" stroke="#2C3E50" strokeWidth="2.5" />
                    <path d="M68,32 C78,32 82,36 82,38 L65,38 Z" fill="#900000" stroke="#2C3E50" strokeWidth="2" />
                    <circle cx="50" cy="25" r="4" fill="#FFF3B0" stroke="#2C3E50" strokeWidth="1" />
                  </>
                )}
              </svg>

            </div>

            <div className="flex gap-1.5 bg-white p-1 border-2 border-brand-border rounded-xl shadow-[2px_2px_0px_0px_#2C3E50]">
              <button 
                onClick={() => setAvatarAccessory("none")}
                className={`p-1 text-xs rounded-md ${avatarAccessory === "none" ? "bg-pastel-gray font-bold" : "hover:bg-slate-50"}`}
                title="Normal Mood"
              >
                😊
              </button>
              <button 
                onClick={() => { setAvatarAccessory("headset"); setToastMessage("🎧 Desktop Support Headset Synced!"); }}
                className={`p-1 text-xs rounded-md ${avatarAccessory === "headset" ? "bg-pastel-blue font-bold" : "hover:bg-slate-50"}`}
                title="Support Headset"
              >
                🎧
              </button>
              <button 
                onClick={() => { setAvatarAccessory("glasses"); setToastMessage("👓 Figma Designer Specs Synced!"); }}
                className={`p-1 text-xs rounded-md ${avatarAccessory === "glasses" ? "bg-pastel-purple font-bold" : "hover:bg-slate-50"}`}
                title="Designer Glasses"
              >
                👓
              </button>
              <button 
                onClick={() => { setAvatarAccessory("diy-cap"); setToastMessage("🧢 DIY Retail Ready!"); }}
                className={`p-1 text-xs rounded-md ${avatarAccessory === "diy-cap" ? "bg-red-200 font-bold" : "hover:bg-slate-50"}`}
                title="DIY Cap"
              >
                🧢
              </button>
            </div>
            <p className="text-[10px] text-slate-500 font-bold tracking-tight">TAP ACCESSORIES TO DRESS ME!</p>

          </div>

          <div className="flex-1 flex flex-col gap-3 text-center md:text-left">
            
            <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
              <span className="sticker bg-pastel-pink text-brand-dark px-3 py-1 text-xs font-bold font-fredoka flex items-center gap-1 shadow-[2px_2px_0px_0px_#2C3E50]">
                📍 Jakarta, Indonesia
              </span>
              <span className="sticker bg-pastel-yellow text-brand-dark px-3 py-1 text-xs font-bold font-fredoka flex items-center gap-1 shadow-[2px_2px_0px_0px_#2C3E50]">
                🎓 Informatics Grad (3.47 GPA)
              </span>
            </div>

            <h2 className="font-fredoka text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-dark leading-tight">
              Halo! I&apos;m Kania Ardhani Putri 🌟
            </h2>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
              A dynamic dual-threat tech specialist with robust experience as an <strong>IT Desktop Support Executive at MR.DIY</strong> (managing multi-site store rollout setups, asset logistics, user system administration) coupled with a deep design background as an <strong>internship UI/UX Designer</strong> (crafting sleek prototypes, responsive design systems in Figma). 
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              <a href="mailto:kaniaardhani3@gmail.com" className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-slate-700 bg-white hover:bg-pastel-blue-light transition p-2.5 rounded-xl border-2 border-brand-border shadow-[2px_2px_0px_0px_#2C3E50]">
                ✉️ <span className="underline">kaniaardhani3@gmail.com</span>
              </a>
              <a href="tel:+62895422534742" className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-slate-700 bg-white hover:bg-pastel-blue-light transition p-2.5 rounded-xl border-2 border-brand-border shadow-[2px_2px_0px_0px_#2C3E50]">
                📞 +62895422534742
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-slate-700 bg-white hover:bg-pastel-blue-light transition p-2.5 rounded-xl border-2 border-brand-border shadow-[2px_2px_0px_0px_#2C3E50]">
                🔗 <span className="underline">Kania Ardhani Putri</span>
              </a>
            </div>

          </div>

        </div>

      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 w-full flex flex-col gap-6">
        
        <section className="w-full neo-card bg-white p-4 sm:p-6 relative">
          
          <div className="flex flex-col sm:flex-row items-center justify-between border-b-3 border-brand-border pb-4 mb-6 gap-4">
            
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-400 border-2 border-brand-border"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-brand-border"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-brand-border"></span>
              </div>
              <span className="h-6 w-[2px] bg-slate-300"></span>
              <h3 className="font-fredoka font-bold text-sm tracking-wide text-brand-dark flex items-center gap-2">
                📂 workspace_console.exe
                <span className="text-[10px] font-bold text-slate-400">v1.2.0</span>
              </h3>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-brand-border bg-pastel-blue flex items-center gap-1 shadow-[2px_2px_0px_0px_#2C3E50]">
                📦 Assets Dispatched: <span className="font-fredoka text-xs">{assetCount}</span>
              </div>

              {unlockedBadges.includes("Logistics Master") && (
                <div className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-brand-border bg-pastel-yellow flex items-center gap-1 shadow-[2px_2px_0px_0px_#2C3E50] animate-wiggle">
                  🏆 Logistics Master
                </div>
              )}

              {unlockedBadges.includes("Helpdesk Hero") && (
                <div className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-brand-border bg-pastel-green flex items-center gap-1 shadow-[2px_2px_0px_0px_#2C3E50] animate-wiggle">
                  🦸 Helpdesk Hero
                </div>
              )}
            </div>

          </div>

          {workMode === "support" && (
            <ITSupportConsole
              setAssetCount={setAssetCount}
              setUnlockedBadges={setUnlockedBadges}
              unlockedBadges={unlockedBadges}
              setToastMessage={setToastMessage}
              workMode={workMode}
            />
          )}

          {workMode === "design" && (
            <FigmaStudio setToastMessage={setToastMessage} />
          )}

        </section>

        <section id="about" className="w-full mt-6">
          <div className="w-full text-center mb-6">
            <span className="sticker bg-pastel-yellow px-4 py-1.5 text-xs font-bold font-fredoka inline-block shadow-[2.5px_2.5px_0px_0px_#2C3E50]">
              🗺️ MAP ROADTRIP
            </span>
            <h3 className="font-fredoka text-2xl sm:text-3xl font-extrabold text-brand-dark mt-2">
              Kania&apos;s Board Game Journey
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Trace her academic publishing, corporate support milestones, and Figma UI design sprints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border-3 border-brand-border bg-white rounded-3xl shadow-[5px_5px_0px_0px_#2C3E50]">
            
            <div className="neo-card p-4 flex flex-col justify-between bg-emerald-50/40 relative border-pastel-green">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full border-2 border-brand-border bg-pastel-green flex items-center justify-center font-fredoka text-xs font-black shadow-[1.5px_1.5px_0px_0px_#2C3E50]">
                1
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500">Aug 2020 - May 2024</span>
                <h4 className="font-fredoka font-bold text-base text-brand-dark mt-1">Telkom University</h4>
                <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                  Bachelor&apos;s degree in Informatics, graduating with a high GPA of <strong>3.47 / 4.00</strong>.
                </p>
                <div className="mt-3 p-2 bg-white border border-brand-border rounded-xl text-[10px] text-slate-600 leading-normal">
                  📚 <strong>Published Research:</strong> Co-created & registered copyright for an AI pneumonia image prediction application incorporating GANs (DCGAN) & VGG-16 deep network classifiers.
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                🏆 DGIP Registered Creator
              </div>
            </div>

            <div className="neo-card p-4 flex flex-col justify-between bg-purple-50/40 relative border-pastel-purple">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full border-2 border-brand-border bg-pastel-purple fill-purple-100 flex items-center justify-center font-fredoka text-xs font-black shadow-[1.5px_1.5px_0px_0px_#2C3E50]">
                2
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500">Aug - Sept 2023</span>
                <h4 className="font-fredoka font-bold text-base text-brand-dark mt-1">PT. Pindo Deli Pulp & Paper</h4>
                <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                  Excelled as an <strong>IT Support Intern</strong> handling technical requests at the SSC Desk helpdesk center.
                </p>
                <div className="mt-3 p-2 bg-white border border-brand-border rounded-xl text-[10px] text-slate-600 leading-normal">
                  ⚙️ <strong>System Ops:</strong> Formatted networks, cloned desktop configurations using Acronis mass installers, configured SAP software, Zscaler firewalls, and Ubuntu terminal OS nodes.
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] font-bold text-purple-600 flex items-center gap-1">
                🔧 SSC Helpdesk Support
              </div>
            </div>

            <div className="neo-card p-4 flex flex-col justify-between bg-rose-50/40 relative border-pastel-pink">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full border-2 border-brand-border bg-pastel-pink flex items-center justify-center font-fredoka text-xs font-black shadow-[1.5px_1.5px_0px_0px_#2C3E50]">
                3
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500">Oct 2024 - Jan 2025</span>
                <h4 className="font-fredoka font-bold text-base text-brand-dark mt-1">PT. Wesclic Indonesia</h4>
                <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                  Operated as a <strong>UI/UX Designer Intern</strong> in a fast-paced software development unit.
                </p>
                <div className="mt-3 p-2 bg-white border border-brand-border rounded-xl text-[10px] text-slate-600 leading-normal">
                  🎨 <strong>Interface Prototyping:</strong> Built complex responsive templates, WhatsApp auth portals, dashboards, domain management panels, and basic CSS code hooks.
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] font-bold text-rose-600 flex items-center gap-1">
                📐 Figma & Auto-layout Expert
              </div>
            </div>

            <div className="neo-card p-4 flex flex-col justify-between bg-sky-50/40 relative border-pastel-blue">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full border-2 border-brand-border bg-pastel-blue flex items-center justify-center font-fredoka text-xs font-black shadow-[1.5px_1.5px_0px_0px_#2C3E50]">
                4
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500">Oct 2025 - Present</span>
                <h4 className="font-fredoka font-bold text-base text-brand-dark mt-1">MR.DIY (Jakarta HQ)</h4>
                <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                  Active <strong>IT Desktop Support Executive</strong> coordinating regional store systems.
                </p>
                <div className="mt-3 p-2 bg-white border border-brand-border rounded-xl text-[10px] text-slate-600 leading-normal">
                  ⚡ <strong>Logistics & FAST System:</strong> Managed retail account registrations, coordinated technical packaging (laptops, CCTV nodes, printers), negotiated supplier contracts, and ran onboarding processes.
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] font-bold text-sky-600 flex items-center gap-1">
                📦 Multi-store Asset Controller
              </div>
            </div>

          </div>
        </section>

        <section id="skills" className="w-full mt-6">
          <div className="w-full text-center mb-6">
            <span className="sticker bg-pastel-pink px-4 py-1.5 text-xs font-bold font-fredoka inline-block shadow-[2.5px_2.5px_0px_0px_#2C3E50]">
              🧰 SKILLBOX DRAWER
            </span>
            <h3 className="font-fredoka text-2xl sm:text-3xl font-extrabold text-brand-dark mt-2">
              Kania&apos;s Skillsets Stickerboard
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Hover over cards to see detailed systems, tools, and practices she coordinates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="neo-card p-5 bg-[#FFFDF9] flex flex-col gap-3">
              <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2 mb-1">
                <span className="text-2xl">📦</span>
                <h4 className="font-fredoka font-bold text-base text-brand-dark">IT Support & Logistics</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "IT Asset Tracking",
                  "Multi-site Distribution",
                  "Logistics Coordination",
                  "FAST System Registry",
                  "Store Deployment Support",
                  "Onboarding/Offboarding Ops",
                  "Acronis OS Cloning",
                  "SAP System Configure",
                  "Zscaler & Sophos Admin",
                ].map(skill => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-brand-border bg-pastel-blue-light hover:bg-pastel-blue transition shadow-[1.5px_1.5px_0px_0px_#2C3E50]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="neo-card p-5 bg-[#FFFDF9] flex flex-col gap-3">
              <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2 mb-1">
                <span className="text-2xl">🎨</span>
                <h4 className="font-fredoka font-bold text-base text-brand-dark">UI/UX Design</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Figma Workspace",
                  "Wireframing & Prototype",
                  "Auto Layout Frameworks",
                  "UI Design Systems",
                  "Responsive Layouts",
                  "User Flow Engineering",
                  "Web Template Redesign",
                  "HTML & CSS Basics",
                  "Canva Visual Design",
                ].map(skill => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-brand-border bg-[#FFE4EC] hover:bg-pastel-pink transition shadow-[1.5px_1.5px_0px_0px_#2C3E50]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="neo-card p-5 bg-[#FFFDF9] flex flex-col gap-3">
              <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2 mb-1">
                <span className="text-2xl">🛠️</span>
                <h4 className="font-fredoka font-bold text-base text-brand-dark">Administrative & Soft Skills</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Vendor Procurement",
                  "Contract Negotiations",
                  "Finance Coordination",
                  "MS Excel (VLOOKUP, Pivot)",
                  "Google Workspace Ops",
                  "Lark & TeamViewer",
                  "Cross-Dept Collaboration",
                  "Time Management",
                  "Technical Documentation",
                ].map(skill => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-brand-border bg-[#FFF9DC] hover:bg-pastel-yellow transition shadow-[1.5px_1.5px_0px_0px_#2C3E50]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        <section id="achievements" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          
          <div className="flex flex-col gap-4">
            
            <div className="flex items-center gap-2 mb-1">
              <span className="sticker bg-pastel-yellow px-3 py-1 text-xs font-bold font-fredoka shadow-[2px_2px_0px_0px_#2C3E50]">
                🏆 ACHIEVEMENTS
              </span>
              <h4 className="font-fredoka font-bold text-lg text-brand-dark">Certifications Cabinet</h4>
            </div>

            <div className="flex-1 p-4 border-3 border-brand-border bg-white rounded-3xl shadow-[4px_4px_0px_0px_#2C3E50] flex flex-col justify-between gap-3">
              
              <div className="flex flex-col gap-3">
                {[
                  { name: "Google IT Support Professional Certificate", issuer: "Coursera", icon: "🌐" },
                  { name: "Machine Learning A-Z™: Python & R", issuer: "Udemy", icon: "🤖" },
                  { name: "UI/UX Design Fundamentals & Graphic Design", issuer: "MySkill", icon: "🎨" },
                  { name: "Microsoft Office Excel (Advanced Functions)", issuer: "DSArea", icon: "📊" },
                  { name: "Data Analyst Specialization", issuer: "DSArea", icon: "📈" },
                  { name: "Introduction to Data Analyst & Product Management", issuer: "RevoU", icon: "💡" },
                ].map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-3 border-2 border-brand-border rounded-xl bg-pastel-blue-light hover:translate-x-1.5 transition-all flex items-start gap-3 shadow-[2px_2px_0px_0px_#2C3E50]"
                  >
                    <span className="text-xl shrink-0 mt-0.5">{cert.icon}</span>
                    <div>
                      <h5 className="font-fredoka font-bold text-xs text-brand-dark leading-tight">
                        {cert.name}
                      </h5>
                      <span className="text-[10px] text-slate-500 font-bold tracking-tight">Issuer: {cert.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          <div className="flex flex-col gap-4">
            
            <div className="flex items-center gap-2 mb-1">
              <span className="sticker bg-pastel-purple px-3 py-1 text-xs font-bold font-fredoka shadow-[2px_2px_0px_0px_#2C3E50]">
                🤝 COMMUNITY
              </span>
              <h4 className="font-fredoka font-bold text-lg text-brand-dark">Organizational Background</h4>
            </div>

            <div className="flex-1 p-4 border-3 border-brand-border bg-white rounded-3xl shadow-[4px_4px_0px_0px_#2C3E50] flex flex-col justify-between gap-3">
              
              <div className="flex flex-col gap-3">
                {[
                  {
                    title: "Logistic Staff - MOMENT Division",
                    group: "ISLAH (Islamic Motivation and Leadership Al-Fath)",
                    time: "Nov 2020 - Mar 2022",
                    desc: "Coordinated digital onboarding queues for 100+ members, administered facilities, managed interactive host pipelines, and supported 10+ leadership planners.",
                  },
                  {
                    title: "Kemuslimahan Staff Planner",
                    group: "LDK Al-Fath Telkom University",
                    time: "Oct - Nov 2021",
                    desc: "Facilitated weekly discussion boards on leadership programs, operated mentoring desks, and guided onboarding procedures for new members.",
                  },
                  {
                    title: "Publication & Media Designer",
                    group: "KOMPILASI (Student Community from Pati)",
                    time: "Nov 2020 - Feb 2021",
                    desc: "Crafted aesthetic graphic templates on Instagram to drive webinar attendance, developed consistent visual styles, and managed sales/marketing operations.",
                  },
                ].map((org, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 border-2 border-brand-border rounded-xl bg-slate-50 hover:-translate-x-1.5 transition-all flex flex-col gap-1 shadow-[2px_2px_0px_0px_#2C3E50]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-bold">{org.time}</span>
                    </div>
                    <h5 className="font-fredoka font-bold text-xs text-brand-dark">
                      {org.title}
                    </h5>
                    <span className="text-[10px] text-pastel-blue-dark font-extrabold uppercase tracking-wide">
                      {org.group}
                    </span>
                    <p className="text-[10px] text-slate-600 leading-relaxed font-medium mt-1 border-t border-slate-200 pt-1.5">
                      {org.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </section>

        <section id="contact" className="w-full max-w-xl mx-auto mt-10">
          
          <div className="w-full text-center mb-6">
            <span className="sticker bg-pastel-yellow px-4 py-1.5 text-xs font-bold font-fredoka inline-block shadow-[2.5px_2.5px_0px_0px_#2C3E50]">
              📟 MESSAGE PING
            </span>
            <h3 className="font-fredoka text-2xl sm:text-3xl font-extrabold text-brand-dark mt-2">
              Send a Pager Signal!
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Need technical multi-store logistics support or a Figma prototype layout? Drop a ping!
            </p>
          </div>

          <div className="border-3 border-brand-border rounded-[36px] bg-slate-800 p-6 flex flex-col gap-4 shadow-[6px_6px_0px_0px_rgba(44,62,80,1)] relative overflow-hidden">
            
            <div className="border-3 border-brand-border bg-emerald-950 p-4 rounded-2xl flex flex-col font-mono text-emerald-400 text-xs gap-3">
              
              <div className="flex items-center justify-between border-b border-emerald-800 pb-2">
                <span className="font-bold text-[10px] tracking-widest text-emerald-500 uppercase animate-pulse">
                  📡 PAGER_SYS_CONNECTED
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              </div>

              {sendSuccess ? (
                <div className="py-8 flex flex-col items-center justify-center text-center gap-2">
                  <span className="text-3xl">📟</span>
                  <div className="font-extrabold text-sm text-emerald-300">MESSAGE DEPLOYED SUCCESS!</div>
                  <p className="text-[10px] text-emerald-500 max-w-xs mt-1 leading-normal">
                    Packet uploaded to Kania&apos;s inbox cache. Technical liaison queue response estimated &lt; 24h.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-wide text-emerald-600 font-extrabold">Name Slot:</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Enter identity label..."
                      required
                      className="bg-emerald-900/40 border border-emerald-700 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-400 text-emerald-200 placeholder-emerald-800 text-xs font-bold"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-wide text-emerald-600 font-extrabold">Email Slot:</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Enter connection route email..."
                      required
                      className="bg-emerald-900/40 border border-emerald-700 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-400 text-emerald-200 placeholder-emerald-800 text-xs font-bold"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-wide text-emerald-600 font-extrabold">Message Body:</label>
                    <textarea
                      rows={3}
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="Type details for support, contract pricing negotiation, or UI prototypes..."
                      required
                      className="bg-emerald-900/40 border border-emerald-700 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-400 text-emerald-200 placeholder-emerald-800 text-xs font-bold resize-none leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-950">
                    
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setContactName("");
                          setContactEmail("");
                          setContactMsg("");
                          setToastMessage("📟 Pager memory cleared.");
                        }}
                        className="px-2.5 py-1 rounded bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold font-mono text-[9px]"
                      >
                        RESET_MEM
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 border-2 border-brand-border text-slate-900 font-fredoka font-black text-xs shadow-[2.5px_2.5px_0px_0px_#2C3E50] hover:scale-105 transition"
                    >
                      {isSending ? "TRANSMITTING..." : "PING_SIGNAL ➔"}
                    </button>

                  </div>

                </form>
              )}

            </div>

            <div className="flex justify-between items-center px-4 pt-2">
              
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <div className="absolute w-12 h-4 bg-slate-900 rounded border border-slate-700"></div>
                <div className="absolute w-4 h-12 bg-slate-900 rounded border border-slate-700"></div>
                <div className="absolute w-3.5 h-3.5 bg-slate-900 z-10"></div>
              </div>

              <div className="flex flex-col gap-1 rotate-[-30deg]">
                <div className="w-10 h-1.5 bg-slate-900 rounded-full"></div>
                <div className="w-10 h-1.5 bg-slate-900 rounded-full"></div>
                <div className="w-10 h-1.5 bg-slate-900 rounded-full"></div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <button type="button" className="w-8 h-8 rounded-full bg-rose-600 active:bg-rose-700 border-2 border-brand-border shadow-[2px_2px_0px_0px_#2c3e50] transform active:translate-y-0.5 active:translate-x-0.5 transition"></button>
                  <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase">B</span>
                </div>
                <div className="flex flex-col items-center">
                  <button type="button" className="w-8 h-8 rounded-full bg-rose-600 active:bg-rose-700 border-2 border-brand-border shadow-[2px_2px_0px_0px_#2c3e50] transform active:translate-y-0.5 active:translate-x-0.5 transition"></button>
                  <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase">A</span>
                </div>
              </div>

            </div>

          </div>

        </section>

      </main>

      <footer className="w-full mt-16 border-t-3 border-brand-border bg-[#FFFDF9] py-8 px-4 text-center">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-slate-500 font-bold">
          
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 border border-brand-border"></span>
            <span>SYSTEM CONSOLE FULLY OPERATIONAL</span>
          </div>

          <div>
            <span>© 2026 Kania Ardhani Putri. Crafted with React, Next.js & Pastel Playground theme.</span>
          </div>

          <div className="flex gap-2">
            <span className="underline">Terms of Service</span>
            <span>•</span>
            <span className="underline">Logistics Registry v1.2</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
