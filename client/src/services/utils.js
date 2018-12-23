import moment from 'moment';

export const utcToLocal = (utcDate) => {
  var utc = moment(utcDate).format('YYYY-MM-DD HH:mm:ss');
  var local = moment.utc(utc).local().format('YY-MMM-DD hh:mm a');
  return local;
}

export const utcToLocalMin = (utcDate) => {
  var utc = moment(utcDate).format('YYYY-MM-DD HH:mm:ss');
  var local = moment.utc(utc).local().format('MMM Do, YY');
  return local;
}
