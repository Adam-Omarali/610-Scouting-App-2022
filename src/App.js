import './App.css';
import './static/page.css'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './static/theme';
import Header from './pages/LandingPage';
import PageSwitcher from './components/PageSwitcher';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <PageSwitcher />
      </ThemeProvider>
    </div>
  );
}

export default App;
