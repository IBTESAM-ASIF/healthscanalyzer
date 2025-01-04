import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "What is HealthScanalyzer?",
      answer: "HealthScanalyzer is an advanced AI-powered platform that analyzes health data to provide comprehensive insights and recommendations for optimal wellness. It combines cutting-edge technology with medical expertise to deliver personalized health analysis."
    },
    {
      question: "How does the Solana token integration work?",
      answer: "Our native Solana-based token, launching in Q1 2025, will power the ecosystem, enabling governance voting, premium feature access, and rewards for active community members who contribute to the platform's growth."
    },
    {
      question: "Is my health data secure?",
      answer: "Absolutely. We implement military-grade encryption and blockchain technology to ensure your health data remains private, secure, and under your control at all times. Our platform is built with privacy-first principles."
    },
    {
      question: "What types of health analysis does the platform provide?",
      answer: "Our platform offers comprehensive health analysis including dietary recommendations, fitness tracking, sleep pattern analysis, mental wellness monitoring, and predictive health insights using advanced AI algorithms."
    },
    {
      question: "How can I participate in the platform's development?",
      answer: "You can join our community through our Telegram or Twitter channels, participate in governance voting (once tokens launch), and provide feedback during our beta testing phase in Q4 2024."
    },
    {
      question: "What makes HealthScanalyzer unique?",
      answer: "Our unique combination of AI technology, blockchain security, and decentralized governance creates a revolutionary health platform that puts users first. Our integration with Solana blockchain ensures fast, secure, and scalable operations."
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-gradient-cosmic">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-4 text-gradient glow">
          Frequently Asked Questions
        </h2>
        <p className="text-center mb-12 text-muted-foreground">
          Everything you need to know about HealthScanalyzer
        </p>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass-effect rounded-lg px-6"
            >
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};