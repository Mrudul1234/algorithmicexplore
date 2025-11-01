import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Play, Pause, RotateCcw, Shuffle } from "lucide-react";
import { toast } from "sonner";

interface BarState {
  value: number;
  state: "default" | "comparing" | "sorted";
}

export function BubbleSort() {
  const [array, setArray] = useState<BarState[]>([]);
  const [speed, setSpeed] = useState([50]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndices, setCurrentIndices] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [explanation, setExplanation] = useState("Click Start to begin sorting");
  const isPlayingRef = useRef(false);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 15 }, () => ({
      value: Math.floor(Math.random() * 100) + 10,
      state: "default" as const,
    }));
    setArray(newArray);
    setCurrentIndices([]);
    setIsPlaying(false);
  };

  useEffect(() => {
    generateRandomArray();
  }, []);

  const handleManualInput = () => {
    const values = inputValue
      .split(",")
      .map((v) => parseInt(v.trim()))
      .filter((v) => !isNaN(v) && v > 0);

    if (values.length === 0) {
      toast.error("Please enter valid numbers separated by commas");
      return;
    }

    setArray(values.map((v) => ({ value: v, state: "default" as const })));
    setCurrentIndices([]);
    setIsPlaying(false);
    setInputValue("");
    toast.success("Array updated!");
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    setIsPlaying(true);
    isPlayingRef.current = true;

    for (let i = 0; i < n - 1; i++) {
      if (!isPlayingRef.current) {
        setExplanation("Sorting paused");
        return;
      }

      for (let j = 0; j < n - i - 1; j++) {
        if (!isPlayingRef.current) {
          setExplanation("Sorting paused");
          return;
        }

        // Highlight comparing elements
        setCurrentIndices([j, j + 1]);
        arr[j].state = "comparing";
        arr[j + 1].state = "comparing";
        setExplanation(`Comparing ${arr[j].value} and ${arr[j + 1].value}`);
        setArray([...arr]);
        await sleep(1000 - speed[0] * 9);

        // Swap if needed
        if (arr[j].value > arr[j + 1].value) {
          setExplanation(`${arr[j].value} > ${arr[j + 1].value}, swapping positions`);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(1000 - speed[0] * 9);
        } else {
          setExplanation(`${arr[j].value} ≤ ${arr[j + 1].value}, no swap needed`);
        }

        // Reset states
        arr[j].state = "default";
        arr[j + 1].state = "default";
      }
      // Mark as sorted
      arr[n - i - 1].state = "sorted";
      setExplanation(`Element ${arr[n - i - 1].value} is now in its correct position`);
      setArray([...arr]);
    }

    // Mark first element as sorted
    arr[0].state = "sorted";
    setArray([...arr]);
    setCurrentIndices([]);
    setIsPlaying(false);
    isPlayingRef.current = false;
    setExplanation("Sorting complete! All elements are now in order");
    toast.success("Sorting complete!");
  };

  const reset = () => {
    setArray(array.map((item) => ({ ...item, state: "default" })));
    setCurrentIndices([]);
    setIsPlaying(false);
    isPlayingRef.current = false;
    setExplanation("Click Start to begin sorting");
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      setExplanation("Sorting paused");
    } else {
      bubbleSort();
    }
  };

  const getBarColor = (state: string) => {
    switch (state) {
      case "comparing":
        return "bg-comparing";
      case "sorted":
        return "bg-success";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-2 block">Manual Input</label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., 5, 12, 8, 3, 9"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleManualInput()}
            />
            <Button onClick={handleManualInput}>Set</Button>
          </div>
        </div>

        <Button onClick={generateRandomArray} variant="outline">
          <Shuffle className="h-4 w-4 mr-2" />
          Random
        </Button>

        <Button onClick={handlePlayPause} disabled={array.length === 0}>
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start
            </>
          )}
        </Button>

        <Button onClick={reset} variant="outline">
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

      {/* Explanation */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <p className="text-center text-lg font-medium">{explanation}</p>
      </div>

      {/* Visualization */}
      <div className="border border-border rounded-lg p-6 bg-card min-h-[400px]">
        <div className="flex items-end justify-center gap-1 h-[350px]">
          {array.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 flex-1 max-w-[60px]"
            >
              <div
                className={`w-full transition-all duration-300 rounded-t ${getBarColor(
                  item.state
                )} ${currentIndices.includes(index) ? "scale-110" : ""}`}
                style={{ height: `${(item.value / 100) * 100}%` }}
              />
              <span className="text-xs font-mono">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <h3 className="font-semibold">About Bubble Sort</h3>
        <p className="text-sm text-muted-foreground">
          Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps
          them if they are in wrong order. The pass through the list is repeated until no
          swaps are needed.
        </p>
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div>
            <p className="text-xs text-muted-foreground">Best Case</p>
            <p className="font-mono font-semibold">O(n)</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Average Case</p>
            <p className="font-mono font-semibold">O(n²)</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Worst Case</p>
            <p className="font-mono font-semibold">O(n²)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
