Code was originally from https://github.com/mattmorg55/Owin.Security.Keycloak and has been modified as follows.

1. The following claim mappings were added.

    +++ ClaimMappings

        new ClaimLookup
        {
            ClaimName = AwpClaimTypes.IdentityProvider,
            JSelectQuery = "identity_provider"
        },
        new ClaimLookup
        {
            ClaimName = AwpClaimTypes.IdirUserid,
            JSelectQuery = "idir_userid"
        },
        new ClaimLookup
        {
            ClaimName = AwpClaimTypes.BceidUserid,
            JSelectQuery = "bceid_userid"
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
            ClaimName = AwpClaimTypes.FullName,
            JSelectQuery = "name"
        },
        new ClaimLookup
        {
            ClaimName = AwpClaimTypes.EmailVerified,
            JSelectQuery = "email_verified"
        },

2. In order to record user's login time, the following handler has been added to the KeycloakAuthenticationOptions and KeycloakAuthenticationOptions.

    +++ KeycloakAuthenticationOptions
    
    /// <summary>
    /// Custom handler just after user signs in Identity Provider's log in page.
    ///     - Used for recording user's login time
    /// </summary>
    public Action<IOwinContext> AfterKeycloakIdpLogin { get; set; }
   
    +++ KeycloakAuthenticationOptions

    if (Options.AfterKeycloakIdpLogin != null)
        Options.AfterKeycloakIdpLogin(Context);

3. Support for kc_idp_hint and minor bug fix