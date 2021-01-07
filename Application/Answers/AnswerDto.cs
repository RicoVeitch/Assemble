using System;
using System.Collections.Generic;
using Application.Replies;

namespace Application.Answers
{
    public class AnswerDto
    {
        public string Id { get; set; }
        public string Message { get; set; }
        public int Likes { get; set; }
        public bool? Liked { get; set; }
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<ReplyDto> Replies { get; set; }
    }
}