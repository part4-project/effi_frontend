import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Meetings = () => {
  const navigate = useNavigate();

  const handleMeetingClick = () => {
    navigate('/meeting-room');
  };

  return (
    <S.Container>
      <S.Meetings>
        <div onClick={handleMeetingClick}>회의중</div>
        <div>회의 예정</div>
      </S.Meetings>
    </S.Container>
  );
};

export default Meetings;

const S = {
  Container: styled.div``,

  Meetings: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin: 30px 0 50px;
    cursor: pointer;
    div {
      background-color: rgba(0, 0, 0, 0.04);
      border-radius: 6px;
      width: 400px;
      aspect-ratio: 1.3/1;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
      &:hover {
        background-color: rgba(0, 0, 0, 0.07);
      }
    }
  `,
};
