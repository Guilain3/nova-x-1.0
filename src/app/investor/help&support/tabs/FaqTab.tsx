import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "How do I invest in a business?",
    answer:
      "After creating your profile and verifying your identity, browse opportunities and select the business you're interested in. Follow the steps to confirm your investment securely.",
  },
  {
    question: "Is there a minimum investment amount?",
    answer:
      "Yes, the minimum varies depending on the SME’s funding requirements, but it’s usually clearly displayed on their investment profile.",
  },
  {
    question: "How do I track the performance of my investments?",
    answer:
      "You’ll receive regular updates via your dashboard including financial reports, impact metrics, and communication from the SMEs you’ve invested in.",
  },
  {
    question: "What if I want to withdraw my investment?",
    answer:
      "Most investments are locked in for a fixed term, but exit options are detailed in the investment agreement. Always review the terms before confirming.",
  },
];

const FAQTab: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b pb-4 cursor-pointer"
            onClick={() => toggleIndex(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-blue-700 font-semibold">{faq.question}</h3>
              {openIndex === index ? (
                <ChevronUp className="text-blue-700 w-5 h-5" />
              ) : (
                <ChevronDown className="text-blue-700 w-5 h-5" />
              )}
            </div>
            {openIndex === index && (
              <p className="text-gray-600 text-sm font-semibold mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQTab;
