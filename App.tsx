import "./global.css";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainLayout from "./src/components/layout/MainLayout";
export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainLayout />
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
