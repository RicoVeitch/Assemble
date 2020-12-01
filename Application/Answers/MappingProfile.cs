using AutoMapper;
using Domain;

namespace Application.Answers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Answer, AnswerDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName));
        }
    }
}