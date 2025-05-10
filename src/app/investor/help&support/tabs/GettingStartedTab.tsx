import React from "react";

const GettingStartedTab = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-6 border border-gray-100 max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-900">Getting Started</h2>

      <div className="space-y-4">
        {/* Section: Creating an Account */}
        <div className="border-b pb-4">
          <h3 className="text-blue-700 font-semibold">Creating an Account</h3>
          <p className="text-sm">
            Sign up with your email or social account. Complete your investor profile including preferences, risk level, and industry focus. Verify your identity to comply with KYC regulations.
          </p>
        </div>

        {/* Section: Browsing Opportunities */}
        <div className="border-b pb-4">
          <h3 className="text-blue-700 font-semibold">Browsing Opportunities</h3>
          <p className="text-sm">
            Explore SMEs by filtering based on sectors, regions, or funding stages. Profiles include business plans, financials, and founder info to guide your decision.
          </p>
        </div>

        {/* Section: Making an Investment */}
        <div className="flex items-start justify-between border-b pb-4">
          <div>
            <h3 className="text-blue-700 font-semibold">Making an Investment</h3>
            <p className="text-sm">
              Select an SME, choose your investment amount, and confirm securely. Legal docs and updates are sent to your dashboard.
            </p>
          </div>
          <button
          onClick={() => (window.location.href = "/investor/dashboard")}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedTab;
