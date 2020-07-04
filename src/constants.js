export const WS_BASE_URL				= "http://buddle.mila.celaneo.com/api/app_dev.php";

export const WS_REFRESH_TOKEN			= WS_BASE_URL + "/api/token/refresh"
export const WS_REGISTER 				= WS_BASE_URL + "/api/user/register"
export const WS_SMS_VERIFY_CODE			= WS_BASE_URL + "/api/user/verify-code"
export const WS_PHONE_NUMBER			= WS_BASE_URL + "/api/user/phone-number"
export const WS_FOLLOW_USER				= WS_BASE_URL + "/api/user/follow"
export const WS_FOLLOWERS_USER			= WS_BASE_URL + "/api/user/followers"
export const WS_FOLLOWING_USER			= WS_BASE_URL + "/api/user/following"

export const WS_USER_STATS				= WS_BASE_URL + "/api/user/stats"



export const WS_MOMENTS_ADD				= WS_BASE_URL + "/api/moments"
export const WS_MOMENTS_GET				= WS_BASE_URL + "/api/moments/"
export const WS_ADD_TAG 				= WS_BASE_URL + "/api/moment/tags/"


export const NBR_HOURS_TYPE_MOMENT 		= 1;
export const NBR_MINUTES_TYPE_MOMENT 	= 5;
//export const TEXT_PLACEHOLDER_TAG = '[On peut écrire ici le tag. Par défaut\n c\'est centré.\n On peut mettre des retours à la\n lignes]';
export const TEXT_PLACEHOLDER_TAG 		= 'Add a tag';
export const CIRCLES_COLORS = [
  'white',
  'black',
  '#3496fd',
  '#72bd53',
  '#faca60',
  '#fa8c35',
  '#9071b5',
  '#816fd1',
];
export const flashBack 					 = 86400;
export const hashtagInputLimitLength 	 = 180;
export const hashtagInputPlaceholderText = ' #monhashtag';
