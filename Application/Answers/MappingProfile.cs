using System.Collections.Generic;
using AutoMapper;
using Domain;

namespace Application.Answers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // CreateMap<Answer, KeyValuePair<string, AnswerDto>>()
            //     .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
            //     .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName));
            CreateMap<Answer, KeyValuePair<string, AnswerDto>>()
                .ConstructUsing(x => new KeyValuePair<string, AnswerDto>(x.Id, new AnswerDto
                {
                    Id = x.Id,
                    Message = x.Message,
                    Likes = x.Likes,
                    CreatedAt = x.CreatedAt,
                    Username = x.Author.UserName,
                    DisplayName = x.Author.DisplayName
                }));

        }
    }
}