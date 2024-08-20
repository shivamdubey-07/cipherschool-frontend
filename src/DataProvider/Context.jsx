import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState(0); 
  const [checkedQuestions, setCheckedQuestions] = useState(new Set());

  return (
    <DataContext.Provider
      value={{
        sharedData,
        setSharedData,
        checkedQuestions,
        setCheckedQuestions,
        

      }}
    >
      {children}
    </DataContext.Provider>
  );
};
