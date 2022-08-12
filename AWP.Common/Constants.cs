using System.Collections.Generic;

namespace AWP.Common
{
    public static class Constants
    {
        public const string AwpAuthType = "keycloak_auth";
        public const string AwpKeycloakCookie = ".AspNet.keycloak_auth";
    }

    public static class AwpUserTypes
    {
        public const string IDIR = "idir";
        public const string BceidBusiness = "bceidbusiness";
        public const string Awp = "awp";
        public static string GetBceidUserType(string userType)
        {
            switch (userType.ToLowerInvariant())
            {
                case AwpUserTypes.IDIR:
                    return BceidUserTypes.Internal;
                case AwpUserTypes.BceidBusiness:
                    return BceidUserTypes.Business;
                default:
                    return "Unknown";
            }
        }
    }

    public static class BceidUserTypes
    {
        public const string Internal = "internal";
        public const string Business = "business";
    }
    public static class AwpClaimTypes
    {
        public const string Permission = "awp_permission";
        public const string IdirUserid = "idir_userid";
        public const string BceidUserid = "bceid_userid";
        public const string AwpUserid = "awp_userid";
        public const string IdentityProvider = "identity_provider";
        public const string BceidBusinessName = "bceid_business_name";
        public const string BceidBusinessGuid = "bceid_business_guid";
        public const string EmailVerified = "email_verified";
        public const string FullName = "full_name";
        public const string Title = "title";
        public const string Expired = "expired";

        public static string GetSimpleName(string fullName)
        {
            return fullName.Contains("/") ? fullName.Substring(fullName.LastIndexOf("/") + 1) : fullName;
        }
    }
    public static class Permissions
    {
        public const string ReadUserDashboard = "READ_USER_DASHBOARD";
        public const string ReadDataTable = "READ_DATA_TABLE";
        public const string WriteDataTableManualValidation = "WRITE_DATA_TABLE_MANUAL_VALIDATION";
        public const string ReadDataGraph = "READ_DATA_GRAPH";
        public const string WriteCustomGraph = "WRITE_CUSTOM_GRAPH";
        public const string WriteGraphManualValidation = "WRITE_GRAPH_MANUAL_VALIDATION";
        public const string ReadMaps = "READ_MAPS";
        public const string ReadInventory = "READ_INVENTORY";
        public const string WriteWeatherStation = "WRITE_WEATHER_STATION";
        public const string WriteSensorEquipment = "WRITE_SENSOR_EQUIPMENT";
        public const string WriteSensorModel = "WRITE_SENSOR_MODEL";
        public const string WriteSensorType = "WRITE_SENSOR_TYPE";
        public const string WriteSensorPlacement = "WRITE_SENSOR_PLACEMENT";
        public const string WriteObservationType = "WRITE_OBSERVATION_TYPE";
        public const string WriteManufacturer = "WRITE_MANUFACTURER";
        public const string ReadAdminTools = "READ_ADMIN_TOOLS";
        public const string WriteAdminTools = "WRITE_ADMIN_TOOLS";
        public const string PostObservation = "POST_OBSERVATION";
        public const string AdminDefault = "ADMIN_DEFAULT"; //todo: must be deleted
    }

    public static class ControllerTypePrefix
    {
        public const string API = "Api";
        public const string MVC = "Mvc";
    }

    public static class Roles
    {
        public const string GeneralUser = "General User";
        public const string SystemAdmin = "System Administrator";
        public const string InactiveUser = "Inactive User";        
    }

    //public static class InternalRoles
    //{
    //    public const string Admin = "Admin";
    //    public const string WeatherDataViewer = "WeatherDataViewer";
    //    public const string EET = "EET";
    //    public const string Unregistered = "Unregistered";
    //    public const string Basestation = "Basestation";
    //}

    public static class AwpUserDirectories
    {
        public const string AWP = "AWP";
        public const string BCeID = "BCEID";
        public const string IDIR = "IDIR";
    }
    /// <summary>
    /// Mapping of application direcotries to external identifier.  
    /// AWP is application defined.
    /// BCeID Business users have the user type Business as set by Siteminder. 
    /// IDIR users have the user type Internal as set by Siteminder.
    /// </summary>
    ///         
    public static class UserTypeToDirectoryMapping
    {
        public const string AWP = "AWP";
        public const string BCeID = "BUSINESS";
        public const string IDIR = "INTERNAL";
    }

    public static class TimeZones
    {
        public const string VancouverTimeZone = "America/Vancouver";
        public const string PacificTimeZone = "Pacific Standard Time";
    }

