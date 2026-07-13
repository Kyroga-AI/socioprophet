import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { Home } from "@/pages/Home";
import { Platform } from "@/pages/Platform";
import { Products } from "@/pages/Products";
import { ProductDetail } from "@/pages/products/ProductDetail";
import { Solutions } from "@/pages/Solutions";
import { Sr262 } from "@/pages/solutions/Sr262";
import { SolutionDetail } from "@/pages/solutions/SolutionDetail";
import { Compare } from "@/pages/Compare";
import { Evidence } from "@/pages/Evidence";
import { Education } from "@/pages/Education";
import { Company } from "@/pages/Company";
import { Contact } from "@/pages/Contact";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/platform" component={Platform} />
          <Route path="/products" component={Products} />
          <Route path="/products/:slug" component={ProductDetail} />
          <Route path="/solutions" component={Solutions} />
          <Route path="/solutions/sr26-2" component={Sr262} />
          <Route path="/solutions/:slug" component={SolutionDetail} />
          <Route path="/compare" component={Compare} />
          <Route path="/evidence" component={Evidence} />
          <Route path="/education" component={Education} />
          <Route path="/company" component={Company} />
          <Route path="/about" component={Company} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
