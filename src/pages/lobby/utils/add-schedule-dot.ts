import { formatDate } from './format-date';
import { ScheduleList } from '../types/type';

export const addScheduleDot = (scheduleList: ScheduleList[]) => {
  scheduleList.forEach((schedule) => {
    const formattedDate = formatDate(schedule.start_date);
    const elements = document.querySelectorAll(`[aria-label*='${formattedDate}']`);

    elements.forEach((element) => {
      const dotContainer = document.createElement('div');
      dotContainer.className = 'dot-container';

      const existingDots = element.querySelector('.dot-container');
      if (existingDots) {
        element.removeChild(existingDots);
      }
      //임시용 필터링
      const schedulesOnDate = scheduleList.filter((s) => formatDate(s.start_date) === formattedDate);
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
