namespace Domain
{
    public class DislikedQuestion
    {
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public string QuestionId { get; set; }
        public virtual Question Question { get; set; }
    }
}