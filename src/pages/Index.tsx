
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  mockFrameworks, 
  generateMockQuestions 
} from "@/lib/mockData";
import { Framework, Question } from "@/lib/types";
import FrameworkSelector from "@/components/FrameworkSelector";
import QuestionGenerator from "@/components/QuestionGenerator";
import QuestionCard from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Copy, X } from "lucide-react";

export default function Index() {
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState<Set<string>>(new Set());
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoadingFrameworks, setIsLoadingFrameworks] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showJsonPreview, setShowJsonPreview] = useState(false);

  // Load frameworks on mount
  useEffect(() => {
    // Simulate API call
    const loadFrameworks = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setFrameworks(mockFrameworks);
      } catch (error) {
        toast.error("Failed to load frameworks");
        console.error(error);
      } finally {
        setIsLoadingFrameworks(false);
      }
    };

    loadFrameworks();
  }, []);

  const handleSelectFramework = (framework: string) => {
    setSelectedFrameworks(prev => {
      const updated = new Set(prev);
      if (updated.has(framework)) {
        updated.delete(framework);
      } else {
        updated.add(framework);
      }
      return updated;
    });
  };

  const handleSelectAll = () => {
    const allFrameworkNames = frameworks.map(f => f.name);
    setSelectedFrameworks(new Set(allFrameworkNames));
  };

  const handleClearAll = () => {
    setSelectedFrameworks(new Set());
  };

  const handleGenerateQuestions = async (count: number) => {
    if (selectedFrameworks.size < 2) {
      toast.error("Please select at least two frameworks");
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be an API call
      const newQuestions = generateMockQuestions(
        count,
        Array.from(selectedFrameworks)
      );
      
      setQuestions(newQuestions);
      toast.success(`Generated ${count} questions successfully`);
    } catch (error) {
      toast.error("Failed to generate questions");
      console.error(error);
    } finally {
      setIsGenerating(false);
      setShowJsonPreview(false);
    }
  };

  const handleRegenerateQuestions = () => {
    handleGenerateQuestions(questions.length);
  };

  const handleCopyJson = () => {
    if (questions.length === 0) {
      toast.error("No questions to copy");
      return;
    }

    const json = JSON.stringify(questions, null, 2);
    navigator.clipboard.writeText(json);
    toast.success("JSON copied to clipboard");
    setShowJsonPreview(true);
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <header className="prism-gradient py-12 text-white text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">PRISM</h1>
        <p className="text-xl opacity-90">Advanced Question Generator</p>
      </header>

      <div className="container px-4 max-w-4xl">
        {/* Framework Selection */}
        <div className="mb-8">
          <FrameworkSelector
            frameworks={frameworks}
            selectedFrameworks={selectedFrameworks}
            isLoading={isLoadingFrameworks}
            onSelectFramework={handleSelectFramework}
            onSelectAll={handleSelectAll}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Question Generator */}
        <div className="mb-8">
          <QuestionGenerator
            selectedFrameworks={selectedFrameworks}
            onGenerate={handleGenerateQuestions}
            isGenerating={isGenerating}
          />
        </div>

        {/* Generated Questions */}
        {questions.length > 0 && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Generated Questions
              </h2>
              <Button
                onClick={handleCopyJson}
                variant="outline"
                className="flex items-center"
              >
                <Copy className="mr-2 h-4 w-4" /> Copy JSON
              </Button>
            </div>

            {showJsonPreview && (
              <div className="bg-gray-100 rounded-lg p-4 mb-6 animate-fade-in relative">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-700">
                    JSON Preview
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => setShowJsonPreview(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="json-preview bg-gray-900 text-green-400 p-3 rounded-md">
                  <pre>{JSON.stringify(questions, null, 2)}</pre>
                </div>
              </div>
            )}

            <div className="space-y-6 mb-8">
              {questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleRegenerateQuestions}
                variant="outline"
                className="px-8"
                disabled={isGenerating}
              >
                Regenerate Questions
              </Button>
            </div>
          </div>
        )}

        {/* No Questions Message */}
        {questions.length === 0 && !isGenerating && (
          <div className="bg-white rounded-lg shadow text-center py-12 px-4 animate-fade-in">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No questions generated yet
            </h3>
            <p className="text-gray-500">
              Select at least two frameworks and click "Generate Questions" to begin
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
