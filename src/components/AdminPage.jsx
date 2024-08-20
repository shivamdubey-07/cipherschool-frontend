import React, { useState } from 'react';
import "./AdminPage.css";
import CreateTest from './CreateTest';

import TestList from './TestList'; 

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('createTest');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="admin-page">
      <nav className="admin-nav">
        <button
          className={`nav-button ${activeTab === 'createTest' ? 'active' : ''}`}
          onClick={() => handleTabChange('createTest')}
        >
          Create Test
        </button>
        
        <button
          className={`nav-button ${activeTab === 'testList' ? 'active' : ''}`}
          onClick={() => handleTabChange('testList')}
        >
          Test List
        </button>
      </nav>

      <div className="tab-content">
        {activeTab === 'createTest' && <CreateTest />}
      
        {activeTab === 'testList' && <TestList />}
      </div>
    </div>
  );
};

export default AdminPage;
