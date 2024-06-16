import * as Page from '@pages/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page.Root />}>
          <Route index element={<Page.Lobby />} />
          <Route path="login" element={<Page.Login />} />
          <Route path="group-home" element={<Page.GroupHome />} />
          <Route path="meeting-room" element={<Page.MeetingRoom />} />
          <Route path="auth" element={<Page.Auth />} />
          <Route path="kurento-service" element={<Page.KurentoService />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
