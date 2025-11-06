import { QueryClient } from "@tanstack/react-query";

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry on auth errors (401)
        if (error?.code === 'AUTH_ERROR' || error?.response?.status === 401) {
          return false;
        }

        // Retry network errors up to 2 times
        if (error?.code === 'NETWORK_ERROR') {
          return failureCount < 2;
        }

        // Retry server errors (5xx) up to 1 time
        if (error?.code === 'SERVER_ERROR' || error?.response?.status >= 500) {
          return failureCount < 1;
        }

        // Don't retry other errors
        return false;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // Don't retry mutations on auth errors
        if (error?.code === 'AUTH_ERROR' || error?.response?.status === 401) {
          return false;
        }

        // Retry network errors once for mutations
        if (error?.code === 'NETWORK_ERROR') {
          return failureCount < 1;
        }

        return false;
      },
    },
  },
});
