import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UIProvider } from '../../contexts/UIContext';
import { AuthProvider } from '../../contexts/AuthContext';
import { SpoonContextProvider } from '../../contexts/SpoonContext';
import { TodoProvider } from '../../contexts/TodoContext';

function customRender(ui, { providerProps = {}, ...renderOptions } = {}) {
  const { authProviderProps, uiProviderProps, todoProviderProps, spoonProviderProps } = providerProps;

  function Wrapper({ children }) {
    return (
      <AuthProvider {...authProviderProps}>
        <UIProvider {...uiProviderProps}>
          <SpoonContextProvider {...spoonProviderProps}>
            <TodoProvider {...todoProviderProps}>
              <BrowserRouter>{children}</BrowserRouter>
            </TodoProvider>
          </SpoonContextProvider>
        </UIProvider>
      </AuthProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything
export * from '@testing-library/react';
// Override render method
export { customRender as render };
