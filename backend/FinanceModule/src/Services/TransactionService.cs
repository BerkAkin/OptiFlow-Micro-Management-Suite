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

        public async Task AddAsync(Transaction model)
        {
            await _repository.AddAsync(model);
        }

        public async Task<List<TransactionViewModel>> GetAllTransactions()
        {
          var data =  await _repository.GetAllTransactions();
          return _mapper.Map<List<TransactionViewModel>>(data);
        }

        public async Task<List<MonthlyTransactionViewModel>> GetMonthlySummary()
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

        public async Task<List<InstallmentsViewModel>> GetInstallments()
        {
            var data = await _repository.GetInstallments();
            return _mapper.Map<List<InstallmentsViewModel>>(data);
        }

        public async Task<List<RecurrentsViewModel>> GetRecurrents()
        {
            var data = await _repository.GetRecurrents();
            return _mapper.Map<List<RecurrentsViewModel>>(data);
        }
    }
}
