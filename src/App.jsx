import { useState } from 'react'
import React from 'react'
import GlobalStyles from './assets/styles/GlobalStyles'
import { Sidebar } from './components/Sidebar'
import { Home } from './components/Home'
import { Widgets } from './components/Widgets'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        {/*Sidebar */}
        <Sidebar />

        {/*Home */}
        <Home />

        {/*Widgets */}
        <Widgets />


        <GlobalStyles />
      </div>
    </>
  )
}

export default App
