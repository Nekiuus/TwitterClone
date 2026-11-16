import { useEffect, useState, type FormEvent } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { handleGoogleLogin, handleSubmit, handleSignUp } from './Config'
import starlingLogo from './assets/starling-logo.png'
import { LoginActions, LoginBrand, LoginButton, LoginDivider, LoginError, LoginForm, LoginFormPanel, LoginGlow, LoginInput, LoginLayout, LoginLogo, LoginPage, LoginSocialButton, LoginTerms, LoginTitle, PasswordField, PasswordToggle, SignupButton, SignupCloseButton, SignupDialog, SignupForm, SignupLogo, SignupOverlay, SignupTitle, VisuallyHiddenLabel } from './components/Login/styled'

export const Login = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [error, setError] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSignup, setShowSignup] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFormVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const canContinue = email.trim() !== '' && password.trim() !== ''

  return (
    <>
      <LoginPage>
        <LoginLayout $visible={formVisible}>
          <LoginFormPanel>
            <LoginTitle>What's happening now?</LoginTitle>
            {error && <LoginError role="alert">{error}</LoginError>}
            <LoginForm onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event, setError)}>
              <VisuallyHiddenLabel htmlFor="email">Email address</VisuallyHiddenLabel>
              <LoginInput required type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" />
              <PasswordField>
                <VisuallyHiddenLabel htmlFor="password">Password</VisuallyHiddenLabel>
                <LoginInput required type={passwordVisible ? 'text' : 'password'} id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
                <PasswordToggle type="button" onClick={() => setPasswordVisible((visible) => !visible)} aria-label={passwordVisible ? 'Hide password' : 'Show password'}>
                  {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </PasswordToggle>
              </PasswordField>
              <LoginButton type="submit" disabled={!canContinue}>Continue</LoginButton>
            </LoginForm>
            <LoginDivider><span />or<span /></LoginDivider>
            <LoginActions>
              <LoginSocialButton type="button" onClick={() => handleGoogleLogin(setError)}><FcGoogle size={20} />Continue with Google</LoginSocialButton>
              <LoginSocialButton type="button" onClick={() => setShowSignup(true)}>Sign up</LoginSocialButton>
            </LoginActions>
            <LoginTerms>
              By continuing, you agree to our <a href="#terms">Terms of Service</a>, <a href="#privacy">Privacy Policy</a> and <a href="#cookies">Cookie Use</a>.
            </LoginTerms>
          </LoginFormPanel>
          <LoginBrand aria-hidden="true"><LoginGlow /><LoginLogo src={starlingLogo} alt="" /></LoginBrand>
        </LoginLayout>
      </LoginPage>
      {showSignup && (
        <SignupOverlay onClick={() => setShowSignup(false)}>
          <SignupDialog onClick={(event) => event.stopPropagation()}>
            <SignupCloseButton type="button" onClick={() => setShowSignup(false)} aria-label="Close signup">←</SignupCloseButton>
            <SignupLogo src={starlingLogo} alt="Starling" />
            <SignupTitle>Sign up</SignupTitle>
            <SignupForm onSubmit={(event: FormEvent<HTMLFormElement>) => handleSignUp(event, setError)}>
              <LoginInput type="email" name="email" required placeholder="Email address" />
              <LoginInput type="password" name="password" required placeholder="Password" />
              <SignupButton type="submit">Continue</SignupButton>
            </SignupForm>
          </SignupDialog>
        </SignupOverlay>
      )}
    </>
  )
}
