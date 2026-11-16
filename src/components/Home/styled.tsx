import styled from 'styled-components';
import { Button as MuiButton } from '@mui/material';


export const Container = styled.div`
  flex: 0 0 47%;
  min-width: 0;
  height: 100vh;
  min-height: 0;
  text-align: left;
  border-right: 1px solid var(--surface-border);
  overflow-y: scroll;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  @media only screen and (max-width: 1280px){
  flex: 0.55;
  }
  @media only screen and (max-width: 1004px){
  flex: 0.95;
  }
  @media only screen and (max-width: 500px){
  flex: 1;
  }
`

export const Header = styled.header`
  height: 48px;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 2;
  background: rgba(28, 12, 47, 0.88);
  backdrop-filter: blur(14px);

  button {
    position: relative;
    width: 42%;
    border: 0;
    background: transparent;
    color: var(--muted-purple);
    font-size: 15px;
    cursor: pointer;
  }

  button.active {
    color: var(--twitterColor);
    font-weight: 700;
  }

  button.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 28%;
    width: 44%;
    height: 4px;
    border-radius: 4px 4px 0 0;
    background: var(--accent);
  }

  > span {
    align-self: center;
    color: var(--text);
    font-size: 24px;
  }
`

export const HistoryHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  min-height: 58px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--border);

  button {
    display: grid;
    place-items: center;
    padding: 6px;
    border: 0;
    border-radius: 50%;
    color: var(--twitterColor);
    background: transparent;
    cursor: pointer;
  }

  button:hover {
    background: var(--Hover);
  }

  h2 {
    margin: 0;
    color: var(--twitterColor);
    font-size: 20px;
  }
`

export const HistoryTabs = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--border);

  span {
    position: relative;
    padding: 16px 24px 12px;
    color: var(--twitterColor);
    font-weight: 700;
  }

  span::after {
    position: absolute;
    right: 20%;
    bottom: 0;
    left: 20%;
    height: 4px;
    border-radius: 4px 4px 0 0;
    background: var(--accent);
    content: '';
  }
`

export const HistoryEmpty = styled.p`
  padding: 32px 16px;
  color: var(--muted-purple);
  font-weight: 700;
  text-align: center;
`

export const FeedEmpty = styled.p`
  padding: 16px;
  color: var(--muted-purple);
  font-weight: 700;
  text-align: center;
`

export const ReplyingTo = styled.p`
  margin: 0 0 8px 52px;
  color: #c084fc;
  font-size: 14px;
`

export const ReplyOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 16px;
  background: rgba(0, 0, 0, 0.7);
`

export const ReplyDialog = styled.div`
  width: min(600px, 100%);
  padding: 16px;
  border: 1px solid rgba(192, 132, 252, 0.22);
  border-radius: 18px;
  color: var(--twitterColor);
  background: linear-gradient(145deg, rgba(33, 16, 51, 0.98), rgba(16, 8, 25, 0.98));
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), 0 0 28px rgba(144, 56, 205, 0.1);
`

export const ReplyDialogHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;

  button {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border: 0;
    border-radius: 50%;
    color: var(--twitterColor);
    background: transparent;
    cursor: pointer;
  }

  button:hover {
    background: var(--Hover);
  }
`

export const TweetBoxContainer = styled.div`
  padding: 15px;
  border-bottom: 1px solid var(--surface-border);
  box-sizing: border-box;
`

