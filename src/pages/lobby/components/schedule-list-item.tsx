import clockIcon from '@assets/icons/clock.svg';
import GroupItem from '@pages/side-bar/components/group-item';
import { useGroupStore } from '@stores/group';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { formatCalenderListTime } from '../utils/format-date';

interface ScheduleListItemProps {
  groupId: number;
  startDate: string;
  meetingTitle: string;
  groupName: string;
}

const ScheduleListItem = ({ groupId, groupName, startDate, meetingTitle }: ScheduleListItemProps) => {
  const setGroupId = useGroupStore((state) => state.setGroupId);
  const navigate = useNavigate();

  const handleListClick = () => {
    setGroupId(groupId);
    navigate('/group-home');
  };

  return (
    <S.BorderBox onClick={handleListClick}>
      <S.Container>
        <S.LeftSection>
          <S.GroupItemBox>
            <GroupItem groupId={groupId} groupName={startDate} type="calendar" />
          </S.GroupItemBox>
          <S.GroupInfo>
            <S.MeetingTitle>{meetingTitle}</S.MeetingTitle>
            <S.GroupName>{groupName}</S.GroupName>
          </S.GroupInfo>
        </S.LeftSection>
        <S.RightSection>
          <S.WatchImg src={clockIcon} alt="시계" />
          <S.Time>{formatCalenderListTime(startDate)}</S.Time>
        </S.RightSection>
      </S.Container>
    </S.BorderBox>
  );
};

export default ScheduleListItem;

const S = {
  BorderBox: styled.div`
    padding-bottom: 4px;
    border-bottom: 1px solid ${(props) => props.theme.line};

    &:last-child {
      border-bottom: none;
    }
  `,
  Container: styled.div`
    width: 100%;
    height: 82px;
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    background: ${(props) => props.theme.schedule};
    box-shadow: 0px 4px 6.8px 0px ${(props) => props.theme.boxShadow};
    margin-block: 2px;
    color: ${(props) => props.theme.text03};
    border: 1px solid ${(props) => props.theme.schedule};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      border: 1px solid ${(props) => props.theme.text02};
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
