using LibraryApi.Models;

namespace LibraryApi.Data
{
    public static class BookStore
    {
        public static List<Book> Books { get; } = new List<Book>()
        {
            new Book { Id = 1, Title = "Clean Code", Author = "Robert C. Martin", PublishDate = new DateTime(2008,8,1) },
            new Book { Id = 2, Title = "The Pragmatic Programmer", Author = "Andrew Hunt", PublishDate = new DateTime(1999,10,20) }
        };
    }
}
