import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { HttpLoadingProvider } from "./shell/hooks/use-http-loading";
import AppContainer from "./app/index";
import { UserProvider } from "./shell/providers/user/user-provider";
import { FilterProvider } from "./shell/providers/filter-provider/filter-provider";

function App() {
  return (
    <>
      <ToastContainer hideProgressBar position="top-right" theme="colored" />
      <UserProvider>
        <HttpLoadingProvider>
          <FilterProvider>
            <AppContainer />
          </FilterProvider>
        </HttpLoadingProvider>
      </UserProvider>
    </>
  );
}

export default App;
