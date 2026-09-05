import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ProblemsPage from './pages/ProblemsPage'
import { useUser } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'
import DashboardPage from './pages/DashboardPage'

function App() {
  const { isSignedIn, isLoaded } = useUser()
  if(!isLoaded) return null
  return (
    <>
    <Routes>
      <Route path='/' element={!isSignedIn ?<HomePage></HomePage>:<Navigate to={'/dashboard'}></Navigate>}></Route>
      <Route path='/dashboard' element={isSignedIn ?<DashboardPage></DashboardPage>:<Navigate to={'/'}></Navigate>}></Route>
      <Route path='/problems' element={isSignedIn ? <ProblemsPage></ProblemsPage> : <Navigate to={'/'}></Navigate>}></Route>
    </Routes>
    <Toaster toastOptions={{duration:3000}}></Toaster>
    </>
  )
}

export default App
