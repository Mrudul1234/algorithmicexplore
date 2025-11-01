import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const dataStructures = [
  {
    name: "Array",
    description: "Linear collection of elements with fixed size and index-based access",
    operations: "Access, Insert, Delete",
    path: "/data-structures/array",
  },
  {
    name: "Stack",
    description: "LIFO (Last In First Out) data structure with push and pop operations",
    operations: "Push, Pop, Peek",
    path: "/data-structures/stack",
  },
  {
    name: "Queue",
    description: "FIFO (First In First Out) data structure with enqueue and dequeue",
    operations: "Enqueue, Dequeue",
    path: "/data-structures/queue",
  },
  {
    name: "Binary Tree",
    description: "Hierarchical structure with nodes having at most two children",
    operations: "Insert, Delete, Traverse",
    path: "/data-structures/binary-tree",
  },
  {
    name: "Graph",
    description: "Network of nodes (vertices) connected by edges",
    operations: "Add Vertex, Add Edge, BFS, DFS",
    path: "/data-structures/graph",
  },
  {
    name: "Linked List",
    description: "Linear collection of nodes where each points to the next",
    operations: "Insert, Delete, Traverse",
    path: "/data-structures/linked-list",
  },
];

export default function DataStructures() {
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
          <h1 className="text-4xl font-bold mb-2">Data Structures</h1>
          <p className="text-muted-foreground">
            Understand fundamental data structures through interactive visualizations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataStructures.map((ds, index) => (
            <Card
              key={ds.name}
              className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                <CardTitle>{ds.name}</CardTitle>
                <CardDescription>{ds.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Operations:</span>
                  <span className="text-sm font-semibold">{ds.operations}</span>
                </div>
                <Button className="w-full" asChild>
                  <Link to={ds.path}>Visualize</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
