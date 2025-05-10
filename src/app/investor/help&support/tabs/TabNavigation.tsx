import { Icons } from "@/components/sme/support/Icons";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => {
  const tabs = [
    { id: 'gettingStarted', label: 'Getting Started', icon: Icons.Feedback },
    { id: 'faqs', label: 'FAQs', icon: Icons.Financing },
    { id: 'education', label: 'Education', icon: Icons.Education },
    { id: 'support', label: 'Support', icon: Icons.Support },
  ];

  return (
    <div className="flex bg-gray-200 justify-center rounded-lg mt-4">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center px-4 py-3 ${
            activeTab === tab.id
              ? 'bg-blue-700 text-white rounded-lg'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span className="mr-2">
            <tab.icon active={activeTab === tab.id} />
          </span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;