import ProfileModalButton from '@components/modal/profile-modal/profile-modal-button';
import QuickButton from './quick-button';

const UserInfoButton = () => {
  return (
    <ProfileModalButton>
      <QuickButton type="user-info" />
    </ProfileModalButton>
  );
};

export default UserInfoButton;
