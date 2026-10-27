import React from 'react'
import { Container } from './styled'
import XIcon from '@mui/icons-material/X';
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
import { Button } from '@mui/material';


export const Sidebar = () => {
  return (
    <Container>
        <XIcon className="twitter-logo"/>

     <IconOption Icon={GitHubIcon} text="Home"/>
     <IconOption Icon={SearchIcon} text="Explore"/>
      <IconOption Icon={NotificationsNoneIcon} text="Notifications"/>
       <IconOption Icon={ForwardToInboxIcon} text="Messages"/>
       <IconOption Icon={BookmarkBorderIcon} text="Bookmarks"/>
       <IconOption Icon={ListIcon} text="List"/>
       <IconOption Icon={PermIdentityIcon} text="Profile"/>
       <IconOption Icon={MoreHorizIcon} text="More"/>


    <Button variant="outlined" fullWidth>
      Post
    </Button>

    <AccountBox/>
    
   
    </Container>
  )
}
