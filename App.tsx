import React from "react";
import RootNavigation from "./src/Navigation/RootNavigation/RootNavigation";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store/store";
import { PersistGate } from "redux-persist/integration/react";


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>

  );
};

