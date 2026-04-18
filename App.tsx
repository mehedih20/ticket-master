import "./global.css";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainLayout from "./src/components/layout/MainLayout";
import { Toaster } from "sonner-native";
export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainLayout />
            <Toaster
              position="top-center"
              style={{ backgroundColor: "white" }}
              swipeToDismissDirection="up"
              closeButton={true}
              toastOptions={{
                titleStyle: {
                  color: "black",
                },
              }}
            />
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
