namespace Domain
{
    public class LikedAnswer
    {
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public string AnswerId { get; set; }
        public virtual Answer Answer { get; set; }
    }
}