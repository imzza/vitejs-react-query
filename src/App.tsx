import { createTheme, ThemeProvider } from '@mui/material/styles';
import MockAdapterProvider from './mockapi/MockAdapterProvider';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import router from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 1000,
    },
  },
});

export default function App() {
  const defaultTheme = createTheme();

  return (
    <MockAdapterProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MockAdapterProvider>
  );
}
