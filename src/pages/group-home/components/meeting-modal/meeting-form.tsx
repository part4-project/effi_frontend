import { useEffect, useState, forwardRef } from 'react';
import ModifyDeleteButton from '@components/meeting/modify-delete-button';
import ModalButton from '@components/modal/modal-button';
import { EXPECTED_END_TIME_LIST } from '@constants/mockdata';
import { TMeetingRoom, TTopic } from '@constants/mockdata.type';
import { formatDateToString } from '@pages/group-home/utils/format-date-to-string';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import DropDownSelector from './dropdown-selector';
import 'react-datepicker/dist/react-datepicker.css';

interface TMeetingFormProps {
  data?: TMeetingRoom;
  topicData?: TTopic;
}

const MeetingForm = ({ data, topicData }: TMeetingFormProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('회의 시간을 선택해 주세요!');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [topicList, setTopicList] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const currentDateTime = new Date();
  const currentHour = currentDateTime.getHours();
  const currentMinute = currentDateTime.getMinutes();

  const isConfirm = selectedDate && parseInt(selectedTime) && title;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false && topic.trim()) {
      setTopicList((prevTopicList) => [...prevTopicList, topic]);
      setTopic('');
    }
  };
  const handleAddTopicClick = (newTopic: string) => {
    if (!topic.trim()) return;
    setTopicList((prevTopicList) => [...prevTopicList, newTopic]);
    setTopic('');
  };

  const handleSelectButtonClick = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const handleDateChange = (date: Date) => {
    if (date instanceof Date || date === null) {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (selectedTime: string) => {
    setSelectedTime(selectedTime);
    setIsDropDownOpen(false);
  };

  const handleModifyClick = (index: number) => {
    setEditIndex(index);
    setEditValue(topicList[index]);
    setIsEditing(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = () => {
    if (editIndex !== null && editValue.trim() !== '') {
      setTopicList((prevTopicList) => {
        const newList = [...prevTopicList];
        newList[editIndex] = editValue;
        return newList;
      });
      setIsEditing(false);
      setEditIndex(null);
      setEditValue('');
    }
  };

  const handleDeleteClick = (index: number) => {
    setTopicList((prevTopicList) => {
      const newList = [...prevTopicList];
      newList.splice(index, 1);
      return newList;
    });
  };

  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
    }
    if (topicData) {
      setTopicList(topicData.topic_list.map((t) => t.topic_name));
    }
  }, [data, topicData]);

  const DatePickerCustomInput = forwardRef<HTMLButtonElement, { onClick?: () => void }>(({ onClick }, ref) => (
    <S.SelectCustomButton onClick={onClick} ref={ref}>
      회의 일시
    </S.SelectCustomButton>
  ));

  return (
    <S.Container>
      <S.TitleContainer>
        <S.StyledTitleInput type="text" placeholder="제목" value={title} onChange={handleTitleChange} />
      </S.TitleContainer>
      <S.MeetingTimeBox>
        <S.SelectTypeBox>
          <DatePicker
            selected={selectedDate}
            dateFormat="yyyy/MM/dd - aa h:mm"
            onChange={handleDateChange}
            showTimeSelect
            timeIntervals={15}
            minDate={new Date()}
            minTime={currentHour === 23 ? new Date() : new Date(currentDateTime.setHours(currentHour, currentMinute))}
            maxTime={new Date(currentDateTime.setHours(23, 59))}
            customInput={<DatePickerCustomInput />}
          />
          <S.SelectedValue>{formatDateToString(selectedDate)}</S.SelectedValue>
        </S.SelectTypeBox>
        <S.SelectTypeBox>
          <S.ExpectedTime>
            <S.SelectCustomButton onClick={handleSelectButtonClick}>예상 회의 시간</S.SelectCustomButton>
            {isDropDownOpen && <DropDownSelector timeList={EXPECTED_END_TIME_LIST} onClick={handleTimeChange} />}
          </S.ExpectedTime>
          <S.SelectedValue>{selectedTime}</S.SelectedValue>
        </S.SelectTypeBox>
      </S.MeetingTimeBox>
      <S.AddTopicBox>
        <S.StyledTopicInput
          type="text"
          placeholder="회의 안건을 추가해보세요!"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <S.TopicAddButton onClick={() => handleAddTopicClick(topic)}>안건 추가하기</S.TopicAddButton>
      </S.AddTopicBox>
      {topicList.length ? (
        <S.TopicListBox>
          {topicList.map((topic, index) => (
            <S.TopicList key={index}>
              {isEditing && editIndex === index ? (
                <>
                  <S.EditInput
                    type="text"
                    value={editValue}
                    onChange={handleEditChange}
                    onBlur={handleEditSubmit}
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}
                  />
                  <S.ConfirmButton onClick={handleEditSubmit}>확인</S.ConfirmButton>
                </>
              ) : (
                <>
                  <S.TopicItem>{topic}</S.TopicItem>
                  <ModifyDeleteButton
                    onModifyClick={() => handleModifyClick(index)}
                    onDeleteClick={() => handleDeleteClick(index)}
                  />
                </>
              )}
            </S.TopicList>
          ))}
        </S.TopicListBox>
      ) : (
        <S.EmptyTopicList>추가된 안건이 없습니다!</S.EmptyTopicList>
      )}
      <S.SubmitBox>
        {data ? (
          <>
            <ModalButton type="secondary">삭제하기</ModalButton>
            <ModalButton type={isConfirm ? 'primary' : 'disable'}>수정하기</ModalButton>
          </>
        ) : (
          <ModalButton type={isConfirm ? 'primary' : 'disable'}>회의 생성하기</ModalButton>
        )}
      </S.SubmitBox>
    </S.Container>
  );
};

