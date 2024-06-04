import { GROUP_LIST } from '@constants/mockdata';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GroupItem from './group-item';

const GroupList = () => {
  return (
    <S.GroupListWrap>
      {GROUP_LIST.map((group) => (
        <Link to={'/group-home'} key={group.id}>
          <GroupItem {...group} />
        </Link>
      ))}
    </S.GroupListWrap>
  );
};

export default GroupList;

const S = {
  GroupListWrap: styled.div`
    display: flex;
    flex-direction: column;
    gap: 9px;
  `,
};
