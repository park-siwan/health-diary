import Pages from './pages';
import './fontLoad.css';
import './styles/style.css';
import { BrowserRouter } from 'react-router-dom';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import koLocale from 'date-fns/locale/ko';
import { useEffect, useState } from 'react';
import { Font } from '@react-pdf/renderer';

function App() {
  // useEffect(() => {
  //react-pdf 적용 폰트
  // 스포카폰트 : https://spoqa.github.io/spoqa-han-sans/

  // updateInstance();
  // 500 : https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf
  // 700 : https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.ttf
  // }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
      <BrowserRouter>{<Pages />}</BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
