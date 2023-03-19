import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { HttpLoadingProvider } from "./shell/hooks/use-http-loading";
import AppContainer from "./app/index";
import { UserProvider } from "./shell/providers/user/user-provider";
import { FilterProvider } from "./shell/providers/filter-provider/filter-provider";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorFallback from "./components/ErrorFallBack";

function App() {
  //what should i do on reset?

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ToastContainer autoClose={2000} position="top-right" theme="colored" />
        <UserProvider>
          <HttpLoadingProvider>
            <FilterProvider>
              <AppContainer />
            </FilterProvider>
          </HttpLoadingProvider>
        </UserProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
