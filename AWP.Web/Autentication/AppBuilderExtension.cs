using Owin;
using Owin.Security.Keycloak;
using System;
using System.Configuration;
using System.Web.Mvc;
using AWP.Service.Models;

namespace AWP.Web.Autentication
{
    public static class AppBuilderExtension
    {
        public static IAppBuilder UseAwpAuthentication(this IAppBuilder app)
        {
            app.UseKeycloakAuthentication(new KeycloakAuthenticationOptions
            {
                Realm = ConfigurationManager.AppSettings["KcRealm"],
                ClientId = ConfigurationManager.AppSettings["KcClientId"],
                ClientSecret = ConfigurationManager.AppSettings["KcClientSecret"],
                KeycloakUrl = ConfigurationManager.AppSettings["KcAuthUrl"],

                PostLogoutRedirectUrl = "/account/SignOutSm",
                AuthenticationType = Common.Constants.AwpAuthType,
                SignInAsAuthenticationType = Common.Constants.AwpAuthType,

                EnableBearerTokenAuth = true,
                AllowUnsignedTokens = false,
                DisableIssuerSigningKeyValidation = false,
                DisableIssuerValidation = false,
                DisableAudienceValidation = false,
                TokenClockSkew = TimeSpan.FromSeconds(2),
                DisableAllRefreshTokenValidation = true, //Fix for Keycloak server v4.6-4.8
                AfterKeycloakIdpLogin = (context) =>
                {
                    var userSession = DependencyResolver.Current.GetService<IUserSession>().LoadUserSession(context.Request.User);
                }
            });
            
            app.Use<PostAuthenticationHandler>();

            return app;
        }
    }
}