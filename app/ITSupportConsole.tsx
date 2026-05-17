"use client";

import React, { useState } from "react";

interface Asset {
  id: string;
  name: string;
  icon: string;
  color: string;
  desc: string;
}

interface Store {
  id: string;
  name: string;
  x: number;
  y: number;
  status: "pending" | "operational";
  deployedAssets: string[];
}

interface Ticket {
  id: string;
  title: string;
  sender: string;
  desc: string;
  tools: string[];
  correctTool: string;
  status: "open" | "resolved";
}

interface ITSupportConsoleProps {
  setAssetCount: React.Dispatch<React.SetStateAction<number>>;
  setUnlockedBadges: React.Dispatch<React.SetStateAction<string[]>>;
  unlockedBadges: string[];
  setToastMessage: (msg: string) => void;
  workMode: "support" | "design";
}

export default function ITSupportConsole({
  setAssetCount,
  setUnlockedBadges,
  unlockedBadges,
  setToastMessage,
  workMode,
}: ITSupportConsoleProps) {
  const [selectedAsset, setSelectedAsset] = useState<string>("laptop");
  const [flyingParcel, setFlyingParcel] = useState<{ startX: number; startY: number; endX: number; endY: number } | null>(null);

  const [stores, setStores] = useState<Store[]>([
    { id: "store-1", name: "MR.DIY Sudirman (Store 105)", x: 45, y: 55, status: "operational", deployedAssets: ["laptop", "printer"] },
    { id: "store-2", name: "MR.DIY Pluit (Store 089)", x: 25, y: 25, status: "pending", deployedAssets: [] },
    { id: "store-3", name: "MR.DIY Kemang (Store 154)", x: 50, y: 78, status: "operational", deployedAssets: ["cctv"] },
    { id: "store-4", name: "MR.DIY Kelapa Gading (Store 212)", x: 75, y: 35, status: "pending", deployedAssets: [] },
    { id: "store-5", name: "MR.DIY Warehouse Tangerang", x: 15, y: 65, status: "operational", deployedAssets: ["finger_scanner", "laptop"] },
  ]);

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "T-3402",
      title: "New Area Business Manager Account Registration",
      sender: "DM Region 3",
      desc: "ABM onboarding starts tomorrow. Urgent request to create a new profile with transaction and store allocation rights in our proprietary retail management system.",
      tools: ["Acronis System Clone", "FAST System Credential Registry", "Vendor Procurement Pipeline"],
      correctTool: "FAST System Credential Registry",
      status: "open",
    },
    {
      id: "T-3403",
      title: "Store 122 - Manager PC Hardware Replacement",
      sender: "PIC Store #122",
      desc: "The manager's laptop suffered a motherboard failure. We need to roll out a pre-configured HP elitebook immediately, complete with SAP, Zscaler, Sophos, and remote desktop access.",
      tools: ["Acronis OS & SAP Clone", "FAST System Credential Registry", "Autocount Invoice Setup"],
      correctTool: "Acronis OS & SAP Clone",
      status: "open",
    },
    {
      id: "T-3404",
      title: "CCTV Camera Procurement Budget Dispute",
      sender: "Finance Department",
      desc: "Urgent store deployment requires 8 additional CCTV nodes. The vendor quote is 18% over the approved budget layout. We need negotiation & Finance clearances before packaging.",
      tools: ["Acronis OS & SAP Clone", "Vendor Negotiation & Finance Flow", "FAST System Credential Registry"],
      correctTool: "Vendor Negotiation & Finance Flow",
      status: "open",
    },
  ]);
  const [selectedTicket, setSelectedTicket] = useState<string>("T-3402");

  const assets: Record<string, Asset> = {
    laptop: { id: "laptop", name: "Executive Laptop", icon: "💻", color: "bg-pastel-pink", desc: "HP Elitebooks pre-installed with SAP, Sophos, & Zscaler" },
    cctv: { id: "cctv", name: "Security CCTV", icon: "📹", color: "bg-pastel-purple", desc: "IP Cameras synchronized with security central monitor feeds" },
    printer: { id: "printer", name: "Thermal Printer", icon: "🖨️", color: "bg-pastel-yellow", desc: "Store checkout POS thermal printer & labels system" },
    finger_scanner: { id: "finger_scanner", name: "Biometric Scanner", icon: "☝️", color: "bg-pastel-green", desc: "FAST attendance database synchronizer device" },
  };

  const handleDeployAsset = (storeId: string, event: React.MouseEvent) => {
    if (workMode !== "support") return;
    
    const targetStore = stores.find(s => s.id === storeId);
    if (!targetStore) return;

    if (targetStore.deployedAssets.includes(selectedAsset)) {
      setToastMessage(`⚠️ ${assets[selectedAsset].name} is already deployed to ${targetStore.name}!`);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const mapContainer = document.getElementById("jakarta-map-container")?.getBoundingClientRect();

    if (mapContainer) {
      const endX = rect.left + rect.width / 2 - mapContainer.left;
      const endY = rect.top + rect.height / 2 - mapContainer.top;

      setFlyingParcel({
        startX: 40,
        startY: 380,
        endX,
        endY,
      });

      setTimeout(() => {
        setFlyingParcel(null);

        setStores(prev =>
          prev.map(store => {
            if (store.id === storeId) {
              const updatedAssets = [...store.deployedAssets, selectedAsset];
              const isNowOperational = updatedAssets.length >= 2 || store.status === "operational";
              return {
                ...store,
                status: isNowOperational ? "operational" : "pending",
                deployedAssets: updatedAssets,
              };
            }
            return store;
          })
        );

        setAssetCount(prev => prev + 1);
        setToastMessage(`🎉 Successfully dispatched ${assets[selectedAsset].name} to ${targetStore.name}!`);

        const allStoresOperational = stores.every(s => s.id === storeId ? true : s.status === "operational");
        if (allStoresOperational && !unlockedBadges.includes("Logistics Master")) {
          setUnlockedBadges(prev => [...prev, "Logistics Master"]);
          setToastMessage(`🏆 Achievement Unlocked: "Logistics Master" - All stores fully deployed!`);
        }
      }, 750);
    }
  };

  const handleSolveTicket = (ticketId: string, selectedTool: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket || ticket.status === "resolved") return;

    if (selectedTool === ticket.correctTool) {
      setTickets(prev =>
        prev.map(t => (t.id === ticketId ? { ...t, status: "resolved" } : t))
      );
      setToastMessage(`✅ Ticket ${ticketId} RESOLVED! Processed with ${selectedTool}.`);
      setAssetCount(prev => prev + 2);

      const updatedTickets = tickets.map(t => t.id === ticketId ? { ...t, status: "resolved" } : t);
      if (updatedTickets.every(t => t.status === "resolved") && !unlockedBadges.includes("Helpdesk Hero")) {
        setUnlockedBadges(prev => [...prev, "Helpdesk Hero"]);
        setTimeout(() => {
          setToastMessage(`🏆 Achievement Unlocked: "Helpdesk Hero" - All operational tickets resolved!`);
        }, 1500);
      }
    } else {
      setToastMessage(`❌ Access Denied! ${selectedTool} is not configured for this issue. Choose standard administrative workflow.`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-300">
      
      <div className="lg:col-span-7 flex flex-col gap-4">
        
        <div className="p-4 border-2 border-brand-border rounded-2xl bg-pastel-blue-light">
          <h4 className="font-fredoka font-bold text-base text-brand-dark mb-1 flex items-center gap-1.5">
            🗺️ Multi-site Store Logistics & Asset Deployment
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-medium mb-3">
            Experience Kania&apos;s logistics skill: Select a device asset from the tray below, then click any <strong>PENDING (red)</strong> pin on the Jakarta store grid to dispatch hardware! Complete deployments to make all stores <strong>OPERATIONAL (green)</strong>!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 bg-white p-2.5 border-2 border-brand-border rounded-xl">
            {Object.values(assets).map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedAsset(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border-2 text-center transition-all ${
                  selectedAsset === item.id
                    ? "bg-pastel-blue border-brand-border shadow-[2px_2px_0px_0px_#2C3E50]"
                    : "border-transparent hover:bg-slate-50"
                }`}
              >
                <span className="text-2xl mb-1">{item.icon}</span>
                <span className="text-[10px] font-bold text-slate-800 leading-tight">{item.name}</span>
              </button>
            ))}
          </div>

          <p className="text-[10px] text-slate-500 font-bold mb-2 uppercase tracking-wide">
            Tool Spec: {assets[selectedAsset].desc}
          </p>
        </div>

        <div 
          id="jakarta-map-container"
          className="relative h-80 rounded-2xl border-3 border-brand-border bg-sky-50 overflow-hidden shadow-inner flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 bg-grid-slate-100 opacity-60 pointer-events-none"></div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 0 15 Q 25 18, 50 15 T 100 15 L 100 0 L 0 0 Z" fill="#C5E3F6" />
            <path d="M 0 18 Q 30 20, 60 16 T 100 18 L 100 100 L 0 100 Z" fill="#EAE2D5" opacity="0.6" />
            <path d="M 20 40 Q 30 35, 45 42 T 80 40 T 95 60 L 70 85 L 30 80 Z" fill="#DDECD2" opacity="0.7" stroke="#BACFB7" strokeWidth="1" />
          </svg>

          <div className="absolute top-4 right-4 bg-white px-2 py-1 border-2 border-brand-border rounded-lg text-[9px] font-bold text-slate-500 tracking-wider">
            🧭 JKT-REGIONAL
          </div>

          {stores.map(store => (
            <button
              key={store.id}
              onClick={(e) => handleDeployAsset(store.id, e)}
              style={{ left: `${store.x}%`, top: `${store.y}%` }}
              className="absolute group transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 cursor-pointer"
            >
              <div className="absolute bottom-full mb-1 bg-brand-dark text-white text-[9px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none z-30">
                {store.name}
                <br />
                <span className="text-pastel-blue">
                  Deployed: {store.deployedAssets.length === 0 ? "None" : store.deployedAssets.map(a => assets[a]?.icon).join(" ")}
                </span>
              </div>

              <div className="relative">
                <span className={`flex h-4 w-4 absolute -top-1 -left-1 rounded-full ${store.status === "operational" ? "bg-emerald-400" : "bg-rose-400"} opacity-75 pulse-pin`}></span>
                <div className={`w-6 h-6 rounded-full border-2 border-brand-border flex items-center justify-center font-bold text-xs ${
                  store.status === "operational" ? "bg-emerald-200" : "bg-rose-200"
                } shadow-md`}>
                  📍
                </div>
              </div>

              <span className="mt-1 bg-white border border-brand-border rounded-md px-1 py-0.5 text-[8px] font-extrabold whitespace-nowrap shadow-sm text-slate-700">
                {store.name.split(" ")[1] || store.name}
              </span>
            </button>
          ))}

          {flyingParcel && (
            <div
              className="absolute w-7 h-7 rounded-lg border-2 border-brand-border bg-pastel-yellow flex items-center justify-center text-xs font-bold z-40"
              style={{
                animation: "float 0.8s ease-in-out forwards",
                left: flyingParcel.endX,
                top: flyingParcel.endY,
                transform: "translate(-50%, -50%)",
                transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
            >
              📦
            </div>
          )}

          <div className="absolute bottom-2 left-2 flex items-center gap-3 bg-white/95 px-3 py-1.5 border-2 border-brand-border rounded-xl text-[9px] font-bold text-slate-600 shadow-sm">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-brand-border inline-block"></span> Operational Store
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 border border-brand-border inline-block"></span> Pending Rollout
            </div>
          </div>

        </div>

      </div>

      <div className="lg:col-span-5 flex flex-col gap-4">
        
        <div className="flex-1 border-3 border-brand-border rounded-2xl bg-brand-dark text-slate-100 flex flex-col shadow-[4px_4px_0px_0px_rgba(44,62,80,1)] overflow-hidden">
          
          <div className="bg-slate-800 px-4 py-2 border-b-2 border-brand-border flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400 font-bold">🟢 SSC_IT_HELPDESK_PORTAL</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
          </div>

          <div className="p-3 border-b border-slate-700 bg-slate-800/50 flex gap-2 overflow-x-auto">
            {tickets.map(ticket => (
              <button
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket.id)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs border whitespace-nowrap flex items-center gap-1.5 transition ${
                  selectedTicket === ticket.id
                    ? "bg-pastel-blue-dark border-pastel-blue text-white"
                    : "border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                <span className={ticket.status === "resolved" ? "text-emerald-400" : "text-amber-400"}>
                  {ticket.status === "resolved" ? "✅" : "⚠️"}
                </span>
                {ticket.id}
              </button>
            ))}
          </div>

          {(() => {
            const ticket = tickets.find(t => t.id === selectedTicket);
            if (!ticket) return null;
            return (
              <div className="p-4 flex-1 flex flex-col gap-3 font-mono text-xs">
                
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sender Profile:</div>
                  <div className="text-emerald-300 font-bold">{ticket.sender} ({ticket.id})</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Ticket Description:</div>
                  <div className="text-slate-200 mt-1 leading-relaxed">{ticket.desc}</div>
                </div>

                <div className="mt-2 border-t border-slate-700 pt-3 flex-1">
                  
                  <div className="text-[10px] text-amber-300 uppercase font-bold tracking-wider mb-2">
                    Select Correct Administration Action:
                  </div>

                  {ticket.status === "resolved" ? (
                    <div className="h-full flex flex-col items-center justify-center py-6 text-center text-emerald-400">
                      <span className="text-4xl mb-2">✔️</span>
                      <div className="font-bold text-sm">TICKET SUCCESSFULLY RESOLVED</div>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">
                        System deployed and synchronized to regional warehouse server database.
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {ticket.tools.map(tool => (
                        <button
                          key={tool}
                          onClick={() => handleSolveTicket(ticket.id, tool)}
                          className="w-full text-left p-2.5 rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-700/60 hover:border-slate-500 transition text-[11px] font-bold text-slate-200 flex items-center justify-between"
                        >
                          <span>⚙️ {tool}</span>
                          <span className="text-[10px] text-slate-500 hover:text-slate-300">EXECUTE ➔</span>
                        </button>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            );
          })()}

        </div>

      </div>

    </div>
  );
}
