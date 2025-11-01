import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Sorting from "./pages/Sorting";
import Searching from "./pages/Searching";
import DataStructures from "./pages/DataStructures";
import OOP from "./pages/OOP";
import BubbleSortPage from "./pages/visualizers/BubbleSortPage";
import BinarySearchPage from "./pages/visualizers/BinarySearchPage";
import BinaryTreePage from "./pages/visualizers/BinaryTreePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sorting" element={<Sorting />} />
              <Route path="/sorting/bubble" element={<BubbleSortPage />} />
              <Route path="/searching" element={<Searching />} />
              <Route path="/searching/binary" element={<BinarySearchPage />} />
              <Route path="/data-structures" element={<DataStructures />} />
              <Route path="/data-structures/binary-tree" element={<BinaryTreePage />} />
              <Route path="/oop" element={<OOP />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
