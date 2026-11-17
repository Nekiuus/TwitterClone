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

  .list-header {
    position: sticky;
    top: 0;
    z-index: 3;
    justify-content: flex-start;
  }

  .list-header > div {
    flex: 1;
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

  .list-tabs button:hover,
  .profile-tabs button:hover {
    color: var(--twitterColor);
    background: var(--Hover);
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

  .user-row > button:hover,
  .profile-info .edit-profile:hover {
    border-color: var(--accent);
    background: var(--Hover);
  }

  .user-row > button:disabled,
  .profile-info .edit-profile:disabled {
    opacity: 0.65;
    cursor: wait;
  }

  .profile-tabs {
    display: flex;
    border-bottom: 1px solid var(--border);
  }

  .profile-tabs button,
  .list-tabs button {
    flex: 1;
    min-height: 60px;
    padding: 12px 8px;
    border: 0;
    color: var(--muted-purple);
    background: transparent;
    cursor: pointer;
  }

  .profile-tabs button.active,
  .list-tabs button.active {
    color: var(--twitterColor);
    font-weight: 700;
    border-bottom: 3px solid var(--accent);
  }

  .list-tabs {
    position: sticky;
    top: 48px;
    z-index: 2;
    display: flex;
    border-bottom: 1px solid var(--border);
    background: rgba(28, 12, 47, 0.96);
    backdrop-filter: blur(14px);
  }

  .profile-empty {
    padding: 28px 16px;
    color: var(--muted-purple);
    font-weight: 700;
    text-align: center;
  }

  .profile-error {
    padding: 12px 16px;
    color: #f87171;
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

export const Cover = styled.div<{ $image?: string }>`
  height: 180px;
  background: ${({ $image }) => $image
    ? `linear-gradient(rgba(18, 8, 29, 0.12), rgba(18, 8, 29, 0.12)), url("${$image}") center / cover no-repeat`
    : 'linear-gradient(120deg, #a855f7, #7c3aed)'};
`

export const ProfileImageOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(3, 1, 8, 0.76);
`

export const ProfileImageDialog = styled.div`
  width: min(680px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  overflow: auto;
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  color: var(--twitterColor);
  background: #100819;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);

  p {
    margin: 16px 24px 24px;
  }
`

export const ProfileImageHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 20px;
  height: 64px;
  padding: 0 24px;
  background: rgba(16, 8, 25, 0.96);
  backdrop-filter: blur(14px);

  h2 {
    position: absolute;
    left: 50%;
    margin: 0;
    color: var(--twitterColor);
    font-size: 20px;
    white-space: nowrap;
    transform: translateX(-50%);
  }
`

export const ProfileImageBanner = styled.div<{ $image: string }>`
  position: relative;
  height: 230px;
  background: ${({ $image }) => $image
    ? `linear-gradient(rgba(18, 8, 29, 0.12), rgba(18, 8, 29, 0.12)), url("${$image}") center / cover no-repeat`
    : 'linear-gradient(120deg, #a855f7, #7c3aed)'};
`

export const ProfileImageActions = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-height: 136px;
  padding: 0 24px 24px;

  > img {
    position: relative;
    z-index: 1;
    width: 100px;
    height: 100px;
    margin-top: -52px;
    border: 4px solid #100819;
    border-radius: 50%;
    object-fit: cover;
  }

  > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    padding-top: 16px;
  }

  > label {
    margin-top: 12px;
  }

  strong {
    color: var(--twitterColor);
  }

  span {
    color: var(--muted-purple);
    font-size: 13px;
    line-height: 1.5;
  }
`

export const ProfileImagePicker = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 9px 14px;
  border: 1px solid rgba(192, 132, 252, 0.25);
  border-radius: 999px;
  color: var(--twitterColor);
  background: rgba(76, 29, 117, 0.5);
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: rgba(124, 58, 237, 0.42);
  }
`

export const ProfileImageIconPicker = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: white;
  background: rgba(16, 8, 25, 0.7);
  cursor: pointer;
  transform: translate(-50%, -50%);

  &:hover {
    background: rgba(124, 58, 237, 0.9);
  }
`

export const ProfileImageSave = styled.button`
  padding: 8px 18px;
  border: 0;
  border-radius: 999px;
  color: #160c20;
  background: #f3eefa;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`

export const HiddenFileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
`

export const ProfileImageClose = styled.button`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 50%;
  color: var(--twitterColor);
  background: transparent;
  cursor: pointer;

  &:hover {
    background: var(--Hover);
  }
`
