using System.ComponentModel.DataAnnotations;

namespace LibraryApi.Models
{
    public class AuthRequest
    {
        [Required]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
