import styled from 'styled-components';

interface RoomButtonProps {
  type: string;
}

const RoomButton = ({ type }: RoomButtonProps) => {
  return <S.Container>{type}</S.Container>;
};

export default RoomButton;

const S = {
  Container: styled.div`
    width: 91px;
    height: 76px;
    opacity: 0.4;
    background: #c1c1c1;
  `,
};
