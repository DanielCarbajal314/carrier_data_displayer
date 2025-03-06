import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./pages";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="mx-[10%] py-8 dark:text-gray-200 text-gray-900">
          <AppRouter />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
