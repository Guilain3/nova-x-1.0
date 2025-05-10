import { mockData } from "../../../lib/support/mockData";
import Link from "next/link";
const FeedbackTab = () => {
  return (
    <div className="max-w-lg mx-auto mt-16">
      <h2 className="text-lg font-medium mb-2">{mockData.feedback.title}</h2>
      <div className="mb-4">
        <textarea
          className="w-full p-4 border border-gray-300 rounded resize-none h-32"
          placeholder={mockData.feedback.placeholder}
        />
      </div>
      <Link href="/dashboard/financials/fintrack">
        <button className="w-full py-3 bg-blue-700 text-white font-medium rounded">
          {mockData.feedback.buttonText}
        </button>
      </Link>
    </div>
  );
};

export default FeedbackTab;
