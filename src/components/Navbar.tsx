import { Button } from "@/components/ui/button";
import { Search, Github } from "lucide-react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const sections = [
    { name: "Home", id: "home" },
    { name: "Analysis", id: "health-analysis" },
    { name: "Products", id: "product-explorer" },
    { name: "Categories", id: "categories" },
    { name: "Statistics", id: "statistics" },
    { name: "FAQ", id: "faq" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
              HealthScanalyzer
            </h1>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-4">
              {sections.map((section) => (
                <NavigationMenuItem key={section.name}>
                  <NavigationMenuLink
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                      "hover:bg-accent hover:text-accent-foreground rounded-md px-2.5 py-1.5"
                    )}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primary transition-colors w-8 h-8"
              onClick={() => window.open("https://github.com/yourusername/healthscanalyzer", "_blank")}
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => scrollToSection("product-explorer")}
            >
              <Search className="h-4 w-4 mr-2" />
              Analyze Product
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;