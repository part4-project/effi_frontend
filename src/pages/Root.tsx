import React from 'react';
import GlobalStyle from '@styles/global';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <>
      {/* Nar bar */}
      {/* Side bar */}
      <GlobalStyle />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
