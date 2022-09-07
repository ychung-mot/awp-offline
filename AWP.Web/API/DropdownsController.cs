using AWP.Service.Models;
using AWP.Web.DTO;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace AWP.Web.API
{
    [RoutePrefix("api/v1")]
    //[AwpApiAuthorize()]
    public class DropdownsController : BaseApiController
    {
        public DropdownsController(IUserSession userSession, HttpContextBase httpContextWrapper)
            : base(userSession, httpContextWrapper)
        {
        }

        [Route("dropdowns/usertypes")]
        [HttpGet]
        public HttpResponseMessage GetUserTypes()
        {
            var cachedTime = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss") + " UTC";

            var userTypes = new List<UserType>();
            userTypes.Add(new UserType { Id = 1, Description = "IDIR", CachedTime = cachedTime });
            userTypes.Add(new UserType { Id = 2, Description = "Business BCeID", CachedTime = cachedTime });

            return Request.CreateResponse(HttpStatusCode.OK, userTypes, "application/json");
        }

        [Route("dropdowns/users")]
        [HttpGet]
        public HttpResponseMessage GetUsers()
        {
            var users = new List<User>();

            users.Add(new User { Id = 1, Name = "YCHUNG" });

            return Request.CreateResponse(HttpStatusCode.OK, users, "application/json");
        }
    }
}