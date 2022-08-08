using Microsoft.IdentityModel.Protocols;
using System;
using System.Collections.Specialized;
using System.Web;

namespace Keycloak.IdentityModel.Models.Responses
{
    public class AuthorizationResponse : OidcResponse
    {
        public AuthorizationResponse(string query)
        {
            InitFromRequest(HttpUtility.ParseQueryString(query));

            if (IsSuccessfulResponse())
            {
                if (!ValidateCodeAndState())
                {
                    var message = "Invalid query string used to instantiate an AuthorizationResponse";
                    throw new ArgumentException(message);
                }
            }
        }

        public string Code { get; private set; }
        public string State { get; private set; }

        protected new void InitFromRequest(NameValueCollection authResult)
        {
            base.InitFromRequest(authResult);

            Code = authResult.Get(OpenIdConnectParameterNames.Code);
            State = authResult.Get(OpenIdConnectParameterNames.State);
        }

        public bool ValidateCodeAndState()
        {
            return !string.IsNullOrWhiteSpace(Code) && !string.IsNullOrWhiteSpace(State);
        }
    }
}