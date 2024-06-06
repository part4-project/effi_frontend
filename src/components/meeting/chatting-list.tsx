import { formatHoursAmPm } from '@pages/group-home/utils/format-hours-ampm';
import styled from 'styled-components';
import testProfile from '@/assets/profile-test-img.gif';

interface ChattingListProps {
  nickname: string;
  chat: string;
  sentTime: string;
  type?: 'report-modal' | 'meeting-room';
  //TODO: Profile 추가하기
}

const ChattingList = ({ nickname, chat, sentTime, type = 'report-modal' }: ChattingListProps) => {
  return (
    <S.ChattingList>
      <S.ChattingIcon src={testProfile} />
      <S.ChattingBox>
        <S.ChattingUserName>{nickname}</S.ChattingUserName>
        <S.ChattingLog $type={type}>{chat}</S.ChattingLog>
      </S.ChattingBox>
      <S.ChattingSentTime>{formatHoursAmPm(sentTime)}</S.ChattingSentTime>
    </S.ChattingList>
  );
};
export default ChattingList;

const S = {
  ChattingList: styled.li`
    display: flex;
  `,
  ChattingIcon: styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
  `,
  ChattingBox: styled.div`
    margin: 8px 5px 0 8px;
    max-width: 70%;
  `,
  ChattingUserName: styled.p`
    color: #9e9e9e;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.6px;
  `,
  ChattingLog: styled.p<{ $type: ChattingListProps['type'] }>`
    border-radius: 16px;
    background: ${({ $type }) => ($type === 'meeting-room' ? '#404040' : 'var(--blue01)')};
    padding: 6px 20px;
    color: var(--white);
    line-height: 28px;
    letter-spacing: -0.6px;
  `,
  ChattingSentTime: styled.p`
    display: flex;
    align-items: end;
    color: #9e9e9e;
    font-size: 12px;
    letter-spacing: -0.6px;
  `,
};
