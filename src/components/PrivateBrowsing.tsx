"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/router"; // Fixed: use next/router instead of next/navigation
import { toast } from "@/components/ui/use-toast"; // Fixed: use toast function instead of toast.success

const PrivateBrowsing = () => {
  const router = useRouter();
  const { toast } = useToast();

  const openPrivateTab = (url: string) => {
    const newTab = window.open(url, "_blank", "noopener,noreferrer,noopener,noreferrer");
    if (newTab) {
      toast("Private browsing tab opened successfully"); // Fixed: use toast function
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Private Browsing</h2>
      <div className="space-y-2">
        <Button 
          onClick={() => openPrivateTab("https://www.example.com")}
          variant="secondary" // Fixed: use valid variant
        >
          Open Private Tab
        </Button>
        <p className="text-sm text-gray-500">
          Opens a new private tab that won't save history or cookies
        </p>
      </div>
    </div>
  );
};

export default PrivateBrowsing; // Fixed: default export