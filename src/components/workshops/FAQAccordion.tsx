import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who is this workshop for?",
    answer: "This workshop is designed for non-technical professionals (marketers, managers, analysts, HR, sales) who want to leverage AI to improve their productivity and future-proof their careers."
  },
  {
    question: "Do I need technical knowledge?",
    answer: "Not at all. We start from the basics and focus on practical application. If you can write an email, you can learn to use these AI tools effectively."
  },
  {
    question: "Will I receive recordings?",
    answer: "Yes, you get lifetime access to all video modules, including any future updates we make as AI technology evolves."
  },
  {
    question: "How long do I have access?",
    answer: "Forever. Your one-time enrollment grants you lifetime access to the platform and community."
  },
  {
    question: "Is there support if I get stuck?",
    answer: "Yes! You'll get access to our private community where you can ask questions, share wins, and get feedback from mentors and peers."
  }
];

export function FAQAccordion() {
  return (
    <div className="py-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Frequently Asked Questions</h2>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-border">
            <AccordionTrigger className="text-left font-semibold text-sm hover:no-underline hover:text-primary transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
