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

            // CreateMap<QuestionCategory, string>()
            // .ForMember(s => s, o => o.MapFrom(s => s.Category.Id));
            CreateMap<QuestionCategory, string>().ConstructUsing(s => s.Category.Id);
            CreateMap<LikedQuestion, string>().ConstructUsing(s => s.Question.Id);
            CreateMap<DislikedQuestion, string>().ConstructUsing(s => s.Question.Id);
        }
    }
}