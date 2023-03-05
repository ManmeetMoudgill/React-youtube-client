import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { HttpLoadingProvider } from "./shell/hooks/use-http-loading";
import AppContainer from "./app/index";
import { UserProvider } from "./shell/providers/user/user-provider";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <ToastContainer hideProgressBar position="top-right" theme="colored" />

      <UserProvider>
        <HttpLoadingProvider>
          <AppContainer darkMode={darkMode} setDarkMode={setDarkMode} />
        </HttpLoadingProvider>
      </UserProvider>
    </>
  );
}

export default App;
