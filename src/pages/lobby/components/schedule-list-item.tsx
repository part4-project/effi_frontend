import clockIcon from '@assets/icons/clock.svg';
import GroupItem from '@pages/side-bar/components/group-item';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ScheduleListItemProps {
  groupId: number;
  groupName: string;
  meetingTitle: string;
}

const ScheduleListItem = ({ groupId, groupName, meetingTitle }: ScheduleListItemProps) => {
  return (
    <S.Container to={'/meeting-room'}>
      <S.LeftSection>
        <S.GroupItemBox>
          <GroupItem id={groupId} room_name={groupName} type="calendar" />
        </S.GroupItemBox>
        <S.GroupInfo>
          <S.MeetingTitle>{meetingTitle}</S.MeetingTitle>
          <S.GroupName>{groupName}</S.GroupName>
        </S.GroupInfo>
      </S.LeftSection>
      <S.RightSection>
        <S.WatchImg src={clockIcon} alt="시계" />
        <S.Time>9 : 00</S.Time>
      </S.RightSection>
    </S.Container>
  );
};

export default ScheduleListItem;

const S = {
  Container: styled(Link)`
    width: 100%;
    height: 82px;
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    background: var(--white);
    box-shadow: 0px 4px 6.8px 0px rgba(166, 196, 213, 0.57);
    margin-block: 2px;
    color: var(--blue05);
    border: 1px solid var(--white);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      border: 1px solid var(--blue01);
      transform: translateY(-2px);
    }
  `,
  LeftSection: styled.div`
    display: flex;
    gap: 13px;
    max-width: 70%;
  `,
  GroupItemBox: styled.div`
    min-width: 46px;
  `,
  GroupInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 50%;
  `,
  MeetingTitle: styled.span`
    font-size: 20px;
    font-weight: 700;
    min-width: 150px;
    white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 설정 */
    overflow: hidden; /* 넘치는 텍스트를 감출 수 있도록 설정 */
    text-overflow: ellipsis; /* 넘치는 텍스트에 ...을 추가하여 표시 */
  `,
  GroupName: styled.span`
    font-size: 14px;
    font-weight: 500;
  `,
  RightSection: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1px;
  `,
  WatchImg: styled.img`
    width: 20px;
    height: 20px;
  `,
  Time: styled.span`
    font-size: 18px;
    font-weight: 700;
  `,
};
