import { ThemeProvider } from "./components/ui/theme-provider";
// import { ModeToggle } from "@/components/ui/toggle-theme";
import Login from "./pages/auth/login/login";

export default function App() {
  return (
    <ThemeProvider>
      <Login />
      {/* Use this button where you want to toggle themes */}
      {/* <ModeToggle /> */}
    </ThemeProvider>
  );
}
