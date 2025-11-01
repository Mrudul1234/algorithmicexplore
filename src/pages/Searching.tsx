import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const searchingAlgorithms = [
  {
    name: "Linear Search",
    description: "Sequential search checking each element until target is found",
    complexity: "O(n)",
    path: "/searching/linear",
  },
  {
    name: "Binary Search",
    description: "Efficient search on sorted arrays using divide and conquer",
    complexity: "O(log n)",
    path: "/searching/binary",
  },
  {
    name: "Jump Search",
    description: "Search sorted arrays by jumping ahead by fixed steps",
    complexity: "O(√n)",
    path: "/searching/jump",
  },
];

export default function Searching() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Searching Algorithms</h1>
          <p className="text-muted-foreground">
            Learn different searching techniques and their efficiency
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchingAlgorithms.map((algo, index) => (
            <Card
              key={algo.name}
              className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                <CardTitle>{algo.name}</CardTitle>
                <CardDescription>{algo.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Time Complexity:</span>
                  <span className="text-sm font-mono font-semibold">{algo.complexity}</span>
                </div>
                <Button className="w-full" asChild>
                  <Link to={algo.path}>Visualize</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
