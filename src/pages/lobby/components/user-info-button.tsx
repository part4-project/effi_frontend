import ProfileModal from '@components/modal/profile-modal/profile-modal';
import QuickButton from './quick-button';

const UserInfoButton = () => {
  return (
    <ProfileModal>
      <QuickButton type="user-info" />
    </ProfileModal>
  );
};

export default UserInfoButton;
