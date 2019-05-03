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

  let content;
  let infos = [];

  firebase.database().ref('Einträge').once('value').then((snapshot) => {

    content = snapshot.val();

    // Fill Array with Database Content
    for (let index in content) {
      infos[infos.length] = content[index];
    }

    // Sort Array by timestamp
    for (let i = 0; i < infos.length; i++) {
      for (let j = i + 1; j < infos.length; j++) {
        if (infos[i].timestamp > infos[j].timestamp) {
          let help = infos[j];
          infos[j] = infos[i];
          infos[i] = help;
        }
      }
    }

    // Convert Date Format
    for (let i = 0; i < infos.length; i++) {
      let parts = infos[i].date.split('-');
      let tempYear = parts[0];
      let tempMonth = parts[1];
      let tempDay = parts[2];

      infos[i].date = `${tempDay}.${tempMonth}.${tempYear}`;
    }

    // Write to Website
    if (window.innerWidth > 1000) {

      document.getElementById('backBtn').addEventListener('click', () => {
        window.location.href='../';
      });

      for (let i = 0; i < infos.length; i++) {
        let date = infos[i].date;
        let startTime = infos[i].startTime;
        let endTime = infos[i].endTime;
        let room = infos[i].room;
        let name = infos[i].name;
        let reason = infos[i].reason;

        let contentWrapper = document.getElementById('contentWrapper');
        let newEintrag = document.createElement('div');

        let dateBox = document.createElement('div');
        let startBox = document.createElement('div');
        let endBox = document.createElement('div');
        let roomBox = document.createElement('div');
        let nameBox = document.createElement('div');
        let reasonBox = document.createElement('div');

        let eintragData = [date, startTime, endTime, room, name, reason];
        let outputArr = [dateBox, startBox, endBox, roomBox, nameBox, reasonBox];


        for (let i = 0; i < outputArr.length; i++) {
          setTimeout(() => {
            outputArr[i].classList.add('output');
            outputArr[i].textContent = eintragData[i];
            newEintrag.appendChild(outputArr[i]);
          }, 250);
        }
        contentWrapper.appendChild(newEintrag);
      }
      changeBackgroundColor('contentWrapper');
    } else {

      document.getElementById('mobileBackBtn').addEventListener('click', () => {
        window.location.href='../';
      });

      // TODO: DEN UNTEREN CODE AN DIE MOBILE VERSION ANPASSEN:
      // 1. DAUER BERECHNEN
      // 2. DATUM, DAUER, RAUM ausgeben
      // 3. Pfeil zum Ausklappen hinzufügen

      for (let i = 0; i < infos.length; i++) {
        let date = infos[i].date;
        let startTime = infos[i].startTime;
        let endTime = infos[i].endTime;
        let room = infos[i].room;
        let name = infos[i].name;
        let reason = infos[i].reason;

        let contentWrapper = document.getElementById('mobileContentWrapper');
        let newEintrag = document.createElement('div');

        // let duration = endTime.split(':')[0] - startTime.split(':')[0] +"h";
        //
        // console.log(duration);

        let dateBox = document.createElement('div');
        let durationBox = document.createElement('div');
        let startBox = document.createElement('div');
        let endBox = document.createElement('div');
        let roomBox = document.createElement('div');
        let nameBox = document.createElement('div');
        let reasonBox = document.createElement('div');

        let eintragData = [date, startTime, room];
        let outputArr = [dateBox, startBox, roomBox];


        for (let i = 0; i < outputArr.length; i++) {
          setTimeout(() => {
            outputArr[i].classList.add('output');
            outputArr[i].textContent = eintragData[i];
            newEintrag.appendChild(outputArr[i]);
          }, 250);
        }
        contentWrapper.appendChild(newEintrag);
      }
      changeBackgroundColor('mobileContentWrapper');
    }

    // Change Backgroundcolor of every second Element
    function changeBackgroundColor(id) {
      let children = document.getElementById(id).childNodes;

      for (let i = 0; i < children.length; i++) {
        if (i % 2 !== 0) {
          children[i].classList.add('ndSubmit');
        }
      }
    }
  });
});
