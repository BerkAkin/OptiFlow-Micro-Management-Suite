import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import FinanceDashboardPage from './pages/FinancePages/FinanceDashboardPage';
import FinancePaymentsPage from './pages/FinancePages/FinancePaymentsPage';
import FinanceIncomeExpensePage from './pages/FinancePages/FinanceIncomeExpensePage';
import FinanceBillsPage from './pages/FinancePages/FinanceBillsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} >
            <Route path='finance/financeDashboard' element={<FinanceDashboardPage />} />
            <Route path='finance/financeBills' element={<FinanceBillsPage />} />
            <Route path='finance/financeIncomeExpensePage' element={<FinanceIncomeExpensePage />} />
            <Route path='finance/financePayments' element={<FinancePaymentsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
