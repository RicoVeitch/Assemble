using AutoMapper;
using Domain;
using System;
namespace Application.Questions
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Question, QuestionDto>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName));

            CreateMap<QuestionCategory, CategoryDto>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Category.Id));
        }
    }
}