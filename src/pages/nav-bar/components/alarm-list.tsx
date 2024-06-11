import { ALARM_LIST } from '@constants/mockdata';
import styled from 'styled-components';
import AlarmInvite from './alarm-invite';
import AlarmMeeting from './alarm-meeting';

const AlarmList = () => {
  return (
    <S.AlarmListWrap>
      {ALARM_LIST.map((alarmList) => {
        if (alarmList.type === 'meeting') {
          return (
            <S.AlarmItemWrap key={alarmList.id}>
              <AlarmMeeting {...alarmList} />
            </S.AlarmItemWrap>
          );
        } else if (alarmList.type === 'invite') {
          return (
            <S.AlarmItemWrap key={alarmList.id}>
              <AlarmInvite {...alarmList} />
            </S.AlarmItemWrap>
          );
        }
      })}
    </S.AlarmListWrap>
  );
};

export default AlarmList;

const S = {
  AlarmListWrap: styled.div`
    padding: 0 18px 16px 0;
    max-height: 50vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: block;
    }

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #d6d6d7;
      border-radius: 16px;
    }

    &::-webkit-scrollbar-track {
      background: var(--gray03);
    }
  `,
  AlarmItemWrap: styled.div`
    padding-block: 18px;
    border-bottom: 1px solid var(--blue02, #d2e3ed);
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      border-bottom: 0;
    }
  `,
};
