using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoldenForum.Service.Data;
using GoldenForum.Service.Models;
using GoldenForum.Service.Interfaces;

namespace GoldenForum.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumsController : ControllerBase
    {
        private readonly IForumRepository _forumRepository;

        public ForumsController(IForumRepository forumRepository)
        {
            _forumRepository = forumRepository;
        }

        // GET: api/Forums
        [HttpGet]
        public async Task<IEnumerable<Forum>> GetForums()
        {
            return await _forumRepository.GetForumsWithPosts();
        }
    }
}
