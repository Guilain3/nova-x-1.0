"use client";

import React, { useState } from "react";
import { CreditCard, Smartphone } from "lucide-react";

const UpgradePage = () => {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    monthly: {
      name: "Monthly",
      price: 3,
      period: "month",
      features: [
        "Visible to all investors",
        "Priority in search results",
        "Detailed business profile",
        "Direct messaging with investors"
      ]
    },
    yearly: {
      name: "Yearly",
      price: 30,
      period: "year",
      features: [
        "Visible to all investors",
        "Priority in search results",
        "Detailed business profile",
        "Direct messaging with investors",
        "Featured in weekly investor newsletter",
        "2 months free"
      ]
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert("Payment successful! Your account has been upgraded.");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#0000BF] mb-6">Upgrade Your Account</h1>
      
      {/* Current Plan Status */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
        <h2 className="text-lg font-semibold mb-2">Current Plan</h2>
        <div className="flex items-center">
          <div className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium">
            Free
          </div>
          <p className="ml-4 text-gray-600">Limited visibility to investors</p>
        </div>
      </div>
      
      {/* Plan Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Your Plan</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Monthly Plan */}
          <div 
            className={`border rounded-lg p-6 cursor-pointer transition-all ${
              selectedPlan === "monthly" 
                ? "border-[#0000BF] bg-blue-50" 
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedPlan("monthly")}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{plans.monthly.name}</h3>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">${plans.monthly.price}</span>
                <span className="text-gray-500 ml-1">/{plans.monthly.period}</span>
              </div>
            </div>
            <ul className="space-y-2">
              {plans.monthly.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Yearly Plan */}
          <div 
            className={`border rounded-lg p-6 cursor-pointer transition-all ${
              selectedPlan === "yearly" 
                ? "border-[#0000BF] bg-blue-50" 
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedPlan("yearly")}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{plans.yearly.name}</h3>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">${plans.yearly.price}</span>
                <span className="text-gray-500 ml-1">/{plans.yearly.period}</span>
              </div>
            </div>
            <div className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded mb-4 inline-block">
              Save 17%
            </div>
            <ul className="space-y-2">
              {plans.yearly.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Payment Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        
        <div className="flex space-x-4 mb-6">
          <button
            type="button"
            className={`flex items-center px-4 py-2 rounded-md ${
              paymentMethod === "card" 
                ? "bg-[#0000BF] text-white" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setPaymentMethod("card")}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Credit Card
          </button>
          
          <button
            type="button"
            className={`flex items-center px-4 py-2 rounded-md ${
              paymentMethod === "momo" 
                ? "bg-[#0000BF] text-white" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setPaymentMethod("momo")}
          >
            <Smartphone className="mr-2 h-5 w-5" />
            Mobile Money
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {paymentMethod === "card" ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name on card
                </label>
                <input
                  type="text"
                  id="cardName"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="John Smith"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration date
                  </label>
                  <input
                    type="text"
                    id="expDate"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="+250 7XX XXX XXX"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Provider
                </label>
                <select
                  id="provider"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select provider</option>
                  <option value="mtn">MTN Mobile Money</option>
                  <option value="airtel">Airtel Money</option>
                  <option value="tigo">Tigo Cash</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Order Summary */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium mb-2">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>{plans[selectedPlan].name} Plan</span>
              <span>${plans[selectedPlan].price}.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-gray-200">
              <span>Total</span>
              <span>${plans[selectedPlan].price}.00</span>
            </div>
          </div>
          
          <button
            type="submit"
            className="mt-6 w-full bg-[#0000BF] text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-colors flex items-center justify-center"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              `Upgrade Now`
            )}
          </button>
        </form>
      </div>
      
      {/* Benefits */}
      <div className="rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Why Upgrade?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Increased Visibility</h3>
              <p className="text-gray-600">Your business appears in search results for potential investors</p>
            </div>
          </div>
          
          {/* <div className="flex">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Direct Messaging</h3>
              <p className="text-gray-600">Connect with investors directly through our platform</p>
            </div>
          </div> */}
          
          <div className="flex">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Verified Status</h3>
              <p className="text-gray-600">Get a verified badge to build trust with potential investors</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Priority Support</h3>
              <p className="text-gray-600">Get faster responses from our customer support team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;