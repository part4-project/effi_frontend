import { useEffect, useState } from 'react';
import { TMeetingRoom, TTopic } from '@constants/mockdata.type';
import Calendar from 'react-calendar';
import styled from 'styled-components';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
interface TMeetingFormProps {
  data?: TMeetingRoom;
  topicData?: TTopic;
}

const MeetingForm = ({ data, topicData }: TMeetingFormProps) => {
  const [calenderDrop, setCalenderDrop] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [topicList, setTopicList] = useState<string[]>([]);

  const handleChangeCalender = (e: Value) => {
    setSelectedDate(e);
    if (e instanceof Date) {
      setDate(e.toLocaleString());
    } else if (Array.isArray(e) && e[0] instanceof Date) {
      setDate(e[0].toLocaleString());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && topic.trim()) {
      setTopicList([...topicList, topic]);
      setTopic('');
    }
  };

  useEffect(() => {
    if (data) {
      setDate(data.start_date || '');
      setName(data.title || '');
    }
    if (topicData) {
      setTopicList(topicData.topic_list.map((t) => t.topic_name));
    }
  }, [data, topicData]);

  return (
    <S.Container>
      <label>시작 일자</label>
      <S.StyledInput
        type="text"
        placeholder="시작 일자를 선택하세요"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        onClick={() => setCalenderDrop(true)}
        readOnly
      />
      {calenderDrop && (
        <S.CalenderContainer>
          <Calendar onChange={handleChangeCalender} value={selectedDate} />
          <S.DateConfirmButton onClick={() => setCalenderDrop(false)}>확인</S.DateConfirmButton>
        </S.CalenderContainer>
      )}

      <label>회의실 이름</label>
      <S.StyledInput
        type="text"
        placeholder="회의실 이름을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>주제</label>
      <S.StyledInput
        type="text"
        placeholder="주제 작성 후 Enter키를 누르세요"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <ul>
        {topicList.map((t, index) => (
          <li key={index}>• {t}</li>
        ))}
      </ul>
    </S.Container>
  );
};

export default MeetingForm;

const S = {
  Container: styled.div`
    margin: 30px 0 30px;
    display: flex;
    flex-direction: column;
  `,

  CalenderContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  DateConfirmButton: styled.button`
    background-color: rgba(0, 0, 0, 0.1);
    padding: 6px;
  `,

  StyledInput: styled.input`
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    margin: 10px 0 20px;
    padding: 10px;
    min-width: 300px;
  `,
};
