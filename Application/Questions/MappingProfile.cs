using AutoMapper;
using Domain;

namespace Application.Questions
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Question, QuestionDto>();
        }
    }
}