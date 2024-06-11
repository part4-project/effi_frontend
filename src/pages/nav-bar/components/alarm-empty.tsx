import AlarmEmptyIcon from '@assets/icons/alarm-empty.svg';
import styled from 'styled-components';

const AlarmEmpty = () => {
  return (
    <S.AlarmWrap>
      <S.AlarmContent>
        <div>
          <img src={AlarmEmptyIcon} alt="icon" />
        </div>
        <div>
          <span>알림이 없습니다</span>
        </div>
      </S.AlarmContent>
    </S.AlarmWrap>
  );
};

export default AlarmEmpty;

const S = {
  AlarmWrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--blue03, #edf7f8);
    border-radius: 5px;
    padding-block: 20px;
  `,
  AlarmContent: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  `,
  AlarmEmptyText: styled.div`
    color: var(--blue05, #132f5c);
    text-align: center;
    font-size: 14px;
    font-weight: 500;
  `,
};
