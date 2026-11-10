import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import InfoPage from "./pages/InfoPage";
import ClientPortal from "./pages/ClientPortal";
import AdminPortal from "./pages/AdminPortal";
import LegalPage from "./pages/LegalPage";
import ApplicationPage from "./pages/ApplicationPage";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={() => <InfoPage kind="about" />} />
      <Route path="/platform" component={() => <InfoPage kind="platform" />} />
      <Route path="/applications" component={() => <InfoPage kind="applications" />} />
      <Route path="/applications/client" component={() => <ApplicationPage app="client" />} />
      <Route path="/applications/chauffeur" component={() => <ApplicationPage app="chauffeur" />} />
      <Route path="/applications/commerce" component={() => <ApplicationPage app="commerce" />} />
      <Route path="/applications/admin" component={() => <ApplicationPage app="admin" />} />
      <Route path="/fonctionnement" component={() => <InfoPage kind="fonctionnement" />} />
      <Route path="/modules" component={() => <InfoPage kind="modules" />} />
      <Route path="/technology-security" component={() => <InfoPage kind="technology" />} />
      <Route path="/installation" component={() => <InfoPage kind="installation" />} />
      <Route path="/licenses" component={() => <InfoPage kind="licenses" />} />
      <Route path="/purchase" component={() => <InfoPage kind="purchase" />} />
      <Route path="/support" component={() => <InfoPage kind="support" />} />
      <Route path="/faq" component={() => <InfoPage kind="faq" />} />
      <Route path="/contact" component={() => <InfoPage kind="contact" />} />
      <Route path="/terms" component={() => <LegalPage kind="terms" />} />
      <Route path="/license" component={() => <LegalPage kind="license" />} />
      <Route path="/refund" component={() => <LegalPage kind="refund" />} />
      <Route path="/privacy" component={() => <LegalPage kind="privacy" />} />
      <Route path="/cookies" component={() => <LegalPage kind="cookies" />} />
      <Route path="/security" component={() => <LegalPage kind="security" />} />
      <Route path="/ip" component={() => <LegalPage kind="ip" />} />
      <Route path="/support-terms" component={() => <LegalPage kind="support-terms" />} />
      <Route path="/client" component={ClientPortal} />
      <Route path="/admin-portal" component={AdminPortal} />
      <Route component={NotFound} />
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
