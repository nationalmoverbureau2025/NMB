import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

export function LiveChat() {
  const { user } = useAuth();

  useEffect(() => {
    // Initialize Crisp
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "YOUR_CRISP_WEBSITE_ID"; // Replace with your Crisp website ID

    // Load Crisp script
    (function() {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();

    // Configure Crisp
    if (user?.email) {
      window.$crisp.push(["set", "user:email", user.email]);
    }

    // Show chat widget
    window.$crisp.push(["do", "chat:show"]);

    // Handle chat events
    window.$crisp.push(["on", "chat:opened", function() {
      console.log("Chat opened");
    }]);

    window.$crisp.push(["on", "message:sent", function() {
      console.log("Message sent");
    }]);

    // Cleanup
    return () => {
      const script = document.querySelector('script[src="https://client.crisp.chat/l.js"]');
      if (script) {
        script.remove();
      }
      delete window.$crisp;
      delete window.CRISP_WEBSITE_ID;
    };
  }, [user]);

  return null;
}