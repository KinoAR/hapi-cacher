const moment = require('moment');

function isOverTimeLimit(timeStamp, durationString) {
  const data = /\s*(\d+)\s*(\w+)\s*/.exec(durationString);
  if(data !== null) {
    const stampedTime = moment(timeStamp);
    const currentTime = moment(Date.now());
    return currentTime.diff(stampedTime, data[2], true) > parseInt(data[1]) ? true : false;
  } else {
    console.error("Invalid Time String");
    return false;
  }
}

module.exports = {
  isOverTimeLimit: isOverTimeLimit
}