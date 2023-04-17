function checkTime() {
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(10);
  targetTime.setMinutes(0);
  targetTime.setSeconds(0);
  targetTime.setMilliseconds(0);

  if (now > targetTime) {
    return "Late";
  } else {
    return "On time";
  }
}

const time = checkTime();

module.exports = time;
