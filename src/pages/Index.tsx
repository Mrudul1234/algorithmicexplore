import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Search, Database, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    title: "Sorting Algorithms",
    description: "Visualize sorting techniques like Bubble, Quick, Merge, and Heap Sort",
    icon: TrendingUp,
    color: "text-primary",
    path: "/sorting",
    algorithms: ["Bubble Sort", "Quick Sort", "Merge Sort", "Heap Sort", "Selection Sort"],
  },
  {
    title: "Searching Algorithms",
    description: "Explore Linear Search, Binary Search, and more searching techniques",
    icon: Search,
    color: "text-accent",
    path: "/searching",
    algorithms: ["Linear Search", "Binary Search", "Jump Search"],
  },
  {
    title: "Data Structures",
    description: "Understand Arrays, Stacks, Queues, Trees, and Graphs through visualization",
    icon: Database,
    color: "text-warning",
    path: "/data-structures",
    algorithms: ["Array", "Stack", "Queue", "Binary Tree", "Graph"],
  },
  {
    title: "OOP Concepts",
    description: "Learn Object-Oriented Programming principles through interactive visuals",
    icon: Box,
    color: "text-comparing",
    path: "/oop",
    algorithms: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
  },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
            Interactive DSA Learning Platform
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Master Data Structures
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              & Algorithms Visually
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master Data Structures and Algorithms through interactive visualizations.
            Perfect for coding interviews, computer science students, and developers
            learning algorithm complexity and Big O notation step-by-step.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" className="gap-2" asChild>
              <a href="#categories">
                Start Exploring <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-3xl mx-auto">
            {[
              { value: "20+", label: "Algorithms" },
              { value: "4", label: "Categories" },
              { value: "100%", label: "Interactive" },
              { value: "Free", label: "Always" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Explore Algorithm Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dive deep into different types of algorithms and data structures with
            our comprehensive collection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <Card
              key={category.title}
              className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in border-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-secondary ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.algorithms.map((algo) => (
                        <span
                          key={algo}
                          className="text-xs px-2 py-1 bg-secondary rounded-md"
                        >
                          {algo}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={category.path}>
                        Explore <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>Built with ❤️ for learning Data Structures & Algorithms</p>
        </div>
      </footer>
    </div>
  );
}