    public static class AccessRequestStatuses
    {
        public const string Pending = "Pending";
        public const string Granted = "Granted";
        public const string Denied = "Denied";
    }
    /// <summary>
    /// This mappings use for processing special ingestion types and
    /// also for api and front end related.
    /// e.g. Frost probe or Snow Pole
    /// The constant names must match WAG_SENSOR_TYPE.Name in db respectively.
    /// </summary>
    public static class SensorTypeMappings
    {
        public const string FrostProbe = "Frost Probe";
        public const string SnowPole = "Snow Pole";
        public static List<string> Mappings()
        {
            return new List<string> { FrostProbe, SnowPole };
        }
    }

    /// <summary>
    /// This mappings use for processing special ingestion types and
    /// also for api and front end related.
    /// e.g. Frost probe
    /// The constant names must match WAG_OBSERVATION_TYPE.Name in db respectively.
    /// </summary>
    public static class SensorObservationTypeMappings
    {
        public const string SubsfcTemp = "subsfc_temp"; // For frost probe only
        public const string SnwpkTemp = "snwpk_temp"; // For snow pole only
        public static List<string> Mappings()
        {
            return new List<string> { SubsfcTemp, SnwpkTemp };
        }
    }

    public static class DatasetVisualizationDatasetPrefix
    {
        public const string Default = "0";
        public const string Camera = "1";
        public const string WeatherNetIssued = "2";
        public const string EnvironmentCanadaIssued = "3";
        public const string WeatherNet = "4";
        public const string EnvironmentCanada = "5";


        //Frost probe relative elevation
        // reserved[100000 - 199999]
        // (100000 - 150000) means relative elevation is negative
        // (150000 - 199999) means relative elevation is positive e.g. 150120 relative elevation 120mm
        // 150000 rel elevation is null
        public const string FrostProbe = "150000";

        //Snow Pole relative elevation
        // reserved[200000 - 299999]
        // (200000 - 250000) means relative elevation is negative
        // (250000 - 299999) means relative elevation is positive e.g. 150120 relative elevation 120mm
        // 250000 rel elevation is null
        public const string SnowPole = "250000"; 

        /// <summary>
        /// List dataset providers to call api for respetive data
        /// Note: Frost Probe and Snow Pole belong to Defualt provider. Do not add them to the below list.
        /// </summary>
        /// <returns>List<string></returns>
        public static List<string> DatasetProviders()
        {
            return new List<string> ()
            {
                Default, 
                Camera,
                WeatherNet,
            };
        }
    }
    public static class DatasetVisualizationDatasetConfig
    {
        public const decimal CameraImagSensorTypeId = -1; //suggest negative prefix
        public const string CameraImagSensorTypeName = "Images";
        public const string CameraImagObservationTypeName = "bc_drive_camera_image";

        public const string WxNetIssuedForecastTypeAbbr = "WNETPAVEMENT";
        public const decimal WxNetIssuedForecastSensorTypeId = -2; //suggest negative data prefix
        public const string WxNetIssuedForecastSensorTypeName = "WeatherNet Pavement Issued Forecast";
        public const string WxNetIssuedForecastPlacementName = "WeatherNet Pavement Issued Forecast";

        public const string ECIssuedForecastTypeAbbr = "ECPUBLIC";
        public const decimal ECIssuedForecastSensorTypeId = -3; //suggest negative data prefix
        public const string ECIssuedForecastSensorTypeName = "Environment Canada Issued Forecast";
        public const string ECIssuedForecastPlacementName = "Environment Canada Issued Forecast";

        public const string WxNetForecastTypeAbbr = "WNETPAVEMENT";
        public const decimal WxNetForecastSensorTypeId = -4;//suggest negative data prefix
        public const string WxNetForecastSensorTypeName = "WeatherNet Pavement Forecast";
        public const string WxNetForecastPlacementName = "WeatherNet Pavement Forecast";

        public const string ECPublicForecastTypeAbbr = "ECPUBLIC";
        public const decimal ECForecastSensorTypeId = -5; //suggest negative data prefix
        public const string ECForecastSensorTypeName = "Environment Canada Forecast";
        public const string ECForecastPlacementName = "Environment Canada Forecast";

        
    }

    public static class ErrorTimers
    {
        // all returned error timers in minutes
        public const int UnableGetSegment = 1440; //=24 hours
        public const int UnableCreateSensor = 1440; //=24 hours
        public const int UnableAttachSensor = 1440; //=24 hours
        public const int UnableGetWeatherStation = 1440; //=24 hours
        public const int NoTimeStamp = 1440; //=24 hours
        public const int RejectDupedObs = 1440; //=24 hours
        public const int RejectConflictedObs = 1440; //=24 hours
        public const int UnableGetObservationType = 1440; //=24 hours
        public const int UnableConnWxNet = 30;
        public const int UnableConnEnvCan = 30;
    }
    
}
