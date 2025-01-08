import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  error: Error;
  onRetry: () => void;
}

export const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => {
  const isAuthError = error.message.includes('Authentication') || error.message.includes('JWT');
  const isConnectionError = error.message.includes('timeout') || error.message.includes('Failed to fetch');
  
  return (
    <Alert variant="destructive" className="m-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>
        {isAuthError ? 'Authentication Error' : isConnectionError ? 'Connection Error' : 'Error'}
      </AlertTitle>
      <AlertDescription className="mt-2">
        {error.message || 'Failed to fetch analysis data. Please try again later.'}
        <div className="mt-4 flex items-center gap-2">
          <Button 
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry Connection
          </Button>
          {isAuthError && (
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              size="sm"
            >
              Refresh Page
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};