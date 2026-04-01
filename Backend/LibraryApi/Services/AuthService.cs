using LibraryApi.Data;
using LibraryApi.Models;

namespace LibraryApi.Services
{
    public class AuthService
    {
        public User? Register(string username, string password)
        {
            if (UserStore.Users.Any(u => u.Username == username))
                return null;

            var user = new User
            {
                Id = UserStore.Users.Any() ? UserStore.Users.Max(u => u.Id) + 1 : 1,
                Username = username,
                Password = password
            };
            UserStore.Users.Add(user);
            return user;
        }

        public User? Login(string username, string password)
        {
            return UserStore.Users
                .FirstOrDefault(u => u.Username == username && u.Password == password);
        }
    }
}
