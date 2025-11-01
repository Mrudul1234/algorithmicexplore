import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const oopConcepts = [
  {
    name: "Inheritance",
    description: "Classes can inherit properties and methods from parent classes",
    example: "Child class extends Parent",
    path: "/oop/inheritance",
  },
  {
    name: "Polymorphism",
    description: "Objects can take multiple forms through method overriding",
    example: "Same method, different behaviors",
    path: "/oop/polymorphism",
  },
  {
    name: "Encapsulation",
    description: "Bundling data and methods within a class, hiding internal details",
    example: "Private/Public access modifiers",
    path: "/oop/encapsulation",
  },
  {
    name: "Abstraction",
    description: "Hiding complex implementation details, showing only essential features",
    example: "Abstract classes and interfaces",
    path: "/oop/abstraction",
  },
];

export default function OOP() {
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
          <h1 className="text-4xl font-bold mb-2">OOP Concepts</h1>
          <p className="text-muted-foreground">
            Master Object-Oriented Programming principles through visual examples
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {oopConcepts.map((concept, index) => (
            <Card
              key={concept.name}
              className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                <CardTitle>{concept.name}</CardTitle>
                <CardDescription>{concept.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Example:</span>
                  <span className="text-sm font-semibold">{concept.example}</span>
                </div>
                <Button className="w-full" asChild>
                  <Link to={concept.path}>Visualize</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
