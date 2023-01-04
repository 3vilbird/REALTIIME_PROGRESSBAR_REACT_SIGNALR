using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProgressController : ControllerBase
    {
        private IHubContext<DataHub> _hub;

        public ProgressController(IHubContext<DataHub> hub)
        {
            _hub = hub;
        }

        [HttpGet("send/status")]
        public IActionResult GetTest(string Id)
        {
            for (int i = 0; i <= 20; i++)
            {
                _hub.Clients.All.SendAsync(Id, 5 * i);
                Thread.Sleep(1000);
            }

            return Ok(new { Status = "Send To status Completed" });
        }
    }
}
