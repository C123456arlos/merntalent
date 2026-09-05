// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router'
// import { PROBLEMS } from '../data/problems'
// import Navbar from '../components/Navbar'
// import {Panel, PanelGroup, PanelResizeHandle} from 'react-resizable-panels'
// import ProblemDescription from '../components/ProblemDescription'
// import StudioEditorPanel from '../components/StudioEditorPanel'
// import OutputPanel from '../components/OutputPanel'
// import { executeCode } from '../lib/piston'
// import toast from 'react-hot-toast'

// const ProblemPage = () => {
//     const { id } = useParams()
//     const navigate = useNavigate()
//     const [currentProblemId, setCurrentProblemId]=useState('two-sum')
//     const [selectedLanguage, setSelectedLanguage] = useState('javascript')
//     const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript)
//     const [output, setOutput] = useState(null)
//     const [isRunning, setIsRunning] = useState(false)
//     const currentProblem = PROBLEMS[currentProblemId]
//     useEffect(() => {
//         if (id && PROBLEMS[id]) {
//             setCurrentProblemId(id)
//             setCode(PROBLEMS[id].starterCode[selectedLanguage])
//             setOutput(null)
// }
//    },[id, selectedLanguage])
//     const handleLanguageChange = (e) => {
//         const newLang = e.target.value
//         setSelectedLanguage(newLang)
//         setCode(currentProblem.starterCode[newLang])
//         setOutput(null)
//      }
//     const handleProblemChange = (newProblemId) =>navigate(`/problem/${newProblemId}`)
//     const triggerConfetti = () => { }
//     const normalizeOutput = (output) => {
//         return output.trim().split('\n').map((line) => line.trim().replace(/\[\s+/g, '[').replace(/\s+\]/g, ']')
//         .replace(/\s*,\s*/g, ',')).filter((line)=>line.length>0).join('\n')
//     }
//     const checkIfTestsPassed = (actualOutput, expectedOutput) => {
//         const normalizedActual= normalizeOutput(actualOutput)
//         const normalizedExpected= normalizeOutput(expectedOutput)
//         return normalizedActual === normalizedExpected
//     }
//     const handleRunCode = async() => {
//         setIsRunning(true)
//         setOutput(null)
//         const result = await executeCode(selectedLanguage, code)
//         setOutput(output)
//         // setOutput(search)
//         setIsRunning(false)
//         if (result.success) {
//             const expectedOutput = currentProblem.expectedOutput[selectedLanguage]
//             const testsPassed = checkIfTestsPassed(result.output, expectedOutput)
//             if (testsPassed) {
//                 toast.success('all tests passed great job')
//             } else {
//                 toast.error('tests failed check your output')
//             }
//         }         else {
//      toast.error('code execution failed')
//  }
//     }
//   return (
//       <div className='h-screen bg-base-100 flex flex-col'>
//           <Navbar></Navbar>
//           <div className='flex-1'>
//               <PanelGroup direction='horizontal'>
//                   <Panel defaultSize={40} minSize={30}>
//                       <ProblemDescription problem={currentProblem} currentProblemId={currentProblemId}
//                       onProblemChange={handleProblemChange} allProblems={Object.values(PROBLEMS)}></ProblemDescription>
//                   </Panel>
// <PanelResizeHandle className='w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize'></PanelResizeHandle>
//                   <Panel defaultSize={60} minSize={30}>
//                       <PanelGroup direction='vertical'>
//                           <Panel defaultSize={70} minSize={30}>
//                               <StudioEditorPanel selectedLanguage={selectedLanguage} code={code}
//                                   isRunning={isRunning} onLanguageChange={handleLanguageChange}
//                               onCodeChange={setCode} onRunCode={handleRunCode}></StudioEditorPanel>
//                           </Panel>
// <PanelResizeHandle className='h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize'></PanelResizeHandle>
                          
//                           <Panel defaultSize={30} minSize={30}>
//                               <OutputPanel></OutputPanel>
//                           </Panel>
//                       </PanelGroup>
//                   </Panel>
//               </PanelGroup>
//           </div>
//     </div>
//   )
// }

// export default ProblemPage











