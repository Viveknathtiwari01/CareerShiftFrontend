import { Wrench, UserCheck, BookOpen, Handshake } from "lucide-react";

const principles = [
  {
    title: "AI is a Tool",
    description: "Not your replacement.",
    icon: Wrench,
  },
  {
    title: "Your Expertise Matters",
    description: "AI amplifies professionals.",
    icon: UserCheck,
  },
  {
    title: "Learning Never Stops",
    description: "Continuous growth wins.",
    icon: BookOpen,
  },
  {
    title: "Human Skills Endure",
    description: "Leadership, Communication, Decision Making.",
    icon: Handshake,
  },
];

export function Principles() {
  return (
    <div className="py-10">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#0B1D3A] mb-3">
          CareerShift Principles
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {principles.map((p, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-3xl shadow-sm text-center flex flex-col items-center justify-center min-h-[220px] hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
          >
            <div className="bg-[#FDFBF2] border border-[#E8C96A]/20 p-3.5 rounded-full mb-6 text-[#C9A84C] group-hover:scale-110 transition-transform duration-300">
              <p.icon className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-[19px] font-medium text-[#0B1D3A] mb-2">{p.title}</h3>
            <p className="text-[14px] text-[#4A5568] font-light leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
