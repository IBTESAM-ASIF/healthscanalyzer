import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { NavSocialLinks } from "./navbar/NavSocialLinks";
import { NavMenuItems, scrollToSection } from "./navbar/NavMenuItems";
import { MobileMenu } from "./navbar/MobileMenu";

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

          <NavMenuItems />
          <NavSocialLinks />
          <MobileMenu 
            isOpen={isMobileMenuOpen}
            setIsOpen={setIsMobileMenuOpen}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;