const roundTo15minutes = (date: Date): Date => {
  const ms = 1000 * 60 * 15;
  return new Date(Math.ceil(date.getTime() / ms) * ms);
};

export default roundTo15minutes;
