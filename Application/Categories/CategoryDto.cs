using System.Collections.Generic;

namespace Application.Categories
{
    public class CategoryDto
    {
        // public string Id { get; set; }
        public ICollection<string> Categories { get; set; }
    }
}