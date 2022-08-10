using AWP.Service.Models;
using AWP.Web.Authorization;
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
            var userTypes = new List<UserType>();
            userTypes.Add(new UserType { Id = 1, Description = "IDIR" });
            userTypes.Add(new UserType { Id = 2, Description = "Business BCeID" });

            return Request.CreateResponse(HttpStatusCode.OK, userTypes, "application/json");
        }
    }
}