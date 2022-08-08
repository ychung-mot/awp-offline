export const API_DEFAULT_PREFIX = '/api';
export const API_DEFAULT_VERSION = '/v1';

/**
 * @deprecated the API_PATHS use a hard-coded versioning system that does not work well
 *  	with the data slicing. However code built before fetchReact.js was designed still
 * 		do fetches directly and rely on this.
 */
export const API_PATHS = {
	SENSOR_MODEL: '/api/v1/sensormodels/',
	SENSOR_EQUIPMENT_ASSOCIATE_TO_MODEL: '/api/v1/sensorequipmentformodel/',
	SENSOR_TYPE: '/api/v1/sensortypes/',
	WEATHER_STATIONS: '/api/v1/weatherstations/',
	WEATHER_STATION: '/api/v1/weatherstation/',
	SENSOR_EQUIPMENT_ASSOCIATE: '/api/v1/sensorequipment?query.availableOnly=true',
	SENSOR_EQUIPMENT_ASSOCIATE_TO_WEATHER_STATION: '/api/v1/SensorEquipment/Associate/',
	SENSOR_EQUIPMENT: '/api/v1/sensorequipment/',
	OBSERVATION_TYPES: '/api/v1/observationtypes/',
	CAMERA_EQUIPMENT: '/api/v1/cameraequipment/',
	CAMERA_VIEW: '/api/v1/cameraview/',
	OBSERVATIONS: '/api/v1/observations/',
	GRAPH_VIEWS: '/api/v1/graph-views/',
	INGESTION_FAILURES: '/api/v1/ingestionfailures/',
	INGESTION_FAILURE: '/api/v1/ingestionfailure/',
	OBSERVATIONS_VALIDATION_HIST: '/api/v1/observations/valid_history/',
	FORECAST_ISSUED_TIMES: '/api/v1/observations/weatherforecasts/',
	FORECAST_ISSUED_TEXT: '/api/v1/observations//weatherforecast/',
};

export const REST_API = {
	ACCESS_REQUEST: '/accessrequests/',
	ACCESS_REQUEST_APPROVE: '/accessrequests/{id}/approve',
	ACCESS_REQUEST_DENY: '/accessrequests/{id}/deny',
	SENSOR_MODEL: '/sensormodels/',
	SENSOR_EQUIPMENT_ASSOCIATE_TO_MODEL: '/sensorequipmentformodel/',
	SENSOR_TYPES: '/sensortypes/',
	WEATHER_STATIONS: '/weatherstations/',
	WEATHER_STATION: '/weatherstation/',
	SENSOR_EQUIPMENT_ASSOCIATE: '/sensorequipment?query.availableOnly=true',
	SENSOR_EQUIPMENT_ASSOCIATE_TO_WEATHER_STATION: '/SensorEquipment/Associate/',
	SENSOR_EQUIPMENT: 'sensorequipment/',
	OBSERVATION_TYPES: '/observationtypes/',
	ROLES: '/roles/',
	CAMERA_EQUIPMENT: '/cameraequipment/',
	CAMERA_VIEW: '/cameraview/',
	OBSERVATIONS: '/observations/',
	OBSERVATIONS_VALIDATION: '/observations/valid/',
	OBSERVATIONS_VALIDATION_HIST: '/observations/valid_history/',
	GRAPH_VIEWS: '/graph-views/',
	INGESTION_FAILURES: '/ingestionfailures/',
	INGESTION_FAILURE: '/ingestionfailure/',
	DATASETS_BY_WEATHER_STATION: '/datasets/by-weather-stations/',
	FORECAST_ISSUED_TIMES: '/observations/weatherforecasts/',
	FORECAST_ISSUED_TEXT: '/observations//weatherforecast/',
	USERS: '/users/',
	DASHBOARD_VIEWS: '/dashboard-views/',
	REGIONS: '/regions/',
	DROPDOWNS: '/dropdowns/',
	SENSOR_OBSERVATION_TYPES: '/segmentobservationtypes/',
	DATA_VISUALIZATION: '/datavisualization/',
	DATA_VISUALIZATION_OBSERVATION_TYPES: '/datavisualization/observationtypes/',
	DATA_VISUALIZATION_MEANINGFUL_VALUES: 'dataVisualization/meaningfulobservationvalues/',
	DATA_VISUALIZATION_ISSUED_WEATHERNET: '/datavisualization/issuedweathernetforecast/',
	DATA_VISUALIZATION_VALIDATION_RULES: '/datavisualization/validationrules/',
	MANUFACTURERS: '/manufacturers/',
	PLACEMENT_TEMPLATES: '/placementTemplates/',
	PLACEMENT_TEMPLATE: '/placementTemplate/',
};

