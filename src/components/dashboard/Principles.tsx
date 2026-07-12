import { Wrench, UserCheck, BookOpen, Handshake } from "lucide-react";

const principles = [
  {
    title: "AI is a Tool",
    description: "Not your replacement.",
    icon: Wrench
  },
  {
    title: "Your Expertise Matters",
    description: "AI amplifies professionals.",
    icon: UserCheck
  },
  {
    title: "Learning Never Stops",
    description: "Continuous growth wins.",
    icon: BookOpen
  },
  {
    title: "Human Skills Endure",
    description: "Leadership, Communication, Decision Making.",
    icon: Handshake
  }
];

export function Principles() {
  return (
    <div className="py-6 border-y border-border my-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">CareerShift Principles</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {principles.map((p, idx) => (
          <div key={idx} className="bg-card border border-border p-4 rounded-xl shadow-sm text-center flex flex-col items-center">
            <div className="bg-muted p-3 rounded-full mb-3 text-primary">
              <p.icon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{p.title}</h3>
            <p className="text-xs text-muted-foreground">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
