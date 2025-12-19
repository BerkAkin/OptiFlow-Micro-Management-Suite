using AutoMapper;
using FinanceModule.DTOs;
using FinanceModule.Entities;
using FinanceModule.Repositories;
using FluentValidation;

namespace FinanceModule.Services
{
    public class TransactionService
    {
        private readonly TransactionRepository _repository;
        private readonly IMapper _mapper;
        private readonly IValidator<TransactionDTO> _validator;
        public TransactionService(TransactionRepository repository, IMapper mapper, IValidator<TransactionDTO> validator) {
            _repository = repository;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task AddAsync(TransactionDTO model)
        {
            await _validator.ValidateAndThrowAsync(model);
            Transaction transaction = _mapper.Map<Transaction>(model);
            await _repository.AddAsync(transaction);
        }

      
    }
}
