import * as Page from '@pages/index';
import { userStore } from '@stores/user-store';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const Router = () => {
  const { isAuth } = userStore();

  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? (
          <Route path="/" element={<Page.Root />}>
            <Route index element={<Page.Lobby />} />
            <Route path="group-home" element={<Page.GroupHome />} />
            <Route path="meeting-room" element={<Page.MeetingRoom />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        ) : (
          <Route element={<Page.Root />}>
            <Route path="/login" element={<Page.Login />} />
            <Route path="/auth" element={<Page.Auth />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
