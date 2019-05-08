window.addEventListener('load', () => {

  let content;
  let infos = [];
  let localTimestamp = new Date().getTime();

  firebase.database().ref('Einträge').once('value').then((snapshot) => {

    content = snapshot.val();

    // Fill Array with Database Content
    for (let index in content) {
      infos[infos.length] = content[index];
    }

    // Sort Array by timestamp
    for (let i = 0; i < infos.length; i++) {
      for (let j = i + 1; j < infos.length; j++) {
        if (infos[i].startTimestamp > infos[j].startTimestamp) {
          let help = infos[j];
          infos[j] = infos[i];
          infos[i] = help;
        }
      }
    }

    // check if Array contains past entry
    for (let i = 0; i < infos.length; i++) {
      if (infos[i].startTimestamp < localTimestamp) {
        firebase.database().ref("Einträge/" + infos[i].startTimestamp).remove();
      }
    }
  });
});
