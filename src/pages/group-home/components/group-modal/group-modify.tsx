import closeBtn from '@assets/icons/close-btn.svg';
import styled from 'styled-components';
import GroupInvite from './group-invite';
import GroupMemberList from './group-member-list';

const GroupModify = () => {
  return (
    <S.ModalWrap>
      <S.ModalHeader>
        <S.ModalTitle>그룹관리</S.ModalTitle>
        <S.CloseBtn>
          <img src={closeBtn} alt="close" />
        </S.CloseBtn>
      </S.ModalHeader>
      <S.ModalContent>
        <GroupInvite />
        <GroupMemberList />
      </S.ModalContent>
      <S.ModalFooter>
        <S.GroupDisbandment>그룹해체하기</S.GroupDisbandment>
        <S.SaveBtnBox>
          <S.SaveBtn>저장하기</S.SaveBtn>
        </S.SaveBtnBox>
      </S.ModalFooter>
    </S.ModalWrap>
  );
};

export default GroupModify;

const S = {
  ModalWrap: styled.div`
    width: 100%;
  `,
  ModalHeader: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  ModalTitle: styled.div``,
  CloseBtn: styled.div``,
  ModalContent: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 8px;
  `,
  ModalFooter: styled.div`
    margin-top: 8px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  GroupDisbandment: styled.div`
    cursor: pointer;
  `,
  SaveBtnBox: styled.div`
    padding: 8px 12px;
    border-radius: 8px;
    background-color: #cccccc;
  `,
  SaveBtn: styled.button``,
};
