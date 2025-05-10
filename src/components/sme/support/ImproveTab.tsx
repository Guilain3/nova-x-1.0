'use client';

import Link from "next/link";
import { useState } from 'react';
import { Icons } from './Icons';
import { mockData } from '@/lib/support/mockData'; 

const ImproveTab = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([1]); // Item 1 expanded by default

  const toggleItem = (id: number) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(itemId => itemId !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">{mockData.improve.title}</h2>
      <div className="space-y-4">
        {mockData.improve.steps.map(step => (
          <div key={step.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-white">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-blue-700 text-white font-bold mr-4`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.type}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded mr-4">
                  CTA
                </button>
                <button onClick={() => toggleItem(step.id)}>
                  {expandedItems.includes(step.id) ? <Icons.Collapse /> : <Icons.Expand />}
                </button>
              </div>
            </div>
            
            {expandedItems.includes(step.id) && (
              <div className="p-4 border-t">
                <div className="flex">
                  <ul className="list-disc pl-5 pr-4 text-sm">
                    <li>{step.content}</li>
                  </ul>
                  {step.cta === 'FinTrack' && (
                    <Link href="/dashboard/financials/fintrack">
                    <button className="px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded whitespace-nowrap">
                      FinTrack
                    </button>
                  </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImproveTab;