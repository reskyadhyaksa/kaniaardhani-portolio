"use client";

import React, { useState } from "react";

interface Project {
  id: string;
  title: string;
  category: string;
  timeline: string;
  desc: string;
  features: string[];
  mockupBg: string;
  screensCount: string;
}

interface FigmaStudioProps {
  setToastMessage: (msg: string) => void;
}

export default function FigmaStudio({ setToastMessage }: FigmaStudioProps) {
  const [figmaBgColor, setFigmaBgColor] = useState<string>("pastel-blue");
  const [canvasView, setCanvasView] = useState<"proto" | "wireframe">("proto");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  const [buttonTriggered, setButtonTriggered] = useState<boolean>(false);
  const [stickers, setStickers] = useState([
    { id: "st-1", text: "🚀 IT Hero", color: "bg-pastel-pink", x: 10, y: 70, deg: "-5deg" },
    { id: "st-2", text: "🎨 Figma Queen", color: "bg-pastel-purple", x: 80, y: 15, deg: "6deg" },
    { id: "st-3", text: "🇮🇩 Jakarta Local", color: "bg-pastel-yellow", x: 75, y: 75, deg: "-10deg" },
    { id: "st-4", text: "⚡ Fast Learner", color: "bg-pastel-green", x: 15, y: 12, deg: "3deg" },
  ]);

  const projects: Project[] = [
    {
      id: "proj-1",
      title: "Wesclic Website Studio",
      category: "UI/UX Website Design (Internship)",
      timeline: "Oct 2024 - Jan 2025",
      desc: "Redesigned a digital marketplace hub for premium website and creative template sales. Transformed the complete customer experience with structured pricing tables, immersive dashboard interfaces, and interactive prototype layers.",
      features: ["Figma Interactive Workspace", "Live Preview Panels", "Secure Checkout Flow", "Domain & Hosting Manager", "Creator Dashboard Insights"],
      mockupBg: "bg-pastel-blue-light",
      screensCount: "15+ Screens",
    },
    {
      id: "proj-2",
      title: "Mirota Mobile App",
      category: "UI/UX Mobile Design (Internship)",
      timeline: "Oct 2024 - Jan 2025",
      desc: "Designed an intuitive mobile app ecosystem for reports, real-time transaction processing, and device synchronization history. Designed from scratch with structured wireframes, dynamic auto-layouts, and user-centric flows.",
      features: ["10+ Responsive Screen Grid", "Sync History Graphs", "Instant CSV Reporting", "Push-Notification Triggers", "Developer Hand-off Design Specs"],
      mockupBg: "bg-pastel-pink",
      screensCount: "10+ App Screens",
    },
    {
      id: "proj-3",
      title: "TripBuddy Travel App",
      category: "UI/UX Personal Project",
      timeline: "Sept 2024",
      desc: "A stunning minimalist travel companion mobile application engineered for discovering local Indonesian tourist gems. Showcases interactive filtered searches, beautiful card slides, budget plans, and review hubs.",
      features: ["Jakarta & Bali Category Filters", "Budget Estimation Slider", "Destination Bookmarks", "Interactive Star Ratings", "Minimalist Clean Aesthetic"],
      mockupBg: "bg-pastel-yellow",
      screensCount: "8+ Custom Screens",
    },
  ];

  const handleStickerClick = (id: string) => {
    setStickers(prev =>
      prev.map(st => {
        if (st.id === id) {
          return {
            ...st,
            x: Math.floor(Math.random() * 65) + 10,
            y: Math.floor(Math.random() * 60) + 15,
            deg: `${Math.floor(Math.random() * 24) - 12}deg`,
          };
        }
        return st;
      })
    );
    setToastMessage("💥 Sticker rearranged! Auto-layout constraints updated.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-300">
      
      <div className="lg:col-span-3 flex flex-col gap-4 font-sans text-xs">
        
        <div className="p-4 border-2 border-brand-border rounded-2xl bg-slate-50 flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="font-fredoka font-bold text-slate-800">Layers panel</span>
            <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-extrabold text-slate-600">PAGE 1</span>
          </div>

          <div className="flex flex-col gap-2">
            {[
              { type: "frame", label: "❖ Mobile_Artboard_Hifi" },
              { type: "group", label: "  📂 Hero_Header_Banner" },
              { type: "rect", label: "    ◽ Filter_Search_Category" },
              { type: "rect", label: "    ◽ Interactive_Grid_Items" },
              { type: "text", label: "    T App_Title_Label" },
              { type: "button", label: "  ⚡ Button_Booking_Call" },
            ].map((layer, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg border transition font-medium flex items-center gap-1.5 ${
                  layer.type === "button"
                    ? "bg-pastel-pink border-brand-border shadow-[1px_1px_0px_0px_#2C3E50] font-bold"
                    : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                <span>{layer.label}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-3 mt-1">
            <span className="font-fredoka font-bold text-slate-700 block mb-2">Workspace Accent:</span>
            <div className="flex gap-2">
              {[
                { id: "pastel-blue", label: "Sky", color: "bg-pastel-blue" },
                { id: "pastel-pink", label: "Rose", color: "bg-pastel-pink" },
                { id: "pastel-yellow", label: "Gold", color: "bg-pastel-yellow" },
              ].map(theme => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setFigmaBgColor(theme.id);
                    setToastMessage(`🎨 Workspace shifted to ${theme.label}!`);
                  }}
                  className={`w-8 h-8 rounded-full border-2 border-brand-border flex items-center justify-center shadow-[1px_1px_0px_0px_#2C3E50] transition ${theme.color} ${
                    figmaBgColor === theme.id ? "scale-110 rotate-6 ring-2 ring-brand-border" : "opacity-70"
                  }`}
                  title={theme.label}
                />
              ))}
            </div>
          </div>

        </div>

      </div>

      <div className="lg:col-span-6 flex flex-col gap-4">
        
        <div className={`p-4 rounded-2xl border-3 border-brand-border relative transition-all duration-300 min-h-96 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(44,62,80,1)] ${
          figmaBgColor === "pastel-blue" ? "bg-pastel-blue-light" : figmaBgColor === "pastel-pink" ? "bg-[#FFEAEE]" : "bg-[#FCF9DE]"
        }`}>
          
          <div className="flex items-center justify-between mb-4 bg-white/95 px-3 py-1.5 border-2 border-brand-border rounded-xl shadow-sm">
            
            <span className="font-fredoka text-xs font-bold text-slate-700 flex items-center gap-1.5">
              🎨 {projects[selectedProjectIndex].title} Mockup
            </span>

            <div className="flex gap-1">
              <button
                onClick={() => {
                  setCanvasView("proto");
                  setToastMessage("💥 High-Fi Mockup rendered!");
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition ${
                  canvasView === "proto"
                    ? "bg-brand-dark text-white border-brand-dark"
                    : "bg-transparent text-slate-600 border-slate-300 hover:bg-slate-50"
                }`}
              >
                Proto
              </button>
              <button
                onClick={() => {
                  setCanvasView("wireframe");
                  setToastMessage("📐 Wireframe structure enabled!");
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition ${
                  canvasView === "wireframe"
                    ? "bg-brand-dark text-white border-brand-dark"
                    : "bg-transparent text-slate-600 border-slate-300 hover:bg-slate-50"
                }`}
              >
                Wireframe
              </button>
            </div>

          </div>

          <div className="flex-1 flex items-center justify-center p-3">
            
            {canvasView === "wireframe" ? (
              <div className="w-full max-w-[280px] h-[340px] rounded-2xl border-2 border-dashed border-sky-400 bg-white/40 flex flex-col p-4 relative font-mono text-[10px] text-sky-600 gap-3">
                <div className="border border-dashed border-sky-400 p-2 text-center rounded">
                  [Header Container: Autolayout]
                </div>
                <div className="flex-1 border border-dashed border-sky-400 p-3 rounded flex flex-col justify-center items-center gap-2">
                  <span>⚙️ Hero_Section</span>
                  <span className="text-[8px] text-sky-400">Width: Fill | Height: Hug</span>
                </div>
                <div className="border border-dashed border-sky-400 p-2.5 text-center bg-sky-100/50 rounded font-bold">
                  [Interactive_Call_Action]
                </div>
              </div>
            ) : (
              <div className="w-full max-w-[280px] h-[340px] rounded-[32px] border-4 border-brand-border bg-white shadow-xl flex flex-col relative overflow-hidden">
                
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-brand-border rounded-b-xl z-20 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                </div>

                <div className={`pt-7 pb-4 px-4 border-b-2 border-brand-border flex items-center justify-between text-brand-dark ${
                  selectedProjectIndex === 0 ? "bg-pastel-blue-light" : selectedProjectIndex === 1 ? "bg-pastel-pink" : "bg-pastel-yellow"
                }`}>
                  <span className="font-fredoka text-xs font-bold">
                    {projects[selectedProjectIndex].title.split(" ")[0]}
                  </span>
                  <span className="text-[10px] bg-white px-2 py-0.5 border border-brand-border rounded-md font-bold">
                    🔍 Explore
                  </span>
                </div>

                <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2 font-sans">
                  
                  <div className="text-[9px] font-bold text-slate-500 tracking-wider">
                    ACTIVE FEATURE PREVIEW:
                  </div>

                  <div className="p-2.5 rounded-xl border border-brand-border bg-slate-50 text-[10px] leading-relaxed text-slate-600">
                    <strong>{projects[selectedProjectIndex].category}</strong>
                    <p className="mt-1 text-[9px]">{projects[selectedProjectIndex].desc.slice(0, 110)}...</p>
                  </div>

                  <div className="text-[9px] font-bold text-slate-500 tracking-wider mt-1">
                    HIGHLIGHTED FLOWS:
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {projects[selectedProjectIndex].features.slice(0, 4).map(f => (
                      <div key={f} className="p-1.5 rounded-lg border border-brand-border bg-white text-[8px] font-bold text-slate-700 flex items-center gap-1 shadow-sm">
                        💠 {f.split(" ")[0] || "Flow"}
                      </div>
                    ))}
                  </div>

                </div>

                <div className="p-3 border-t-2 border-brand-border bg-white flex flex-col gap-1">
                  
                  {buttonTriggered && (
                    <div className="absolute inset-x-3 bottom-14 z-30 p-2 rounded-xl bg-emerald-100 border-2 border-emerald-500 text-emerald-800 text-[10px] font-bold text-center animate-bounce">
                      🎉 Flow Activated! Design responsive & verified.
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setButtonTriggered(true);
                      setTimeout(() => setButtonTriggered(false), 3000);
                    }}
                    className={`w-full py-2.5 rounded-xl text-[10px] font-bold font-fredoka border-2 text-center transition ${
                      selectedProjectIndex === 0 
                        ? "bg-pastel-blue text-brand-dark border-brand-border hover:bg-sky-200" 
                        : selectedProjectIndex === 1
                        ? "bg-pastel-pink text-brand-dark border-brand-border hover:bg-rose-200"
                        : "bg-pastel-yellow text-brand-dark border-brand-border hover:bg-amber-200"
                    }`}
                  >
                    🚀 Trigger Prototype Flow
                  </button>
                </div>

              </div>
            )}

          </div>

          {stickers.map(st => (
            <button
              key={st.id}
              onClick={() => handleStickerClick(st.id)}
              style={{ left: `${st.x}%`, top: `${st.y}%`, transform: `rotate(${st.deg})` }}
              className={`absolute sticker ${st.color} text-brand-dark px-2.5 py-1 text-[9px] font-bold shadow-md hover:scale-110 active:scale-95 z-30`}
            >
              {st.text}
            </button>
          ))}
          <p className="absolute bottom-2 right-3 text-[8px] text-slate-400 font-extrabold uppercase tracking-wider pointer-events-none">
            *TAP STICKERS TO RELOCATE
          </p>

        </div>

      </div>

      <div className="lg:col-span-3 flex flex-col gap-3">
        
        <span className="font-fredoka font-bold text-xs text-slate-700 tracking-wider block">
          SELECT FIGMA FILE PROJECT:
        </span>

        <div className="flex flex-col gap-2.5">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => {
                setSelectedProjectIndex(index);
                setToastMessage(`📂 Opened Figma File: ${project.title}`);
              }}
              className={`text-left p-3 rounded-2xl border-2 transition-all flex flex-col gap-1.5 ${
                selectedProjectIndex === index
                  ? "bg-pastel-blue border-brand-border shadow-[3px_3px_0px_0px_#2C3E50]"
                  : "bg-white border-slate-200 hover:border-slate-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-slate-100 border border-brand-border rounded px-1.5 py-0.5 font-bold text-slate-600">
                  {project.screensCount}
                </span>
                <span className="text-[9px] text-slate-400 font-bold">{project.timeline.split(" ")[0]}</span>
              </div>
              
              <h5 className="font-fredoka font-extrabold text-sm text-brand-dark">
                {project.title}
              </h5>

              <p className="text-[10px] text-slate-500 font-medium leading-normal line-clamp-2">
                {project.desc}
              </p>
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}
