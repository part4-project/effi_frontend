import { TAlarm } from '@api/alarm/alarm-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import AlarmEmpty from './alarm-empty';
import AlarmInvite from './alarm-invite';

interface AlarmListProps {
  handleDropdownClose: () => void;
  handleProfileModalOpen: () => void;
}

const AlarmList = ({ handleProfileModalOpen, handleDropdownClose }: AlarmListProps) => {
  const alarmSocketList = useQueryClient().getQueryData<TAlarm[]>([QUERY_KEY.alarmList]);

  const isAlarmList = !!alarmSocketList?.length;

  return (
    <S.AlarmListWrap $isAlarmList={isAlarmList}>
      <S.AlarmListContent $isAlarmList={isAlarmList}>
        {isAlarmList ? (
          alarmSocketList.reverse().map((alarmList, idx) => (
            <S.AlarmItemWrap key={idx}>
              <AlarmInvite
                {...alarmList}
                handleProfileModalOpen={handleProfileModalOpen}
                handleDropdownClose={handleDropdownClose}
              />
            </S.AlarmItemWrap>
          ))
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
      background: ${(props) => props.theme.scrollAlarm};
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
