namespace Domain
{
    public class LikedQuestion
    {
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public string QuestionId { get; set; }
        public virtual Question Question { get; set; }
    }
}