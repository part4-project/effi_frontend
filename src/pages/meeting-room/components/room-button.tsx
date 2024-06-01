import styled from 'styled-components';

interface RoomButtonProps {
  type: string;
  onClick: () => void;
}

const RoomButton = ({ type, onClick }: RoomButtonProps) => {
  return <S.RoomButton onClick={onClick}>{type}</S.RoomButton>;
};

export default RoomButton;

const S = {
  RoomButton: styled.button`
    width: 91px;
    height: 76px;
    opacity: 0.4;
    background: #c1c1c1;
  `,
};
