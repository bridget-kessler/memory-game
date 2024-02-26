const formatTime = (time: number): string | null => {
  let minutes = Math.floor(time / 60000);
  let seconds = Math.round((time % 60000) / 1000);

  if ((!seconds && seconds !== 0) || (!minutes && minutes !== 0)) {
    return null;
  }

  return `${
    minutes +
    (minutes == 1 ? " minute " : " minutes ") +
    seconds +
    (seconds == 1 ? " second" : " seconds")
  }`;
};

export default formatTime;
