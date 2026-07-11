import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    quote: "I was terrified AI would replace my team. After this workshop, we've automated the busywork and doubled our creative output."
  },
  {
    id: 2,
    name: "David Chen",
    role: "Financial Analyst",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    quote: "The prompt engineering module alone saved me 10 hours a week in data formatting and report generation."
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "HR Business Partner",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    quote: "CareerShift didn't just teach me tools; it gave me the confidence to lead our company's AI adoption initiative."
  }
];

export function TestimonialSection() {
  return (
    <div className="py-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Professionals Like You</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-card rounded-xl p-5 border border-border shadow-sm flex flex-col justify-between"
          >
            <div>
              <Quote className="w-6 h-6 text-muted-foreground/20 mb-3" />
              <p className="text-sm text-muted-foreground italic mb-6">"{t.quote}"</p>
            </div>
            <div className="flex items-center gap-3">
              <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-border" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">{t.name}</h4>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
