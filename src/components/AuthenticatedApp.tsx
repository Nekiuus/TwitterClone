import { useState } from 'react'
import { Home } from './Home'
import { Sidebar } from './Sidebar'
import { Widgets } from './Widgets'
import { useAuth } from '../contexts/useAuth'
import { useMedia } from '../contexts/useMedia'
import { TweetBox } from './Home/TweetBox'
import { ReplyDialog, ReplyDialogHeader, ReplyOverlay } from './Home/styled'
import CloseIcon from '@mui/icons-material/Close'

export function AuthenticatedApp() {
  const [currentView, setCurrentView] = useState('home')
  const { user } = useAuth()
  const { replyTarget, clearReplyTarget } = useMedia()

  return (
    <>
      <div className="App">
        <Sidebar user={user} onNavigate={setCurrentView} />
        <Home user={user} currentView={currentView} onNavigate={setCurrentView} />
        <Widgets />
      </div>
      {replyTarget && (
        <ReplyOverlay onClick={clearReplyTarget}>
          <ReplyDialog role="dialog" aria-modal="true" aria-label="Reply" onClick={(event) => event.stopPropagation()}>
            <ReplyDialogHeader>
              <button type="button" aria-label="Close reply" onClick={clearReplyTarget}><CloseIcon /></button>
            </ReplyDialogHeader>
            <TweetBox replyTo={replyTarget} onPostSuccess={clearReplyTarget} />
          </ReplyDialog>
        </ReplyOverlay>
      )}
    </>
  )
}
