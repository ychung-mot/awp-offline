using AutoMapper;
using AWP.Service.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AWP.Web.Controllers 
{
    [AllowAnonymous]
    public class NoAccessController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/Shared/NoAccess.cshtml");
        }
    }
}