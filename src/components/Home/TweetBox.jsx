import avatar from '../../assets/avatar.jpeg'
import { TweetBoxContainer, Div, Avatar, Form, DivBox } from './styled'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined'
import PollOutlinedIcon from '@mui/icons-material/PollOutlined'
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { Button } from '@mui/material'

export const TweetBox = () => {
  return (
    <TweetBoxContainer>
      <Form>
        <Div>
          <Avatar src={avatar} alt="User Avatar" />
          <input type="text" placeholder="What's happening?" />
        </Div>
        <Div className="tweet-actions">
          <DivBox>
            <ImageOutlinedIcon />
            <GifBoxOutlinedIcon />
            <PollOutlinedIcon />
            <SentimentSatisfiedAltOutlinedIcon />
            <CalendarMonthOutlinedIcon />
          </DivBox>
          <Button variant="contained">Post</Button>
        </Div>
      </Form>
    </TweetBoxContainer>

  )
}
