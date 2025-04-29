import React, { createContext, useContext, useState, useEffect } from 'react';

const SelectedAudienceContext = createContext();

export const SelectedAudienceProvider = ({ children }) => {
  const [selectedAudience, setSelectedAudience] = useState(() => {
    const storedAudience = sessionStorage.getItem('selectedAudience');
    return storedAudience || null;
  });

  // Save to sessionStorage when selectedAudience changes
  useEffect(() => {
    if (selectedAudience) {
      sessionStorage.setItem('selectedAudience', selectedAudience);
    } else {
      sessionStorage.removeItem('selectedAudience');
    }
  }, [selectedAudience]);

  // Clear selectedAudience from sessionStorage when page is refreshed or closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('selectedAudience');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const clearSelectedAudience = () => {
    setSelectedAudience(null);
    sessionStorage.removeItem('selectedAudience'); // Also clear immediately
  };

  const value = {
    selectedAudience,
    setSelectedAudience,
    clearSelectedAudience,
  };

  return (
    <SelectedAudienceContext.Provider value={value}>
      {children}
    </SelectedAudienceContext.Provider>
  );
};

export const useSelectedAudience = () => {
  return useContext(SelectedAudienceContext);
};
