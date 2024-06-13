import { useState } from 'react';
import { TGroupFetchMemberInfo } from '@api/group/group-request.type';
import styled from 'styled-components';

const GroupMemberInfo: React.FC<TGroupFetchMemberInfo> = ({ nickname, email }) => {
  const [isExport, setIsExport] = useState<boolean>(false);
  const exportName = isExport ? '내보내기 취소' : '내보내기';

  const handleExportClick = () => {
    setIsExport((currentExport) => !currentExport);
  };

  return (
    <S.MemberInfoWrap>
      <S.MemberInfo>
        <S.MemberName $isExport={isExport}>{nickname}</S.MemberName>
        <S.MemberEmail>{email}</S.MemberEmail>
      </S.MemberInfo>
      <S.MemberExportBtn $isExport={isExport} onClick={handleExportClick}>
        {exportName}
      </S.MemberExportBtn>
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
  MemberInfo: styled.div`
    display: flex;
    gap: 4px;
    align-items: end;
  `,
  MemberName: styled.div<{ $isExport: boolean }>`
    color: ${({ $isExport }) => ($isExport ? '#C9C9C9' : 'var(--gray01)')};
    font-size: 14px;
    font-weight: 500;
  `,
  MemberEmail: styled.div`
    font-size: 10px;
  `,
  MemberExportBtn: styled.button<{ $isExport: boolean }>`
    padding: 10px;
    border-radius: 5px;
    background-color: ${({ $isExport }) => ($isExport ? `var(--white)` : `var(--blue02)`)};
    border: ${({ $isExport }) => ($isExport ? `1px solid var(--blue02)` : `1px solid transparent`)};
    color: var(--blue01);
    font-size: 12px;
    font-weight: 700;
  `,
};
