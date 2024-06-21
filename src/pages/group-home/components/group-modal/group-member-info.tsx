import { useEffect, useState } from 'react';
import { TGroupFetchMemberInfo } from '@api/group/group-request.type';
import styled, { useTheme } from 'styled-components';

interface GroupMemberInfoProps {
  // eslint-disable-next-line no-unused-vars
  onAddExileMember: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  onRemoveExileMember: (id: number) => void;
  exileMemberList: number[];
}

const GroupMemberInfo: React.FC<TGroupFetchMemberInfo & GroupMemberInfoProps> = ({
  id,
  nickname,
  email,
  admin,
  onAddExileMember,
  onRemoveExileMember,
  exileMemberList,
}) => {
  const theme = useTheme();

  const [isExport, setIsExport] = useState<boolean>(false);
  const exportName = isExport ? '내보내기 취소' : '내보내기';

  const handleExportClick = () => {
    !isExport ? onAddExileMember(id) : onRemoveExileMember(id);
  };

  useEffect(() => {
    setIsExport(!!exileMemberList.includes(id));
  }, [exileMemberList]);

  return (
    <S.MemberInfoWrap>
      <S.MemberInfo>
        <S.MemberName $isExport={isExport}>{nickname}</S.MemberName>
        <S.MemberEmail>{email}</S.MemberEmail>
      </S.MemberInfo>
      {admin ? (
        <S.AdminIconBox>
          <S.AdminIcon src={theme.groupLeaderBadge} alt="admin" />
        </S.AdminIconBox>
      ) : (
        <S.MemberExportBtn $isExport={isExport} onClick={handleExportClick}>
          {exportName}
        </S.MemberExportBtn>
      )}
    </S.MemberInfoWrap>
  );
};

export default GroupMemberInfo;

const S = {
  MemberInfoWrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 8px;
    border-bottom: 1px solid var(--gray02);
    &:last-child {
      border-bottom: 0;
    }
  `,
  AdminIconBox: styled.div`
    padding: 10px;
  `,
  AdminIcon: styled.img`
    width: 14px;
  `,
  MemberInfo: styled.div`
    display: flex;
    gap: 4px;
    align-items: end;
  `,
  MemberName: styled.div<{ $isExport: boolean }>`
    color: ${({ $isExport, theme }) => ($isExport ? '#C9C9C9' : theme.text11)};
    font-size: 14px;
    font-weight: 500;
  `,
  MemberEmail: styled.div`
    color: ${(props) => props.theme.text09};
    font-size: 10px;
  `,
  MemberExportBtn: styled.button<{ $isExport: boolean }>`
    padding: 10px;
    border-radius: 5px;
    background-color: ${({ $isExport, theme }) => ($isExport ? theme.theme06 : theme.theme02)};
    border: ${({ $isExport, theme }) => ($isExport ? `1px solid ${theme.theme02}` : `1px solid transparent`)};
    color: ${(props) => props.theme.text06};
    font-size: 12px;
    font-weight: 700;
    &:hover {
      background: ${(props) => props.theme.theme01};
      color: var(--dark08);
    }
  `,
};
