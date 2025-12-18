using AutoMapper;
using FinanceModule.DTOs;
using FinanceModule.Entities;

namespace FinanceModule.Mappings
{
    public class MappingProfile: Profile
    {
        public MappingProfile() {

            CreateMap<TransactionDTO, Transaction>()
                .ForMember(dest => dest.IsIncome, opt => opt.MapFrom(src => src.Income))
                .ForMember(dest => dest.IsPartly, opt => opt.MapFrom(src => src.Partly))
                .ForMember(dest => dest.PartCount, opt => opt.MapFrom(src => src.Parts))
                .ForMember(dest => dest.InvoicePath, opt => opt.MapFrom(src => src.Invoice))
                .ForMember(dest => dest.ExchangeType, opt => opt.MapFrom(src => src.Exchange));
        } 
    }
}
