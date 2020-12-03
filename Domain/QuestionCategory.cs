namespace Domain
{
    public class QuestionCategory
    {
        public string QuestionId { get; set; }
        public virtual Question Question { get; set; }
        public string CategoryId { get; set; }
        public virtual Category Category { get; set; }

    }
}