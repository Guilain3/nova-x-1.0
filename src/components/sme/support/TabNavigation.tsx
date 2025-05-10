import { Icons } from "./Icons";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => {
  const tabs = [
    { id: 'feedback', label: 'Feedback', icon: Icons.Feedback },
    { id: 'improve', label: 'Improve', icon: Icons.Improve },
    { id: 'education', label: 'Education', icon: Icons.Education },
    { id: 'financing', label: 'Financing', icon: Icons.Financing },
    { id: 'support', label: 'Support', icon: Icons.Support },
  ];

  return (
    <div className="flex bg-gray-200 justify-center rounded-lg">
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