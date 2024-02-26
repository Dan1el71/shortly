import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import CreateUrl from './pages/CreateUrl'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: import.meta.env.VITE_GQL_API_URL,
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/new" element={<CreateUrl />} />
          </Route>
        </Routes>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Footer />
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
