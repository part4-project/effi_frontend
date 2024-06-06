import { useState } from 'react';
import MeetingModal from '@pages/group-home/components/meeting-modal/meeting-modal';
import styled from 'styled-components';
import { FILE_IMGS } from '../constants';

interface GroupListItemProps {
  groupName: string;
  onClick: () => void;
  groupNameLength: 'short' | 'long';
}

const GroupListItem = ({ groupName, onClick, groupNameLength }: GroupListItemProps) => {
  const images = FILE_IMGS[groupNameLength];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MeetingModal title="회의 생성">
      <S.Container
        $isLongGroupName={groupNameLength}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <S.GroupName>{groupName}</S.GroupName>
        <S.FileImg src={isHovered ? images.hover : images.basic} alt="파일" />
        <div>
          <S.VectorImg $isLongGroupName={groupNameLength} src={images.vector} alt="벡터" />
        </div>
      </S.Container>
    </MeetingModal>
  );
};

export default GroupListItem;

const S = {
  Container: styled.div<{ $isLongGroupName: GroupListItemProps['groupNameLength'] }>`
    width: ${({ $isLongGroupName }) => ($isLongGroupName === 'long' ? '180px' : '100px')};
    height: 120px;
    margin: 9px 0 19px;
    position: relative;
  `,
  GroupName: styled.div`
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--white);
    font-size: 20px;
    font-weight: 900;
  `,
  FileImg: styled.img`
    width: 100%;
    height: 100%;
  `,
  VectorImg: styled.img<{ $isLongGroupName: GroupListItemProps['groupNameLength'] }>`
    position: absolute;
    width: 23px;
    height: 23px;
    top: 0px;
    left: ${({ $isLongGroupName }) => ($isLongGroupName === 'long' ? '-4px' : '0px')};
  `,
};
