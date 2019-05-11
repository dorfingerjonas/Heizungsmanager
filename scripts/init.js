window.addEventListener('load', () => {
  const currentDate = new Date();
  const date = document.getElementById('date');
  const startTime = document.getElementById('startTime');
  const endTime = document.getElementById('endTime');
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  let month;
  let day;
  let hour;
  let min;
  let dateChanged = false;
  let timeChanged = false;

  if (currentMonth < 10) {
    month = `0${currentMonth}`;
    dateChanged = true;
  } else {
    month = currentMonth;
  }

  if (currentDay < 10) {
    day = `0${currentDay}`;
    dateChanged = true;
  } else {
    day = currentDay;
  }

  if (currentHour < 10) {
    hour = `0${currentHour}`;
    timeChanged = true;
  } else {
    hour = currentHour;
  }

  if (currentMinute < 10) {
    min = `0${currentMinute}`;
    timeChanged = true;
  } else {
    min = currentMinute;
  }

  if (dateChanged) {
    date.value = `${currentYear}-${month}-${day}`;
  } else {
    date.value = `0${currentYear}-${month}-${day}`;
  }

  if (timeChanged) {
    startTime.value = `${hour}:${min}`;
    if ((hour + 1) >= 10) {
      endTime.value = `${parseInt(hour) + 1}:${min}`;
    } else {
      endTime.value = `0${parseInt(hour) + 1}:${min}`;
    }
  } else {
    startTime.value = `${hour}:${min}`;
    if ((hour + 1) >= 10) {
      endTime.value = `${parseInt(hour) + 1}:${min}`;
    } else {
      endTime.value = `0${parseInt(hour) + 1}:${min}`;
    }
  }
});
