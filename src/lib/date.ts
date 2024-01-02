import moment from 'moment';

export function convertTimeStampToString(timestamp: any) {
  if (timestamp == null) {
    return
  } else {
    const date = timestamp.toDate();
    return moment(date).format('DD/MM/YYYY HH:mm');
  }
}

export function convertDate(date: string, full?: boolean) {
  return full ? moment(date).format('DD/MM/YYYY HH:mm:ss') : moment(date).format('DD/MM/YYYY');
}