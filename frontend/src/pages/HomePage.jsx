import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
const HomePage = () => {
    return (
        <div>
            <button className='btn btn-secondary' onClick={()=>toast.success('success toast')}>click</button>
      <SignedOut>
        <SignInButton mode={'modal'}>
          <button>login</button>
      </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton></SignOutButton>
      </SignedIn>
        <UserButton></UserButton>
    </div>
  )
}

export default HomePage