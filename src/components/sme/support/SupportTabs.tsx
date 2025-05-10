'use client';

import { useState } from 'react';
import CallToAction from './CallToAction';
import BackNavigation from './BackNavigation';
import TabNavigation from './TabNavigation';
import FeedbackTab from './FeedbackTab';
import ImproveTab from './ImproveTab';
import EducationTab from './EducationTab';
import FinancingTab from './FinancingTab';
import SupportTab from './SupportTab';
import ReasonsForIneligibility from './ReasonsForIneligibility';

const SupportTabs = () => {
  const [activeTab, setActiveTab] = useState('feedback');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feedback':
        return (
          <>
            
            <ReasonsForIneligibility />
          </>
        );
      case 'improve':
        return <ImproveTab />;
      case 'education':
        return <EducationTab />;
      case 'financing':
        return <FinancingTab />;
      case 'support':
        return <SupportTab />;
      default:
        return <FeedbackTab />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* <BackNavigation /> */}
      <CallToAction />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default SupportTabs;