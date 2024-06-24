import { TGroupFetchMemberInfo } from '@api/group/group-request.type';
import { TUserInfoRes } from '@api/user/user-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useGroupMemberQuery } from '@hooks/react-query/use-query-group';
import { useGroupStore } from '@stores/group';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import ReportChattingList from './report-chatting-list';

interface TReportChattingBox {
  chattingList: TReportChatting[];
}
interface TReportChatting {
  message: string;
  nickName: string;
  profileImageUrl: string;
  roomId: number;
  timeStamp: string;
  userId: number;
  isMe: boolean;
}
const ReportChattingBox = ({ chattingList }: TReportChattingBox) => {
  const {
    data: { memberList },
  } = useGroupMemberQuery(useGroupStore((state) => state.groupId));
  const userInfo = useQueryClient().getQueryData<TUserInfoRes>([QUERY_KEY.userInfo]);
  const memberChatList = chattingList.map((chat: TReportChatting) => {
    const memberInfo = memberList.find((member: TGroupFetchMemberInfo) => chat.userId == member.id);
    const chatData = {
      ...chat,
      nickName: memberInfo.nickname,
      profileImageUrl: memberInfo.profileImageUrl,
      isMe: userInfo?.id == memberInfo.id,
    };
    return chatData;
  });
  return (
    <S.Container>
      <S.ChattingLists>
        {memberChatList.map((chat: TReportChatting, idx) => (
          <ReportChattingList key={idx} {...chat} />
        ))}
      </S.ChattingLists>
    </S.Container>
  );
};

export default ReportChattingBox;

const S = {
  Container: styled.div`
    grid-area: chat;
    display: flex;
    padding: 15px;
    border: 2px solid ${(props) => props.theme.box};
    border-radius: 10px;
    height: 654px;
    background: ${(props) => props.theme.theme10};
  `,
  ChattingLists: styled.ul`
    display: flex;
    gap: 10px;
    flex-direction: column;
    padding: 20px;
    overflow: auto;
    width: 100%;
  `,
};
