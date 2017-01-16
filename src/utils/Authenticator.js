import {
  AsyncStorage
} from 'react-native';

import { TOKEN_KEY } from '../constants/Authentication';

class Authenticator {
  static get token() {
    return AsyncStorage.getItem(TOKEN_KEY);
  }
  static set token(token) {
    AsyncStorage.setItem(TOKEN_KEY, token);
  }
}

export default Authenticator;