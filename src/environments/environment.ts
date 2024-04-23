// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

// straging URLS
  // apiUrl:'http://localhost:8000/api',
  apiUrl:'http://stg-fmsgoldbox-api.goldsikka.com:3002/api',
  redirectionurl:'http://stg-fms-goldbox.goldsikka.com/signin',
  razorPayApiKey: 'rzp_test_0VM20Pg2VIA2aR',
  razorPayApiUrl: 'https://api.razorpay.com',

// Live Keys
  // apiUrl:' https://api-fms.goldbox.gold/api',
  // razorPayApiKey: 'rzp_live_uvxtS5LwJPMIOP',
  // razorPayApiUrl: 'https://api.razorpay.com',

  firebase: {
    apiKey: "AIzaSyDWwbEk6YKWpGu5srRlybIZcFajoJF5ZSk",
    authDomain: "goldsikka-59f07.firebaseapp.com",
    projectId: "goldsikka-59f07",
    storageBucket: "goldsikka-59f07.appspot.com",
    messagingSenderId: "1054771871420",
    appId: "1:1054771871420:web:661263b9e2ba0b4a0c5ab9",
    vpaidkey:"BA-gIq-13Hfr3f2jnGm0MgVDt13uWUqRQm_KY3OKCfG0UgPGRBgHsGYb4ZfzQbwBOLGe2hUJJnCYaDPN4TsSXVg",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
