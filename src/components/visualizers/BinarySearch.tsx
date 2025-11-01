import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Play, RotateCcw, Shuffle } from "lucide-react";
import { toast } from "sonner";

interface ElementState {
  value: number;
  state: "default" | "searching" | "found" | "eliminated";
}

export function BinarySearch() {
  const [array, setArray] = useState<ElementState[]>([]);
  const [target, setTarget] = useState("");
  const [speed, setSpeed] = useState([50]);
  const [isSearching, setIsSearching] = useState(false);
  const [low, setLow] = useState(-1);
  const [high, setHigh] = useState(-1);
  const [mid, setMid] = useState(-1);

  const generateRandomArray = () => {
    const arr = Array.from({ length: 12 }, (_, i) => ({
      value: (i + 1) * 5 + Math.floor(Math.random() * 3),
      state: "default" as const,
    }));
    arr.sort((a, b) => a.value - b.value);
    setArray(arr);
    setLow(-1);
    setHigh(-1);
    setMid(-1);
  };

  useEffect(() => {
    generateRandomArray();
  }, []);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const binarySearch = async () => {
    const targetValue = parseInt(target);
    if (isNaN(targetValue)) {
      toast.error("Please enter a valid number to search");
      return;
    }

    setIsSearching(true);
    const arr: ElementState[] = array.map((item) => ({ ...item, state: "default" }));
    let left = 0;
    let right = arr.length - 1;
    let found = false;

    while (left <= right) {
      const middle = Math.floor((left + right) / 2);
      
      setLow(left);
      setHigh(right);
      setMid(middle);

      // Highlight searching area
      arr.forEach((item, idx) => {
        if (idx === middle) {
          item.state = "searching";
        } else if (idx >= left && idx <= right) {
          item.state = "default";
        } else {
          item.state = "eliminated";
        }
      });
      setArray([...arr]);
      await sleep(1500 - speed[0] * 10);

      if (arr[middle].value === targetValue) {
        arr[middle].state = "found";
        setArray([...arr]);
        found = true;
        toast.success(`Found ${targetValue} at index ${middle}!`);
        break;
      } else if (arr[middle].value < targetValue) {
        left = middle + 1;
        arr[middle].state = "eliminated";
      } else {
        right = middle - 1;
        arr[middle].state = "eliminated";
      }
      
      setArray([...arr]);
      await sleep(500 - speed[0] * 3);
    }

    if (!found) {
      toast.error(`${targetValue} not found in array`);
    }

    setIsSearching(false);
    setLow(-1);
    setHigh(-1);
    setMid(-1);
  };

  const reset = () => {
    setArray(array.map((item) => ({ ...item, state: "default" })));
    setLow(-1);
    setHigh(-1);
    setMid(-1);
    setIsSearching(false);
  };

  const getBarColor = (state: string) => {
    switch (state) {
      case "searching":
        return "bg-warning";
      case "found":
        return "bg-success";
      case "eliminated":
        return "bg-muted";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-2 block">Search Value</label>
          <Input
            type="number"
            placeholder="Enter number to search"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isSearching && binarySearch()}
          />
        </div>

        <Button onClick={generateRandomArray} variant="outline" disabled={isSearching}>
          <Shuffle className="h-4 w-4 mr-2" />
          Random
        </Button>

        <Button onClick={binarySearch} disabled={isSearching}>
          <Play className="h-4 w-4 mr-2" />
          Search
        </Button>

        <Button onClick={reset} variant="outline" disabled={isSearching}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Speed Control */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Speed</label>
          <span className="text-sm text-muted-foreground">{speed[0]}%</span>
        </div>
        <Slider
          value={speed}
          onValueChange={setSpeed}
          min={1}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      {/* Visualization */}
      <div className="border border-border rounded-lg p-6 bg-card min-h-[300px]">
        <div className="flex items-center justify-center gap-2">
          {array.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-300 ${getBarColor(
                  item.state
                )} ${
                  index === mid
                    ? "scale-125 ring-4 ring-warning"
                    : index >= low && index <= high
                    ? "scale-110"
                    : ""
                }`}
              >
                {item.value}
              </div>
              <span className="text-xs text-muted-foreground">{index}</span>
            </div>
          ))}
        </div>

        {/* Search Indicators */}
        {(low !== -1 || high !== -1 || mid !== -1) && (
          <div className="mt-8 flex gap-6 justify-center">
            {low !== -1 && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Low</p>
                <p className="font-mono font-bold">{low}</p>
              </div>
            )}
            {mid !== -1 && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Mid</p>
                <p className="font-mono font-bold">{mid}</p>
              </div>
            )}
            {high !== -1 && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground">High</p>
                <p className="font-mono font-bold">{high}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Algorithm Info */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <h3 className="font-semibold">About Binary Search</h3>
        <p className="text-sm text-muted-foreground">
          Binary Search is an efficient algorithm for finding a target value within a sorted
          array. It repeatedly divides the search interval in half, comparing the middle
          element with the target value.
        </p>
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div>
            <p className="text-xs text-muted-foreground">Best Case</p>
            <p className="font-mono font-semibold">O(1)</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Average Case</p>
            <p className="font-mono font-semibold">O(log n)</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Worst Case</p>
            <p className="font-mono font-semibold">O(log n)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
