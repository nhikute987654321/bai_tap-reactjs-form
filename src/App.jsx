import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Students from './components/students-component/index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Students/>
    </>
  )
}

export default App
