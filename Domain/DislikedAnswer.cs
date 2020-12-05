namespace Domain
{
    public class DislikedAnswer
    {
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public string AnswerId { get; set; }
        public virtual Answer Answer { get; set; }
    }
}