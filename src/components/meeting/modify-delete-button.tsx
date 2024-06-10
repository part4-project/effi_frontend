import styled from 'styled-components';

interface ModifyDeleteButtonProps {
  onModifyClick?: () => void;
  onDeleteClick?: () => void;
}

const ModifyDeleteButton = ({ onModifyClick, onDeleteClick }: ModifyDeleteButtonProps) => {
  return (
    <S.Container>
      <S.Button onClick={onModifyClick}>수정</S.Button>
      <S.Slash>/</S.Slash>
      <S.Button onClick={onDeleteClick}>삭제</S.Button>
    </S.Container>
  );
};

export default ModifyDeleteButton;

const S = {
  Container: styled.div`
    display: flex;
    gap: 2px;
  `,
  Button: styled.button`
    color: var(--gray01);
    font-family: 'Pretendard';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.48px;
  `,
  Slash: styled.span`
    color: var(--gray01);
    font-family: 'Pretendard';
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.48px;
  `,
};
