using System;
using System.Collections.Generic;

namespace Domain
{
    public class Question
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public virtual User Author { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }
    }
}
