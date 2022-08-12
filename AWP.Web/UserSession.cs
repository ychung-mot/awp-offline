using AWP.Common;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace AWP.Service.Models
{
    public interface IUserSession
    {
        string UserName { get; set; }
        Guid UserGuid { get; set; }
        string UserType { get; set; }
        string EmailAddress { get; set; }
        ClaimsPrincipal User { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        string FullName { get; set; }
        string Attributes { get; set; }
        IUserSession LoadUserSession(IPrincipal user);
        void AddClaim(string claimType, string value);
        void SetAtrtibutes();
    }

    public class UserSession : IUserSession
    {
        public UserSession()
        {
            UserType = "";
            UserName = "";
            EmailAddress = "";
            FirstName = "";
            LastName = "";
            FullName = "";
            Attributes = "";
            User = null;
        }
        public string UserName { get; set; }
        public Guid UserGuid { get; set; }
        public string UserType { get; set; }
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public ClaimsPrincipal User { get; set; }
        public string Attributes { get; set; }
        public IUserSession LoadUserSession(IPrincipal user)
        {
            if (user == null)
                return this;

            User = (ClaimsPrincipal)user;

            var textInfo = new CultureInfo("en-US", false).TextInfo;

            UserType = User.GetCustomClaim(AwpClaimTypes.IdentityProvider);
            UserName = User.GetCustomClaim(ClaimTypes.Name);
            EmailAddress = User.GetCustomClaim(ClaimTypes.Email);
            FirstName = textInfo.ToTitleCase(User.GetCustomClaim(ClaimTypes.GivenName));
            LastName = textInfo.ToTitleCase(User.GetCustomClaim(ClaimTypes.Surname));

            if (FirstName.IsEmpty()) FirstName = "John";
            if (LastName.IsEmpty()) LastName = "Doe";

            UserGuid = user.Identity.GetUserId().IsEmpty() ? Guid.Empty : new Guid(user.Identity.GetUserId());

            if (UserType.IsNotEmpty() && UserGuid == Guid.Empty)
            {
                switch (UserType)
                {
                    case AwpUserTypes.IDIR:
                        UserGuid = new Guid(User.GetCustomClaim(AwpClaimTypes.IdirUserid));
                        break;
                    case AwpUserTypes.BceidBusiness:
                        UserGuid = new Guid(User.GetCustomClaim(AwpClaimTypes.BceidUserid));
                        break;
                    case AwpUserTypes.Awp:
                        UserGuid = new Guid(User.GetCustomClaim(AwpClaimTypes.AwpUserid)); //awp will provide the awp_userid
                        break;
                    default:
                        UserGuid = Guid.Empty;
                        break;
                }

                AddClaim(ClaimTypes.NameIdentifier, UserGuid.ToString("N"));

            }

            FullName = Utilities.GetFullName(FirstName, LastName);

            AddClaim(AwpClaimTypes.FullName, FullName);

            SetAtrtibutes();

            return this;
        }
        public void AddClaim(string claimType, string value)
        {
            if (User == null || claimType.IsEmpty() || value.IsEmpty() || User.HasClaim(claimType, value)) return;

            User.Identities.FirstOrDefault().AddClaim(new Claim(claimType, value));
        }

        public static void RemoveClaim(IPrincipal user, string claimType)
        {
            if (user == null) return;

            var identity = ((ClaimsPrincipal)user).Identity as ClaimsIdentity;

            var claim = identity.Claims.FirstOrDefault(x => x.Type == claimType);

            if (claim == null) return;

            identity.RemoveClaim(claim);
        }

        public void SetAtrtibutes()
        {
            if (User == null)
                return;

            var names = new List<string> { AwpClaimTypes.IdentityProvider,  AwpClaimTypes.EmailVerified, AwpClaimTypes.FullName,
                ClaimTypes.Name, ClaimTypes.GivenName, ClaimTypes.Surname, AwpClaimTypes.BceidBusinessGuid, AwpClaimTypes.BceidBusinessName, AwpClaimTypes.Title };

            var attributes = new StringBuilder();

            foreach (var name in names)
            {
                var value = User.GetCustomClaim(name);

                if (!string.IsNullOrWhiteSpace(value))
                {
                    attributes.Append($"\"{AwpClaimTypes.GetSimpleName(name)}\":\"{value}\",");
                }
            }

            var attrTemp = attributes.ToString().TrimEnd(',');

            Attributes = attrTemp.IsEmpty() ? "" : "{" + attrTemp + "}";
        }
    }
}
