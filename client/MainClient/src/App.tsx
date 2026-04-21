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
import SupportMessages from './components/SupportComponents/SupportMessages/SupportMessages';
import UnauthorizedPage from './pages/UnauthorizedPage';
import RoleBasedRoute from './components/RoleBasedRoute/RoleBasedRoute';
import ResetPassword from './pages/ProfilePages/ResetPassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} >
            <Route index element={<ProfilePage />} />

            <Route element={<RoleBasedRoute allowedDepartments={['Finance Accountant', 'Manager']} />}>
              <Route path='finance/dashboard' element={<FinanceDashboardPage />} />
              <Route path='finance/bill' element={<FinanceBillsPage />} />
            </Route>

            <Route element={<RoleBasedRoute allowedDepartments={['HR', 'Manager']} />}>
              <Route path='survey/builder' element={<SurveyBuilder />} />
              <Route path='survey/result/:id' element={<SurveyResults />} />
            </Route>

            <Route path='survey/dashboard' element={<Surveys />} />
            <Route path='survey/details/:id' element={<SurveyDetails />} />

            <Route path='suggest/dashboard' element={<SuggestionsPage />} />

            <Route path='profile' element={<ProfilePage />} />
            <Route path='mood/dashboard' element={<MoodPage />} />

            <Route path='support/dashboard' element={<SupportPage />} >
              <Route path='request/:id/messages' element={<SupportMessages />} />
            </Route>

            <Route path='unauthorized' element={<UnauthorizedPage />} />


          </Route>
          <Route path='passwordreset/:token/:email' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
