import { parse, differenceInSeconds } from 'date-fns';

export const calculateDurationInSeconds = (startDateStr: string, expectedEndDateStr: string) => {
  const startDate = parse(startDateStr.replace(/오전|오후/g, ''), 'yyyy. M. d.  HH:mm', new Date());
  const expectedEndDate = parse(expectedEndDateStr.replace(/오전|오후/g, ''), 'yyyy. M. d.  HH:mm', new Date());
  const targetDurationInSeconds = differenceInSeconds(expectedEndDate, startDate);
  return targetDurationInSeconds;
};
