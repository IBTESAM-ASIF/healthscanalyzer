import { Button } from "@/components/ui/button";
import { Twitter, Telegram } from "lucide-react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse glow">
              HealthScanalyzer
            </h1>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-6">
              {["Home", "Features", "Health Categories", "Mission"].map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                      "hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2"
                    )}
                    onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                  >
                    {item}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primary transition-colors"
              onClick={() => window.open("https://twitter.com", "_blank")}
            >
              <Twitter className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primary transition-colors"
              onClick={() => window.open("https://telegram.org", "_blank")}
            >
              <Telegram className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;