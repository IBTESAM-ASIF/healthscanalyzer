import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of the navbar plus some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const sections = [
    { id: "home", label: "Home" },
    { id: "statistics", label: "Statistics" },
    { id: "features", label: "Features" },
    { id: "health-analysis", label: "Health Analysis" },
    { id: "product-health", label: "Product Health" },
    { id: "product-explorer", label: "Product Explorer" },
    { id: "roadmap", label: "Roadmap" },
    { id: "faq", label: "FAQ" }
  ];

  const socialLinks = [
    { 
      icon: Instagram, 
      label: "Instagram",
      url: "https://instagram.com/healthscanalyzer"
    },
    { 
      icon: Linkedin, 
      label: "LinkedIn",
      url: "https://linkedin.com/company/healthscanalyzer"
    },
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

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "backdrop-blur-md bg-background/80 border-b border-border/40 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 
              className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              HealthScanalyzer
            </h1>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex gap-1">
              {sections.map((section) => (
                <NavigationMenuItem key={section.id}>
                  <NavigationMenuLink
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                      "hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2"
                    )}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Social Media Icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                className="hover:text-primary transition-colors w-9 h-9 relative group"
                onClick={() => window.open(social.url, "_blank")}
              >
                <social.icon className="h-5 w-5" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-background border border-border px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;