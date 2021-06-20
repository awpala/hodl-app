export const calculateDates = (daysRange) => {
  const dates = [];
  const MS_PER_DAY = 86400000;
  
  for (let i = 0; i < daysRange; i++) {
    dates.push(new Date(Date.now() + (i - daysRange) * MS_PER_DAY).toDateString());
  }

  return dates;
}

export default {
  calculateDates,
};
