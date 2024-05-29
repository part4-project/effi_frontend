import * as Page from '@pages/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page.Root />}>
          <Route index element={<Page.Lobby />} />
          <Route path="group-home" element={<Page.GroupHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
