import GroupCreateModalButton from '@pages/side-bar/components/modal/group-create-modal-button';
import styled from 'styled-components';

const EmptyGroupNotice = () => {
  return (
    <S.Container>
      <S.Text>
        생성된 그룹이 없습니다.
        <br /> 그룹을 만들고, 회의도 진행해보세요!
      </S.Text>
      <S.ButtonBox>
        <GroupCreateModalButton>그룹 만들기</GroupCreateModalButton>
      </S.ButtonBox>
    </S.Container>
  );
};

export default EmptyGroupNotice;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 380px;
    height: 148px;
    gap: 20px;
  `,
  Text: styled.span`
    width: 302px;
    color: var(--blue05);
    text-align: center;
    font-size: 18px;
    font-weight: 700;
  `,
  ButtonBox: styled.div`
    width: 132px;
    border-radius: 30px;
    padding: 10px 0;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    font-family: 'Pretendard';
    color: var(--blue01);
    background-color: var(--white);
    border: 1px solid var(--blue01);
    &:hover {
      color: var(--white);
      background-color: var(--blue01);
      border: 1px solid transparent;
    }
  `,
};
