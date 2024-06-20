import { useState } from 'react';
import EmptyNotice from '@components/empty-notice';
import ModifyDeleteButton from '@components/meeting/modify-delete-button';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import styled from 'styled-components';
import dropdownIcon from '@/assets/icons/dropdown.svg';

interface MeetingTopicListProps {
  topicList: string[];
  setTopicList: React.Dispatch<React.SetStateAction<string[]>>;
}

const MeetingTopicList = ({ topicList, setTopicList }: MeetingTopicListProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleModifyClick = (index: number) => {
    setEditIndex(index);
    setEditValue(topicList[index]);
    setIsEditing(true);
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

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updatedList = Array.from(topicList);
    const [reorderedItem] = updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, reorderedItem);
    setTopicList(updatedList);
  };

  if (!topicList.length)
    return (
      <S.EmptyNoticeContainer>
        <EmptyNotice>추가된 안건이 없습니다!</EmptyNotice>
      </S.EmptyNoticeContainer>
    );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="topics">
        {(provided) => (
          <S.TopicListBox {...provided.droppableProps} ref={provided.innerRef}>
            {topicList.map((topic, index) => (
              <Draggable key={`${topic}_${index}`} draggableId={`${topic}_${index}`} index={index}>
                {(provided) => (
                  <S.TopicList ref={provided.innerRef} {...provided.draggableProps}>
                    <S.DropdownImg src={dropdownIcon} alt="dnd" {...provided.dragHandleProps} />
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </S.TopicListBox>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default MeetingTopicList;

const S = {
  TopicListBox: styled.div`
    padding: 10px;
    height: 110px;
    overflow: auto;
  `,
  TopicList: styled.div`
    display: flex;
    border-bottom: 1px solid var(--gray02);
    padding: 8px 0;

    &:last-child {
      border-bottom: none;
    }
  `,
  TopicItem: styled.div`
    color: var(--gray01);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.56px;
    margin-right: auto;
  `,
  EditInput: styled.input`
    width: 85%;
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
  EmptyNoticeContainer: styled.div`
    width: 100%;
    height: 110px;
  `,
  DropdownImg: styled.img`
    width: 16px;
    height: 16px;
    margin-right: 10px;
  `,
};
