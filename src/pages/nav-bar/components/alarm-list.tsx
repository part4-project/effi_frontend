import { ALARM_LIST } from '@constants/mockdata';
import styled from 'styled-components';
import AlarmEmpty from './alarm-empty';
import AlarmInvite from './alarm-invite';
import AlarmMeeting from './alarm-meeting';

const AlarmList = () => {
  const isAlarmList = !!ALARM_LIST.length;
  return (
    <S.AlarmListWrap $isAlarmList={isAlarmList}>
      <S.AlarmListContent $isAlarmList={isAlarmList}>
        {isAlarmList ? (
          ALARM_LIST.map((alarmList) => {
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
          })
        ) : (
          <AlarmEmpty />
        )}
      </S.AlarmListContent>
    </S.AlarmListWrap>
  );
};

export default AlarmList;

const S = {
  AlarmListWrap: styled.div<{ $isAlarmList: boolean }>`
    padding: ${({ $isAlarmList }) => ($isAlarmList ? '12px 12px 0px 5px' : '0')};
    max-height: 50vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: block;
    }

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.scrollBar};
      border-radius: 16px;
    }

    &::-webkit-scrollbar-track {
      background: ${(props) => props.theme.scroll};
    }
  `,
  AlarmListContent: styled.div<{ $isAlarmList: boolean }>`
    padding: ${({ $isAlarmList }) => ($isAlarmList ? '0 18px 16px 0' : '0')};
  `,
  AlarmItemWrap: styled.div`
    padding-block: 18px;
    border-bottom: 1px solid ${(props) => props.theme.line};
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      border-bottom: 0;
    }
  `,
};
