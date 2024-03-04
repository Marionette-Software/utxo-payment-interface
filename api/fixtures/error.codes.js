// All strings must be different
module.exports = {
  // Errors on Users
  USERS_NOT_LOGGED_ERROR: 'The session is over, please login again',
  USER_NOT_FOUND: "The user with such email doesn't exist",
  USERS_NOTHING_FOUND: "The user with such email doesn't exist",
  USERS_EMAIL_CONFIRMED: 'Email Confirmed',
  USERS_USERNAME_CONSTRAINT: 'This email already exists',
  USERS_FORBIDDEN_REMOVE: 'Forbidden Remove',
  USERS_INVALID_ROLE: 'Invalid Role',
  USER_INVALID_STATE: 'Invalid State',
  USERS_EMAIL_TOKEN_ERROR: 'Email Token Generate Error',
  USERS_EMAIL_NOT_VERIFIED: 'Your email is not verified',
  USERS_EMAIL_TOKEN_NOT_FOUND: 'The session is over, please login again',
  USERS_EMAIL_TOKEN_CANNOT_UPDATED: 'Email Token Cannot Update',
  USERS_EMAIL_IS_EXIST: 'This email already exists',
  USERS_EMAIL_VERIFIED: 'Email verified',
  USERS_PHONE_VERIFIED_OR_NOT_FOUND: 'Phone verified or not found',
  USERS_NOT_ACTIVE: 'User is not active',

  // Errors on Profiles
  PROFILES_DATABASE_ERROR: 'Profile Save Error',
  PROFILES_NOTHING_FOUND: 'No Profile For User',

  // Errors on Auth
  AUTH_INVALID_CREDENTIALS: 'The password is incorrect',
  AUTH_ADMIN_RESTRICTION: 'Restricted Action',
  AUTH_ACCESS_DENIED: 'Access Denied',
  AUTH_INVALID_TOKEN: 'Invalid Token',
  AUTH_NO_TOKEN: 'Token Required',
  AUTH_INVALID_SESSION: 'Invalid session',
  AUTH_NON_EXISTENT_SESSION: 'The session does not exist',

  AUTHZ_PERMISSION_DENIED: 'Permission denied',

  RATES_NO_MARKET_RATES: 'No Market Rates',
  MARKETS_NO_MARKET: 'Market Not Found',

  // Errors on Operations
  INSUFFICIENT_FUNDS: 'Insufficient funds',
  RATE_EXPIRED: 'The exchange rate has expired',
  RATES_NOT_FOUND: 'No exchange rates found',
  MARKET_NOT_FOUND: 'No Market found',
  MARKET_DISABLED: 'The market is not enabled',
  INSUFFICIENT_EXCHANGE_AMOUNT: 'The amount for this exchange is less than the minimum allowed',
  WITHDRAWAL_NOT_PENDING: 'The withdrawal is not pending, it can not be approved or declined',
  EXCHANGE_RESULT_ZERO: 'The amount for this exchange is less than the minimum possible',

  // Database Errors
  DB_ERROR: 'Database query failed!',

  // currencies
  NO_WALLET_CURRENCY: 'Cannot create wallet for currency',
  DEPOSIT_UNAVAIBLED: 'Deposit is unavailble',

  // operations/custodianOperations
  UNCORRECT_RECIPIENT: 'Uncorrect recipient',
  NO_ENOUGH_BALANCE: 'no enough balance',
  NO_OPERATION: 'Cannot find operation',
  WITHDRAW_FAILED: 'Withdrawal failed',
  MIN_WITHDRAW_AMOUNT: 'Withdrawal amount is small',
  MAX_WITHDRAW_AMOUNT: 'Withdrawal amount is big',

  //PAYMENT INTERFACES error
  CANNOT_CREATE_WALLET: 'Cannot create wallet',
  ADDRESS_IS_MISSING: 'Address is missing',
  CANNOT_GET_BALANCE: 'Cannot get balance',

  // General Errors
  UNAUTHORIZED: 'Action unauthorized for the current user',
  ACCESS_RESTRICTED: 'Access restricted',
  UNCORRECT_JSON: 'Uncorrect JSON',

  // Unknown Error
  UNKOWN_ERROR: 'Unknown Error',
};
