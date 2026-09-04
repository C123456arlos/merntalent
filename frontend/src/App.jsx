import './App.css'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'

function App() {
  return (
    <>
      <h1>
app
      </h1>
      <SignedOut>
        <SignInButton mode={'modal'}>
          <button>login</button>
      </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton></SignOutButton>
      </SignedIn>
        <UserButton></UserButton>
    </>
  )
}

export default App
