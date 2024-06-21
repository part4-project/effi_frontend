import MeetingModalButton from '@pages/group-home/components/meeting-modal/meeting-modal-button';
import { useLobbyGroupStore } from '@stores/lobby-group';
import styled from 'styled-components';

interface GroupListItemProps {
  groupId: number;
  groupName: string;
  onClick: () => void;
  groupNameLength: 'short' | 'long';
}

const GroupListItem = ({ groupId, groupName, onClick, groupNameLength }: GroupListItemProps) => {
  const setLobbyGroupId = useLobbyGroupStore((state) => state.setLobbyGroupId);

  const handleGroupClick = () => {
    setLobbyGroupId(groupId);
    onClick();
  };

  return (
    <MeetingModalButton title="회의 생성">
      <S.Container $groupNameLength={groupNameLength} onClick={handleGroupClick}>
        <S.FileImg>{groupName}</S.FileImg>
      </S.Container>
    </MeetingModalButton>
  );
};

export default GroupListItem;

const S = {
  Container: styled.div<{ $groupNameLength: GroupListItemProps['groupNameLength'] }>`
    width: ${({ $groupNameLength }) => ($groupNameLength === 'long' ? '180px' : '100px')};
    height: 120px;
    margin: 9px 0 19px;
  `,
  FileImg: styled.div`
    height: 100%;
    position: relative;
    clip-path: polygon(30px 0, 100% 0, 100% 100%, 0 100%, 0 30px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.text01};
    font-size: 20px;
    font-weight: 900;
    background-color: ${(props) => props.theme.theme08};
    &:hover {
      background-color: ${(props) => props.theme.theme01};
      color: ${(props) => props.theme.quickButtonHover};
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      aspect-ratio: 1 / 1;
      background: linear-gradient(315deg, ${(props) => props.theme.theme02} 50%, transparent 50%);
    }
  `,
};
