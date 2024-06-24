import { skeleton, skeletonAnimation } from '@styles/skeleton';
import styled from 'styled-components';

const MeetingNotesSkeleton = () => {
  return (
    <S.Container>
      <S.MeetingNotesLists />
      <S.MeetingNotesLists />
      <S.MeetingNotesLists />
    </S.Container>
  );
};

export default MeetingNotesSkeleton;

const S = {
  Container: styled.ul`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  `,

  MeetingNotesLists: styled.li`
    display: flex;
    height: 110px;
    flex-direction: column;
    border-radius: 10px;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,
};
