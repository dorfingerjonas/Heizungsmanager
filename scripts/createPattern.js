window.addEventListener('load', () => {

  const createPatternBtn = document.getElementById('createPatternBtn');
  const savePatternBtn = document.getElementById('savePatternBtn');
  const closeCreatePatternPopUp = document.getElementById('closeCreatePatternPopUp');

  createPatternBtn.addEventListener('click', () => {

    document.getElementById('createPatternPopUp').style.display = 'block';
    document.getElementById('eintragForm').style.filter = 'blur(2px)';
    document.getElementById('eintragForm').style.zIndex = '-100';
    document.getElementById('backgroundBlocker').style.display = 'flex';

    closeCreatePatternPopUp.addEventListener('click', closePopUp);

    savePatternBtn.addEventListener('click', () => {
      const patternName = document.getElementById('patternName').value;

      if (patternName !== '') {
        let room;

        const kitchen = document.getElementById('kitchen');
        const hall = document.getElementById('hall');

        if (kitchen.checked) {
          room = kitchen.value;
        } else if (hall.checked) {
          room = hall.value;
        }

        firebase.database().ref("Users/" + firebase.auth().currentUser.uid + "/patterns/" + patternName).set({
          date: document.getElementById('date').value,
          startTime: document.getElementById('startTime').value,
          endTime: document.getElementById('endTime').value,
          room: room,
          reason: document.getElementById('reason').value,
          name: document.getElementById('name').value
        });
        closePopUp();
      } else {
        console.log("name is undefined");
      }
    });
  });
});

function closePopUp() {
  document.getElementById('createPatternPopUp').style.display = 'none';
  document.getElementById('eintragForm').style.filter = 'blur(0px)';
  document.getElementById('eintragForm').style.zIndex = '100';
  document.getElementById('backgroundBlocker').style.display = 'none';
}