import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { PROBLEMS } from '../data/problems'
import Navbar from '../components/Navbar'
import {Panel, PanelGroup, PanelResizeHandle} from 'react-resizable-panels'
import ProblemDescription from '../components/ProblemDescription'
import StudioEditorPanel from '../components/StudioEditorPanel'
import OutputPanel from '../components/OutputPanel'
import { executeCode } from '../lib/piston'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'
const ProblemPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [currentProblemId, setCurrentProblemId]=useState('two-sum')
    const [selectedLanguage, setSelectedLanguage] = useState('javascript')
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript)
    const [output, setOutput] = useState(null)
    const [isRunning, setIsRunning] = useState(false)
    const currentProblem = PROBLEMS[currentProblemId]
    useEffect(() => {
        if (id && PROBLEMS[id]) {
            setCurrentProblemId(id)
            setCode(PROBLEMS[id].starterCode[selectedLanguage])
            setOutput(null)
}
   },[id, selectedLanguage])
    const handleLanguageChange = (e) => {
        const newLang = e.target.value
        setSelectedLanguage(newLang)
        setCode(currentProblem.starterCode[newLang])
        setOutput(null)
     }
    const handleProblemChange = (newProblemId) =>navigate(`/problem/${newProblemId}`)
    const triggerConfetti = () => {
        confetti({
            particleCount: 80,
            spread: 250,
            origin:{x:0.2, y:0.6}
        })
        confetti({
            particleCount: 80,
            spread: 250,
            origin:{x:0.8, y:0.6}
        })
     }
    const normalizeOutput = (output) => {
        return output.trim().split('\n').map((line) => line.trim().replace(/\[\s+/g, '[').replace(/\s+\]/g, ']')
        .replace(/\s*,\s*/g, ',')).filter((line)=>line.length>0).join('\n')
    }
    const checkIfTestsPassed = (actualOutput, expectedOutput) => {
        const normalizedActual= normalizeOutput(actualOutput)
        const normalizedExpected= normalizeOutput(expectedOutput)
        return normalizedActual === normalizedExpected
    }
    const handleRunCode = async() => {
        setIsRunning(true)
        setOutput(null)
        const result = await executeCode(selectedLanguage, code)
        setOutput(result)
        // setOutput(search)
        setIsRunning(false)
        if (result.success) {
            const expectedOutput = currentProblem.expectedOutput[selectedLanguage]
            const testsPassed = checkIfTestsPassed(result.output, expectedOutput)
            if (testsPassed) {
                triggerConfetti()
                toast.success('all tests passed great job')
                
            } else {
                toast.error('tests failed check your output')
            }
        }
        else {
            toast.error('code execution failed')
        }
    }
  return (
      <div className='h-screen bg-base-100 flex flex-col'>
          <Navbar></Navbar>
          <div className='flex-1'>
              <PanelGroup direction='horizontal'>
                  <Panel defaultSize={40} minSize={30}>
                      <ProblemDescription problem={currentProblem} currentProblemId={currentProblemId}
                      onProblemChange={handleProblemChange} allProblems={Object.values(PROBLEMS)}></ProblemDescription>
                  </Panel>
<PanelResizeHandle className='w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize'></PanelResizeHandle>
                  <Panel defaultSize={60} minSize={30}>
                      <PanelGroup direction='vertical'>
                          <Panel defaultSize={70} minSize={30}>
                              <StudioEditorPanel selectedLanguage={selectedLanguage} code={code}
                                  isRunning={isRunning} onLanguageChange={handleLanguageChange}
                              onCodeChange={setCode} onRunCode={handleRunCode}></StudioEditorPanel>
                          </Panel>
<PanelResizeHandle className='h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize'></PanelResizeHandle>
                          
                          <Panel defaultSize={30} minSize={30}>
                              <OutputPanel output={output}></OutputPanel>
                          </Panel>
                      </PanelGroup>
                  </Panel>
              </PanelGroup>
          </div>
    </div>
  )
}

export default ProblemPage



//   const numMap = new Map()
//   for (let i=0; i<nums.length; i++){
//     const currentNum= nums[i]
//     const complement= target-currentNum
//     if(numMap.has(complement)){
//       return [numMap.get(complement), i]
//     }
//     numMap.set(currentNum, i)
//   }
//   return []