export const Div = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;

  > textarea {
  flex: 1;
  min-width: 0;
  width: 100%;
  padding: 0;
  border: 0;
  outline: 0;
  border-radius: 0;
  resize: none;
  overflow: hidden;
  color: var(--twitterColor);
  background: transparent;
  font: inherit;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

  > textarea::placeholder {
    color: var(--text);
    opacity: 0.9;
  }

  &.tweet-actions {
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    margin-left: 52px;
    width: calc(100% - 52px);
  }
`

export const Avatar = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const DivBox = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;

  > .MuiSvgIcon-root {
    width: 23px;
    height: 23px;
    color: var(--twitterColorHover);
    cursor: pointer;
  }
`

export const MediaUploadLabel = styled.label<{ $selected: boolean }>`
  position: relative;
  display: inline-flex;
  color: ${({ $selected }) => ($selected ? '#c084fc' : '#5b21b6')};
  cursor: pointer;

  > svg {
    color: inherit;
  }
`

export const File = styled.input`
  position: absolute;
  inset: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  max-width: none;
  padding: 0;
  opacity: 0;
  cursor: pointer;
`

/*POST*/

export const PostBody = styled.div`
  padding-left: 10px;
  width: 100%;
  overflow: hidden;

  h3 {
    padding: 0;
    margin: 0;
    color: var(--twitterColor);
    font-size: 15px;
  }

  .verified-icon {
    width: 18px;
    height: 18px;
    fill: var(--accent);
    vertical-align: -3px;
    margin-right: 4px;
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .post-header h3 {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .post-header h3 .post-username {
    color: #c084fc;
    font-weight: 400;
  }

  .post-header h3 .post-time {
    color: var(--muted-purple);
    font-weight: 400;
  }
`

export const PostMenuContainer = styled.div`
  position: relative;
  flex: 0 0 auto;
`

export const PostMenuButton = styled.button`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: var(--text);
  background: transparent;
  cursor: pointer;

  &:hover {
    color: var(--accent);
    background: rgba(29, 155, 240, 0.1);
  }

  svg {
    width: 20px;
  }
`

export const PostMenuPopup = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 3;
  min-width: 150px;
  padding: 2px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #16181c;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
`

export const DeletePostButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 8px;
  color: #f4212e;
  background: transparent;
  font-size: 15px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: rgba(244, 33, 46, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

export const PostContainer = styled.div`
  padding: 15px;
  border-top: 1px solid var(--surface-border);
  display: flex;
  align-items: flex-start;
`

export const PostDescription = styled.div`
  margin-bottom: 10px;

  > p {
    margin: 0;
    padding: 0;
    color: var(--twitterColor);
    font-size: 15px;
    line-height: 16.6875px;
    overflow-wrap: anywhere;
    word-break: break-word;
    white-space: pre-wrap;
  }
`

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  color: var(--text);

  span,
  button {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
  }

  button {
    padding: 0;
    border: 0;
    color: inherit;
    background: transparent;
    font: inherit;
    cursor: pointer;
  }

  svg {
    width: 23px;
    height: 23px;
    color: var(--twitterColorHover);
    cursor: pointer;
  }

  .reply-action:hover svg,
  .reply-action:hover .post-action-icon {
    color: var(--accent);
    background-color: var(--accent);
  }

  .repost-action:hover svg,
  .repost-action:hover .post-action-icon {
    color: var(--accent);
    background-color: var(--accent);
  }

  .like-action:hover svg {
    color: #f91880;
  }

  .like-action.active svg {
    color: #f91880;
  }

  .repost-action.active {
    color: var(--accent);
  }

  .view-action:hover svg {
    color: var(--accent);
  }

  .action-error {
    color: #ff6b6b;
    font-size: 13px;
  }

  .media-unavailable {
    color: var(--text);
    font-size: 13px;
  }

  .replying-to {
    margin: 0 0 8px;
    color: #c084fc;
    font-size: 14px;
  }
`

export const PostActionIcon = styled.span<{ $icon: string }>`
  display: block;
  width: 23px;
  height: 23px;
  flex: 0 0 23px;
  background-color: var(--twitterColorHover);
  mask: url("${({ $icon }) => $icon}") center / contain no-repeat;
  -webkit-mask: url("${({ $icon }) => $icon}") center / contain no-repeat;
  cursor: pointer;
`

export const Images = styled.img`
  border-radius: 20px;
  min-width: 100%;
  width: 100%;
  min-height: 300px;
`
export const Video = styled.video`
  display: block;
  width: 100%;
  min-height: 300px;
  max-height: 600px;
  border-radius: 20px;
  object-fit: cover;
  background: #000;

  
`
export const PostButton = styled(MuiButton)<{ $ready: boolean }>`
  && {
    min-width: 68px;
    border: 0;
    border-radius: 20px;
    font-weight: 700;
    text-transform: capitalize;
    color: #fff;
    background: ${({ $ready }) => ($ready ? 'linear-gradient(110deg, #a855f7, #7c3aed)' : '#4c1d75')};
  }

  &&:hover {
    filter: ${({ $ready }) => ($ready ? 'brightness(1.12)' : 'none')};
  }

  &&.Mui-disabled {
    color: #ded0e9;
    background: #4c1d75;
    opacity: 1;
  }
`

//Preview of selected media
export const PreviewContainer = styled.div`
  position: relative;
  width: calc(100% - 52px);
  margin: 12px 0 12px 52px;
`

export const PreviewImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 400px;
  border-radius: 16px;
  object-fit: cover;
`

export const PreviewVideo = styled.video`
  display: block;
  max-width: 100%;
  max-height: 400px;
  border-radius: 16px;
  background: #000;
`

export const RemoveMediaButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: 0;
  border-radius: 50%;
  padding: 6px 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
`

export const CharacterProgress = styled.div<{ $progress: number }>`
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  border-radius: 50%;
  background: conic-gradient(
    #fff ${({ $progress }) => `${$progress * 100}%`},
    #2f3336 0
  );
  mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 2px),
    #000 calc(100% - 1.5px)
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 2px),
    #000 calc(100% - 1.5px)
  );
`