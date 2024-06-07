import * as Page from '@pages/index';
import { userStore } from '@stores/user-store';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const Router = () => {
  const { auth } = userStore();

  return (
    <BrowserRouter>
      {auth ? (
        <Routes>
          <Route path="/" element={<Page.Root />}>
            <Route index element={<Page.Lobby />} />
            <Route path="group-home" element={<Page.GroupHome />} />
            <Route path="meeting-room" element={<Page.MeetingRoom />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Page.Login />} />
          <Route path="/auth" element={<Page.Auth />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Router;
