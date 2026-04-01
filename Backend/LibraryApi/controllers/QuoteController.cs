using LibraryApi.Models;
using LibraryApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class QuotesController : ControllerBase
{
    private readonly QuoteService _service;
    public QuotesController(QuoteService service) => _service = service;

    private int CurrentUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public IActionResult GetAll() => Ok(_service.GetAllForUser(CurrentUserId()));

    [HttpPost]
    public IActionResult Create([FromBody] Quote quote)
    {
        quote.UserId = CurrentUserId();
        _service.Add(quote);
        return CreatedAtAction(nameof(GetAll), new { id = quote.Id }, quote);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Quote quote)
    {
        if (id != quote.Id) return BadRequest();
        _service.Update(quote);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _service.Delete(id);
        return NoContent();
    }
}
