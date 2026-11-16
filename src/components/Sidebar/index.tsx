import { useState } from 'react';
import { Container } from './styled';
import CloseIcon from '@mui/icons-material/Close';
import starlingLogo from '../../assets/starling-logo.png'
import { AccountBox, IconOption } from './IconOption';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListIcon from '@mui/icons-material/List';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HistoryIcon from '@mui/icons-material/History';
import { Button } from '@mui/material';
import type { User } from 'firebase/auth';
import { TweetBox } from '../Home/TweetBox';
import { ReplyDialog, ReplyDialogHeader, ReplyOverlay } from '../Home/styled'


export const Sidebar = ({ user, onNavigate }: { user: User | null; onNavigate: (view: string) => void }) => {
  const [showPostModal, setShowPostModal] = useState(false);

  return (
    <>
      <Container>
        <img src={starlingLogo} alt="Starling" className="starling-logo" />

     <IconOption Icon={GitHubIcon} onClick={() => onNavigate('home')} text="Home"/>
     <IconOption Icon={SearchIcon} onClick={() => onNavigate('explore')} text="Explore"/>
      <IconOption Icon={NotificationsNoneIcon} onClick={() => onNavigate('notifications')} text="Notifications"/>
       <IconOption Icon={ForwardToInboxIcon} text="Messages" comingSoon/>
       <IconOption Icon={BookmarkBorderIcon} text="Bookmarks" comingSoon/>
       <IconOption primary Icon={ListIcon} text="List" comingSoon/>
       <IconOption primary Icon={HistoryIcon} onClick={() => onNavigate('history')} text="History"/>
       <IconOption Icon={PermIdentityIcon} text="Profile" onClick={() => onNavigate('profile')}/>
       <IconOption primary Icon={MoreHorizIcon} text="More" comingSoon/>
       


    <Button variant="outlined" fullWidth onClick={() => setShowPostModal(true)}>
      Post
    </Button>

    <AccountBox user={user} />
    
   
      </Container>

      {showPostModal && (
        <ReplyOverlay onClick={() => setShowPostModal(false)}>
          <ReplyDialog role="dialog" aria-modal="true" aria-label="Create post" onClick={(event) => event.stopPropagation()}>
            <ReplyDialogHeader>
              <button type="button" onClick={() => setShowPostModal(false)} aria-label="Close post window"><CloseIcon /></button>
            </ReplyDialogHeader>
            <TweetBox onPostSuccess={() => setShowPostModal(false)} />
          </ReplyDialog>
        </ReplyOverlay>
      )}
    </>
  )
}
