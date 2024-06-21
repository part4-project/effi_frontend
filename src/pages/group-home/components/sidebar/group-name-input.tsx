import { useCallback, useEffect, useRef, useState } from 'react';
import { useGroupUpdateMutation } from '@hooks/react-query/use-query-group';

import { useGroupStore } from '@stores/group';
import styled, { useTheme } from 'styled-components';
interface TGroupNameInputProps {
  groupName: string;
  groupCode: string;
  isAdmin: boolean;
}

const GroupNameInput = ({ groupName: groupNameProp, groupCode, isAdmin }: TGroupNameInputProps) => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isInputValueExist, setIsInputValueExist] = useState(true);
  const [groupName, setGroupName] = useState(groupNameProp);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { mutate } = useGroupUpdateMutation(useGroupStore((state) => state.groupId));

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGroupName(e.target.value);
    setIsInputValueExist(true);
  };

  const handleEditButtonClick = async () => {
    setIsEditing(true);
  };

  const handleEditCompleteButtonClick = useCallback(async () => {
    if (groupName.length) {
      mutate(groupName);
      setIsEditing(false);
    } else {
      setIsInputValueExist(false);
    }
  }, [mutate, groupName]);

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
    } else {
      setGroupName(groupNameProp);
    }
  }, [isEditing, handleEditCompleteButtonClick, groupNameProp]);

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
        <S.GroupCode>#{groupCode}</S.GroupCode>
        {isAdmin &&
          (isEditing ? (
            <S.EditButton onClick={handleEditCompleteButtonClick}>
              <S.EditComplete>완료</S.EditComplete>
            </S.EditButton>
          ) : (
            <S.EditButton onClick={handleEditButtonClick}>
              <img src={theme.editIcon} />
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
    outline: 1px solid ${({ $isInputValueExist, theme }) => ($isInputValueExist ? theme.theme02 : 'var(--red01)')};
    color: var(--black);
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
    background-color: ${(props) => props.theme.theme02};
    color: ${(props) => props.theme.text02};
  `,
};
