import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BubbleSort } from "@/components/visualizers/BubbleSort";

export default function BubbleSortPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/sorting">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sorting
        </Link>
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Bubble Sort Visualizer</h1>
          <p className="text-muted-foreground">
            Watch how Bubble Sort compares and swaps adjacent elements
          </p>
        </div>

        <BubbleSort />
      </div>
    </div>
  );
}
