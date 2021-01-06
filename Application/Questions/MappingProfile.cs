using System.Collections.Generic;
using Application.Answers;
using AutoMapper;
using Domain;

namespace Application.Questions
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Question, QuestionDto>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName));

            CreateMap<QuestionCategory, string>().ConstructUsing(s => s.Category.Id);
        }
    }
}