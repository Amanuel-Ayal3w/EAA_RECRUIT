const institutions = [
  { short: "ET", name: "ETHIOPIAN AIRLINES", sub: "Official Airline Partner" },
  { short: "EAA", name: "ETHIOPIAN AVIATION ACADEMY", sub: "Training Institution" },
  { short: "AAU", name: "ADDIS ABABA UNIVERSITY", sub: "Academic Partner" },
  { short: "ECAA", name: "ETHIOPIAN CIVIL AVIATION AUTH.", sub: "Regulatory Body" },
  { short: "MOT", name: "MINISTRY OF TRANSPORT", sub: "Government Sponsor" },
];

export default function Logos() {
  return (
    <section
      id="trust"
      className="flex flex-col items-center w-full bg-[#0F0F0F] py-[48px] px-6 md:py-[64px] md:px-[120px] gap-[40px] border-y border-y-[#1D2D1D]"
    >
      <div className="flex flex-col items-center gap-[8px]">
        <span className="font-ibm-mono text-[11px] text-[#444444] tracking-[3px]">
          INSTITUTIONAL TRUST &amp; COMPLIANCE
        </span>
        <div className="flex items-center gap-[8px]">
          <div className="w-[6px] h-[6px] rounded-full bg-[#4ADE80]" />
          <span className="font-ibm-mono text-[10px] text-[#4ADE80] tracking-[1.5px]">
            ALL DATA STORED IN ETHIOPIA // PROCLAMATION NO. 1329/2023 COMPLIANT
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-[48px] w-full">
        {institutions.map((inst) => (
          <div
            key={inst.short}
            className="flex items-center gap-[10px] group"
          >
            <div className="flex items-center justify-center w-[44px] h-[44px] shrink-0 border border-[#2D2D2D] bg-[#111111] group-hover:border-[#006B3F] transition-colors">
              <span className="font-grotesk text-[10px] font-bold text-[#FFD600] tracking-[1px]">
                {inst.short}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-grotesk text-[11px] font-bold text-[#444444] tracking-[1.5px] group-hover:text-[#888888] transition-colors">
                {inst.name}
              </span>
              <span className="font-ibm-mono text-[9px] text-[#333333] tracking-[0.5px]">
                {inst.sub}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
