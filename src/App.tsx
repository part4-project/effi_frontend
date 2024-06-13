import { darkModeStore } from '@stores/darkmode';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { darkModeTheme, lightModeTheme } from '@utils/theme';
import { ThemeProvider } from 'styled-components';
import Router from './Router';

const queryClient = new QueryClient();

const App = () => {
  const { isDarkMode } = darkModeStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <ThemeProvider theme={isDarkMode ? darkModeTheme : lightModeTheme}>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
