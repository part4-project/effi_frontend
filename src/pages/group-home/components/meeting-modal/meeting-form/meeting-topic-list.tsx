import { useState } from 'react';
import ModifyDeleteButton from '@components/meeting/modify-delete-button';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import styled from 'styled-components';
import dropdownIcon from '@/assets/icons/dropdown.svg';
// import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

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

  if (!topicList.length) return <S.EmptyTopicList>추가된 안건이 없습니다!</S.EmptyTopicList>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="topics">
        {(provided) => (
          <S.TopicListBox {...provided.droppableProps} ref={provided.innerRef}>
            {topicList.map((topic, index) => (
              // 현재 key 값이 topic이라 중복일 경우 오류 발생하므로 추후 실제 데이터를 받아올 때는 topic.id 와 같은 고유값으로 대체해야됨
              <Draggable key={topic} draggableId={topic} index={index}>
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
    font-family: 'Pretendard';
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

  DropdownImg: styled.img`
    width: 16px;
    height: 16px;
    margin-right: 10px;
  `,
};
