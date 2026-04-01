using LibraryApi.Services;
using Microsoft.AspNetCore.Mvc;
using LibraryApi.Models;

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
        public IActionResult Register([FromBody] AuthRequest request)
        {
            if (request == null)
                return BadRequest("Request is null");

            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
                return BadRequest("Username or password is empty");
            var user = _authService.Register(request.Username, request.Password);
            if (user == null) return BadRequest("User already exists");

            return Ok(user); // return Ok(new { user.Id, user.Username }); to exclude password
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] AuthRequest request)
        {
            var user = _authService.Login(request.Username, request.Password);
            if (user == null) return Unauthorized("Invalid credentials");

            var token = _jwtService.GenerateToken(user);
            return Ok(new { token });
        }
    }
}
