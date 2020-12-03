using System.Collections.Generic;

namespace Domain
{
    public class Category
    {
        public string Id { get; set; }
        public virtual ICollection<QuestionCategory> QuestionCategories { get; set; }
    }
}