import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { sections, scrollToSection } from "./NavMenuItems";
import { socialLinks } from "./NavSocialLinks";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
              onClick={() => scrollToSection(section.id, setIsOpen)}
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
  );
};