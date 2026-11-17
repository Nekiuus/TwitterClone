import { useState } from 'react'
import { Home } from './Home'
import { Sidebar } from './Sidebar'
import { Widgets } from './Widgets'
import { useAuth } from '../contexts/useAuth'
import { useMedia } from '../contexts/useMedia'
import { TweetBox } from './Home/TweetBox'
import { ReplyDialog, ReplyDialogHeader, ReplyOverlay } from './Home/styled'
import CloseIcon from '@mui/icons-material/Close'

export interface ProfileAccount {
  uid: string
  username?: string
  email?: string
  displayName?: string
  photoURL?: string
  customPhotoURL?: string
  bannerURL?: string
  bio?: string
}

export function AuthenticatedApp() {
  const [currentView, setCurrentView] = useState('home')
  const [selectedProfile, setSelectedProfile] = useState<ProfileAccount | null>(null)
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const [postReturnView, setPostReturnView] = useState('home')
  const { user } = useAuth()
  const { replyTarget, clearReplyTarget } = useMedia()
  const navigate = (view: string) => {
    setSelectedProfile(null)
    setSelectedPostId(null)
    setCurrentView(view)
  }
  const openPost = (postId: string) => {
    setPostReturnView(currentView)
    setSelectedPostId(postId)
    setCurrentView('post')
  }
  const closePost = () => {
    setSelectedPostId(null)
    setCurrentView(postReturnView)
  }
  const openProfile = (profile: ProfileAccount) => {
    setSelectedPostId(null)
    setSelectedProfile(profile)
    setCurrentView('profile')
  }

  return (
    <>
      <div className="App">
        <Sidebar user={user} onNavigate={navigate} />
        <Home
          user={user}
          currentView={currentView}
          onNavigate={navigate}
          profile={selectedProfile}
          selectedPostId={selectedPostId}
          onOpenPost={openPost}
          onClosePost={closePost}
          onOpenProfile={openProfile}
        />
        <Widgets user={user} onOpenProfile={openProfile} />
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
