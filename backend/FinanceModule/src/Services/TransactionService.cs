using AutoMapper;
using FinanceModule.DTOs;
using FinanceModule.Entities;
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

        public async Task AddAsync(TransactionDTO model)
        {
            Transaction transaction = _mapper.Map<Transaction>(model);
            await _repository.AddAsync(transaction);
        }

      
    }
}
