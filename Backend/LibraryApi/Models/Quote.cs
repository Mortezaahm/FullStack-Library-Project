namespace LibraryApi.Models
{
    public class Quote
    {
        public int Id { get; set; }
        public int UserId { get; set; }  // Quote belongs to a user
        public string Text { get; set; } = string.Empty;
    }
}
