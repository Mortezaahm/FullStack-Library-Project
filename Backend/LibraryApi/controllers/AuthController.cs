using LibraryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly JwtService _jwtService;

        public AuthController(AuthService authService, JwtService jwtService)
        {
            _authService = authService;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public IActionResult Register(string username, string password)
        {
            var user = _authService.Register(username, password);
            if (user == null) return BadRequest("User already exists");

            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login(string username, string password)
        {
            var user = _authService.Login(username, password);
            if (user == null) return Unauthorized("Invalid credentials");

            var token = _jwtService.GenerateToken(user);
            return Ok(new { token });
        }
    }
}
