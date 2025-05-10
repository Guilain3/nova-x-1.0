import Link from 'next/link';
import { Icons } from './Icons'; 
import { mockData } from '@/lib/support/mockData';

const FinancingTab = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">{mockData.financing.title}</h2>
      <div className="space-y-4">
        {mockData.financing.options.map(option => (
          <div key={option.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold mr-4">
                {option.icon}
              </div>
              <div>
                <h3 className="font-medium">{option.name}</h3>
                <p className="text-sm text-gray-500">{option.period}</p>
              </div>
            </div>
            <Link href="/dashboard/financials/capApply" >
            <div className="flex items-center">
              <div className="text-right mr-4">
                <p className="font-medium">{option.amount}</p>
                <p className="text-sm text-gray-500">{option.frequency}</p>
              </div>
              <Icons.ArrowRight />
            </div>
            </Link>
           
          </div>
        ))}
      </div>
      
      <div className="flex mt-16">
        {/* <Link 
          href="#" 
          className="mr-4 px-4 py-2 border border-blue-700 text-blue-700 rounded flex items-center"
        >
          <svg width="20" height="20" className="mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 17V11M12 8V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Explore more
        </Link> */}
        <Link 
          href="/sme/dashboard" 
          className="px-4 py-2 bg-blue-700 text-white rounded flex items-center"
        >
          <Icons.Home />
          <span className="ml-2">Go back home</span>
        </Link>
      </div>
    </div>
  );
};

export default FinancingTab;