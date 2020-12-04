using System;

namespace Domain
{
    public class Answer
    {
        public string Id { get; set; }
        public string Message { get; set; }
        public int Likes { get; set; }
        public virtual Question Question { get; set; }
        public virtual User Author { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}