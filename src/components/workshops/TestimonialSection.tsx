import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    profession: "Senior Marketing Manager",
    feedback:
      "This workshop completely changed how I approach campaigns. I'm doing in 2 hours what used to take me a full day.",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Marcus Chen",
    profession: "Financial Analyst",
    feedback:
      "I was skeptical about AI in finance, but the workflows taught here are incredibly practical. It's like having an assistant.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Elena Rodriguez",
    profession: "Product Manager",
    feedback:
      "The prompt engineering module alone is worth the price. It's not just theory; it's exactly what you need to succeed today.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  },
];

export function TestimonialSection() {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">
          What Professionals Say
        </h2>
        <p className="text-lg text-muted-foreground">
          Join thousands of others who have future-proofed their careers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="bg-card border border-border p-8 rounded-3xl relative hover:border-primary/50 transition-colors shadow-soft"
          >
            <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />

            <div className="flex items-center gap-4 mb-6">
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-border"
                loading="lazy"
              />
              <div>
                <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                <p className="text-xs text-primary">{testimonial.profession}</p>
              </div>
            </div>

            <p className="text-foreground/80 text-sm leading-relaxed italic">
              "{testimonial.feedback}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
