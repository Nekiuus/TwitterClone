import { Avatar, PostBody, PostContainer, PostDescription, PostFooter, PostActionIcon, Images, Video } from './styled'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VerifiedIcon from '@mui/icons-material/Verified'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import reply from '../../assets/reply.png'
import retweet from '../../assets/retweet.png'

export const Post = ({ name, username, time, text, image, video, type, replies, reposts, likes, views, avatar }) => {
  return (
    <PostContainer>
      <Avatar src={avatar} alt={`${name} avatar`} />
      <PostBody>
        <div className="post-content">
          <div className="post-header">
            <h3>{name}<VerifiedIcon className="verified-icon" /><span>{username} · {time}</span></h3>
            <MoreHorizIcon className="post-menu" />
          </div>

          <PostDescription><p>{text}</p></PostDescription>
          
          {type === 'video' ? (
            <Video src={video} controls />
            ) : (
            <Images src={image} alt="Post" />
            )}

          <PostFooter>
            <span className="reply-action"><PostActionIcon className="post-action-icon" $icon={reply} role="img" aria-label="Replies" />{replies}</span>
            <span className="repost-action"><PostActionIcon className="post-action-icon" $icon={retweet} role="img" aria-label="Reposts" />{reposts}</span>
            <span className="like-action"><FavoriteBorderIcon />{likes}</span>
            <span className="view-action"><BarChartOutlinedIcon />{views}</span>
          </PostFooter>
        </div>
      </PostBody>
    </PostContainer>
  )
}