import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who is this workshop for?",
    answer: "This workshop is designed for everyday professionals—managers, marketers, analysts, HR, and executives—who want to leverage AI to become more productive and valuable in their roles."
  },
  {
    question: "Do I need technical knowledge?",
    answer: "Not at all. We start from the basics and focus entirely on practical application, not coding. If you can write an email, you can learn these AI workflows."
  },
  {
    question: "Will I receive recordings?",
    answer: "Yes, you get lifetime access to all module recordings, as well as any future updates we make to the curriculum."
  },
  {
    question: "How long do I have access?",
    answer: "You have lifetime access. AI moves fast, so we continuously update the content. You'll always have access to the latest strategies."
  },
  {
    question: "Can non-technical professionals join?",
    answer: "Absolutely. In fact, this course was built specifically for non-technical professionals. We focus on the 'how-to' for your daily work, not the underlying math."
  }
];

export function FAQAccordion() {
  return (
    <div className="py-16 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-muted-foreground">Everything you need to know about the workshop.</p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="bg-card border border-border rounded-xl px-6 data-[state=open]:bg-muted/50 transition-colors shadow-sm"
          >
            <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline font-medium py-5">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
