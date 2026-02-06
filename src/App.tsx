import { ThemeProvider } from "@/shared/theme";
import { AppRoutes } from "./routes/AppRoutes";

const App = () => (
  <ThemeProvider>
    <AppRoutes />
  </ThemeProvider>
);

export default App;
