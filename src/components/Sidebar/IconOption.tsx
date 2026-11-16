import { useState } from 'react';
import { ProfileAvatar, ProfileBox, ProfileMenu, ProfileMenuButton, SidebarIcon } from './styled';
import avatar from '../../assets/avatar.png';
import { handleLogout } from '../../Config';
import type SvgIcon from '@mui/material/SvgIcon';
import type { User } from 'firebase/auth';

export const IconOption = ({ Icon, text, onClick, comingSoon }: { Icon: typeof SvgIcon; text: string; onClick?: () => void; primary?: boolean; comingSoon?: boolean }) => {
  return (
    <SidebarIcon onClick={onClick}>
        <Icon />
        <div className="sidebar-label"><h2>{text}</h2>{comingSoon && <span>Coming soon</span>}</div>
    </SidebarIcon>

    
  )
    
}

export const AccountBox = ({ user }: { user: User | null }) => {
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