import styled from "styled-components";

export const Container = styled.div`
  flex: 0.3;
`

export const Header = styled.header`
  padding: 10px 15px;
`

export const DivIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  > input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: var(--white);
  }

  > .MuiSvgIcon-root {
    color: var(--twitterColor);
  }
`