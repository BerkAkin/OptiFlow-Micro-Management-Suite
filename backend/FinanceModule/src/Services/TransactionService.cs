using AutoMapper;
using FinanceModule.DTOs;
using FinanceModule.Entities;
using FinanceModule.Mappings;
using FinanceModule.Repositories;

namespace FinanceModule.Services
{
    public class TransactionService
    {
        private readonly TransactionRepository _repository;
        private readonly IMapper _mapper;
        public TransactionService(TransactionRepository repository, IMapper mapper) {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task AddAsync(TransactionViewModel model)
        {
            Transaction transaction = _mapper.Map<Transaction>(model);
            await _repository.AddAsync(transaction);
        }

        public async Task<(List<TransactionViewModel> data,int maxPage)> GetAllTransactions(FinanceFilterDto filters)
        {
          var (transactions,maxPage) =  await _repository.GetAllTransactions(filters);
          var mapped = _mapper.Map<List<TransactionViewModel>>(transactions);
            return (mapped, maxPage);
        }

        public async Task<MonthlySummaryViewModel> GetMonthlySummary()
        {
            return await _repository.GetMonthlySummary();
            
        }

        public async Task<List<CategoricalTransactionSummary>> GetCategoricalSummary()
        {
            return await _repository.GetCategoricalSummary();
        }

        public async Task<List<CategoricalTransactionSummary>> GetMostCategorySummary()
        {
            return await _repository.GetMostCategorySummary();
        }

        public async Task<(List<InstallmentsViewModel> data,int maxPage)> GetInstallments(InstallRecurFilterDto filters)
        {
            var (installments,maxPage) = await _repository.GetInstallments(filters);
            var mapped=  _mapper.Map<List<InstallmentsViewModel>>(installments);
            return (mapped, maxPage);
        }

        public async Task<(List<RecurrentsViewModel>data,int maxPage)> GetRecurrents(InstallRecurFilterDto filters)
        {
            var (data,maxPage) = await _repository.GetRecurrents(filters);
            var mapped = _mapper.Map<List<RecurrentsViewModel>>(data);
            return (mapped, maxPage);
        }
    }
}
