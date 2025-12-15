using AutoMapper;
using FinanceModule.DTOs;
using FinanceModule.Entities;

namespace FinanceModule.Mappings
{
    public class MappingProfile: Profile
    {
        public MappingProfile() {

            CreateMap<Transaction, TransactionViewModel>();
            CreateMap<Transaction, InstallmentsViewModel>().ForMember(dest => dest.Parts, opt => opt.MapFrom(src => src.IsPartly ? src.PartCount: 0));
        } 
    }
}
