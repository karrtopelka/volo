export enum Routes {
  AUTH_NAVIGATOR = 'AuthNavigator',
  LOGIN = 'Login',
  REGISTER = 'Register',
  FORGOT_PASSWORD = 'ForgotPassword',
  RESTORE_PASSWORD = 'RestorePassword',

  MAIN_NAVIGATOR = 'MainNavigator',
  FEED = 'Feed',
  FEED_ALL = 'FeedAll',
  FEED_DONATION = 'FeedDonation',
  FEED_SUPPORT = 'FeedSupport',
  ACCOUNT_NAVIGATOR = 'AccountNavigator',
  ACCOUNT = 'Account',
  ACCOUNT_EDIT_NAVIGATOR = 'AccountEditNavigator',
  ACCOUNT_EDIT_PERSONAL_DATA = 'AccountEditPersonalData',
  ACCOUNT_EDIT_INTERESTS = 'AccountEditInterests',
  ACCOUNT_VIEW = 'AccountView',

  REQUEST_NAVIGATOR = 'RequestNavigator',
  REQUESTS = 'Requests',
  ACCOUNT_REQUESTS = 'AccountRequests',
  REQUEST = 'Request',
  REQUEST_INFO = 'RequestInfo',

  REQUEST_CREATE = 'RequestCreate',
  REQUEST_CREATE_NAVIGATOR = 'RequestCreateNavigator',
  REQUEST_CREATE_INITIAL = 'RequestCreateGeneralInitial',
  REQUEST_CREATE_GENERAL_INFORMATION = 'RequestCreateGeneralInformation',
  REQUEST_CREATE_CATEGORY = 'RequestCreateCategory',
  REQUEST_CREATE_PHOTOS = 'RequestCreatePhotos',
  REQUEST_CREATE_ADDITIONAL_INFORMATION = 'RequestCreateAdditionalInformation',

  REQUEST_EDIT_NAVIGATOR = 'RequestEditNavigator',
  REQUEST_EDIT = 'RequestEdit',
  REQUEST_EDIT_GENERAL_INFORMATION = 'RequestEditGeneralInformation',
  REQUEST_EDIT_CATEGORY = 'RequestEditCategory',
  REQUEST_EDIT_PHOTOS = 'RequestEditPhotos',
  REQUEST_EDIT_ADDITIONAL_INFORMATION = 'RequestEditAdditionalInformation',

  REQUEST_ADD_COMMENT = 'RequestAddComment',

  CHAT_NAVIGATOR = 'ChatNavigator',
  CHATS = 'Chats',
  CHAT = 'Chat',
  CREATE_CHAT = 'CreateChat',

  NO_ACCESS = 'NoAccess',
}

export enum RequestCreateRoutes {
  INITIAL = Routes.REQUEST_CREATE_INITIAL,
  GENERAL_INFORMATION = Routes.REQUEST_CREATE_GENERAL_INFORMATION,
  CATEGORY = Routes.REQUEST_CREATE_CATEGORY,
  PHOTOS = Routes.REQUEST_CREATE_PHOTOS,
  ADDITIONAL_INFORMATION = Routes.REQUEST_CREATE_ADDITIONAL_INFORMATION,
}

export enum RequestEditRoutes {
  INITIAL = Routes.REQUEST_EDIT,
  GENERAL_INFORMATION = Routes.REQUEST_EDIT_GENERAL_INFORMATION,
  CATEGORY = Routes.REQUEST_EDIT_CATEGORY,
  PHOTOS = Routes.REQUEST_EDIT_PHOTOS,
  ADDITIONAL_INFORMATION = Routes.REQUEST_EDIT_ADDITIONAL_INFORMATION,
}
