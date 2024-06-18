export const calculateEndDate = (selectedDate: Date | null, selectedTime: string): Date | null => {
  if (!selectedDate) return null;

  const hoursMatch = selectedTime.match(/(\d+)시간/);
  const minutesMatch = selectedTime.match(/(\d+)분/);
  let hours = 0;
  let minutes = 0;

  if (hoursMatch) {
    hours = parseInt(hoursMatch[1]);
  }
  if (minutesMatch) {
    minutes = parseInt(minutesMatch[1]);
  }

  const startDate = new Date(selectedDate.getTime()); // Clone the date

  startDate?.setHours(startDate.getHours() + hours);
  startDate?.setMinutes(startDate.getMinutes() + minutes);
  const resultDate = startDate;

  return resultDate;
};
