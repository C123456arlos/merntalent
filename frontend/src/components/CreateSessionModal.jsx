import { Code2Icon, LoaderIcon, PlusIcon } from "lucide-react"
import { PROBLEMS } from "../data/problems"

const CreateSessionModal = ({
  isOpen, onClose, roomConfig, setRoomConfig,
  onCreateRoom,
  isCreating
}) => {
  const problems = Object.values(PROBLEMS)
  if(!isOpen) return null
  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-6">create new session</h3>
        <div className="space-y-8">
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">select problem</span>
              <span className="label-text-alt text-error">*</span>
            </label>
            <select className="select w-full" value={roomConfig.problem} onChange={(e) => {
              const selectedProblem = problems.find(p => p.title === e.target.value) 
              setRoomConfig({
                difficulty: selectedProblem.difficulty,
              problem:e.target.value})
            }}>
              <option value={''} disabled>choose a problem</option>
              {problems.map((problem) => (
                <option key={problem.id} value={problem.title}>
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>
          {roomConfig.problem && (
            <div className="alert alert-success">
              <Code2Icon className="size-5"></Code2Icon>
              <div>
                <p className="font-semibold">room summary</p>
                <p>problem <span className="font-medium">{roomConfig.problem}</span></p>
                <p>max participants <span className="font-medium">2 (1-on-1 session)</span></p>
              </div>
            </div>
     )}
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>cancel</button>
          <button className="btn btn-primary gap-2"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}>
            {isCreating ? (<LoaderIcon className="size-5 animate-spin"></LoaderIcon>) : (<PlusIcon className='size-5'></PlusIcon>)}
            {isCreating ? 'creating':'create'}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  )
}

export default CreateSessionModal