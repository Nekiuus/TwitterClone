import styled from 'styled-components'

export const Container = styled.div`
flex: 0.5;
text-align: left;
border-right: 1px solid var(--border);
overflow-y: scroll;
box-sizing: border-box;

&::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;
`
export const Header = styled.header``

/*TWEETBOX*/
export const TweetBoxContainer = styled.div`
padding: 5px 15px;
border: 1px solid var(--border);
box-sizing: border-box;
`
export const Div = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;

  >.columns{
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 16px;
  >input{
  margin-left: 10px;
  margin-top: 5px;
  width: 100%;
  border: none;
  outline: 0;
  background-color: var(--bg);
  font-size: 20px;
  line-height: 25px;
  color: var(--white);

  
    }
  }
>input{
  margin-left: 10px;
  width: 100%;
  flex: 1;
  border: none;
  background-color: var(--bg);
  font-size: 19px;
  line-height: 25px;
  color: var(--white);
  outline: 0;
}
>Button{
  background-color: var(--twitterColorHover) !important;
  border: none !important;
  color: black !important;
  font-weight: 700 !important;
  height: 40px !important;
  margin-top: 10px !important;
  border-radius: 20px !important;
  text-transform: capitalize !important;
  }
  
`

export const Avatar = styled.img`
border-radius: 50%;
width: 52px;
height: 52px;
object-fit: cover;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  
`

export const DivBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  >.MuiSvgIcon-root{
  fill: var(--twitterColorHover);
  margin-left: 1rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
  }


`

/*===================== POST ================= */
export const PostBody= styled.div`
padding-left: 10px;
width: 100%,
overflow: hidden;
>div span{
  font-weight: 600;
  font-size: 15px;
  color: var(--twitterColorHover);
  }
.post_icon{
font-size: 14px !important;
color: var(--twitterColorHover) !important;
}
h3{
  padding: 0;
  margin: 0;
  color: white;
  font-size: 15px
}
.verified-icon{
  width: 18px;
  height: 18px;
  fill: #1d9bf0;
  vertical-align: -3px;
  margin-right: 4px;
}
`

export const PostContainer= styled.div`
padding: 10px 15px;
border-top: 1px solid var(--border);
margin-top: 5px;
display: flex;
align-items: flex-start;
.post_avatar{
margin-top: 5px;
}
`

export const PostDescription= styled.div`
margin-bottom: 10px;
>p{
  margin: 0;
  padding: 0;
  color: white;
  font-size: 15px;
  line-height: 16.6875px;
}
`

export const PostFooter= styled.div`
display: flex;
justify-content: space-between;
margin-top: 10px;
color: var(--twitterColorHover);
.MuiSvgIcon-root {
  color: var(--twitterColorHover);
  cursor: pointer;
  transition: color 100ms ease-in;
}

.action-favorite:hover {
  color: #f91880;
}

.action-views:hover {
  color: #1d9bf0;
}
`

export const PostActionIcon = styled.span`
display: block;
width: 20px;
height: 20px;
flex: 0 0 20px;
background-color: var(--twitterColorHover);
mask: url("${({ $icon }) => $icon}") center / contain no-repeat;
-webkit-mask: url("${({ $icon }) => $icon}") center / contain no-repeat;
cursor: pointer;
transition: background-color 100ms ease-in;

&.action-reply:hover {
  background-color: #1d9bf0;
}

&.action-retweet:hover {
  background-color: #00ba7c;
}
`

export const Images= styled.img`
border-radius: 20px;
min-width: 100%;
width: 100%;
min-height: 300px;
`
