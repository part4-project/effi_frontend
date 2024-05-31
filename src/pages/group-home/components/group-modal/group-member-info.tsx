import styled from 'styled-components';

interface GroupMemberInfoProp {
  id: number;
  name: string;
  is_admin: boolean;
}

const GroupMemberInfo: React.FC<GroupMemberInfoProp> = ({ name }) => {
  return (
    <S.MemberInfoWrap>
      <S.MemberInfo>
        <S.MemberName>{name}</S.MemberName>
        <S.MemberEmail>이메일</S.MemberEmail>
      </S.MemberInfo>
      <S.MemberExileBtnBox>
        <S.MemberExileBtn>내보내기</S.MemberExileBtn>
      </S.MemberExileBtnBox>
    </S.MemberInfoWrap>
  );
};

export default GroupMemberInfo;

const S = {
  MemberInfoWrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #c1c1c1;
    border-radius: 8px;
  `,
  MemberInfo: styled.div`
    display: flex;
    gap: 4px;
    align-items: end;
  `,
  MemberName: styled.div``,
  MemberEmail: styled.div`
    font-size: 10px;
  `,
  MemberExileBtnBox: styled.div`
    padding: 8px 12px;
    border-radius: 8px;
    background-color: #cccccc;
  `,
  MemberExileBtn: styled.button``,
};
