using System.Web.Optimization;

namespace AWP.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(
                new Bundle("~/bundles/js/app-react")
                    .Include("~/assets/js/runtime.js")
                    .Include("~/assets/js/react-core.js")
                    .Include("~/assets/js/appReact.js")
            );

            bundles.Add(
                new Bundle("~/bundles/js/login-react")
                    .Include("~/assets/js/runtime.js")
                    .Include("~/assets/js/react-core.js")
                    .Include("~/assets/js/loginReact.js")
            );

            bundles.Add(
                new Bundle("~/bundles/css")
                    .Include("~/assets/css/fontawesome.min.css")
                    .Include("~/assets/css/web-app/*.css")
                    .Include("~/assets/css/awp.css")
            );
        }
    }
}
