import { TCalendarMeetingFetchInfo } from '@api/meeting/meeting-request.type';
import { formatCalendarDate } from './format-date';

export const addScheduleDot = (Meetings: TCalendarMeetingFetchInfo[]) => {
  Meetings.forEach((meeting) => {
    const formattedDate = formatCalendarDate(meeting.startDate);

    const elements = document.querySelectorAll(`[aria-label*='${formattedDate}']`);

    elements.forEach((element) => {
      const dotContainer = document.createElement('div');
      dotContainer.className = 'dot-container';

      const existingDots = element.querySelector('.dot-container');
      if (existingDots) {
        element.removeChild(existingDots);
      }
      //임시용 필터링
      const schedulesOnDate = Meetings.filter((s) => formatCalendarDate(s.startDate) === formattedDate);
      const numberOfDots = Math.min(3, schedulesOnDate.length);

      for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dotContainer.appendChild(dot);
      }

      element.appendChild(dotContainer);
    });
  });
};
