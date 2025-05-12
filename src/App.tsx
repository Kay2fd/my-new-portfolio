import Router from "./Router/Router"
import { AuthProvider } from "./context/AuthProvider"
import { ThemeProvider } from "./context/ThemeProvider"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
