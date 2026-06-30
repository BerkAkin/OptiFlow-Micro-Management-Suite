using AuthModule.Domain.Entities;
using MassTransit;
using ProjectMicro.Shared.Events;

namespace AuthModule.Application.Services
{
    public class UserCreatedEventPublisher
    {
        private readonly IPublishEndpoint _publishEndpoint;

        public UserCreatedEventPublisher(IPublishEndpoint publishEndpoint)
        {
            _publishEndpoint = publishEndpoint;
        }
        public async Task PublishEvents(Tenant tenant, User newUser, List<int> moduleList)
        {

            foreach (int moduleId in moduleList)
            {
                switch (moduleId)
                {
                    case 1:
                        await _publishEndpoint.Publish<FinanceUserCreatedEvent>(new FinanceUserCreatedEvent
                        {
                            TenantId = tenant.Id,
                            Tenantname = tenant.Name,
                            Address = tenant.Address,
                            PhoneNum = tenant.PhoneNum,
                            FaxNum = tenant.FaxNum,
                            MailAddress = tenant.Email,
                            TaxOffice = tenant.TaxOffice,
                            TaxNumber = tenant.TaxNumber,
                            MersisNum = tenant.MersisNum,
                            TradeRegistryNum = tenant.TradeRegistryNum,
                        });
                        break;
                    case 2:
                        await _publishEndpoint.Publish<SurveyUserCreatedEvent>(new SurveyUserCreatedEvent
                        {
                            TenantId = tenant.Id,
                            Tenantname = tenant.Name,
                            UserId = newUser.Id,
                            Username = $"{newUser.Firstname} {newUser.Lastname}",
                        });
                        break;
                    case 3:
                        await _publishEndpoint.Publish<SuggestionUserCreatedEvent>(new SuggestionUserCreatedEvent
                        {
                            TenantId = tenant.Id,
                            Tenantname = tenant.Name,
                            UserId = newUser.Id,
                            Username = $"{newUser.Firstname} {newUser.Lastname}",
                        });
                        break;
                    case 4:
                        await _publishEndpoint.Publish<SupportUserCreatedEvent>(new SupportUserCreatedEvent
                        {
                            TenantId = tenant.Id,
                            Tenantname = tenant.Name,
                            UserId = newUser.Id,
                            Username = $"{newUser.Firstname} {newUser.Lastname}",
                            Email = newUser.Email,
                            DepartmentId = newUser.DepartmentId
                        });
                        break;
                    case 5:
                        await _publishEndpoint.Publish<MoodUserCreatedEvent>(new MoodUserCreatedEvent
                        {
                            TenantId = tenant.Id,
                            Tenantname = tenant.Name,
                            UserId = newUser.Id,
                            Username = $"{newUser.Firstname} {newUser.Lastname}",
                            Email = newUser.Email
                        });
                        break;
                }
            }

        }
    }
}
