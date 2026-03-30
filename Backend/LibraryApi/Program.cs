using LibraryApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add DI
builder.Services.AddScoped<BookService>();

// Add JWT
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<BookService>();

// Add services to the container.
builder.Services.AddControllers(); // register controllers

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    // app.UseSwagger();
    // app.UseSwaggerUI();
}

app.UseHttpsRedirection(); // redirect HTTP to HTTPS

app.UseAuthorization();

app.MapControllers(); // map controller routes

app.Run();
