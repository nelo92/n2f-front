
import { firebase } from './firebase.config';
export const environment = {
  version: require('../../package.json').version,
  firebase: firebase,
  production: true
}