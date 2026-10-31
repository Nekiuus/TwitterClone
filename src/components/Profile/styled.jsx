import styled from 'styled-components'

export const Container = styled.div`
  flex: 0 0 47%;
  min-width: 0;
  height: 100vh;
  overflow-y: auto;
  color: var(--twitterColor);
  border-right: 1px solid var(--border);
  text-align: left;

  .profile-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 48px;
    padding: 0 16px;
    border-bottom: 1px solid var(--border);
    gap: 16px;
  }

  .profile-header button {
    display: grid;
    place-items: center;
    padding: 4px;
    border: 0;
    color: var(--twitterColor);
    background: transparent;
    cursor: pointer;
  }

  .profile-header h2 {
    margin: 0;
    color: var(--twitterColor);
    font-size: 16px;
  }

  .profile-header span {
    color: var(--text);
    font-size: 13px;
  }

  .profile-header > svg {
    margin-left: auto;
  }

  .cover {
    height: 180px;
    background: #333639;
  }

  .profile-info {
    padding: 16px;
    text-align: left;
  }

  .profile-info img {
    width: 88px;
    height: 88px;
    margin-top: -56px;
    border: 4px solid var(--bg);
    border-radius: 50%;
    object-fit: cover;
  }

  .profile-info button {
    float: right;
    padding: 8px 16px;
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--twitterColor);
    background: transparent;
    font-weight: 700;
  }

  .profile-info h1 {
    margin: 12px 0 0;
    color: var(--twitterColor);
    font-size: 22px;
  }

  .profile-info p {
    margin-top: 4px;
    color: var(--text);
  }

  .profile-info .username {
    margin-top: 0;
  }

  .stats {
    display: flex;
    gap: 18px;
    margin-top: 16px;
    color: var(--text);
  }

  .stats strong {
    color: var(--twitterColor);
  }

  .stats button {
    padding: 0;
    border: 0;
    color: var(--text);
    background: transparent;
    cursor: pointer;
  }

  .list-tabs button {
    padding: 16px;
  }

  .user-list {
    padding: 0 16px;
  }

  .user-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
  }

  .user-row img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-row div {
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1;
  }

  .user-row span {
    color: var(--text);
  }

  .user-row > button {
    padding: 7px 14px;
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--twitterColor);
    background: transparent;
    font-weight: 700;
    cursor: pointer;
  }

  nav {
    display: flex;
    border-bottom: 1px solid var(--border);
  }

  nav button {
    flex: 1;
    padding: 16px 8px;
    border: 0;
    color: var(--text);
    background: transparent;
    cursor: pointer;
  }

  nav button.active {
    color: var(--twitterColor);
    font-weight: 700;
    border-bottom: 3px solid #1d9bf0;
  }
`
