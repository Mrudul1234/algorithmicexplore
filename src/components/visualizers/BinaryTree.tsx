import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw, Plus } from "lucide-react";
import { toast } from "sonner";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x?: number;
  y?: number;
}

export function BinaryTree() {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState("");

  const insertNode = (node: TreeNode | null, value: number): TreeNode => {
    if (!node) {
      return { value, left: null, right: null };
    }

    if (value < node.value) {
      node.left = insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = insertNode(node.right, value);
    }

    return node;
  };

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }

    const newRoot = insertNode(root, value);
    setRoot({ ...newRoot });
    setInputValue("");
    toast.success(`Inserted ${value}`);
  };

  const calculatePositions = (
    node: TreeNode | null,
    x: number,
    y: number,
    offset: number
  ): void => {
    if (!node) return;

    node.x = x;
    node.y = y;

    if (node.left) {
      calculatePositions(node.left, x - offset, y + 80, offset / 2);
    }
    if (node.right) {
      calculatePositions(node.right, x + offset, y + 80, offset / 2);
    }
  };

  if (root) {
    calculatePositions(root, 400, 50, 150);
  }

  const renderNode = (node: TreeNode | null): JSX.Element[] => {
    if (!node || node.x === undefined || node.y === undefined) return [];

    const elements: JSX.Element[] = [];

    // Draw lines to children
    if (node.left && node.left.x !== undefined && node.left.y !== undefined) {
      elements.push(
        <line
          key={`line-left-${node.value}-${node.left.value}`}
          x1={node.x}
          y1={node.y}
          x2={node.left.x}
          y2={node.left.y}
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
      );
    }

    if (node.right && node.right.x !== undefined && node.right.y !== undefined) {
      elements.push(
        <line
          key={`line-right-${node.value}-${node.right.value}`}
          x1={node.x}
          y1={node.y}
          x2={node.right.x}
          y2={node.right.y}
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
      );
    }

    // Draw node
    elements.push(
      <g key={`node-${node.value}`}>
        <circle
          cx={node.x}
          cy={node.y}
          r="25"
          fill="hsl(var(--primary))"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="2"
        />
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="hsl(var(--primary-foreground))"
          fontSize="16"
          fontWeight="bold"
        >
          {node.value}
        </text>
      </g>
    );

    // Recursively render children
    elements.push(...renderNode(node.left));
    elements.push(...renderNode(node.right));

    return elements;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-2 block">Insert Value</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter a number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInsert()}
            />
            <Button onClick={handleInsert}>
              <Plus className="h-4 w-4 mr-2" />
              Insert
            </Button>
          </div>
        </div>

        <Button onClick={() => setRoot(null)} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </div>

      {/* Visualization */}
      <div className="border border-border rounded-lg p-6 bg-card min-h-[500px]">
        {root ? (
          <svg width="100%" height="500" className="overflow-visible">
            {renderNode(root)}
          </svg>
        ) : (
          <div className="flex items-center justify-center h-[450px] text-muted-foreground">
            Insert values to build the tree
          </div>
        )}
      </div>

      {/* Algorithm Info */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <h3 className="font-semibold">About Binary Search Tree</h3>
        <p className="text-sm text-muted-foreground">
          A Binary Search Tree is a node-based data structure where each node has at most two
          children. For each node, all values in the left subtree are less than the node's value,
          and all values in the right subtree are greater.
        </p>
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div>
            <p className="text-xs text-muted-foreground">Search</p>
            <p className="font-mono font-semibold">O(log n)</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Insert</p>
            <p className="font-mono font-semibold">O(log n)</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Delete</p>
            <p className="font-mono font-semibold">O(log n)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
