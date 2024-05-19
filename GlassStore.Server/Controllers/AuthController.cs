using GlassStore.Server.Domain.Models.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GlassStore.Server.Servise.Auth;
using GlassStore.Server.Repositories.Interfaces;
using GlassStore.Server.Domain.Models.User;

namespace GlassStore.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase // Tokens
    {
        private readonly AuthServise authServise;
        private readonly iBaseRepository<Accounts> loginrepisitory;
        public AuthController(AuthServise authServise, iBaseRepository<Accounts> loginrepisitory)
        {
            this.loginrepisitory = loginrepisitory;
            this.authServise = authServise;
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Login request)
        {
            var user = await authServise.AuthentificateUser(request.Email, request.Password);
            if (user != null)
            {
                var token = authServise.GenerateJWT(user);
                return Ok(new { access_token = token });
            }
            return Unauthorized();
        }

        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Login request)
        {
            Accounts accounts = new Accounts
            {
                Email = request.Email,
                Password = request.Password,
                Orders = new List<Orders>(),
                Basket = new Basket(),
                Roles = new Role[] { Role.User }
            };
            await loginrepisitory.CreateAsync(accounts);
            return Ok();
        }
    }
}
