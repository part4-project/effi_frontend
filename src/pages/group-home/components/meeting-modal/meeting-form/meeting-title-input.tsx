/* eslint-disable no-unused-vars */
import styled from 'styled-components';

interface MeetingTitleInputProps {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MeetingTitleInput = ({ title, onChange }: MeetingTitleInputProps) => (
  <S.TitleContainer>
    <S.StyledTitleInput type="text" placeholder="제목" value={title} onChange={onChange} />
  </S.TitleContainer>
);

export default MeetingTitleInput;

const S = {
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
};
