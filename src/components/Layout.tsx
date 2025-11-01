import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Home, Grid3x3 } from "lucide-react";
import { Button } from "./ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Grid3x3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">DSA Visualizer</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link to="/">
              <Button
                variant={location.pathname === "/" ? "default" : "ghost"}
                size="sm"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
