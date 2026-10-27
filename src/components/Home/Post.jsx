import React from 'react'
import { Avatar, PostBody, PostContainer, PostDescription, PostFooter, PostActionIcon, Images } from './styled'
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import reply from '../../assets/reply.png';
import retweet from '../../assets/retweet.png';

export const Post = () => {
  return (
      <PostContainer>
        <div className="post">
        <Avatar src="https://randomuser.me/api/portraits/men/70.jpg" alt="User Avatar" />
        </div>
      
  
    <PostBody>
        <div>
            <div>
                <h3>Jason <span>
                    <VerifiedIcon className="verified-icon"/>
                    @jason</span></h3>
                
            <PostDescription>
                <p>post description goes here. This is a sample post to demonstrate the layout of a post in the Twitter clone application.</p>
            </PostDescription>
            </div>
            <Images src="https://media1.tenor.com/m/xE-3Qec4KS0AAAAd/hi-lizard.gif" alt="Post Image" />
            <PostFooter>
                <PostActionIcon className="action-reply" $icon={reply} role="img" aria-label="Responder" />
                <PostActionIcon className="action-retweet" $icon={retweet} role="img" aria-label="Repostear" />
                <FavoriteBorderIcon className="action-favorite" fontSize="small" aria-label="Me gusta" />
                <SignalCellularAltIcon className="action-views" fontSize="small" aria-label="Visualizaciones" />

            </PostFooter>
        </div>
    </PostBody>
    </PostContainer>
  )
}
