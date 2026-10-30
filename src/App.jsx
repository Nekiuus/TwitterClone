import { useEffect, useState } from 'react'
import GlobalStyles from './assets/styles/GlobalStyles'
import { Sidebar } from './components/Sidebar'
import { Home } from './components/Home'
import { Widgets } from './components/Widgets'
import { auth } from './Config'
import { onAuthStateChanged } from 'firebase/auth'
import { Login } from './Login'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  if (isLoading) {
    return <div className="min-h-screen bg-black" aria-busy="true" />
  }

  if (!user) {
    return <Login />
  }

  return (
    <>
      <div className="App">
        {/*Sidebar */}
        <Sidebar user={user} />

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
