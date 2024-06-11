import * as Page from '@pages/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page.Root />}>
          <Route index element={<Page.Lobby />} />
          <Route path="auth" element={<Page.Auth />} />
          <Route path="login" element={<Page.Login />} />
          <Route path="group-home" element={<Page.GroupHome />} />
          <Route path="meeting-room" element={<Page.MeetingRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

/*
//로그인 인증 성공적으로 마치면 적용 예정
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
            <Route path="/auth" element={<Page.Auth />} />
            <Route path="/login" element={<Page.Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        )}
      </Routes>
*/
