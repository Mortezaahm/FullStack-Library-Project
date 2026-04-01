using LibraryApi.Data;
using LibraryApi.Models;

namespace LibraryApi.Services
{
    public class QuoteService
    {
        public List<Quote> GetAllForUser(int userId) =>
            QuoteStore.Quotes.Where(q => q.UserId == userId).ToList();

        public Quote? Get(int id) => QuoteStore.Quotes.FirstOrDefault(q => q.Id == id);

        public void Add(Quote quote)
        {
            quote.Id = QuoteStore.Quotes.Any() ? QuoteStore.Quotes.Max(q => q.Id) + 1 : 1;
            QuoteStore.Quotes.Add(quote);
        }

        public void Update(Quote quote)
        {
            var existing = QuoteStore.Quotes.FirstOrDefault(q => q.Id == quote.Id);
            if (existing != null)
            {
                existing.Text = quote.Text;
            }
        }

        public void Delete(int id)
        {
            var quote = QuoteStore.Quotes.FirstOrDefault(q => q.Id == id);
            if (quote != null) QuoteStore.Quotes.Remove(quote);
        }
    }
}
