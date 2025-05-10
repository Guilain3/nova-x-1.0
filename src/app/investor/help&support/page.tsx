"use client";

import React, { useState } from "react";
import Layout from "../dashboard/layout";
import GettingStartedTab from "./tabs/GettingStartedTab";
import FAQTab from "./tabs/FaqTab";
import EducationTab from "./tabs/EducationTab";
import SupportTab from "./tabs/SupportTab";
import TabNavigation from "./tabs/TabNavigation";

const HelpandSupportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('gettingStarted');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'gettingStarted':
        return (
          <>
            <GettingStartedTab />
          </>
        );
      case 'faqs':
        return <FAQTab />;
      case 'education':
        return <EducationTab />;
      case 'support':
        return <SupportTab />;
      default:
        return <GettingStartedTab />;
    }
  };
  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div>{renderTabContent()}</div>
      </div>
    </Layout>
  );
};

export default HelpandSupportPage;