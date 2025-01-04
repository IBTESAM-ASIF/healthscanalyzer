import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface ProsConsProps {
  pros?: string[];
  cons?: string[];
}

export const ProsConsSection = ({ pros, cons }: ProsConsProps) => {
  if (!pros?.length && !cons?.length) return null;

  return (
    <div className="grid grid-cols-2 gap-4">
      {pros && pros.length > 0 && (
        <div className="space-y-2 bg-emerald-900/20 p-4 rounded-lg border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-2">
            <ThumbsUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Benefits</span>
          </div>
          <ul className="space-y-1">
            {pros.map((pro, index) => (
              <li key={index} className="text-xs text-emerald-300 flex items-start gap-1">
                <span className="mt-1">•</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
      )}

      {cons && cons.length > 0 && (
        <div className="space-y-2 bg-red-900/20 p-4 rounded-lg border border-red-500/20">
          <div className="flex items-center gap-2 mb-2">
            <ThumbsDown className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-red-400">Risks</span>
          </div>
          <ul className="space-y-1">
            {cons.map((con, index) => (
              <li key={index} className="text-xs text-red-300 flex items-start gap-1">
                <span className="mt-1">•</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};