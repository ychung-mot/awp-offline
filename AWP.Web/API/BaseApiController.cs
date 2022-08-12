using AWP.Service.Models;
using System.Web;
using System.Web.Http;

namespace AWP.Web.API
{
    public class BaseApiController : ApiController
    {
        internal readonly IUserSession _userSession;

        protected BaseApiController(IUserSession userSession, HttpContextBase httpContextWrapper)
        {
            var systemHttpContext = httpContextWrapper;

            _userSession = userSession.LoadUserSession(systemHttpContext.User);
        }
    }
}