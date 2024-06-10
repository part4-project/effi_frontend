import { useEffect, useState } from 'react';
import { TMeetingRoom, TTopic } from '@constants/mockdata.type';
import roundTo15minutes from '@pages/group-home/utils/round-to-15minutes';
import styled from 'styled-components';
import MeetingDate from './meeting-date';
import MeetingExpectedTime from './meeting-expected-time';
import MeetingSubmitButtonBox from './meeting-submit-button-box';
import MeetingTitleInput from './meeting-title-input';
import MeetingTopicAddBox from './meeting-topic-add-box';
import MeetingTopicList from './meeting-topic-list';

interface TMeetingFormProps {
  data?: TMeetingRoom;
  topicData?: TTopic;
}
const MeetingForm = ({ data, topicData }: TMeetingFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(roundTo15minutes(new Date()));
  const [selectedTime, setSelectedTime] = useState<string>('회의 시간을 선택해 주세요!');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [topicList, setTopicList] = useState<string[]>([]);

  const isConfirm = !!(selectedDate && parseInt(selectedTime) && title);
  const isEditMode = !!data;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const handleDateChange = (date: Date) => {
    if (date instanceof Date || date === null) {
      setSelectedDate(date);
    }
  };

  const handleTimeClick = (selectedTime: string) => {
    setSelectedTime(selectedTime);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false && topic.trim()) {
      setTopicList((prevTopicList) => [...prevTopicList, topic]);
      setTopic('');
    }
  };

  const handleAddTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value);

  const handleAddTopicClick = (newTopic: string) => {
    if (!topic.trim()) return;
    setTopicList((prevTopicList) => [...prevTopicList, newTopic]);
    setTopic('');
  };

  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
    }
    if (topicData) {
      setTopicList(topicData.topic_list.map((t) => t.topic_name));
    }
  }, [data, topicData]);

  return (
    <S.Container>
      <MeetingTitleInput title={title} onChange={handleTitleChange} />
      <S.MeetingTimeBox>
        <MeetingDate selectedDate={selectedDate} onChange={handleDateChange} />
        <MeetingExpectedTime selectedTime={selectedTime} onClick={handleTimeClick} />
      </S.MeetingTimeBox>
      <MeetingTopicAddBox
        topic={topic}
        onChange={handleAddTopicChange}
        onKeyDown={handleKeyDown}
        onClick={handleAddTopicClick}
      />
      <MeetingTopicList topicList={topicList} setTopicList={setTopicList} />
      <MeetingSubmitButtonBox isEditMode={isEditMode} isConfirm={isConfirm} />
    </S.Container>
  );
};

export default MeetingForm;

const S = {
  Container: styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 25px;
  `,
  MeetingTimeBox: styled.div`
    display: flex;
    gap: 44px;
    padding: 0 10px;
  `,
  SubmitBox: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 10px;
  `,
};
