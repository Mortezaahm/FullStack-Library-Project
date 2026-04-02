using LibraryApi.Models;

namespace LibraryApi.Data
{
    public static class QuoteStore
    {
        public static List<Quote> Quotes { get; } = new List<Quote>()
        {
            new Quote { Id = 1, Text = "Simplicity is the soul of efficiency." },
            new Quote { Id = 2, Text = "Code is like humor. When you have to explain it, it’s bad." }
        };
    }
}
