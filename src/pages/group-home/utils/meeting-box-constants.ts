import { TMeetingFetchRes } from '@api/meeting/meeting-request.type';
import { parseISO, isWithinInterval } from 'date-fns';
import { formatDateToString } from './format-date-to-string';

export const withinIntervalDate = (startDate: string, endDate: string) => {
  const currentDate = new Date();
  const startData = parseISO(startDate);
  const expectedEndDate = parseISO(endDate);
  const isWithin = isWithinInterval(currentDate, { start: startData, end: expectedEndDate });

  return isWithin;
};

export const checkScheduledMeetingData = (meetingData: TMeetingFetchRes, isOnLive: boolean) => {
  if (!meetingData || meetingData.length === 0) {
    return false;
  }

  if (meetingData.length >= 2) {
    return true;
  }

  if (isOnLive) {
    return false;
  }

  return true;
};

export const checkScheduledMeetingDataTitle = (meetingData: TMeetingFetchRes, isOnLive: boolean) => {
  if (!meetingData || meetingData.length === 0) {
    return 'NOT YET';
  }

  if (meetingData.length >= 2) {
    return formatDateToString(parseISO(meetingData[isOnLive ? 1 : 0].startDate));
  }

  if (isOnLive) {
    return 'NOT YET';
  }

  return formatDateToString(parseISO(meetingData[0].startDate));
};

export const checkScheduledMeetingDataComment = (meetingData: TMeetingFetchRes, isOnLive: boolean) => {
  if (!meetingData || meetingData.length === 0) {
    return `현재 예정인\n회의가 없습니다.`;
  }

  if (meetingData.length >= 2) {
    return `'${meetingData[isOnLive ? 1 : 0].meetingTitle}'\n회의가 진행됩니다.`;
  }

  if (isOnLive) {
    return `현재 예정인\n회의가 없습니다.`;
  }

  return `'${meetingData[0].meetingTitle}'\n회의가 진행됩니다.`;
};
