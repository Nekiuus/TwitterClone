import styled from "styled-components";

export const Widget = styled.div`
  flex: 0 0 30%;
  min-width: 0;
  height: 100vh;
  min-height: 0;
  overflow-y: auto;
  background: transparent;
  box-sizing: border-box;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1280px) {
    flex: 0.4;
  }

  @media (max-width: 1004px) {
    display: none;
  }
`

export const Header = styled.header`
  background: transparent;
  height: 70px;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 10px 16px 8px;
  box-sizing: border-box;
`

export const DivIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid rgba(192, 132, 252, 0.28);
  border-radius: 999px;
  background: rgba(15, 7, 26, 0.64);
  box-shadow: inset 0 0 18px rgba(153, 77, 220, 0.08);

  > .searchIcon {
    flex: 0 0 auto;
    color: #c084fc;
  }

  > input {
    width: 100%;
    height: 36px;
    padding-left: 2px;
    border: 0;
    outline: 0;
    color: var(--twitterColor);
    background: transparent;
    font-size: 15px;
  }

  > input::placeholder {
    color: #b8a8ca;
  }
`

export const DivContent = styled.div`
  padding: 6px 16px 20px;
  background-color: transparent;
  box-sizing: border-box;
`
export const Card = styled.section`
  position: relative;
  margin-bottom: 14px;
  padding: 18px;
  overflow: hidden;
  border: 1px solid var(--surface-border);
  border-radius: 18px;
  background: linear-gradient(140deg, rgba(48, 23, 77, 0.88), rgba(17, 8, 29, 0.94));
  box-shadow: inset 0 1px rgba(231, 206, 255, 0.08), 0 8px 26px rgba(42, 13, 69, 0.28);
  text-align: left;
  box-sizing: border-box;

  h2 {
    margin: 0 0 12px;
    color: #f6eaff;
    font-size: 19px;
    text-shadow: 0 0 18px rgba(192, 132, 252, 0.18);
  }

  p {
    margin: 0 0 16px;
    color: #d3c3e3;
    font-size: 14px;
    line-height: 1.4;
  }
`

export const PremiumButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 9px 18px;
  background: linear-gradient(110deg, #a855f7, #7c3aed);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 0 18px rgba(168, 85, 247, 0.28);

  &:hover {
    filter: brightness(1.12);
  }
`

export const Trend = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin: 0 -8px 6px;
  padding: 10px 8px;
  border-radius: 12px;
  text-align: left;

  &:hover {
    background: rgba(192, 132, 252, 0.08);
  }

  span {
    display: block;
    margin-bottom: 3px;
    color: #a995bd;
    font-size: 12px;
    letter-spacing: 0.3px;
  }

  strong {
    color: #f6eaff;
    font-size: 15px;
  }

  svg {
    width: 18px;
    color: #a995bd;
  }
`
export const ShowMore = styled.button`
  padding: 10px 0 0;
  border: none;
  background: transparent;
  color: #c084fc;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`