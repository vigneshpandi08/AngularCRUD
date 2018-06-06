using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(angularCRUD.Startup))]
namespace angularCRUD
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
