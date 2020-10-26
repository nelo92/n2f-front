
import { firebase } from './firebase.config';
export const environment = {
  version: require('../../package.json').version,
  firebase: firebase,
  urlExport: "https://us-central1-nodedefrais.cloudfunctions.net/api/export",
  production: true
}