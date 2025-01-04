import { HeartPulse } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface HealthScoreProps {
  score?: number;
}

export const HealthScore = ({ score }: HealthScoreProps) => {
  if (score === undefined) return null;
  
  return (
    <div className="space-y-2 bg-gray-900/40 p-4 rounded-lg border border-gray-800">
      <div className="flex items-center gap-2 mb-2">
        <HeartPulse className="w-5 h-5 text-pink-500" />
        <span className="text-sm font-medium text-gray-300">Health Score</span>
      </div>
      <div className="space-y-2">
        <Progress value={score} className="h-2" />
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Score</span>
          <span className={`font-medium ${
            score > 70 ? 'text-emerald-400' :
            score > 40 ? 'text-amber-400' :
            'text-red-400'
          }`}>
            {score}%
          </span>
        </div>
      </div>
    </div>
  );
};