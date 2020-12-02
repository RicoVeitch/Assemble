using System;
using System.Collections.Generic;
using Application.Answers;

namespace Application.Questions
{
    public class QuestionDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public DateTime Date { get; set; }
        public virtual ICollection<AnswerDto> Answers { get; set; }
    }
}