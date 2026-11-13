import styled from "styled-components";

export const Container = styled.main`
  flex: 0 0 47%;
  min-width: 0;
  height: 100vh;
  overflow-y: auto;
  color: var(--twitterColor);
  border-right: 1px solid var(--border);
  text-align: left;

  .explore-search {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
  }

  .search-box {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--text);
  }

  .search-box input {
    width: 100%;
    border: 0;
    outline: 0;
    color: var(--twitterColor);
    background: transparent;
  }

  .explore-search > button {
    border: 0;
    color: var(--twitterColor);
    background: transparent;
    cursor: pointer;
  }

  .explore-tabs {
    position: sticky;
    top: 58px;
    z-index: 1;
    display: flex;
    overflow-x: auto;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
  }
    .explore-tabs::-webkit-scrollbar {
        display: none;
    }

  .explore-tabs button {
    flex: 1;
    min-width: 76px;
    padding: 14px 8px;
    border: 0;
    color: var(--text);
    background: transparent;
    cursor: pointer;
  }

  .explore-tabs button.active {
    color: var(--twitterColor);
    font-weight: 700;
    border-bottom: 3px solid #1d9bf0;
  }

  .news-section,
  .results-section {
    padding: 16px;
    border-bottom: 1px solid var(--border);
  }

  .news-section h2,
  .results-section h2 {
    margin: 0 0 12px;
    color: var(--twitterColor);
    font-size: 19px;
  }

  .news-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
  }

  .news-card:last-child {
    border-bottom: 0;
  }

  .news-card > div:first-child,
  .user-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .news-card strong {
    color: var(--twitterColor);
    font-size: 14px;
  }

  .news-card span,
  .results-section > p,
  .user-details span {
    color: var(--text);
    font-size: 13px;
  }

  .news-image {
    flex: 0 0 68px;
    width: 68px;
    height: 68px;
    border-radius: 12px;
    object-fit: cover;
  }

  .user-result {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
  }

  .user-result img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-details {
    flex: 1;
  }

  .user-result > button {
    padding: 8px 16px;
    border: 0;
    border-radius: 999px;
    color: #000;
    background: var(--twitterColor);
    font-weight: 700;
    cursor: pointer;
  }

  .user-result > button:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  .error-message {
    color: #ff6b6b !important;
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
`;