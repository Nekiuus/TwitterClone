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
  z-index: 5;
  padding: 10px 16px 8px;
  box-sizing: border-box;
`

export const SearchResults = styled.div`
  position: absolute;
  top: 62px;
  right: 16px;
  left: 16px;
  max-height: min(60vh, 420px);
  overflow-y: auto;
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  background: #180d24;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);

  > p {
    margin: 0;
    padding: 14px 16px;
    color: var(--muted-purple);
  }

  > button {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 12px;
    padding: 12px 16px;
    border: 0;
    color: var(--twitterColor);
    background: transparent;
    text-align: left;
    cursor: pointer;
  }

  > button:hover {
    background: var(--Hover);
  }

  img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 3px;
  }

  small {
    color: var(--muted-purple);
  }
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

export const SubscribeOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(3, 1, 8, 0.76);
`

export const SubscribeDialog = styled.section`
  width: min(520px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  overflow: auto;
  padding: 30px 32px;
  border: 1px solid var(--surface-border);
  border-radius: 22px;
  color: var(--twitterColor);
  background: linear-gradient(145deg, #211033, #100819);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
  text-align: left;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  h2 {
    margin: 0;
    color: #f6eaff;
    font-size: 24px;
  }

  header button {
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

  header button:hover {
    background: var(--Hover);
  }

  p {
    margin: 20px 0;
    color: #d3c3e3;
    line-height: 1.5;
  }

  ul {
    margin: 24px 0;
    padding: 18px 0 18px 24px;
    border-top: 1px solid var(--surface-border);
    border-bottom: 1px solid var(--surface-border);
  }

  li {
    padding: 7px 0;
    color: #e6d9f1;
    line-height: 1.5;
  }

  .dismiss {
    width: 100%;
    margin-top: 4px;
    padding: 14px;
    border: 0;
    border-radius: 999px;
    color: white;
    background: linear-gradient(110deg, #a855f7, #7c3aed);
    font-weight: 700;
    cursor: pointer;
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