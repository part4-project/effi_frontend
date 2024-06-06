import UserInfoModal from '@components/modal/user-info-modal';
import QuickButton from './quick-button';

const UserInfoButton = () => {
  return (
    <UserInfoModal>
      <QuickButton type="user-info" />
    </UserInfoModal>
  );
};

export default UserInfoButton;
