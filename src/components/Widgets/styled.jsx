import styled from "styled-components";

export const Widget = styled.div`
flex: 0 0 30%;
min-width: 0;
height: 100vh;
min-height: 0;
overflow-y: scroll;
box-sizing: border-box;
&::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;

`

export const Header = styled.header`
background-color: var(--bg);
  height: 70px;
  position: sticky;
  top: 0;
  z-index: 1;
  padding-top: 10px;
  box-sizing: border-box;

 
`

export const DivIcon = styled.div`
display: flex;
align-items: center;
background-color: black;
padding: 10px;
border-radius: 20px;
>.searchIcon{
  color: var(--border);
}
>input{
border: 1px solid var(--border);
border-radius: 40px;
height: 40px;
width: 100%; 
outline: 0px;
padding-left: 10px;
background-color: black;
font-size: 16px;
}

`

export const DivContent = styled.div`
  padding: 10px 16px 20px;
  background-color: #000;
  box-sizing: border-box;
`
export const Card = styled.section`
  margin-bottom: 12px;
  padding: 16px;
  border: 1px solid #2f3336;
  border-radius: 16px;
  background-color: #000;
  text-align: left;
  box-sizing: border-box;

  h2 {
    margin: 0 0 14px;
    color: #f7f9f9;
    font-size: 20px;
  }

  p {
    margin: 0 0 16px;
    color: #e7e9ea;
    font-size: 15px;
    line-height: 1.4;
  }
`

export const PremiumButton = styled.button`
  border: none;
  border-radius: 20px;
  padding: 9px 18px;
  background-color: #1d9bf0;
  color: #fff;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #1a8cd8;
  }
`

export const Trend = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
  text-align: left;

  span {
    display: block;
    margin-bottom: 4px;
    color: #71767b;
    font-size: 13px;
  }

  strong {
    color: #f7f9f9;
    font-size: 15px;
  }

  svg {
    width: 18px;
    color: #71767b;
  }
`
export const ShowMore = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  color: #1d9bf0;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`