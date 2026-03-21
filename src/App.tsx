"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivateBrowsingPage from "./pages/PrivateBrowsing";
import Login from "./pages/Login";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Add security headers middleware
const addSecurityHeaders = () => {
  if (typeof window !== 'undefined') {
    // Add CSP header (would be done by server in production)
    document.addEventListener('DOMContentLoaded', () => {
      // Prevent XSS by disabling eval and similar functions
      if (window.eval) {
        window.eval = (x: string) => {
          return "eval disabled";
        };
      }
    });
  }
};

addSecurityHeaders();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route               path="/private" 
              element={
                <RequireAuth>
                  <PrivateBrowsingPage />
                </RequireAuth>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;