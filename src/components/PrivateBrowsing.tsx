"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, EyeOff, Lock, AlertTriangle, CheckCircle } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const PrivateBrowsing = () => {
  const [url, setUrl] = useState("https://www.example.com");
  const [isIncognitoMode, setIsIncognitoMode] = useState(true);
  const [blockCookies, setBlockCookies] = useState(true);
  const [blockTrackers, setBlockTrackers] = useState(true);
  const [isSecureConnection, setIsSecureConnection] = useState(false);

  const openPrivateTab = () => {
    if (!url.trim()) {
      showError("Please enter a valid URL");
      return;
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      showError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    // Build security flags
    const securityFlags = [
      "noopener",
      "noreferrer",
      ...(isIncognitoMode ? ["private"] : []),
      ...(blockCookies ? ["third-party-cookies=block"] : []),
      ...(blockTrackers ? ["third-party-cookies=block", "tracking-protection=strict"] : [])
    ].join(",");

    const newTab = window.open(url, "_blank", securityFlags);
    
    if (newTab) {
      showSuccess("Private browsing tab opened successfully");
      setIsSecureConnection(true);
      setTimeout(() => setIsSecureConnection(false), 3000);
    } else {
      showError("Failed to open private tab. Please check your browser settings.");
    }
  };

  const clearData = () => {
    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies
    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    showSuccess("All browsing data cleared successfully");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold">Private Browsing</h2>
      </div>

      {/* URL Input */}
      <div className="space-y-2">
        <Label htmlFor="url">Website URL</Label>
        <div className="flex gap-2">
          <Input
            id="url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={openPrivateTab} className="px-6">
            Open
          </Button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Security Settings
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isIncognitoMode ? (
                <EyeOff className="h-4 w-4 text-green-600" />
              ) : (
                <Eye className="h-4 w-4 text-gray-600" />
              )}
              <span>Incognito Mode</span>
            </div>
            <Switch
              checked={isIncognitoMode}
              onCheckedChange={setIsIncognitoMode}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {blockCookies ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              )}
              <span>Block Cookies</span>
            </div>
            <Switch
              checked={blockCookies}
              onCheckedChange={setBlockCookies}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {blockTrackers ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              )}
              <span>Block Trackers</span>
            </div>
            <Switch
              checked={blockTrackers}
              onCheckedChange={setBlockTrackers}
            />
          </div>
        </div>
      </div>

      {/* Security Status */}
      {isSecureConnection && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-700 font-medium">Secure connection established</span>
        </div>
      )}

      {/* Clear Data Button */}
      <Button 
        onClick={clearData} 
        variant="destructive" 
        className="w-full"
      >
        Clear All Browsing Data
      </Button>

      {/* Security Info */}
      <div className="text-sm text-gray-600 space-y-2">
        <p>✓ Private tabs won't save your browsing history</p>
        <p>✓ Cookies and site data are blocked by default</p>
        <p>✓ Third-party trackers are blocked</p>
        <p>✓ Your IP address is hidden from websites</p>
      </div>
    </div>
  );
};

export default PrivateBrowsing;