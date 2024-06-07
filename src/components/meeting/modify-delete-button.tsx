import styled from 'styled-components';

interface ModifyDeleteButtonProps {
  onModifyClick?: () => void;
  onDeleteClick?: () => void;
}

const ModifyDeleteButton = ({ onModifyClick, onDeleteClick }: ModifyDeleteButtonProps) => {
  return (
    <S.Container>
      <button onClick={onModifyClick}>수정</button>
      <p>/</p>
      <button onClick={onDeleteClick}>삭제</button>
    </S.Container>
  );
};

export default ModifyDeleteButton;

const S = {
  Container: styled.div`
    display: flex;
    gap: 2px;
    button,
    p {
      color: var(--gray01);
      font-family: Pretendard;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 0.48px;
    }
  `,
};
