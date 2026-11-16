import styled, { keyframes } from 'styled-components'

const logoShine = keyframes`
  0%, 100% { filter: drop-shadow(0 0 8px rgba(192, 132, 252, 0.45)); }
  50% { filter: drop-shadow(0 0 28px rgba(217, 180, 255, 0.95)); }
`

const glowOrbit = keyframes`
  to { transform: rotate(360deg); }
`

export const LoginPage = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  color: #fff;
  background: var(--app-background);
`

export const LoginLayout = styled.div<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(32px, 6vw, 96px);
  width: min(100%, 1152px);
  min-height: 100vh;
  margin: 0 auto;
  padding: 40px 48px;
  box-sizing: border-box;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(-12px)')};
  transition: opacity 500ms ease, transform 500ms ease;

  @media (max-width: 900px) {
    gap: 32px;
    padding: 32px;
  }

  @media (max-width: 800px) {
    justify-content: center;
    padding: 24px;
  }
`

export const LoginFormPanel = styled.section`
  width: 320px;
  flex: 0 0 320px;

  @media (max-width: 800px) {
    width: min(100%, 400px);
    flex: 0 1 400px;
  }
`

export const VisuallyHiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
`

export const LoginError = styled.p`
  margin-bottom: 12px;
  color: #f87171;
  text-align: center;
`

export const LoginTitle = styled.h1`
  margin: 0 0 40px;
  color: #fff;
  font-size: clamp(38px, 3.2vw, 48px);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.04em;
`

export const LoginForm = styled.form`
  display: grid;
  gap: 12px;
  width: 100%;
`

export const LoginInput = styled.input`
  width: 100%;
  height: 46px;
  padding: 0 12px;
  border: 1px solid rgba(192, 132, 252, 0.3);
  border-radius: 6px;
  outline: 0;
  box-sizing: border-box;
  color: #fff;
  background: rgba(8, 4, 15, 0.3);
  font: inherit;
  font-size: 14px;

  &::placeholder {
    color: #91859f;
  }

  &:focus {
    border-color: #c084fc;
    box-shadow: 0 0 0 2px rgba(192, 132, 252, 0.15);
  }
`

export const PasswordField = styled.div`
  position: relative;

  ${LoginInput} {
    padding-right: 42px;
  }
`

export const PasswordToggle = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  display: grid;
  place-items: center;
  padding: 4px;
  transform: translateY(-50%);
  border: 0;
  color: #a99bb8;
  background: transparent;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`

export const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  border: 0;
  border-radius: 999px;
  color: #918b99;
  background: #2f2935;
  font-size: 14px;
  font-weight: 700;
  cursor: not-allowed;

  &:enabled {
    color: #160d1e;
    background: #f3eaff;
    cursor: pointer;
  }

  &:enabled:hover {
    background: #e4d1f6;
  }
`

export const LoginDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0;
  color: #9c91a8;
  font-size: 13px;

  span {
    flex: 1;
    border-top: 1px solid rgba(205, 174, 235, 0.2);
  }
`

export const LoginSocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 40px;
  border: 0;
  border-radius: 999px;
  color: #160d1e;
  background: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #eee8f3;
  }
`

export const LoginActions = styled.div`
  display: grid;
  gap: 12px;
`

export const LoginTerms = styled.p`
  margin-top: 18px;
  color: #91859f;
  font-size: 11px;
  line-height: 1.5;
  text-align: center;

  a {
    color: #c084fc;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`

export const LoginBrand = styled.div`
  position: relative;
  display: grid;
  min-height: 440px;
  flex: 1;
  place-items: center;

  @media (max-width: 800px) {
    display: none;
  }
`

export const LoginGlow = styled.div`
  position: absolute;
  width: 62%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: conic-gradient(transparent, rgba(217, 180, 255, 0.42), transparent 68%);
  filter: blur(28px);
  animation: ${glowOrbit} 8s linear infinite;
`

export const LoginLogo = styled.img`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 600px;
  max-height: 72vh;
  aspect-ratio: 1;
  object-fit: contain;
  animation: ${logoShine} 3s ease-in-out infinite;
`

export const SignupLogo = styled.img`
  display: block;
  width: 40px;
  height: 40px;
  margin: 0 auto 20px;
  object-fit: contain;
`

export const SignupOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(3, 1, 8, 0.76);
`

export const SignupDialog = styled.div`
  position: relative;
  width: min(100%, 420px);
  padding: 32px;
  border: 1px solid rgba(192, 132, 252, 0.24);
  border-radius: 22px;
  color: #fff;
  background: linear-gradient(145deg, #211033, #100819);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55), 0 0 30px rgba(144, 56, 205, 0.12);
  box-sizing: border-box;
`

export const SignupCloseButton = styled.button`
  position: absolute;
  top: 12px;
  left: 14px;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  color: #d7c8e5;
  background: transparent;
  font-size: 22px;
  cursor: pointer;

  &:hover {
    background: var(--Hover);
  }
`

export const SignupTitle = styled.h2`
  margin: 0 0 24px;
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`

export const SignupForm = styled(LoginForm)`
  gap: 12px;
`

export const SignupButton = styled(LoginButton)`
  color: #160d1e;
  background: #f3eaff;
  cursor: pointer;
`
