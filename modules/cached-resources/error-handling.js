import { Parse } from 'parse/react-native';
import { retrieveSignInFunction } from '../../services/parse/auth';
import { getData, deleteData } from '../async-storage';

export default function handleParseError(err, functionToCall) {
  return new Promise((resolve, reject) => {
    if (err.code === Parse.Error.INVALID_SESSION_TOKEN) {
      // delete local async parse informatin
      deleteData('Parse/myAppId/currentUser').then(() => {
        // get locally stored user information if credentials are saved
        getData('credentials').then((user) => {
          // sign in the user to retrieve fresh session token
          retrieveSignInFunction(user.username, user.password).then(() => {
            // resubmit offline forms
            functionToCall().then(() => {
              resolve(true);
            });
          }, (error) => {
            reject(error);
          });
        });
      });
    }
  });
}
