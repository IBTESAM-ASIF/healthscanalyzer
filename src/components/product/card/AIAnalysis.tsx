import { BrainCircuit, DollarSign } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface AIAnalysisProps {
  analysisCost?: number;
}

export const AIAnalysis = ({ analysisCost }: AIAnalysisProps) => {
  return (
    <div className="space-y-2 bg-gray-900/40 p-4 rounded-lg border border-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-purple-500" />
          <span className="text-sm font-medium text-gray-300">AI Analysis</span>
        </div>
        {analysisCost && (
          <div className="flex items-center gap-1 text-emerald-400">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">{analysisCost.toFixed(6)}</span>
          </div>
        )}
      </div>
      <Progress value={98.5} className="h-2" />
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Accuracy</span>
        <span className="font-medium text-purple-400">98.5%</span>
      </div>
    </div>
  );
};