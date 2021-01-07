using System;

namespace Domain
{
    public class AnswerReply
    {
        public string Id { get; set; }
        public string Message { get; set; }
        public int Likes { get; set; }
        public DateTime CreatedAt { get; set; }
        public virtual Answer Answer { get; set; }
        public virtual User Author { get; set; }
    }
}