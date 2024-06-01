import { useEffect, useState } from 'react';
import { TMeetingRoom, TTopic } from '@constants/mockdata.type';
// import Calendar from 'react-calendar';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

interface TMeetingFormProps {
  data?: TMeetingRoom;
  topicData?: TTopic;
}

const MeetingForm = ({ data, topicData }: TMeetingFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [topicList, setTopicList] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && topic.trim()) {
      setTopicList([...topicList, topic]);
      setTopic('');
    }
  };

  const currentDateTime = new Date();
  const currentHour = currentDateTime.getHours();
  const currentMinute = currentDateTime.getMinutes();

  useEffect(() => {
    if (data) {
      setName(data.title || '');
    }
    if (topicData) {
      setTopicList(topicData.topic_list.map((t) => t.topic_name));
    }
  }, [data, topicData]);

  return (
    <S.Container>
      <label>시작 일자</label>

      <S.StyledDatePicker
        selected={selectedDate}
        dateFormat="yyyy/MM/dd - aa h:mm"
        onChange={(date) => {
          if (date instanceof Date || date === null) {
            setSelectedDate(date);
          }
        }}
        showTimeSelect
        timeIntervals={15}
        minDate={new Date()}
        minTime={currentHour === 23 ? new Date() : new Date(currentDateTime.setHours(currentHour, currentMinute))}
        maxTime={new Date(currentDateTime.setHours(23, 59))}
      />

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

  StyledDatePicker: styled(DatePicker)`
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    margin: 10px 0 20px;
    padding: 10px;
    min-width: 300px;
  `,

  CalenderInput: styled.div`
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    margin: 10px 0 20px;
    padding: 10px;
    min-width: 300px;
  `,

  CalenderContainer: styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50px;
    /* left: 180px; */
  `,

  DateConfirmButton: styled.button`
    background-color: #c1c1c1;
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
