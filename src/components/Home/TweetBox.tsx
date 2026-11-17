import avatar from '../../assets/avatar.png'
import { TweetBoxContainer, Div, Avatar, Form, DivBox, File, PostButton, PreviewContainer, PreviewImage, PreviewVideo, RemoveMediaButton, CharacterProgress, MediaUploadLabel, ReplyingTo } from './styled'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined'
import PollOutlinedIcon from '@mui/icons-material/PollOutlined'
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useMedia } from '../../contexts/useMedia'
import type { ReplyTarget } from '../../contexts/mediaContext'
import { useAuth } from '../../contexts/useAuth'

const MAX_POST_LENGTH = 280

export const TweetBox = ({ onPostSuccess, replyTo }: { onPostSuccess?: () => void; replyTo?: ReplyTarget } = {}) => {
  const { selectedMedia, saveMedia, clearMedia, publishPost } = useMedia()
  const { user, profile } = useAuth()
  const [text, setText] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [postError, setPostError] = useState('')
  const postReady = Boolean(text.trim() || selectedMedia);
  const characterProgress = Math.min(text.length / MAX_POST_LENGTH, 1)

  const handleMediaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    event.currentTarget.value = ''

    if (!file) return

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      console.error('Select an image or video file.')
      return
    }

    saveMedia(file)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const emailName = user?.email?.split('@')[0]
    setIsPosting(true)
    setPostError('')

    try {
      await publishPost({
        name: user?.displayName || emailName || 'You',
        username: user?.email ? `@${emailName}` : '@you',
        avatar: profile?.customPhotoURL || user?.photoURL || avatar,
        text: text.trim(),
      }, replyTo)
      setText('')
      onPostSuccess?.()
    } catch (error) {
      console.error('Unable to publish post:', error)
      setPostError(error instanceof Error ? error.message : 'Unable to publish post.')
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <TweetBoxContainer>
      <Form onSubmit={handleSubmit}>
        {replyTo && <ReplyingTo>Replying to {replyTo.username}</ReplyingTo>}
        <Div>
          <Avatar src={profile?.customPhotoURL || user?.photoURL || avatar} alt="User Avatar" />
          <textarea
            rows={1}
            maxLength={MAX_POST_LENGTH}
            value={text}
            placeholder={replyTo ? 'Post your reply' : "What's happening?"}
            onChange={(event) => {
              const value = event.target.value;
              setText(value);
              event.target.style.height = "auto";
              event.target.style.height = `${event.target.scrollHeight}px`;
            }}
          />
          <CharacterProgress
            role="progressbar"
            aria-label="Character limit"
            aria-valuemin={0}
            aria-valuemax={MAX_POST_LENGTH}
            aria-valuenow={text.length}
            $progress={characterProgress}
          />

        </Div>
        {postError && <p className="mt-3 text-sm text-red-500" role="alert">{postError}</p>}
        {/*Preview of selected media*/}
        {selectedMedia && (
        <PreviewContainer>
          {selectedMedia.type.startsWith('image/') ? (
            <PreviewImage
              src={selectedMedia.url}
              alt="Preview of the image"
            />
          ) : (
            <PreviewVideo
              src={selectedMedia.url}
              controls
              aria-label="Preview of the video"
            />
          )}

          <RemoveMediaButton
            type="button"
            onClick={clearMedia}
            aria-label="Remove file"
          >
            ×
          </RemoveMediaButton>
        </PreviewContainer>
      )}

        <Div className="tweet-actions">
          <DivBox>
            <MediaUploadLabel
              htmlFor="tweet-media"
              aria-label="Select image or video"
              $selected={Boolean(selectedMedia)}
            >
              <ImageOutlinedIcon />
              <File
                id="tweet-media"
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaChange}
              />
            </MediaUploadLabel>
            <GifBoxOutlinedIcon />
            <PollOutlinedIcon />
            <SentimentSatisfiedAltOutlinedIcon />
            <CalendarMonthOutlinedIcon />
          </DivBox>
          <PostButton
            $ready={postReady}
            variant="contained"
            type="submit"
            disabled={!postReady || isPosting}
          >
            {isPosting ? 'Saving post...' : replyTo ? 'Reply' : 'Post'}
          </PostButton>
        </Div>
      </Form>
    </TweetBoxContainer>

  )
}
