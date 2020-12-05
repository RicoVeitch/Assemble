using Application.Interfaces;
using AutoMapper;
using Domain;
using System;
namespace Application.Questions
{
    public class MappingProfile : Profile
    {
        // private readonly IUserAccessor _userAccessor;
        public MappingProfile()
        {
            // _userAccessor = userAccessor;
            // string currUser = _userAccessor.GetCurrentUsername();
            CreateMap<Question, QuestionDto>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName));

            // CreateMap<QuestionCategory, string>()
            // .ForMember(s => s, o => o.MapFrom(s => s.Category.Id));
            CreateMap<QuestionCategory, string>().ConstructUsing(s => s.Category.Id);
            // CreateMap<LikedQuestion, bool>().ConstructUsing(s => s.UserId == currUser);
            // CreateMap<DislikedQuestion, bool>().ConstructUsing(s => s.UserId == currUser);
        }
    }
}