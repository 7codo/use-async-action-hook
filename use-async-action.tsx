import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

type AsyncFunction<T> = () => Promise<T>;

interface UseAsyncActionOptions {
  successMessage?: string;
  errorMessage?: string;
}

/**
 * A custom hook for handling asynchronous actions with try-catch logic and toast notifications.
 *
 * @template T The type of the value returned by the async function.
 * @param {UseAsyncActionOptions} options - Configuration options for the hook.
 * @returns {[AsyncAction<T>, Error | null]} A tuple containing the async action function and the current error state.
 */
export function useAsyncAction<T>({
  successMessage = "Operation completed successfully!",
  errorMessage = "An error occurred",
}: UseAsyncActionOptions = {}) {
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  /**
   * Executes an asynchronous function with error handling and toast notifications.
   *
   * @param {AsyncFunction<T>} action - The asynchronous function to execute.
   * @returns {Promise<T | undefined>} The result of the async function if successful, undefined otherwise.
   */
  const executeAction = async (
    action: AsyncFunction<T>
  ): Promise<T | undefined> => {
    try {
      const result = await action();
      setError(null);
      toast({
        description: successMessage,
        variant: "default",
      });
      return result;
    } catch (err) {
      console.error("Error in async action:", err);
      const errorInstance = err instanceof Error ? err : new Error(String(err));
      setError(errorInstance);
      toast({
        title: errorMessage,
        description: errorInstance.message,
        variant: "destructive",
      });
      return undefined;
    }
  };

  return [executeAction, error] as const;
}
