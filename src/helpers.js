import React from 'react';
import { Text } from 'react-native';
import moment from 'moment';
import Permissions from 'react-native-permissions';

import { flashBack } from './constants';

import { NBR_HOURS_TYPE_MOMENT, NBR_MINUTES_TYPE_MOMENT } from './constants';


export const __checkLiveMoment = (date) => {
  if (Math.abs(parseInt(moment(date,'DD/MM/YYYY HH:mm:ss')
  .diff(new moment(), 'minutes'))) > NBR_MINUTES_TYPE_MOMENT) {
    return false;
  }

  return true;
}


export const displayMomentType = (date) => {
  if (Math.abs(parseInt(moment(date,'DD/MM/YYYY HH:mm:ss')
        .diff(new moment(), 'minutes'))) < NBR_MINUTES_TYPE_MOMENT) {
    return (
      <Text style={{ color: 'red', fontWeight: 'bold' }}>
        Now
      </Text>
    );
  } else if (Math.abs(parseInt(moment(date,'DD/MM/YYYY HH:mm:ss')
          .diff(new moment(), 'hours'))) < NBR_HOURS_TYPE_MOMENT) {

      return String(Math.abs(parseInt(moment(date,'DD/MM/YYYY HH:mm:ss')
              .diff(new moment(), 'minutes')))) + 'min';

  }
	return String(Math.abs(parseInt(moment(date,'DD/MM/YYYY HH:mm:ss')
  .diff(new moment(), 'hours')))) + 'H';

}

export const formatnumber = (number) => {
  if (number > 999) {
    const n = number/1000;
    const decimal = parseInt((n - parseInt(n)) * 10);
    if (decimal > 0)
      return String(parseInt(n)) + '.' + String(decimal) + 'k';
    else
      return String(parseInt(n)) + 'k';
  }
  return number;
}

export const getMomentPhotoDate = (createdDate) => {
  const photoTimeStamp = moment
  .utc(createdDate)
  .unix();
  const timestamp = moment().unix() - photoTimeStamp;
  if (timestamp < flashBack) {
    const hours = parseInt(timestamp/3600);
    if (hours === 0) {
     if (minutes < 6) {
         return 'Now';
        }
        return String(minutes) + 'min';
    }
    return String(hours) + 'H';
  }
  return 'Flashback'
}


export const checkPermissions = async (types) => {
  let response = {};
  await Permissions.checkMultiplePermissions(types)
    .then(r => response = r);
  return response;
}
