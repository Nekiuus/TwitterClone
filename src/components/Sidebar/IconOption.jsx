import { useState } from 'react';
import { ProfileAvatar, ProfileBox, ProfileMenu, ProfileMenuButton, SidebarIcon } from './styled';
import avatar from '../../assets/avatar.jpeg';
import { handleLogout } from '../../Config';

export const IconOption = ({ Icon, text, onClick }) => {
  return (
    <SidebarIcon onClick={onClick}>
        <Icon />
        <h2>{text}</h2>
    </SidebarIcon>

    
  )
    
}

export const AccountBox = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.photoURL || avatar);

  return (
    <ProfileBox>
      <ProfileMenuButton
        type="button"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        aria-expanded={isMenuOpen}
        aria-haspopup="menu"
      >
        <ProfileAvatar
          src={profileImage}
          alt={`${user?.displayName || 'User'} avatar`}
          onError={() => setProfileImage(avatar)}
        />
        <div>
          <strong>{user?.displayName || user?.email || 'User'}</strong>
          <span>{user?.email || ''}</span>
        </div>
      </ProfileMenuButton>
      {isMenuOpen && (
        <ProfileMenu role="menu">
          <button type="button" onClick={handleLogout} role="menuitem">
            Log out
          </button>
        </ProfileMenu>
      )}
    </ProfileBox>
  )
}