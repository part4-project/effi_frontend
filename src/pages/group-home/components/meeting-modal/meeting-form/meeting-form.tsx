import { useEffect, useState } from 'react';
import { TMeetingRoom, TTopic } from '@constants/mockdata.type';
import { useMeetingCreateMutation } from '@hooks/react-query/use-query-meeting';
import { calculateEndDate } from '@pages/group-home/utils/calculate-end-date';
import { formatDateToISOStringWithOffset } from '@pages/group-home/utils/format-date-to-string';
import roundTo15minutes from '@pages/group-home/utils/round-to-15minutes';
import { useGroupStore } from '@stores/group';
import { useLobbyGroupStore } from '@stores/lobby-group';
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
  onClose: () => void;
}
const MeetingForm = ({ data, topicData, onClose }: TMeetingFormProps) => {
  const { lobbyGroupId, initLobbyGroupId } = useLobbyGroupStore((state) => ({
    lobbyGroupId: state.lobbyGroupId,
    initLobbyGroupId: state.initLobbyGroupId,
  }));
  const groupId = useGroupStore((state) => state.groupId) || lobbyGroupId;
  const meetingCreate = useMeetingCreateMutation(groupId);

  const [selectedDate, setSelectedDate] = useState<Date | null>(roundTo15minutes(new Date()));
  const [selectedTime, setSelectedTime] = useState<string>('회의 시간을 선택해 주세요!');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [topicList, setTopicList] = useState<string[]>([]);

  const transformedTopicList = topicList.map((topic, index) => ({
    topicName: topic,
    isCompleted: false,
    orderIndex: index,
  }));

  const endDate: Date | null = calculateEndDate(selectedDate, selectedTime);

  const meetingData = {
    meetingTitle: title,
    startDate: formatDateToISOStringWithOffset(selectedDate),
    expectedEndDate: formatDateToISOStringWithOffset(endDate),
    topicList: transformedTopicList,
  };

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

  const handleSubmitButtonClick = async () => {
    try {
      await meetingCreate.mutateAsync(meetingData);
      if (lobbyGroupId) initLobbyGroupId();
      onClose();
    } catch (error) {
      setSelectedDate(roundTo15minutes(new Date()));
      setSelectedTime('회의 시간을 선택해 주세요!');
    }
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
      <MeetingSubmitButtonBox isEditMode={isEditMode} isConfirm={isConfirm} onSubmit={handleSubmitButtonClick} />
    </S.Container>
  );
};

export default MeetingForm;

const S = {
  Container: styled.div`
    width: 520px;
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
