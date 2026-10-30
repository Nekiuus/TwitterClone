import { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import XIcon from '@mui/icons-material/X'
import { handleGoogleLogin, handleSubmit } from './Config'

export const Login = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [error, setError] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setFormVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const canContinue = email.trim() !== '' && password.trim() !== ''

  return (
    <>
      <style>{`@keyframes login-shine{0%{transform:translate(-45%,-35%) rotate(0)}50%{transform:translate(35%,25%) rotate(180deg)}100%{transform:translate(-45%,-35%) rotate(360deg)}}.login-x-glow{position:absolute;width:62%;aspect-ratio:1;border-radius:50%;background:conic-gradient(transparent 0deg,rgba(255,255,255,.02) 90deg,rgba(255,255,255,.34) 150deg,transparent 220deg);filter:blur(28px);animation:login-shine 6s linear infinite}.login-x-icon{z-index:1!important;width:min(75vw,700px)!important;height:min(75vw,700px)!important;color:#090a0b;filter:drop-shadow(0 0 2px #596068) drop-shadow(0 0 10px rgba(255,255,255,.16))}@media(max-width:800px){.login-brand{display:none}}`}</style>
      <div className="min-h-screen flex items-center justify-center bg-black px-4 text-white">
        <div className={`relative flex w-full max-w-6xl items-center justify-between gap-16 py-10 transition-all duration-500 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'} max-[800px]:justify-center`}>
          <div className="w-full max-w-md">
            <h2 className="mb-14 text-6xl font-extrabold leading-none tracking-tight max-[800px]:text-5xl">What's happening now?</h2>
            <div className="w-full">
              {error && <p className="mb-4 text-center text-red-500">{error}</p>}

              <form onSubmit={(event) => handleSubmit(event, setError)} className="space-y-3">
                <div>
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input required type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="w-full rounded-md border border-gray-600 bg-transparent px-3 py-4 text-base text-white outline-none placeholder:text-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400" />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input required type={passwordVisible ? 'text' : 'password'} id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="w-full rounded-md border border-gray-600 bg-transparent px-3 py-4 pr-12 text-base text-white outline-none placeholder:text-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400" />
                  <button type="button" onClick={() => setPasswordVisible((visible) => !visible)} aria-label={passwordVisible ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-xl text-gray-400 hover:text-white">{passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
                </div>
                <button type="submit" disabled={!canContinue} className="w-full rounded-full bg-[#2f3336] py-3 font-bold text-[#71767b] transition enabled:bg-[#eff3f4] enabled:text-[#0f1419] enabled:hover:bg-[#d7dbdc] disabled:cursor-not-allowed">Continue</button>
              </form>

              <div className="my-7 flex items-center justify-between text-sm text-gray-500"><span className="w-5/12 border-b border-gray-700" /><span>or</span><span className="w-5/12 border-b border-gray-700" /></div>

              <button type="button" onClick={() => handleGoogleLogin(setError)} className="flex w-full items-center justify-center gap-3 rounded-full bg-white py-3 font-bold text-[#0f1419] transition hover:bg-gray-200"><FcGoogle className="h-6 w-6" />Continue with Google</button>

              <p className="mt-5 text-center text-xs leading-snug text-gray-500">By continuing, you agree to our <a href="#terms" className="text-cyan-400 hover:underline">Terms of Service</a>, <a href="#privacy" className="text-cyan-400 hover:underline">Privacy Policy</a> and <a href="#cookies" className="text-cyan-400 hover:underline">Cookie Use</a>.</p>
            </div>
          </div>

          <div className="login-brand relative grid min-h-[560px] flex-1 place-items-center max-[800px]:hidden" aria-hidden="true"><div className="login-x-glow" /><XIcon className="login-x-icon" /></div>
        </div>
      </div>
    </>
  )
}
