export const calculateDates = (daysRange) => {
  const dates = [];
  const MS_PER_DAY = 86400000;
  
  for (let i = 1; i <= daysRange; i++) {
    const calculatedDate = new Date(Date.now() + (i - daysRange) * MS_PER_DAY).toDateString();
    dates.push(calculatedDate);
  }

  return dates;
}

export default {
  calculateDates,
};
