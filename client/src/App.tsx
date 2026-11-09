import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import InfoPage from "./pages/InfoPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={() => <InfoPage kind="about" />} />
      <Route path="/platform" component={() => <InfoPage kind="platform" />} />
      <Route path="/applications" component={() => <InfoPage kind="applications" />} />
      <Route path="/modules" component={() => <InfoPage kind="modules" />} />
      <Route path="/technology-security" component={() => <InfoPage kind="technology" />} />
      <Route path="/installation" component={() => <InfoPage kind="installation" />} />
      <Route path="/licenses" component={() => <InfoPage kind="licenses" />} />
      <Route path="/purchase" component={() => <InfoPage kind="purchase" />} />
      <Route path="/support" component={() => <InfoPage kind="support" />} />
      <Route path="/faq" component={() => <InfoPage kind="faq" />} />
      <Route path="/contact" component={() => <InfoPage kind="contact" />} />
      <Route component={() => <InfoPage kind="about" />} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster theme="dark" position="bottom-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
