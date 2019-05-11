window.addEventListener('load', () => {

  const createPatternBtn = document.getElementById('createPatternBtn');
  const savePatternBtn = document.getElementById('savePatternBtn');
  const closeCreatePatternPopUp = document.getElementById('closeCreatePatternPopUp');

  createPatternBtn.addEventListener('click', () => {

    document.getElementById('createPatternPopUp').style.display = 'block';
    document.getElementById('eintragForm').style.filter = 'blur(2px)';
    document.getElementById('eintragForm').style.zIndex = '-100';
    document.getElementById('eintragForm').style.userSelect = 'none';
    document.getElementById('backgroundBlocker').style.display = 'flex';

    closeCreatePatternPopUp.addEventListener('click', closeCreatePopUp);


      firebase.database().ref('Users/' + firebase.auth().currentUser.uid + '/patterns/').once('value').then((snapshot) => {
        const content = snapshot.val();;
        let patterns = [];
        let nameAlreadyUsed = false;

        // Fill Array with Database Content
        for (let index in content) {
          patterns[patterns.length] = content[index];
        }

        savePatternBtn.addEventListener('click', () => {
          const patternName = document.getElementById('patternName');
          console.log(patternName.value);
          for (const name of patterns) {
            if (name.patternname === patternName.value) nameAlreadyUsed = true;
            console.log(name.patternname);
            console.log(patternName.value);
            console.log(nameAlreadyUsed);
          }

        if (nameAlreadyUsed) {
          console.log("name is already used");
        } else if (patternName.value === '') {
          console.log("name is undefined");
        } else {
          let room;

          const kitchen = document.getElementById('kitchen');
          const hall = document.getElementById('hall');

          if (kitchen.checked) {
            room = kitchen.value;
          } else if (hall.checked) {
            room = hall.value;
          }

          firebase.database().ref("Users/" + firebase.auth().currentUser.uid + "/patterns/" + patternName.value).set({
            date: document.getElementById('date').value,
            startTime: document.getElementById('startTime').value,
            endTime: document.getElementById('endTime').value,
            room: room,
            reason: document.getElementById('reason').value,
            name: document.getElementById('name').value,
            patternname: patternName.value
          });
          closeCreatePopUp();
          patternName.value = '';
        }
      });
    });
  });
});

function closeCreatePopUp() {
  document.getElementById('createPatternPopUp').style.display = 'none';
  document.getElementById('eintragForm').style.filter = 'blur(0px)';
  document.getElementById('eintragForm').style.zIndex = '100';
  document.getElementById('eintragForm').style.userSelect = 'all';
  document.getElementById('backgroundBlocker').style.display = 'none';
}
