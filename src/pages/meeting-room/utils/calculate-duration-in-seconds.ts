import { parseISO, differenceInSeconds } from 'date-fns';

export const calculateDurationInSeconds = (startDateStr: string, expectedEndDateStr: string) => {
  const startDate = parseISO(startDateStr);
  const expectedEndDate = parseISO(expectedEndDateStr);
  const targetDurationInSeconds = differenceInSeconds(expectedEndDate, startDate);
  return targetDurationInSeconds;
};
