import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const sortingAlgorithms = [
  {
    name: "Bubble Sort",
    description: "Simple comparison-based algorithm that repeatedly steps through the list",
    complexity: "O(n²)",
    path: "/sorting/bubble",
  },
  {
    name: "Quick Sort",
    description: "Efficient divide-and-conquer algorithm using pivot element",
    complexity: "O(n log n)",
    path: "/sorting/quick",
  },
  {
    name: "Merge Sort",
    description: "Divide-and-conquer algorithm that divides array into halves",
    complexity: "O(n log n)",
    path: "/sorting/merge",
  },
  {
    name: "Heap Sort",
    description: "Comparison-based sorting using binary heap data structure",
    complexity: "O(n log n)",
    path: "/sorting/heap",
  },
  {
    name: "Selection Sort",
    description: "Simple in-place comparison sorting algorithm",
    complexity: "O(n²)",
    path: "/sorting/selection",
  },
  {
    name: "Insertion Sort",
    description: "Builds the final sorted array one item at a time",
    complexity: "O(n²)",
    path: "/sorting/insertion",
  },
];

export default function Sorting() {
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
          <h1 className="text-4xl font-bold mb-2">Sorting Algorithms</h1>
          <p className="text-muted-foreground">
            Explore various sorting techniques and understand their performance characteristics
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortingAlgorithms.map((algo, index) => (
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
