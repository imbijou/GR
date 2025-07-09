import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { useAppStore } from './src/store/appStore';
import { SetupScreen } from './src/components/SetupScreen';
import { PipView } from './src/components/PipView';
import { useInterviewMode } from './src/hooks/useInterviewMode';

export default function App() {
  const { isInPipMode, apiKey, deepgramApiKey } = useAppStore();
  const { startListening, stopListening } = useInterviewMode();

  // Start listening when entering PiP mode
  useEffect(() => {
    if (isInPipMode && apiKey && deepgramApiKey) {
      startListening();
    } else if (!isInPipMode) {
      stopListening();
    }
  }, [isInPipMode, apiKey, deepgramApiKey]);

  return (
    <>
      <StatusBar style={isInPipMode ? "light" : "auto"} />
      {isInPipMode ? <PipView /> : <SetupScreen />}
    </>
  );
}