import '../styles/globals.css'
import Head from 'next/head'
import { AuthProvider } from '../contexts/AuthContext' // Import AuthProvider

// This is the main App component.
// Global layout components or context providers are added here.

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider> {/* Wrap the entire application with AuthProvider */}
      <Head>
        <title>ServU - Your Service Connection</title>
        <meta name="description" content="Connect with local service providers easily." />
        <meta name="viewport" content="width=device-width, initial-scale=1" /> {/* Added viewport for responsiveness */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
