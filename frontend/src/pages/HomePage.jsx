import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import { ArrowRightIcon, CheckIcon, Code2Icon, SparkleIcon, UsersIcon, VideoIcon, ZapIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link } from 'react-router'
const HomePage = () => {
    return (
      <div className='bg-gradient-to-br from-base-100 via-base-200 to-base-300'>
        <nav className='bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg'>
          <div className='max-w-7xl mx-auto p-4 flex items-center justify-between'>
            <Link to={'/'} className='flex items-center gap-3 hover:scale-105 transition-transform duration-200'>
              <div className='size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg'>
              <SparkleIcon className='size-6 text-white'></SparkleIcon>
              </div>
              <div className='flex flex-col'>
                <span className='font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider'>mern talent</span>
                <span className='text-xs text-base-content/60 font-medium -mt-1'>study together</span>
              </div>
            </Link>
            <SignInButton mode='modal'>
              <button className='group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2'>
                <span>get started</span>
                <ArrowRightIcon className='size-4 group-hover:translate-x-0.5 transition-transform'></ArrowRightIcon>
              </button>
            </SignInButton>
          </div>
        </nav>
        <div className='max-w-7xl mx-auto px-4 py-20'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8'>
              <div className='badge badge-primary badge-lg'>
                <ZapIcon className='size-4'></ZapIcon>
                real-time collaboration
              </div>
              <h1 className='text-5xl lg:text-7xl font-black leading-tight'>
                <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>study together,</span>
                <br></br>
                <span className='text-base-content'>learn together</span>
              </h1>
              <p className='text-xl text-base-content/70 leading-relaxed max-w-xl'>
                the ultimate platform for collaborative coding interviews and pair programming connect face-to-face code in real time and ace your technical interviews
              </p>
              <div className='flex flex-wrap gap-3'>
                <div className='badge badge-lg badge-outline'>
                  <CheckIcon className='size-4 text-success'></CheckIcon>live video chat
                </div>
                <div className='badge badge-lg badge-outline'>
                  <CheckIcon className='size-4 text-success'></CheckIcon>programming studio editor
                </div>
                <div className='badge badge-lg badge-outline'>
                  <CheckIcon className='size-4 text-success'></CheckIcon>multi language
                </div>
              </div>
              <div className='flex flex-wrap gap-4'>
                <SignInButton mode='modal'>
                  <button className='btn btn-primary btn-lg'>
                    start programming now
                    <ArrowRightIcon className='size-5'></ArrowRightIcon>
                  </button>
                </SignInButton>
                <button className='btn btn-outline btn-lg'>
                  <VideoIcon className='size-5'></VideoIcon>watch demo
                </button>
              </div>
              <div className='stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg'>
                <div className='stat'>
                  <div className='stat-value text-primary'>10k+</div>
                  <div className='stat-title'>active users</div>
                </div>
                <div className='stat'>
                  <div className='stat-value text-secondary'>50k+</div>
                  <div className='stat-title'>sessions</div>
                </div>
                <div className='stat'>
                  <div className='stat-value text-accent'>99.9%</div>
                  <div className='stat-title'>uptime</div>
                </div>
              </div>
            </div>
            <img src='/hero.png' alt='collab platform' className='w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 transition-transform duration-500'></img>
          </div>
        </div>
        <div className='max-w-7xl mx-auto px-4 py-20'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold mb-4'>
              everything you need to <span className='text-primary font-mono'>succeed</span>
            </h2>
            <p className='text-lg text-base-content/70 max-w-2xl mx-auto'>
              powerful fetures designed to make study iinterviews seamless and productive
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='card bg-base-100 shadow-xl'>
              <div className='card-body items-center text-center'>
                <div className='size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4'>
                  <VideoIcon className='size-8 text-primary'></VideoIcon>
                </div>
                <h3 className='card-title'>hd video call</h3>
                <p className='text-base-content/70'>
                  crystal clear video and audio for seamless communication during interviews
                </p>
              </div>
            </div>
            <div className='card bg-base-100 shadow-xl'>
              <div className='card-body items-center text-center'>
                <div className='size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4'>
                  <Code2Icon className='size-8 text-primary'></Code2Icon>
                </div>
                <h3 className='card-title'>live studio editor</h3>
                <p className='text-base-content/70'>
collaborate in real-time with syntax highlighting and multiple language support
                </p>
              </div>
            </div>
            <div className='card bg-base-100 shadow-xl'>
              <div className='card-body items-center text-center'>
                <div className='size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4'>
                  <UsersIcon className='size-8 text-primary'></UsersIcon>
                </div>
                <h3 className='card-title'>easy collaboration</h3>
                <p className='text-base-content/70'>
share your screen discuss solutions and learn from each other in real time
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default HomePage