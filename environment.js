import * as Updates from 'expo-updates';
import { Platform } from 'react-native';

const ENV = {
  dev: {
    parseAppId: 'myAppId',
    parseJavascriptKey: '',
    parseServerUrl: Platform.OS === 'ios' ? 'http://localhost:1337/parse' : 'http://10.0.2.2:1337/parse',
    parseMasterKey: '',
    taskyUrlApi: 'https://puente-tasky-dev.herokuapp.com/',
    AWS_LAMBDA_URL: 'https://98kngyxax2.execute-api.us-east-1.amazonaws.com/default/s3-json-to-client',
  },
  // dev: {
  //   parseAppId: '1A95hsvxDlQta3wQyp4dArRzLcKKf1w3AyfQaqtH',
  //   parseJavascriptKey: 'IDl2eJ5iXHtXp8RgzqNlT2uKQwNSOlSfeSF6yrFO',
  //   parseServerUrl: 'https://parseapi.back4app.com/',
  //   parseMasterKey: 'FT0yFe8N7RhPNXazwqPyoxJOe1LDr3P4OZ1LpMLE',
  //   taskyUrlApi: 'https://puente-tasky-dev.herokuapp.com/',
  //   AWS_LAMBDA_URL: 'https://98kngyxax2.execute-api.us-east-1.amazonaws.com/default/s3-json-to-client',
  // },
  // dev: {
  //   parseAppId: 'ZvGwjA7cemNfr9Qtn6LnwnrcgiM3Xl4N3msObrcg',
  //   parseJavascriptKey: 'dQW12E6wgKWrqdlNCYMCIzLzWomgjCZlLZrrXlki',
  //   parseServerUrl: 'https://parseapi.back4app.com/',
  //   parseMasterKey: 'rkR6dXFB7KTZzl4LLF5138xPgBAG5cG5NxPBcp6l',
  //   taskyUrlApi: 'https://puente-tasky-dev.herokuapp.com/',
  //   AWS_LAMBDA_URL: 'https://98kngyxax2.execute-api.us-east-1.amazonaws.com/default/s3-json-to-client',
  // },
  staging: {
    parseAppId: 'ZvGwjA7cemNfr9Qtn6LnwnrcgiM3Xl4N3msObrcg',
    parseJavascriptKey: 'dQW12E6wgKWrqdlNCYMCIzLzWomgjCZlLZrrXlki',
    parseServerUrl: 'https://parseapi.back4app.com/',
    parseMasterKey: 'rkR6dXFB7KTZzl4LLF5138xPgBAG5cG5NxPBcp6l',
    taskyUrlApi: 'https://puente-tasky-dev.herokuapp.com/',
    AWS_LAMBDA_URL: 'https://98kngyxax2.execute-api.us-east-1.amazonaws.com/default/s3-json-to-client',
  },
  production: {
    parseAppId: 'vBdTHqQU31IyLW5uYRDIWb8Ew8zCZGBzMqChugjr',
    parseJavascriptKey: 'jFWiqliNRHXiH72J9kiotL8m0EuSdry1yFIiYlad',
    parseServerUrl: 'https://parseapi.back4app.com/',
    parseMasterKey: 'Mmsy8ZiqilnYG81lI7T4GhfwP4jbsdAtjBYtu3uC',
    AWS_LAMBDA_URL: 'https://98kngyxax2.execute-api.us-east-1.amazonaws.com/default/s3-json-to-client',
  }
};

const getEnvVars = (env = Updates.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (env === null || env === undefined || env === 'default' || env.indexOf('dev') !== -1) {
    return ENV.dev;
  } if (env.indexOf('staging') !== -1) {
    return ENV.staging;
  } if (env.indexOf('production') !== -1) {
    return ENV.production;
  }
  return ENV.production;
};

const selectedENV = getEnvVars();

export default selectedENV;
