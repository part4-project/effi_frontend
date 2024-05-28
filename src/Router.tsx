import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as Page from '@/pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page.Root />}>
          <Route index element={<Page.Lobby />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
