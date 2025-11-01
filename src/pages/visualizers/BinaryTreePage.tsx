import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BinaryTree } from "@/components/visualizers/BinaryTree";

export default function BinaryTreePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/data-structures">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Data Structures
        </Link>
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Binary Search Tree Visualizer</h1>
          <p className="text-muted-foreground">
            Build and visualize a Binary Search Tree structure
          </p>
        </div>

        <BinaryTree />
      </div>
    </div>
  );
}
