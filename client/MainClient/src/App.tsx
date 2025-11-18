import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import FinanceDashboardPage from './pages/FinancePages/FinanceDashboardPage';
import FinanceBillsPage from './pages/FinancePages/FinanceBillsPage';
import SurveyBuilder from './pages/SurveyAndInsightsPages/SurveyBuilder';
import Surveys from './pages/SurveyAndInsightsPages/Surveys';
import SurveyDetails from './pages/SurveyAndInsightsPages/SurveyDetails';
import SurveyResults from './pages/SurveyAndInsightsPages/SurveyResults';
import SuggestionsPage from './pages/SuggestionPages/SuggestionsPage';
import ProfilePage from './pages/ProfilePages/ProfilePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} >
            <Route index element={<FinanceDashboardPage />} />

            <Route path='finance/financeDashboard' element={<FinanceDashboardPage />} />

            <Route path='finance/financeBills' element={<FinanceBillsPage />} />
            <Route path='survey/surveyBuilder' element={<SurveyBuilder />} />
            <Route path='survey/surveys' element={<Surveys />} ></Route>
            <Route path='survey/surveys/:slug' element={<SurveyDetails />} />
            <Route path='survey/surveys/:slug/result' element={<SurveyResults />} />

            <Route path='suggest/suggestions' element={<SuggestionsPage />} />

            <Route path='profile' element={<ProfilePage />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
