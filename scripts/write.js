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
  const currentTime = new Date();

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

    let startTimestamp = new Date(year, month, day, hour, min, s, ms).getTime();

    parts = endTime.value.split(':');
    hour = parts[0];
    min = parts[1];
    s = 00;
    ms = 000;

    let endTimestamp = new Date(year, month, day, hour, min, s, ms).getTime();

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
        input.style.borderBottom = 'red 2px solid';
      } else {
        input.style.borderBottom = 'lightgray 2px solid';
      }
    }

    if (!areFilled) {
      printError('Es dürfen keine Felder leer bleiben!');
    } else if (endHour < startHour) {
      printError('Endzeit liegt vor der Startzeit!');
    } else if (startTimestamp < currentTime.getTime()) {
      printError('Datum liegt in der Vergangenheit!');
    } else if (endHour === startHour) {
      if (endMinute < startMinute) {
        printError('Endzeit liegt vor der Startzeit!');
      }
    } else {
      firebase.database().ref("Einträge/" + startTimestamp).set({
      date: date.value,
      startTime: startTime.value,
      endTime: endTime.value,
      room: room,
      reason: reason.value,
      name: name.value,
      startTimestamp: startTimestamp,
      endTimestamp: endTimestamp,
    }, (error) => {
      if (error) {
        printError('Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      } else {
        document.getElementById('succesField').textContent = 'Ein neuer Eintrag wurde erfolgreich erstellt.';
      }
    });
    }
  });

  listBtn.addEventListener('click', () => {
    window.location.href='./liste';
    document.getElementById('reason').value = '';
    document.getElementById('name').value = '';
  });
});

function printError(msg) {
  document.getElementById('errorField').textContent = msg;
}