export const STATE_STATUS = {
	IDLE: 'idle',
	LOADING: 'loading',
	SUCCESS: 'succeeded',
	FAILED: 'failed',
};

export const SENSOR_MODEL_URLS = {
	VIEW: '/SensorModels/',
	DETAILS: '/SensorModels/details/',
	EDIT: '/SensorModels/edit/',
	CREATE: '/SensorModels/Create/',
	SENSOR_EQUIPMENT_ASSOCIATE_VIEWS: '/SensorModels/details/',
};

export const MAPS_URLS = {
	VIEW: '/Maps/',
};

export const SENSOR_TYPE_URLS = {
	VIEW: '/SensorTypes/',
};

export const WEATHER_STATION_URLS = {
	VIEW: '/WeatherStations/',
	DETAILS: '/WeatherStations/details/',
	EDIT: '/WeatherStations/edit/',
	CREATE: '/WeatherStations/Create/',
	SENSOR_EQUIPMENT_ASSOCIATE_VIEWS: '/WeatherStations/Associate/',
	CAMERA_VIEWS: '/cameraview-by-weather-station/',
};

export const SENSOR_EQUIPMENT_URLS = {
	VIEW: '/SensorEquipment/',
	DETAILS: '/SensorEquipment/details/',
	EDIT: '/SensorEquipment/edit/',
	CREATE: '/SensorEquipment/Create/',
};

export const OBSERVATION_TYPES_URLS = {
	VIEW: '/ObservationTypes/',
	DETAILS: '/ObservationTypes/details/',
	EDIT: '/ObservationTypes/edit/',
	CREATE: '/ObservationTypes/Create/',
};

export const GRAPHS_URLS = {
	VIEW: '/Graphs/',
};

export const DATA_TABLES_URLS = {
	VIEW: '/DataTables/',
};

export const ROLES_URLS = {
	VIEW: '/Roles/',
};

export const MANUFACTURERS_URLS = {
	VIEW: '/Manufacturers/',
};

export const CAMERA_EQUIPMENT_URLS = {
	VIEW: '/Cameras/',
	DETAILS: '/Cameras/details/',
	EDIT: '/Cameras/edit/',
	CREATE: '/Cameras/Create/',
};

export const INGESTION_FAILURES_URLS = {
	VIEW: '/IngestionFailures/',
};

export const ACCESS_REQUEST_URLS = {
	VIEW: '/AccessRequest/',
};

export const USERS_URLS = {
	VIEW: '/users/',
};

export const DATA_TABLES_MSG = {
	NO_VALID_DATA: 'No valid data to display',
	NO_INVALID_DATA: 'No invalid data to display',
	NO_DATA: 'No data to display',
	NO_DATA_SELECTED: 'No data selected to display',
};

export const VIEW_ACTIONS = {
	ADD: 'add_view',
	DELETE: 'delete_view',
	DISCARD: 'discard_chagnes',
	SAVE: 'save_view',
	SAVE_AS: 'save_view_as',
};

export const BLANK_VIEW_NAME = 'Custom View';
export const FAKE_SEPARATOR = 'Separator';

export const RISK_CODE_COLOURS = {
	0: '#117733', // Green Normal
	1: '#fdca44', // Yellow Warning
	2: '#dc3220', // Red  Alarm
	3: '#fdca44', // Yellow Warning
	4: '#fdca44', // Yellow Warning
	5: '#117733', // Green Normal
	6: '#fdca44', // Yellow Warning
	7: '#dc3220', // Red  Alarm
};

export const GRAPH_COLORS = [
	'#1a85ff', // Blue
	'#d35fb7', // Pink
	'#22c244', // Green
	'#4b0092', // Deep purple
	'#994f00', // Brown
];

