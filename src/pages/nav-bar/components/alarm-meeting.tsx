import { useRef } from 'react';
import MeetingAlarm from '@assets/icons/meeting-alarm.svg';
import styled from 'styled-components';
import useCheckLines from '../hooks/use-check-line';
interface AlarmMeetingProp {
  id: number;
  type: string;
  group_name: string;
  remind_time: number;
}
const AlarmMeeting = ({ group_name, remind_time }: AlarmMeetingProp) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const lines = useCheckLines(textRef);
  const isWrap = lines > 1 ? '\n' : ' ';
  return (
    <S.AlarmContent>
      <S.AlarmImgBox>
        <img src={MeetingAlarm} alt="alarm" />
      </S.AlarmImgBox>
      <S.AlarmTextBox>
        <S.AlarmTitle>
          {`${remind_time}분뒤 \n`}
          <S.GroupName ref={textRef}>
            {`${group_name}${isWrap}`}
            <S.NoColor>미팅 시작</S.NoColor>
          </S.GroupName>
        </S.AlarmTitle>
        <S.AlarmText>{`${remind_time}분 뒤에 미팅이 시작됩니다.`}</S.AlarmText>
      </S.AlarmTextBox>
    </S.AlarmContent>
  );
};

export default AlarmMeeting;

const S = {
  AlarmContent: styled.div`
    display: flex;
    align-items: start;
    gap: 13px;
  `,
  AlarmImgBox: styled.div`
    flex: 0 0 auto;
  `,
  AlarmTextBox: styled.div`
    display: flex;
    flex-direction: column;
  `,
  AlarmTitle: styled.h3`
    color: var(--blue05, #132f5c);
    font-size: 20px;
    font-weight: 700;
    white-space: pre-wrap;
    word-wrap: break-word;
  `,
  AlarmText: styled.p`
    color: var(--blue05, #132f5c);
    font-size: 14px;
    font-weight: 500;
    margin-top: 4px;
  `,
  GroupName: styled.p`
    color: var(--blue01, #3e82f1);
    line-height: 24px;
    white-space: pre-wrap;
  `,
  NoColor: styled.span`
    color: var(--blue05, #132f5c);
  `,
};
