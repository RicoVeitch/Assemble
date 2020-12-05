using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.Answers;

namespace Application.Questions
{
    public class QuestionDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Likes { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public DateTime Date { get; set; }
        public ICollection<AnswerDto> Answers { get; set; }
        [JsonPropertyName("categories")]
        public ICollection<string> QuestionCategories { get; set; }
    }
}