window.addEventListener('load', () => {

  const choosePatternBtn = document.getElementById('choosePatternBtn');
  const savePatternBtn = document.getElementById('savePatternBtn');

    choosePatternBtn.addEventListener('click', () => {
      const closeChoosePatternPopUp = document.getElementById('closeChoosePatternPopUp');

        document.getElementById('choosePatternPopUp').style.display = 'block';
        document.getElementById('eintragForm').style.filter = 'blur(2px)';
        document.getElementById('eintragForm').style.zIndex = '-100';
        document.getElementById('eintragForm').style.userSelect = 'none';
        document.getElementById('backgroundBlocker').style.display = 'flex';

        closeChoosePatternPopUp.addEventListener('click', closeChoosePopUp);

          firebase.database().ref('Users/' + firebase.auth().currentUser.uid + '/patterns').once('value').then((snapshot) => {
            const content = snapshot.val();;
            let patterns = [];

            // Fill Array with Database Content
            for (let index in content) {
              patterns[patterns.length] = content[index];
            }

            // Write to Website
            if (patterns.length === 0) {
              document.getElementById('choosePatterFDB').style.display = 'block';
            } else {
              for (let i = 0; i < patterns.length; i++) {
                let date = patterns[i].date;
                let startTime = patterns[i].startTime;
                let endTime = patterns[i].endTime;
                let room = patterns[i].room;
                let name = patterns[i].name;
                let reason = patterns[i].reason;
                let patternName = patterns[i].patternname;

                let patternWrapper = document.getElementById('patternWrapper');
                let newPattern = document.createElement('div');

                let dateBox = document.createElement('div');
                let startBox = document.createElement('div');
                let endBox = document.createElement('div');
                let roomBox = document.createElement('div');
                let nameBox = document.createElement('div');
                let reasonBox = document.createElement('div');

                let patternBox = document.createElement('div');

                let eintragData = [patternName];
                let outputArr = [patternBox];

                for (let i = 0; i < outputArr.length; i++) {
                  setTimeout(() => {
                    outputArr[i].classList.add('output');
                    outputArr[i].textContent = eintragData[i];
                    outputArr[i].addEventListener('click', () => {
                      document.getElementById('date').value = date;
                      document.getElementById('startTime').value = startTime;
                      document.getElementById('endTime').value = endTime;
                      document.getElementById('reason').value = reason;
                      document.getElementById('name').value = name;
                      closeChoosePopUp();
                    });
                    newPattern.appendChild(outputArr[i]);
                  }, 100);
                }
                patternWrapper.appendChild(newPattern);
              }
            }
          });
       function closeChoosePopUp() {
        document.getElementById('choosePatternPopUp').style.display = 'none';
        document.getElementById('eintragForm').style.filter = 'blur(0px)';
        document.getElementById('eintragForm').style.zIndex = '100';
        document.getElementById('eintragForm').style.userSelect = 'all';
        document.getElementById('backgroundBlocker').style.display = 'none';

        let patternWrapper = document.getElementById('patternWrapper');

        while (patternWrapper.firstChild) {
          patternWrapper.removeChild(patternWrapper.firstChild);
        }
        document.getElementById('choosePatterFDB').style.display = 'none';
      }
    });
});