export const GRAPH_TAB_KEY = {
	TIME_SERIES: 'time_series',
	TABLE_VIEW: 'table_view',
	WIND_ROSE: 'wind_rose',
	FROST_PROBE: 'frost_probe',
};
export const SENSOR_PLACEMENT_CONFIG = {
	ID: -999999,
	SEG_ID: -9999,
	SOT_ID: -999,
	TOT_ID: -799,
	TPL_ID: -7999,
	PLACEMENT_TAG: 'sp',
	SEGMENT_TAG: 'seg',
	SOT_TAG: 'sot',
	TEMPLATE_TAG: 'tpl',
	MAPPINGS: ['Frost Probe', 'Snow Pole'], //sensor types which must match AWP.Common.Constants.cs
	NEW_SEGMENT_OBSERVATION_TYPE: {
		Id: -999,
		ObservationTypeId: null,
		ObservationTypeName: '',
		ObservationTypeDisplayName: '',
		DisplayName: null,
		IsValid: 'Y',
		SensorLayerNumber: null,
		RelativeElevationMillimetres: null,
		PlacementSegmentId: null,
		WeatherStationId: null,
		LastObservation: null,
		ConcurrencyControlNumber: null,
	},
	NEW_TEMPLATE_OBSERVATION_TYPE: {
		Id: -799,
		ObservationTypeId: null,
		ObservationTypeName: '',
		ObservationTypeDisplayName: '',
		DisplayName: null,
		PlacementTemplateId: -7999,
		ConcurrencyControlNumber: 0,
	},
};

//must match AWP.Common.Constants.cs
export const FROST_PROBE_CONFIG = {
	ID: -999999,
	SOT_ID: -900,
	DEFAULT_SOT_COUNT: 21, // number of subsfc_temp
	DATA_SOURCE: 'FrostProbe',
	TITLE_NAME: 'Frost Probe',
	SUBSFC_TEMP: 'subsfc_temp',
	SUBSFC_TEMP_TITLE: 'Subsurface Temp', //display name
	PRECISN_RESISTOR: 'precisn_resistor',
	FORST_PROBE_SENSOR_TYPE: 'Frost Probe',
	GROUP: 'Frost Probes',
	FROST_PROBE_HEAT_MAP: 'Frost Probe Heat Map',
};

//must match AWP.Common.Constants.cs
export const SNOW_POLE_CONFIG = {
	ID: -999999,
	SOT_ID: -800,
	DEFAULT_SOT_COUNT: 1, // number of snwpk_temp
	DATA_SOURCE: 'SnowPole',
	TITLE_NAME: 'Snow Pole',
	SNWPK_TEMP: 'snwpk_temp',
	SNWPK_TEMP_TITLE: 'Snwpk Temp', //display name
	//PRECISN_RESISTOR: 'precisn_resistor',
	SNOW_POLE_SENSOR_TYPE: 'Snow Pole',
	GROUP: 'Snow Poles',
};

//must match AWP.Common.Constants.cs
export const DATASET_PREFIX = {
	DEFAULT: '0',
	CAMERA: '1',
	WEATHERNET_ISSUED: '2',
	ENVIRONMENT_CANADA_ISSUED: '3',
	WEATHERNET: '4',
	ENVIRONMENT_CANADA: '5',
	FROST_PROBE: '150000',
	SNOW_POLE: '250000',
};

//must match AWP.Common.Constants.cs
export const DATASET_CONFIG = {
	CameraImagSensorTypeId: '-1',
	CameraImag_SensorTypeName: 'Images',
	CameraImagObservationTypeName: 'bc_drive_camera_image',

	WxNetIssuedForecastTypeAbbr: 'WNETPAVEMENT',
	WxNetIssuedForecastSensorTypeId: -2, //suggest negative data prefix
	WxNetIssuedForecastSensorTypeName: 'WeatherNet Pavement Issued Forecast',
	WxNetIssuedForecastPlacementName: 'WeatherNet Pavement Issued Forecast',

	ECIssuedForecastTypeAbbr: 'ECPUBLIC',
	ECIssuedForecastSensorTypeId: -3, //suggest negative data prefix
	ECIssuedForecastSensorTypeName: 'Environment Canada Issued Forecast',
	ECIssuedForecastPlacementName: 'Environment Canada Issued Forecast',
};

export const ACCESS_REQUEST_STATUS = {
	GRANTED: 'Granted',
	DENIED: 'Denied',
	PENDING: 'Pending',
};
export const INI_START_DATE = '1000-01-01 00:00:01';
export const INI_END_DATE = '3000-01-01 00:00:01';

