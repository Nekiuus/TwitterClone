import styled from 'styled-components'

export const Container = styled.div`
  flex: 0 0 47%;
  min-width: 0;
  height: 100vh;
  overflow-y: auto;
  color: var(--twitterColor);
  text-align: left;

  .profile-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 48px;
    padding: 0 16px;
    border-bottom: 1px solid var(--border);
    gap: 16px;
    background: rgba(28, 12, 47, 0.88);
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
    color: var(--muted-purple);
    font-size: 13px;
  }

  .profile-header > svg {
    margin-left: auto;
  }

  .cover {
    height: 180px;
    background: linear-gradient(120deg, #a855f7, #7c3aed);
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
    color: var(--muted-purple);
  }

  .profile-info .username {
    margin-top: 0;
    color: #c084fc;
  }

  .stats {
    display: flex;
    gap: 18px;
    margin-top: 16px;
    color: var(--muted-purple);
  }

  .stats strong {
    color: #e9d5ff;
  }

  .stats button {
    padding: 0;
    border: 0;
    color: var(--muted-purple);
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
    color: var(--muted-purple);
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
    color: var(--muted-purple);
    background: transparent;
    cursor: pointer;
  }

  nav button.active {
    color: var(--twitterColor);
    font-weight: 700;
    border-bottom: 3px solid var(--accent);
  }
    @media (max-width: 1280px) {
  flex: 0.55;
}

@media (max-width: 1004px) {
  flex: 0.95;
}

@media (max-width: 500px) {
  flex: 1;
}
`
