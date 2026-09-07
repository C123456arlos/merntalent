import { useUser } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import ProblemPage from './pages/ProblemPage'
import ProblemsPage from './pages/ProblemsPage'
import SessionPage from './pages/SessionPage'

function App() {
  const { isSignedIn, isLoaded } = useUser()
  if(!isLoaded) return null
  return (
    <>
    <Routes>
      <Route path='/' element={!isSignedIn ?<HomePage></HomePage>:<Navigate to={'/dashboard'}></Navigate>}></Route>
      <Route path='/dashboard' element={isSignedIn ?<DashboardPage></DashboardPage>:<Navigate to={'/'}></Navigate>}></Route>
      <Route path='/problems' element={isSignedIn ? <ProblemsPage></ProblemsPage> : <Navigate to={'/'}></Navigate>}></Route>
      <Route path='/problem/:id' element={isSignedIn ? <ProblemPage></ProblemPage> : <Navigate to={'/'}></Navigate>}></Route>
      <Route path='/session/:id' element={isSignedIn ? <SessionPage></SessionPage> : <Navigate to={'/'}></Navigate>}></Route>
      </Routes>
    <Toaster toastOptions={{duration:3000}}></Toaster>
    </>
  )
}

export default App
