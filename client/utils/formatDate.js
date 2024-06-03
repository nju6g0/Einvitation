const formatDate = (data) => {
  const newDate = new Date(data);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();

  return `${year}/ ${month} / ${date}`;
};
const formatTime = (data) => {
  const newDate = new Date(data);
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  const hours = hour < 10 ? `0${hour}` : hour;
  const minutes = minute < 10 ? `0${minute}` : minute;

  return `${hours}:${minutes}`;
};

export { formatDate, formatTime };
