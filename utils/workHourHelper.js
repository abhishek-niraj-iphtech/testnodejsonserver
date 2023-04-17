function checkWorkHour(checkInTime) {
  const todayDate = Date.now();
  var timestamp1 = todayDate;
  var timestamp2 = checkInTime;
  //   var timestamp2 = timesheet[0].check_in;
  const timestamp = Date.parse(timestamp2);
  var date11 = new Date(timestamp1);
  var date22 = new Date(timestamp);

  var diff = Math.abs(date22 - date11); // get the difference in milliseconds

  // convert the difference to minutes
  var diffMinutes = Math.floor(diff / 1000 / 60);

  // convert the difference to hours
  var diffHours = Math.floor(diff / 1000 / 60 / 60);

  // convert the difference to days
  var diffDays = Math.floor(diff / 1000 / 60 / 60 / 24);

  if (diffMinutes < 60) {
    return diffMinutes + " minutes";
  } else if (diffHours < 24) {
    return (diffHours = " hours");
  } else {
    return diffHours + " days";
  }
}

const totalWorkHour = (time) => {
 return  checkWorkHour(time);
};

module.exports = totalWorkHour;