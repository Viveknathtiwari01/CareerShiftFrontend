import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { Toaster } from "@/components/ui/sonner";
import { RouteRobots } from "@/components/seo/RouteRobots";

function App() {
  return (
    <BrowserRouter>
      <RouteRobots />
      <AppRoutes />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
