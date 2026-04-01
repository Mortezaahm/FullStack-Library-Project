using LibraryApi.Models;

namespace LibraryApi.Data
{
    public static class UserStore
    {
        public static List<User> Users { get; } = new List<User>();
    }
}
