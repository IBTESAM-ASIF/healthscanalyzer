import { Button } from "@/components/ui/button";
import { Twitter, MessageCircle } from "lucide-react";

export const socialLinks = [
  { 
    icon: Twitter, 
    label: "Twitter",
    url: "https://twitter.com/healthscanalyzer"
  },
  { 
    icon: MessageCircle, 
    label: "Telegram",
    url: "https://t.me/healthscanalyzer"
  }
];

export const NavSocialLinks = () => {
  return (
    <div className="hidden md:flex items-center gap-2">
      {socialLinks.map((social) => (
        <Button
          key={social.label}
          variant="ghost"
          size="icon"
          className="hover:text-primary transition-all duration-200 w-9 h-9 relative group hover:scale-110 active:scale-95"
          onClick={() => window.open(social.url, "_blank")}
        >
          <social.icon className="h-5 w-5" />
          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-background/95 border border-border px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            {social.label}
          </span>
        </Button>
      ))}
    </div>
  );
};