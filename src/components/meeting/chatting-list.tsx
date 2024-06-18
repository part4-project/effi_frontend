import useTransformUser from '@hooks/use-transform-user';
import { formatHoursAmPm } from '@pages/group-home/utils/format-hours-ampm';
import { TChatSocketType } from '@pages/meeting-room/types';
import styled from 'styled-components';
interface TChattingProp {
  type: 'report-modal' | 'meeting-room';
  socket: TChatSocketType;
}
const ChattingList = ({ socket, type = 'report-modal' }: TChattingProp) => {
  const chat = useTransformUser(socket);
  if (!chat) return;
  return (
    <S.ChattingList>
      <S.ChattingIcon src={chat.profileImageUrl} alt="profile" />
      <S.ChattingBox>
        <S.ChattingUserName>{chat.nickname}</S.ChattingUserName>
        <S.ChattingLog $type={type}>{chat.message}</S.ChattingLog>
      </S.ChattingBox>
      <S.ChattingSentTime>{chat.timeStamp}</S.ChattingSentTime>
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
    color: var(--gray01);
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.6px;
  `,
  ChattingLog: styled.p<{ $type: ChattingListProps['type'] }>`
    border-radius: 16px;
    background: ${({ $type, theme }) => ($type === 'meeting-room' ? 'var(--gray06)' : theme.theme01)};
    padding: 6px 20px;
    color: var(--white);
    line-height: 28px;
    letter-spacing: -0.6px;
  `,
  ChattingSentTime: styled.p`
    display: flex;
    align-items: end;
    color: var(--gray01);
    font-size: 12px;
    letter-spacing: -0.6px;
  `,
};
