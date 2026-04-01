using LibraryApi.Data;
using LibraryApi.Models;

namespace LibraryApi.Services
{
    public class BookService
    {
        public List<Book> GetAll() => BookStore.Books;

        public Book? Get(int id) => BookStore.Books.FirstOrDefault(b => b.Id == id);

        public void Add(Book book)
        {
            book.Id = BookStore.Books.Any()
            ? BookStore.Books.Max(b => b.Id) + 1 : 1;
            BookStore.Books.Add(book);
        }

        // Update only the fields that are allowed to be changed
        public void Update(Book book)
        {
            var existing = BookStore.Books.FirstOrDefault(b => b.Id == book.Id);
            if (existing != null)
            {
                existing.Title = book.Title;
                existing.Author = book.Author;
                existing.PublishDate = book.PublishDate;
            }
        }

        public void Delete(int id)
        {
            var book = BookStore.Books.FirstOrDefault(b => b.Id == id);
            if (book != null) BookStore.Books.Remove(book);
        }
    }
}
