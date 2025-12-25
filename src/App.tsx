import './App.css'
import { AppRouter } from './router/AppRouter'
import { ScrollToTop } from './components/Layout/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <AppRouter />
    </>
  )
}

export default App