export const Permissions = {
	AdminDefault: 'ADMIN_DEFAULT',
	PostObservation: 'POST_OBSERVATION',
	ReadAdminTools: 'READ_ADMIN_TOOLS',
	ReadDataGraph: 'READ_DATA_GRAPH',
	ReadDataTable: 'READ_DATA_TABLE',
	ReadInventory: 'READ_INVENTORY',
	ReadMaps: 'READ_MAPS',
	ReadUserDashboard: 'READ_USER_DASHBOARD',
	WriteAdminTools: 'WRITE_ADMIN_TOOLS',
	WriteCustomGraph: 'WRITE_CUSTOM_GRAPH',
	WriteDataTableManualValidation: 'WRITE_DATA_TABLE_MANUAL_VALIDATION',
	WriteGraphManualValidation: 'WRITE_GRAPH_MANUAL_VALIDATION',
	WriteObservationType: 'WRITE_OBSERVATION_TYPE',
	WriteSensorEquipment: 'WRITE_SENSOR_EQUIPMENT',
	WriteSensorModel: 'WRITE_SENSOR_MODEL',
	WriteSensorPlacement: 'WRITE_SENSOR_PLACEMENT',
	WriteSensorType: 'WRITE_SENSOR_TYPE',
	WriteWheatherStation: 'WRITE_WEATHER_STATION',
	WriteManufacturer: 'WRITE_MANUFACTURER',
};

export const DASHBOARD_COMPLETENESS_COLOURS = [
	'#AAD454', // Green - Received Expected Data
	'#E62AE6', // Purple - Received Partial Data
	'#F62727', // Red - Missing Expected Data
	'#AEAEAE', // Grey - No Expected Data
	//'#5CC6FC', // Blue - Received Unexpected Data
];
export const DASHBOARD_QUALITY_COLOURS = [
	'#AAD454', // Green - Indicates valid data
	'#F62727', // Red - Indicates invalid data
];

export const DASHBOARD_TIMELINE_COLOURS = [
	'#AAD454', // Green - Indicates on time data
	'#F9F0BE', // Yellow - Indicates late data
];

export const DASHBOARD_COMPLETENESS_COLOUR_INDEX = {
	GREEN: 0, // Green - Received Expected Data
	PURPLE: 1, // Purple - Received Partial Data
	RED: 2, // Red - Missing Expected Data
	GREY: 3, // Grey - No Expected Data
	//BLUE: 4, // Blue - Received Unexpected Data
};

export const DASHBOARD_TIMELINENESS_COLOUR_INDEX = {
	GREEN: 0, // Green - Received Expected Data
	YELLOW: 1, // Yellow - Received late Data
};

export const DASHBOARD_COMPLETENESS_DESCRIPTIONS = [
	'% received successfully', // Green - Received Expected Data
	'% received partial data', // Purple - Received Partial Data
	'% missing expected data', // Red - Missing Expected Data
	'% no expected data', // Grey - No Expected Data
	//'received unexpected data', // Blue - Received Unexpected Data
];
export const DASHBOARD_QUALITY_DESCRIPTIONS = [
	'% valid data', // Green - Indicates valid data
	'% invalid data', // Red - Indicates invalid data
];

export const DASHBOARD_TIMELINE_DESCRIPTIONS = [
	'% received expected data', // Green - Indicates on-time data
	'% received late data', // Yellow - Indicates late data
];

export const DASHBOARD_DOUGHNUT_TYPES = {
	TIMELINESS: 'Timeliness',
	COMPLETENESS: 'Completeness',
	QUALITY: 'Quality',
};

export const DASHBOARD_TAB_KEY = {
	VISUAL: 'visual',
	TEXT: 'text',
	GRAPH: 'graph',
	TABLE: 'table',
	TIMELINESS: 'timeliness',
	COMPLETENESS: 'completeness',
	QUALITY: 'quality',
};

export const GRAPH_DISPLAY_DAYS = 3; // days on graph view
export const IMAGE_DATASET_SENSOR_TYPE_NAME = 'images';

export const GeneralUserRole = 'General User';
export const SystemAdminRole = 'System Administrator';

export const DATASET_TYPES = {
	Regular: 'Regular',
	FrostProbe: 'Frost Probe',
	SnowPole: 'Snow Pole',
	Image: 'Image',
	ForecastData: 'Forecast Data',
};

export const ACTION_PAGE_TYPE = {
	GRAPH: 'Graph',
	DATATABLE: 'DataTable',
};

export const FORM_MODE = {
	CREATE: 'create',
	EDIT: 'edit',
	LIST: 'list',
	VIEW: 'view',
	DELETE: 'delete',
};
