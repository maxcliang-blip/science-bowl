"use client";

import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast";

const PrivateBrowsing = () => {
  const openPrivateTab = (url: string) => {
    const newTab = window.open(url, "_blank", "noopener,noreferrer");
    if (newTab) {
      showSuccess("Private browsing tab opened successfully");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Private Browsing</h2>
      <div className="space-y-2">
        <Button 
          onClick={() => openPrivateTab("https://www.example.com")}
          variant="secondary"
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

export default PrivateBrowsing;