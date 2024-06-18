import React from 'react';
import styled, { useTheme } from 'styled-components';

interface EmptyNoticeProps extends React.PropsWithChildren {
  borderType?: 'none' | 'default';
}

const EmptyNotice = ({ children, borderType = 'default' }: EmptyNoticeProps) => {
  const theme = useTheme();

  return (
    <S.Container $borderType={borderType}>
      <S.Img src={theme.alertCircle} alt="경고" />
      {children}
    </S.Container>
  );
};

export default EmptyNotice;

const S = {
  Container: styled.div<{ $borderType: EmptyNoticeProps['borderType'] }>`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: ${({ $borderType, theme }) => ($borderType === 'none' ? 'none' : `2px solid ${theme.theme11}`)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    color: ${({ theme }) => theme.text08};
    text-align: center;
    font-size: 14px;
    font-weight: 500;
  `,
  Img: styled.img`
    width: 24px;
    height: 24px;
  `,
};
