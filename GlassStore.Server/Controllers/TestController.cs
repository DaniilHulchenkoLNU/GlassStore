using GlassStore.Server.Domain.Models.Glass;
using GlassStore.Server.Domain.Models.User;
using GlassStore.Server.Repositories.Interfaces;
using GlassStore.Server.Servise;

using GlassStore.Server.Servise.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GlassStore.Server.Controllers
{
   

    [Route("[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly UserServise userServise;
        private readonly iBaseRepository<Glasses> glasses;
        private readonly ChatServise chatServise;

        public TestController(UserServise userServise, iBaseRepository<Glasses> glasses, ChatServise chatServise)
        {
            this.userServise = userServise;
            this.glasses = glasses;
            this.chatServise = chatServise;
        }

        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> Index()
        {

            try
            {
                

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpGet("TestUnit")]
        public async Task<IActionResult> TestUnit()
        {
            try
            {
                //chatServise.TestDb();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
            return Ok();
        }

        //private List<string> chat = ["message1","message2"];

        //[HttpGet("chat")]
        //public List<string> GetChat()
        //{
        //    return chat;
        //}
        //[Route("chatadd")]
        //[HttpPost]
        //public IActionResult Chatadd([FromBody] Message message)
        //{
        //    chat.Add(message.message);
        //    return Ok(new { success = true });
        //}

    }
    public class Message
    {
        public string message { get; set; }
    }

}

