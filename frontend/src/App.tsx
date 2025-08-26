import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ListingPage from './pages/ListingPage'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './services/AuthContext'
import AboutPage from './pages/AboutPage'
import AccountPage from './pages/AccountPage'
import { ListingContextProvider } from './contexts/ListingContext'

function App() {
  return (
    <div className='w-screen overflow-x-hidden min-h-screen bg-zinc-900'>
    <AuthProvider>
      <ListingContextProvider>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/listing/:id' element={<ListingPage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
            <Route path='/about' element={<AboutPage/>}></Route>
            <Route path='/account' element={<AccountPage/>}></Route>
          </Routes>
        </Router>
      </ListingContextProvider>
      
    </AuthProvider>  
    
    </div>
  )
}

export default App
