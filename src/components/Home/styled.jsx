import styled from 'styled-components'

export const Container = styled.div`
  flex: 0 0 47%;
  min-width: 0;
  height: 100vh;
  min-height: 0;
  text-align: left;
  border-right: 1px solid var(--border);
  overflow-y: scroll;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
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
  background: var(--bg);

  button {
    position: relative;
    width: 42%;
    border: 0;
    background: transparent;
    color: var(--text);
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
    background: #1d9bf0;
  }

  > span {
    align-self: center;
    color: var(--text);
    font-size: 24px;
  }
`

export const TweetBoxContainer = styled.div`
  padding: 15px;
  border-bottom: 1px solid var(--border);
  box-sizing: border-box;
`

export const Div = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;

  > input {
    width: 100%;
    border: none;
    outline: 0;
    background: var(--bg);
    color: var(--twitterColor);
    font-size: 20px;
    line-height: 25px;
    padding: 8px 0;
  }

  > Button {
    background: var(--twitterColorHover) !important;
    border: none !important;
    color: black !important;
    font-weight: 700 !important;
    min-width: 68px !important;
    border-radius: 20px !important;
    text-transform: capitalize !important;
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
    fill: #1d9bf0;
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

  .post-header h3 span {
    color: var(--text);
    font-weight: 400;
  }

  .post-menu {
    color: var(--text);
    width: 20px;
    cursor: pointer;
  }
`

export const PostContainer = styled.div`
  padding: 15px;
  border-top: 1px solid var(--border);
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
  }
`

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  color: var(--text);

  span {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
  }

  svg {
    width: 23px;
    height: 23px;
    color: var(--text);
    cursor: pointer;
  }

  .reply-action:hover svg,
  .reply-action:hover .post-action-icon {
    color: #1d9bf0;
    background-color: #1d9bf0;
  }

  .repost-action:hover svg,
  .repost-action:hover .post-action-icon {
    color: #00ba7c;
    background-color: #00ba7c;
  }

  .like-action:hover svg {
    color: #f91880;
  }

  .view-action:hover svg {
    color: #1d9bf0;
  }
`

export const PostActionIcon = styled.span`
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