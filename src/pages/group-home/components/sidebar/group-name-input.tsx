import { useCallback, useEffect, useRef, useState } from 'react';
import editIcon from '@assets/icons/edit.svg';
import { GROUP } from '@constants/mockdata';
import { useToast } from '@hooks/use-toast';
import styled from 'styled-components';

interface TGroupNameInputProps {
  isAdmin: boolean;
}

const GroupNameInput = ({ isAdmin }: TGroupNameInputProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isInputValueExist, setIsInputValueExist] = useState(true);
  const [groupName, setGroupName] = useState(GROUP.room_name);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGroupName(e.target.value);
    setIsInputValueExist(true);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleEditCompleteButtonClick = useCallback(() => {
    if (groupName.length) {
      setIsEditing(false);
      toast('그룹명이 변경되었습니다.');
    } else {
      setIsInputValueExist(false);
    }
  }, [groupName.length, toast]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const input = inputRef.current;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      input.scrollTop = input.scrollHeight;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleEditCompleteButtonClick();
        }
      };

      input.addEventListener('keydown', handleKeyDown);

      return () => {
        input.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isEditing, handleEditCompleteButtonClick]);

  return (
    <div>
      {isEditing ? (
        <S.GroupNameInput
          ref={inputRef}
          value={groupName}
          onChange={handleGroupNameChange}
          $isInputValueExist={isInputValueExist}
        />
      ) : (
        <S.GroupName>{groupName}</S.GroupName>
      )}

      <S.GroupNameSub>
        <S.GroupCode>#{GROUP.code}</S.GroupCode>
        {isAdmin &&
          (isEditing ? (
            <S.EditButton onClick={handleEditCompleteButtonClick}>
              <S.EditComplete>완료</S.EditComplete>
            </S.EditButton>
          ) : (
            <S.EditButton onClick={handleEditButtonClick}>
              <img src={editIcon} />
            </S.EditButton>
          ))}
      </S.GroupNameSub>
    </div>
  );
};

export default GroupNameInput;
const S = {
  GroupName: styled.span`
    font-weight: bold;
    font-size: 20px;
    word-wrap: break-word;
  `,

  GroupNameInput: styled.textarea<{ $isInputValueExist: boolean }>`
    font-weight: bold;
    font-size: 18px;
    width: 100%;
    padding: 4px;
    border: 1px solid var(--gray04);
    border-radius: 4px;
    resize: none;
    overflow: hidden;
    line-height: 1.3;
    outline: ${({ $isInputValueExist }) => ($isInputValueExist ? '1px solid var(--blue02)' : '1px solid var(--red01)')};
  `,

  GroupNameSub: styled.div`
    margin-top: 5px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  GroupCode: styled.span`
    color: var(--gray02);
  `,

  EditButton: styled.button`
    cursor: pointer;
    width: max-content;
  `,

  EditComplete: styled.span`
    padding: 2px 6px;
    border-radius: 5px;
    background-color: var(--blue02);
    color: var(--blue01);
  `,
};
