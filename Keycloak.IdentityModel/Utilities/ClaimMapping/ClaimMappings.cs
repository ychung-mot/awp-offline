using System.Collections.Generic;
using System.Globalization;
using System.Security.Claims;
using AWP.Common;
using Keycloak.IdentityModel.Extensions;
using Newtonsoft.Json.Linq;

namespace Keycloak.IdentityModel.Utilities.ClaimMapping
{
    internal static class ClaimMappings
    {
        public static IEnumerable<ClaimLookup> AccessTokenMappings { get; } = new List<ClaimLookup>
        {
            new ClaimLookup
            {
                ClaimName = Constants.ClaimTypes.Audience,
                JSelectQuery = "aud"
            },
            new ClaimLookup
            {
                ClaimName = Constants.ClaimTypes.Issuer,
                JSelectQuery = "iss"
            },
            new ClaimLookup
            {
                ClaimName = Constants.ClaimTypes.IssuedAt,
                JSelectQuery = "iat",
                Transformation =
                    token => ((token.Value<double?>() ?? 1) - 1).ToDateTime().ToString(CultureInfo.InvariantCulture)
            },
            new ClaimLookup
            {
                ClaimName = Constants.ClaimTypes.AccessTokenExpiration,
                JSelectQuery = "exp",
                Transformation =
                    token => ((token.Value<double?>() ?? 1) - 1).ToDateTime().ToString(CultureInfo.InvariantCulture)
            },
            new ClaimLookup
            {
                ClaimName = Constants.ClaimTypes.SubjectId,
                JSelectQuery = "sub"
            },
            new ClaimLookup
            {
                ClaimName = ClaimTypes.Name,
                JSelectQuery = "idir_username",
            },
            new ClaimLookup
            {
                ClaimName = ClaimTypes.Name,
                JSelectQuery = "bceid_username",
            },
            new ClaimLookup
            {
                ClaimName = ClaimTypes.GivenName,
                JSelectQuery = "given_name"
            },
            new ClaimLookup
            {
                ClaimName = ClaimTypes.Surname,
                JSelectQuery = "family_name"
            },
            new ClaimLookup
            {
                ClaimName = ClaimTypes.Email,
                JSelectQuery = "email"
            },
            new ClaimLookup
            {
                ClaimName = ClaimTypes.Role,
                JSelectQuery = "resource_access.{gid}.roles"
            },
            new ClaimLookup
            {
                ClaimName = AwpClaimTypes.IdentityProvider,
                JSelectQuery = "identity_provider"
            },
            new ClaimLookup
            {
                ClaimName = AwpClaimTypes.IdirUserid,
                JSelectQuery = "idir_user_guid"
            },
            new ClaimLookup
            {
                ClaimName = AwpClaimTypes.BceidUserid,
                JSelectQuery = "bceid_user_guid"
            },
            new ClaimLookup
            {
                ClaimName = AwpClaimTypes.BceidBusinessName,
                JSelectQuery = "bceid_business_name"
            },
            new ClaimLookup
            {
                ClaimName = AwpClaimTypes.BceidBusinessGuid,
                JSelectQuery = "bceid_business_guid"
            },
            new ClaimLookup
            {
                ClaimName = AwpClaimTypes.EmailVerified,
                JSelectQuery = "email_verified"
            },
        };

        public static IEnumerable<ClaimLookup> IdTokenMappings { get; } = new List<ClaimLookup>();

        public static IEnumerable<ClaimLookup> RefreshTokenMappings { get; } = new List<ClaimLookup>
        {
            new ClaimLookup
            {
                ClaimName = Constants.ClaimTypes.RefreshTokenExpiration,
                JSelectQuery = "exp",
                Transformation =
                    token => ((token.Value<double?>() ?? 1) - 1).ToDateTime().ToString(CultureInfo.InvariantCulture)
            }
        };
    }
}