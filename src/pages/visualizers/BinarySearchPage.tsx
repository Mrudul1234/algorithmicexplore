import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BinarySearch } from "@/components/visualizers/BinarySearch";

export default function BinarySearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/searching">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Searching
        </Link>
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Binary Search Visualizer</h1>
          <p className="text-muted-foreground">
            See how Binary Search efficiently finds elements in sorted arrays
          </p>
        </div>

        <BinarySearch />
      </div>
    </div>
  );
}
