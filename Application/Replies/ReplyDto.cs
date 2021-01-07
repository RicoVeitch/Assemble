using System;

namespace Application.Replies
{
    public class ReplyDto
    {
        public string Id { get; set; }
        public string Message { get; set; }
        public int Likes { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
    }
}