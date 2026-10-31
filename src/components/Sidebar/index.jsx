import { useState } from 'react';
import { Container } from './styled';
import XIcon from '@mui/icons-material/X';
import CloseIcon from '@mui/icons-material/Close';
import { IconOption } from './IconOption';
import { AccountBox } from './IconOption';
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
import avatar from '../../assets/avatar.jpeg';


export const Sidebar = ({ user, onNavigate }) => {
  const [showPostModal, setShowPostModal] = useState(false);

  return (
    <>
      <Container>
        <XIcon className="twitter-logo"/>

     <IconOption Icon={GitHubIcon} text="Home"/>
     <IconOption Icon={SearchIcon} text="Explore"/>
      <IconOption Icon={NotificationsNoneIcon} text="Notifications"/>
       <IconOption Icon={ForwardToInboxIcon} text="Messages"/>
       <IconOption Icon={BookmarkBorderIcon} text="Bookmarks"/>
       <IconOption Icon={ListIcon} text="List"/>
       <IconOption Icon={HistoryIcon} text="History"/>
       <IconOption Icon={PermIdentityIcon} text="Profile" onClick={() => onNavigate('profile')}/>
       <IconOption Icon={MoreHorizIcon} text="More"/>
       


    <Button variant="outlined" fullWidth onClick={() => setShowPostModal(true)}>
      Post
    </Button>

    <AccountBox user={user} />
    
   
      </Container>

      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-10" onClick={() => setShowPostModal(false)}>
          <div className="w-full max-w-xl rounded-2xl bg-[#16181c] p-5 text-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <button type="button" onClick={() => setShowPostModal(false)} aria-label="Close post window" className="rounded-full p-1 hover:bg-[#2f3336]"><CloseIcon /></button>
              <button type="button" className="text-sm text-[#1d9bf0]">Drafts</button>
            </div>
            <div className="flex gap-3">
              <img src={user?.photoURL || avatar} alt="User avatar" className="h-10 w-10 rounded-full object-cover" />
              <textarea autoFocus rows="4" placeholder="What's happening?" className="w-full resize-none bg-transparent text-xl text-white outline-none placeholder:text-[#71767b]" />
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-[#2f3336] pt-4">
              <span className="text-sm text-[#1d9bf0]">Everyone can reply</span>
              <button type="button" className="rounded-full bg-[#2f3336] px-5 py-2 font-bold text-[#71767b]">Post</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
