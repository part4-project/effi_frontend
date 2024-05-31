import { GROUP_LIST } from '@constants/mockdata';
import styled from 'styled-components';
import GroupItem from './group-item';

const GroupList = () => {
  return (
    <S.GroupListWrap>
      {GROUP_LIST.map((group) => (
        <GroupItem key={group.id} {...group} />
      ))}
    </S.GroupListWrap>
  );
};

export default GroupList;

const S = {
  GroupListWrap: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
};
