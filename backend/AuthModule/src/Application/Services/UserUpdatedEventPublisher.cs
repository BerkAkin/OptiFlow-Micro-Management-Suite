using AuthModule.Domain.Entities;
using MassTransit;
using ProjectMicro.Shared.Events;

namespace AuthModule.Application.Services
{
    public class UserUpdatedEventPublisher
    {
        private readonly IPublishEndpoint _publishEndpoint;
        public UserUpdatedEventPublisher(IPublishEndpoint publishEndpoint)
        {
            _publishEndpoint = publishEndpoint;
        }

        public async Task PublishEvents(User user)
        {
            UserUpdatedEvent evnt = new UserUpdatedEvent()
            {
                UserId = user.Id,
                TenantId = user.TenantId,
                IsActive = user.IsActive,
                DepartmentId = user.DepartmentId,
                Email = user.Email,
                Username = user.Firstname + " " + user.Lastname,
            };

            await _publishEndpoint.Publish<UserUpdatedEvent>(evnt);
        }
    }
}
