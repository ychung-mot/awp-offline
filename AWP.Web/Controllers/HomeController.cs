using System.Web;
using System.Web.Mvc;
using AWP.Service.Models;
using AWP.Web.Authorization;

namespace AWP.Web.Controllers
{
    [AwpResourceAuthorize()]
    public class HomeController : BaseController
    {

        public HomeController(IUserSession userSession, HttpContextBase httpContextWrapper)
            : base(userSession, httpContextWrapper)
        {
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}