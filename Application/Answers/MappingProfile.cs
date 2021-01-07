using System.Collections.Generic;
using System.Linq;
using Application.Replies;
using AutoMapper;
using Domain;

namespace Application.Answers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<Answer, KeyValuePair<string, AnswerDto>>()
                .ConstructUsing(x => new KeyValuePair<string, AnswerDto>(x.Id, new AnswerDto
                {
                    Id = x.Id,
                    Message = x.Message,
                    Likes = x.Likes,
                    CreatedAt = x.CreatedAt,
                    Username = x.Author.UserName,
                    DisplayName = x.Author.DisplayName,
                    Replies = x.Replies.Select(x => new ReplyDto
                    {
                        Id = x.Id,
                        Message = x.Message,
                        Likes = x.Likes,
                        CreatedAt = x.CreatedAt,
                        DisplayName = x.Author.DisplayName,
                        Username = x.Author.UserName
                    }).ToList()
                }));

        }
    }
}