import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface GroupItemProp {
  id: number;
  room_name: string;
}

const GroupItem: React.FC<GroupItemProp> = ({ room_name }) => {
  return (
    <S.GroupItem>
      <Link to={'/group-home'}>{room_name}</Link>
    </S.GroupItem>
  );
};

export default GroupItem;

const S = {
  GroupItem: styled.div``,
};
