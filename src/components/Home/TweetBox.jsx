import avatar from '../../assets/avatar.jpeg'
import { TweetBoxContainer, Div, Avatar, Form, DivBox, File, PostButton } from './styled'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined'
import PollOutlinedIcon from '@mui/icons-material/PollOutlined'
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { useState } from 'react'
import { useMedia } from '../../contexts/useMedia'
import { auth } from '../../Config'

export const TweetBox = () => {
  const { selectedMedia, saveMedia, publishPost } = useMedia()
  const [text, setText] = useState('')
  const postReady = Boolean(text.trim() || selectedMedia);

  const handleMediaChange = (event) => {
    const file = event.currentTarget.files?.[0]
    event.currentTarget.value = ''

    if (!file) return

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      console.error('Selecciona una imagen o un video.')
      return
    }

    const media = saveMedia(file)
    console.log('Medio guardado localmente en el contexto de React:', {
      name: media.name,
      type: media.type,
      size: media.size,
      url: media.url,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const user = auth.currentUser
    const emailName = user?.email?.split('@')[0]
    publishPost({
      name: user?.displayName || emailName || 'You',
      username: user?.email ? `@${emailName}` : '@you',
      avatar: user?.photoURL || avatar,
      text: text.trim(),
    })
    setText('')
  }

  return (
    <TweetBoxContainer>
      <Form onSubmit={handleSubmit}>
        <Div>
          <Avatar src={avatar} alt="User Avatar" />
          <textarea
            rows={1}
            maxLength={280}
            value={text}
            placeholder="What's happening?"
            onChange={(event) => {
              const value = event.target.value;
              setText(value);
              event.target.style.height = "auto";
              event.target.style.height = `${event.target.scrollHeight}px`;
            }}
          />
          <span>{text.length}/280</span>

        </Div>
        <Div className="tweet-actions">
          <DivBox>
            <label
              htmlFor="tweet-media"
              aria-label="Seleccionar imagen o video"
              style={{ position: 'relative', display: 'inline-flex', cursor: 'pointer' }}
            >
              <ImageOutlinedIcon />
              <File
                id="tweet-media"
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaChange}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none', padding: 0 }}
              />
            </label>
            <GifBoxOutlinedIcon />
            <PollOutlinedIcon />
            <SentimentSatisfiedAltOutlinedIcon />
            <CalendarMonthOutlinedIcon />
          </DivBox>
          <PostButton
            $ready={postReady}
            variant="contained"
            type="submit"
            disabled={!postReady}
          >
            Post
          </PostButton>
        </Div>
      </Form>
    </TweetBoxContainer>

  )
}
