import Pages from './pages';
import './app.css';
import './styles/style.css';
import { BrowserRouter } from 'react-router-dom';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import koLocale from 'date-fns/locale/ko';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
