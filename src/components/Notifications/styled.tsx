import styled from 'styled-components'

export const NotificationsHeader = styled.header`
  display: flex;
  align-items: center;
  min-height: 58px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--surface-border);

  h2 {
    margin: 0;
    color: var(--twitterColor);
    font-size: 20px;
  }
`

export const NotificationItem = styled.article`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-bottom: 1px solid var(--surface-border);
`

export const NotificationIcon = styled.span`
  display: grid;
  flex: 0 0 28px;
  place-items: center;
  color: #c084fc;

  svg {
    width: 25px;
    height: 25px;
  }
`

export const NotificationMessage = styled.p`
  color: var(--muted-purple);
  font-size: 15px;

  strong {
    color: #c084fc;
    font-weight: 700;
  }
`

export const NotificationEmpty = styled.p`
  padding: 32px 16px;
  color: var(--muted-purple);
  font-weight: 700;
  text-align: center;
`

export const NotificationError = styled.p`
  padding: 16px;
  color: #f87171;
`
