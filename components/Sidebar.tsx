// app/components/Sidebar.tsx
import { Globe, ShoppingCart, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  return (
    <aside className="w-20 bg-secondary h-screen flex-col items-center mt-2 ml-2 py-8 space-y-6 sticky top-0 hidden md:flex">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-white/30 text-primary-foreground hover:bg-white/50"
      >
        <ShoppingCart size={24} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-white/30 text-primary-foreground hover:bg-white/50"
      >
        <Languages size={24} />
      </Button>
    </aside>
  );
};

export default Sidebar;