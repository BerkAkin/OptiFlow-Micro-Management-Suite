using AuthModule.Application.Commands.AddNewEmployeeCommand;
using AuthModule.Application.Commands.UpdateEmployeeDetailsCommand;
using AuthModule.Application.DTOs;
using AuthModule.Application.Queries.GetEmployeeDetailsQuery;
using AuthModule.Application.Queries.GetEmployeesQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProjectMicro.Shared.Interfaces;

namespace AuthModule.Api.Controllers
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;


        public EmployeesController(IMediator mediator,ICurrentUserService currentUserService)
        {
            _mediator = mediator;
            _currentUserService = currentUserService;
        }



        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] FilterEmployeesDto filters)
        {
            int currentTenant = _currentUserService.User.TenantId;
            var result = await _mediator.Send(new GetEmployeesQuery(filters, currentTenant));
            return Ok(new { result.data, result.maxPage });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddNewEmployeeDto newEmployee)
        {
            int currentTenant = _currentUserService.User.TenantId;
            string currentCompany = _currentUserService.User.Company;
            await _mediator.Send(new AddNewEmployeeCommand(newEmployee, currentTenant, currentCompany));
            return Ok("Employee Added Succesfully");
        }


        [HttpGet("{email}")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            int currentTenant = _currentUserService.User.TenantId;
            var result = await _mediator.Send(new GetEmployeeDetailsQuery(email, currentTenant));
            return Ok(result);
        }

        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] UpdateEmployeeDetailsDto dto)
        {
            var result = await _mediator.Send(new UpdateEmployeeCommand(dto));
            return Ok(result);
        }
    }
}