export default MeetingForm;

const S = {
  Container: styled.div`
    width: 500px;
    margin: 30px 0 30px;
    display: flex;
    flex-direction: column;
    gap: 25px;
  `,

  TitleContainer: styled.div`
    width: 100%;
    border-bottom: 1px solid var(--gray01);
    padding: 10px;
  `,

  StyledTitleInput: styled.input`
    font-size: 32px;
    font-weight: 700;
    line-height: 35px;
    color: var(--blue05);
  `,

  MeetingTimeBox: styled.div`
    display: flex;
    gap: 44px;
    padding: 0 10px;
  `,

  SelectTypeBox: styled.div`
    display: flex;
    align-items: center;
  `,

  SelectedValue: styled.p`
    color: var(--gray01);
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    margin-left: 12px;
  `,

  SelectCustomButton: styled.button`
    color: var(--gray01);
    font-weight: 700;
    line-height: 24px;
    text-decoration-line: underline;
  `,

  ExpectedTime: styled.div`
    position: relative;
  `,

  AddTopicBox: styled.div`
    margin-top: 20px;
    display: flex;
    gap: 10px;
  `,

  StyledTopicInput: styled.input`
    width: 75%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid var(--gray01);
    background: #fafafa;
    padding: 10px 15px;

    &::placeholder {
      color: var(--gray02);
    }
  `,

  TopicAddButton: styled.button`
    width: 25%;
    height: 40px;
    border-radius: 5px;
    background: var(--blue02);
    color: var(--blue01);
    font-size: 14px;
    font-weight: 700;
    padding: 10px;
  `,

  TopicListBox: styled.ul`
    padding: 10px;
    height: 110px;
    overflow: auto;
  `,

  TopicList: styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--gray02);
    padding: 8px 0;

    &:last-child {
      border-bottom: none;
    }
  `,

  TopicItem: styled.li`
    color: var(--gray01);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.56px;
  `,

  EditInput: styled.input`
    width: 80%;
    color: var(--gray01);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.56px;
  `,

  ConfirmButton: styled.button`
    background-color: var(--blue02);
    color: var(--blue01);
    font-size: 10px;
    font-weight: 700;
    padding: 0 10px;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
  `,

  EmptyTopicList: styled.div`
    width: 100%;
    height: 110px;
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--gray01);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.56px;
    border-radius: 5px;
  `,

  SubmitBox: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 10px;
  `,
};
