import MeetingModalButton from '@pages/group-home/components/meeting-modal/meeting-modal-button';
import styled from 'styled-components';

interface GroupListItemProps {
  groupName: string;
  onClick: () => void;
  groupNameLength: 'short' | 'long';
}

const GroupListItem = ({ groupName, onClick, groupNameLength }: GroupListItemProps) => {
  return (
    <MeetingModalButton title="회의 생성">
      <S.Container $isLongGroupName={groupNameLength} onClick={onClick}>
        <S.FileImg>{groupName} </S.FileImg>
      </S.Container>
    </MeetingModalButton>
  );
};

export default GroupListItem;

const S = {
  Container: styled.div<{ $isLongGroupName: GroupListItemProps['groupNameLength'] }>`
    width: ${({ $isLongGroupName }) => ($isLongGroupName === 'long' ? '180px' : '100px')};
    height: 120px;
    margin: 9px 0 19px;
  `,
  FileImg: styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    clip-path: polygon(30px 0, 100% 0, 100% 100%, 0 100%, 0 30px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 20px;
    font-weight: 900;
    background-color: var(--blue04);
    &:hover {
      background-color: var(--blue01);
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      aspect-ratio: 1 / 1;
      background: linear-gradient(315deg, var(--blue02) 50%, transparent 50%);
    }
  `,
};
