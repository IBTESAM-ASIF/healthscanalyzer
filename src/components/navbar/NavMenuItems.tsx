import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export const sections = [
  { id: "hero", label: "Home" },
  { id: "statistics", label: "Statistics" },
  { id: "features", label: "Features" },
  { id: "health-analysis", label: "Health Analysis" },
  { id: "product-explorer", label: "Products" },
  { id: "roadmap", label: "Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "join-ecosystem", label: "Join Us" }
];

export const scrollToSection = (id: string, setMobileMenuOpen?: (open: boolean) => void) => {
  const element = document.getElementById(id);
  if (element) {
    const navbarHeight = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    
    if (setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  } else {
    console.error(`Section with id "${id}" not found`);
    const toast = useToast();
    toast({
      title: "Navigation Error",
      description: `Could not find section "${id}". Please try again later.`,
      variant: "destructive",
    });
    
    // Log available sections for debugging
    const availableSections = Array.from(document.querySelectorAll('section')).map(section => section.id);
    console.log('Available sections:', availableSections);
  }
};

export const NavMenuItems = () => {
  return (
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
  );
};