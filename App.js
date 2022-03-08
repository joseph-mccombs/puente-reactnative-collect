import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import MainNavigation from './components/MainNavigation';
// import configureStore from './modules/state-management/configure-store';
import { theme } from './modules/theme';

// const store = configureStore();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    // <StoreProvider store={store}>
    <PaperProvider theme={theme}>
      <MainNavigation />
    </PaperProvider>
    // </StoreProvider>
  );
}
