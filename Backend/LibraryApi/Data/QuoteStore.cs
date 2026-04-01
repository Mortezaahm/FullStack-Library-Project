using LibraryApi.Models;

namespace LibraryApi.Data
{
    public static class QuoteStore
    {
        public static List<Quote> Quotes { get; } = new List<Quote>();
    }
}
