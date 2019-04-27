window.addEventListener('load', () => {

  const config = {
    apiKey: "AIzaSyCQERvZqnAzdQJVh-kqYzYlySTPltzCAb4",
    authDomain: "heizungsmanager-cac2c.firebaseapp.com",
    databaseURL: "https://heizungsmanager-cac2c.firebaseio.com",
    projectId: "heizungsmanager-cac2c",
    storageBucket: "heizungsmanager-cac2c.appspot.com",
    messagingSenderId: "669776581855"
  };

  firebase.initializeApp(config);

  const submitBtn = document.getElementById('submitBtn');
  const listBtn = document.getElementById('listBtn');

  submitBtn.addEventListener('click', () => {

    printError('');

    const date = document.getElementById('date');
    const startTime = document.getElementById('startTime');
    const endTime = document.getElementById('endTime');
    const reason = document.getElementById('reason');
    const name = document.getElementById('name');
    let room;

    const kitchen = document.getElementById('kitchen');
    const hall = document.getElementById('hall');

    if (kitchen.checked) {
      room = kitchen.value;
    } else if (hall.checked) {
      room = hall.value;
    }

    let parts = date.value.split('-');
    let year = parts[0];
    let month = parts[1] - 1;
    let day = parts[2];

    parts = startTime.value.split(':');
    let hour = parts[0];
    let min = parts[1];
    let s = 00;
    let ms = 000;

    let currentTime = new Date();

    let timestamp = new Date(year, month, day, hour, min, s, ms);

    timestamp = timestamp.getTime();

    parts = startTime.value.split(':');
    const startHour = parts[0];
    const startMinute = parts[1];

    parts = endTime.value.split(':');
    const endHour = parts[0];
    const endMinute = parts[1];

    let inputs = document.getElementsByTagName('input');

    let areFilled = true;

    for (input of inputs) {
      if (input.value === '' && input.type !== 'radio') {
        areFilled = false;
      }
    }

    if (!areFilled) {
      printError('Es dürfen keine Felder leer bleiben!');
    } else if (endHour < startHour) {
      printError('Endzeit liegt vor der Startzeit!');
    } else if (timestamp < currentTime.getTime()) {
      printError('Datum liegt in der Vergangenheit!');
    } else if (endHour === startHour) {
      if (endMinute < startMinute) {
        printError('Endzeit liegt vor der Startzeit!');
      }
    } else {
      firebase.database().ref("Einträge/" + timestamp).set({
      date: date.value,
      startTime: startTime.value,
      endTime: endTime.value,
      room: room,
      reason: reason.value,
      name: name.value,
      timestamp: timestamp
    }, (error) => {
      if (error) {
        console.log("failed");
      } else {
        console.log('successful');
      }
    });
    }
  });

  listBtn.addEventListener('click', () => {
    window.location.href='./liste';
    const reason = document.getElementById('reason').value = '';
    const name = document.getElementById('name').value = '';
  });
});

function printError(msg) {
  document.getElementById('errorField').textContent = msg;
}
