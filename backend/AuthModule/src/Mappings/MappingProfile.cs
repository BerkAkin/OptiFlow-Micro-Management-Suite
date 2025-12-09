using AuthModule.DTO;
using AuthModule.Models;
using AutoMapper;

namespace AuthModule.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {

            CreateMap<RegisterDTO, User>();
        }
    }
}
