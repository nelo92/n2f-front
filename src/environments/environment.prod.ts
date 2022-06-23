
import { firebase } from '../app/shared/configs/firebase.config';
export const environment = {
  version: require('../../package.json').version,
  firebase: firebase,
  urlExport: "https://europe-west1-nodedefrais.cloudfunctions.net/api/export",
  production: true
}