import { useEffect, useState } from 'react';
import { TMeetingInfo } from '@api/meeting/meeting-request.type';
import { useMeetingCreateMutation, useMeetingUpdateMutation } from '@hooks/react-query/use-query-meeting';
import { calculateEndDate } from '@pages/group-home/utils/calculate-end-date';
import { formatDateToISOStringWithOffset } from '@pages/group-home/utils/format-date-to-string';
import roundTo15minutes from '@pages/group-home/utils/round-to-15minutes';
import { TimeCalculate, TimeString } from '@pages/group-home/utils/time-calculate';
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
  data?: TMeetingInfo;
  onClose: () => void;
}
const MeetingForm = ({ data, onClose }: TMeetingFormProps) => {
  const { lobbyGroupId, initLobbyGroupId } = useLobbyGroupStore((state) => ({
    lobbyGroupId: state.lobbyGroupId,
    initLobbyGroupId: state.initLobbyGroupId,
  }));
  const groupId = useGroupStore((state) => state.groupId) || lobbyGroupId;
  const meetingCreate = useMeetingCreateMutation(groupId);
  const meetingUpdate = useMeetingUpdateMutation(groupId, data?.id);
  const dateTime = data
    ? TimeString(TimeCalculate(new Date(data.startDate), new Date(data.expectedEndDate))).trim()
    : '회의 시간을 선택해 주세요!';
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    data ? roundTo15minutes(new Date(data.startDate)) : roundTo15minutes(new Date()),
  );
  const [selectedTime, setSelectedTime] = useState<string>(dateTime);
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
      isEditMode ? await meetingUpdate.mutateAsync(meetingData) : await meetingCreate.mutateAsync(meetingData);

      if (lobbyGroupId) initLobbyGroupId();
      onClose();
    } catch (error) {
      setSelectedDate(data ? roundTo15minutes(new Date(data.startDate)) : roundTo15minutes(new Date()));
      setSelectedTime(dateTime);
    }
  };

  useEffect(() => {
    if (data) {
      setTitle(data.meetingTitle || '');
    }
    if (data?.topicList) {
      const topicList = data.topicList
        .map((t) => t)
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map((t) => t.topicName);
      setTopicList(topicList);
    }
  }, [data]);

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
