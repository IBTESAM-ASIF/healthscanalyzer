import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Twitter, MessageCircle, Menu } from "lucide-react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        (payload) => {
          console.log('Database change:', payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjusted offset to account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    } else {
      console.error(`Section with id "${id}" not found. Available sections:`, 
        document.querySelectorAll('section').forEach(section => 
          console.log(section.id)
        )
      );
    }
  };

  const sections = [
    { id: "hero", label: "Home" },
    { id: "features", label: "Features & Benefits" },
    { id: "product-health-analysis", label: "Product Health Analysis" },
    { id: "product-explorer", label: "Explore Our Products" },
    { id: "roadmap", label: "Vision & Roadmap" },
    { id: "faq", label: "Frequently Asked Questions" },
    { id: "join-ecosystem", label: "Join Us" }
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
          <div className="flex-shrink-0">
            <h1 
              className="text-xl font-bold tracking-tighter cursor-pointer bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent hover:from-purple-500 hover:via-pink-600 hover:to-purple-700 transition-all duration-300"
              onClick={() => scrollToSection('hero')}
            >
              HealthScanalyzer
            </h1>
          </div>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex gap-1">
              {sections.map((section) => (
                <NavigationMenuItem key={section.id}>
                  <NavigationMenuLink
                    className={cn(
                      "text-sm font-medium transition-all duration-200 cursor-pointer",
                      "px-3 py-2 rounded-md hover:bg-accent/80 hover:text-accent-foreground",
                      "hover:scale-105 active:scale-95",
                      "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-background"
                    )}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

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

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    className="justify-start text-lg font-medium hover:bg-accent/80"
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.label}
                  </Button>
                ))}
                <div className="flex gap-2 mt-4">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.label}
                      variant="ghost"
                      size="icon"
                      className="hover:text-primary transition-colors"
                      onClick={() => window.open(social.url, "_blank")}
                    >
                      <social.icon className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;