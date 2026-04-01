using LibraryApi.Models;
using LibraryApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly BookService _service;
        public BooksController(BookService service)
        {
            _service = service;
        }
        [HttpGet]
        public IActionResult GetAll() => Ok(_service.GetAll());

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var book = _service.Get(id);
            return book != null ? Ok(book) : NotFound();
        }

        [HttpPost]
        public IActionResult Create([FromBody] Book book)
        {
            _service.Add(book);
            return CreatedAtAction(nameof(Get), new { id = book.Id }, book);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Book book)
        {
            if (id != book.Id) return BadRequest();
            _service.Update(book);
            return NoContent();
        }

        [HttpPatch("{id}")]
        public IActionResult Patch(int id, [FromBody] Book updated)
        {
            var existing = _service.Get(id);
            if (existing == null) return NotFound();

            if (!string.IsNullOrEmpty(updated.Title))
                existing.Title = updated.Title;

            if (!string.IsNullOrEmpty(updated.Author))
                existing.Author = updated.Author;

            if (updated.PublishDate != default)
                existing.PublishDate = updated.PublishDate;

            _service.Update(existing);

            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return NoContent();
        }
    }
}
