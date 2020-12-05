using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class User : IdentityUser
    {
        public string DisplayName { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
        public virtual ICollection<LikedQuestion> LikedQuestions { get; set; }
        public virtual ICollection<DislikedQuestion> DislikedQuestions { get; set; }
        public virtual ICollection<LikedAnswer> LikedAnswers { get; set; }
        public virtual ICollection<DislikedAnswer> DislikedAnswers { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }
    }
}