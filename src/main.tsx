import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import store from './redux/store.ts'

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</Provider>
	</QueryClientProvider>
  </React.StrictMode>,
)
