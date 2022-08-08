using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Text.RegularExpressions;

namespace AWP.Common
{
    public static class CommonExtensions
    {
        private static readonly Regex numeric = new Regex(@"^\d+(\.\d+)?$");
        private static readonly Regex integer = new Regex(@"^\d+$");
        public static string GetCustomClaim(this IPrincipal user, string claimName)
        {
            return (((ClaimsPrincipal)user).FindFirst(claimName)?.Value ?? "").Trim();
        }

        public static bool HasPermission(this IPrincipal principal, params string[] permissions)
        {
            var user = (ClaimsPrincipal)principal;

            if (permissions == null || permissions.Length == 0)
                return true;

            foreach (var permission in permissions)
            {
                if (user.HasClaim(x => x.Type == AwpClaimTypes.Permission && x.Value == permission))
                    return true;
            }

            return false;
        }

        public static bool IsNotEmpty(this string str)
        {
            return !string.IsNullOrWhiteSpace(str);
        }

        public static bool IsEmpty(this string str)
        {
            return string.IsNullOrWhiteSpace(str);
        }

        public static decimal[] ToDecimalArray(this string str)
        {
            if (str == null) return new decimal[] { };

            var result = new List<decimal>();

            try
            {
                string[] tokens = str.Split(',');

                foreach (var token in tokens)
                {
                    var decToken = decimal.Parse(token);

                    if (!result.Contains(decToken))
                        result.Add(decToken);
                }
            }
            catch
            {
                return new decimal[] { };
            }

            return result.ToArray();
        }

        public static string[] ToStringArray(this string str)
        {
            return str == null ? (new string[] { }) : str.Split(',');
        }

        public static string WordToWords(this string str)
        {
            return Regex.Replace(str, "[a-z][A-Z]", x => $"{x.Value[0]} {char.ToUpper(x.Value[1])}");
        }

        public static string RemoveLineBreak(this string str)
        {
            return Regex.Replace(str, @"\r\n?|\n", "");
        }

        public static bool IsInteger(this string str)
        {
            return integer.IsMatch(str);
        }

        public static bool IsNumeric(this string str)
        {
            return numeric.IsMatch(str);
        }

        public static string[] ToLowercase(this string[] items)
        {
            var lowerCaseItems = new string[items.Length];

            var i = 0;
            foreach (var item in items)
            {
                lowerCaseItems[i] = item.ToLowerInvariant();
                i++;
            }

            return lowerCaseItems;
        }
        public static decimal ConvertStrToDecimal(this string value)
        {
            return IsEmpty(value) ? 0 : (decimal)decimal.Parse(value);
        }
        public static decimal ConvertNullableDecimal(this decimal? value)
        {
            return value ?? 0;
        }
        public static string ConvertNullableDecimalToString(this decimal? value)
        {
            return value == null ? "" : value.ToString();
        }
        public static string ConvertScientificNotationToString(this string value, int digit)
        {
            if (value.IsEmpty()) return value;
            return Double.Parse(value, System.Globalization.NumberStyles.Float).ToString($"F{digit}").TrimEnd('0').TrimEnd('.');
        }

        public static string GetAttributeValue(this string jsonString, string attribute)
        {
            if (jsonString == null) return "";

            try
            {
                JObject json = JObject.Parse(jsonString);
                if (json == null) return "";
                var attributeValue = json[attribute];
                if (attributeValue == null) return "";
                return attributeValue.ToString();
            }
            catch
            {
                return "";
            }
        }

        public static string ToCommaSeparted(this string[] items)
        {
            return String.Join(", ", items);
        }

        public static string ToReverseProxyRedirectUrl(this string redirectUrl)
        {
            if (redirectUrl.IsEmpty())
                return redirectUrl;

            return redirectUrl.Replace("-proxied", "");
        }

        public static Uri ToReverseProxyRedirectUri(this Uri uri)
        {
            if (uri == null)
                return uri;

            return new Uri(uri.ToString().ToReverseProxyRedirectUrl());
        }

        public static void AddItem(this Dictionary<string, List<string>> dictionary, string keyName, string item)
        {
            if (dictionary.ContainsKey(keyName))
            {
                if (!dictionary[keyName].Contains(item))
                    dictionary[keyName].Add(item);
            }
            else
            {
                dictionary.Add(keyName, new List<string> { item });
            }
        }

        public static void AddItems(this Dictionary<string, List<string>> dictionary, Dictionary<string, List<string>> items)
        {
            foreach(var item in items)
            {
                foreach(var value in item.Value)
                {
                    dictionary.AddItem(item.Key, value);
                }
            }
        }
    }
}
