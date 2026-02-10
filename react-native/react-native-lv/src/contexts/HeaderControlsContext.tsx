import React, { createContext, useContext, useMemo, useState } from 'react';

type HeaderControlsValue = {
  isReading: boolean;
  isListening: boolean;
  toggleReading: () => void;
  toggleListening: () => void;
  setReading: (v: boolean) => void;
  setListening: (v: boolean) => void;
};

const HeaderControlsContext = createContext<HeaderControlsValue | null>(null);

export function HeaderControlsProvider({ children }: { children: React.ReactNode }) {
  const [isReading, setReading] = useState(false);
  const [isListening, setListening] = useState(false);

  const value = useMemo(
    () => ({
      isReading,
      isListening,
      toggleReading: () => setReading((v) => !v),
      toggleListening: () => setListening((v) => !v),
      setReading,
      setListening,
    }),
    [isReading, isListening]
  );

  return (
    <HeaderControlsContext.Provider value={value}>
      {children}
    </HeaderControlsContext.Provider>
  );
}

export function useHeaderControls() {
  const ctx = useContext(HeaderControlsContext);
  if (!ctx) throw new Error('useHeaderControls must be used within HeaderControlsProvider');
  return ctx;
}