import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./shell/reudx";
import { AxiosProvider } from "./utils/axios/provider";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AxiosProvider>
        <App />
      </AxiosProvider>
    </PersistGate>
  </Provider>
);
