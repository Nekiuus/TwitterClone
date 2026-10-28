import { ProfileAvatar, ProfileBox, SidebarIcon } from './styled';
import avatar from '../../assets/avatar.jpeg';

export const IconOption = ({ Icon, text }) => {
  return (
    <SidebarIcon>
        <Icon />
        <h2>{text}</h2>
    </SidebarIcon>

    
  )
    
}

export const AccountBox = () => {
  return (
    <ProfileBox>
      <ProfileAvatar src={avatar} alt="User Avatar" />
      <div>
        <strong>Tiger Eye</strong>
        <span>@tigercooleyes12</span>
      </div>
    </ProfileBox>
  )
}