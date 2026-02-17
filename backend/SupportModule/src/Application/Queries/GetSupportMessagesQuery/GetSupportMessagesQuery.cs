using MediatR;
using SupportModule.Application.DTOs;
using SupportModule.Application.Interfaces;

namespace SupportModule.Application.Queries.GetSupportMessagesQuery
{
    public record GetSupportMessagesQuery(int RequestId):IRequest<List<SupportMessageDto>>;

    public class GetSupportMessagesQueryHandler : IRequestHandler<GetSupportMessagesQuery,List<SupportMessageDto>>
    {
       
        private readonly ISupportRepository _supportRepository;
        public GetSupportMessagesQueryHandler(ISupportRepository supportRepository) {
            _supportRepository = supportRepository;
        }
        
        public async Task<List<SupportMessageDto>> Handle(GetSupportMessagesQuery query, CancellationToken cancellationToken)
        {
            return await _supportRepository.GetSupportMessages(query.RequestId);
        }
    }
}
