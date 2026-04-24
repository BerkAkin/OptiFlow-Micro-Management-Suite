import { BrowserRouter, Route, Routes } from 'react-router';
import { Edit } from './components/Employee';
import { RoleBasedRoute } from './components/Common';
import { DetailsPage } from './pages/Survey/DetailsPage';
import { SurveyDashboardPage } from './pages/Survey/SurveyDashboardPage';
import { SuggestionDashboardPage } from './pages/Suggestion/SuggestionDashboardPage';
import { ProfileDashboardPage } from './pages/Profile/ProfileDashboardPage';
import { MoodDashboardPage } from './pages/Mood/MoodDashboardPage';
import { SupportDashboardPage } from './pages/Support/SupportDashboardPage';
import { UnauthorizedPage } from './pages/Common/UnauthorizedPage';
import { ResetPassword } from './pages/Profile/ResetPassword';
import { Messages } from './components/Support';
import { MainPage } from './pages/Common/MainPage';
import { AddNewEmployeePage } from './pages/Employee/AddNewEmployeePage';
import { FinanceDashboardPage } from './pages/Finance/FinanceDashboardPage';
import { InvoicePage } from './pages/Finance/InvoicePage';
import { ResultsPage } from './pages/Survey/ResultsPage';
import { BuilderPage } from './pages/Survey/BuilderPage';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} >
            <Route index element={<ProfileDashboardPage />} />
            <Route path='addnewemployee' element={<AddNewEmployeePage />} >
              <Route path=':email/edit' element={<Edit />} />
            </Route>

            <Route element={<RoleBasedRoute allowedDepartments={['Finance Accountant', 'Manager']} />}>
              <Route path='finance/dashboard' element={<FinanceDashboardPage />} />
              <Route path='finance/invoice' element={<InvoicePage />} />
            </Route>

            <Route element={<RoleBasedRoute allowedDepartments={['HR', 'Manager']} />}>
              <Route path='survey/builder' element={<BuilderPage />} />
              <Route path='survey/result/:id' element={<ResultsPage />} />
            </Route>

            <Route path='survey/dashboard' element={<SurveyDashboardPage />} />
            <Route path='survey/details/:id' element={<DetailsPage />} />

            <Route path='suggest/dashboard' element={<SuggestionDashboardPage />} />

            <Route path='profile' element={<ProfileDashboardPage />} />
            <Route path='mood/dashboard' element={<MoodDashboardPage />} />

            <Route path='support/dashboard' element={<SupportDashboardPage />} >
              <Route path='request/:id/messages' element={<Messages />} />
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
