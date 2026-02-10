import { BrowserRouter, Route, Routes } from 'react-router';
import MainPage from './pages/MainPage';
import FinanceDashboardPage from './pages/FinancePages/FinanceDashboardPage';
import FinanceBillsPage from './pages/FinancePages/FinanceBillsPage';
import SurveyBuilder from './pages/SurveyAndInsightsPages/SurveyBuilder';
import Surveys from './pages/SurveyAndInsightsPages/Surveys';
import SurveyDetails from './pages/SurveyAndInsightsPages/SurveyDetails';
import SurveyResults from './pages/SurveyAndInsightsPages/SurveyResults';
import SuggestionsPage from './pages/SuggestionPages/SuggestionsPage';
import ProfilePage from './pages/ProfilePages/ProfilePage';
import MoodPage from './pages/MoodPages/MoodPage';
import SupportPage from './pages/SupportPages/SupportPage';
import ChatWindow from './pages/SupportPages/SupportChatWindow';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} >
            <Route index element={<FinanceDashboardPage />} />

            <Route path='finance/dashboard' element={<FinanceDashboardPage />} />

            <Route path='finance/bill' element={<FinanceBillsPage />} />
            <Route path='survey/builder' element={<SurveyBuilder />} />
            <Route path='survey/dashboard' element={<Surveys />} ></Route>
            <Route path='survey/details/:id' element={<SurveyDetails />} />
            <Route path='survey/result/:id' element={<SurveyResults />} />

            <Route path='suggest/dashboard' element={<SuggestionsPage />} />

            <Route path='profile' element={<ProfilePage />} />
            <Route path='mood/dashboard' element={<MoodPage />} />

            <Route path='support/dashboard' element={<SupportPage />} >
              <Route path='chat/:userId' element={<ChatWindow />} />
            </Route>


          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
