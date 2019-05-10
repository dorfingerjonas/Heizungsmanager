window.addEventListener('load', () => {

  const signInBtn = document.getElementById('signInBtn');
  const signUpBtn = document.getElementById('signUpBtn');
  const changeToSignIn = document.getElementById('loginNow');
  const changeToSignUp = document.getElementById('registerNow');
  let currentWindow = 'signIn';

  signInBtn.addEventListener('click', signIn);

  signUpBtn.addEventListener('click', signUp);

  if (currentWindow === 'signIn') {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        signIn();
      }
    });
  } else {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        signUp();
      }
    });
  }

  changeToSignIn.addEventListener('click', () => {
    let signIn = document.getElementById('signInWrapper');
    let signUp = document.getElementById('signUpWrapper');

    signUp.style.opacity = 0;
    signUp.style.display = 'none';
    signIn.style.display = 'block';
    setTimeout(() => {
      signIn.style.opacity = 1;
    }, 100);
  });

  changeToSignUp.addEventListener('click', () => {
    let signIn = document.getElementById('signInWrapper');
    let signUp = document.getElementById('signUpWrapper');

    signIn.style.opacity = 0;
    signIn.style.display = 'none';
    signUp.style.display = 'block';

    setTimeout(() => {
      signUp.style.opacity = 1;
    }, 100);
  });

  firebase.auth().onAuthStateChanged((user) => {

    let signIn = document.getElementById('signInWrapper');
    let signUp = document.getElementById('signUpWrapper');
    let eintrag = document.getElementById('eintragForm');

    if (user) {
      console.log("currently logged in.");
      signIn.style.display = 'none';
      signIn.style.opacity = 0;
      signUp.style.display = 'none';
      signUp.style.opacity = 0;
      eintrag.style.display = 'block';
    } else {
      signIn.style.display = 'block';
      signIn.style.opacity = 1;
      signUp.style.display = 'none';
      signUp.style.opacity = 0;
      eintrag.style.display = 'none';
    }
  });

  function signIn() {
    const email = document.getElementById('signInEmail');
    const password = document.getElementById('signInPassword');
    currentWindow = 'signIn';

    email.style.borderBottom = 'lightgray 2px solid';
    password.style.borderBottom = 'lightgray 2px solid';

    if (email.value === '' && password.value === '') {
      printError('Es darf kein Feld leer bleiben.', 'signInFDB');
      email.style.borderBottom = 'red 2px solid';
      password.style.borderBottom = 'red 2px solid';
    } else if (email.value === '') {
      printError('Es muss eine E-Mail Adresse eingegeben werden.', 'signInFDB');
      email.style.borderBottom = 'red 2px solid';
    } else if (password.value === '') {
      printError('Es muss ein Passwort eingegeben werden.', 'signInFDB');
      password.style.borderBottom = 'red 2px solid';
    } else {
      const promise = firebase.auth().signInWithEmailAndPassword(email.value, password.value);

      promise.catch((error) => {
        printError('E-Mail Adresse oder Passwort ist ungültig.', 'signInFDB')
      });
    }
  });

  signUpBtn.addEventListener('click', () => {
    const firstname = document.getElementById('signUpFirstname');
    const lastname = document.getElementById('signUpLastname');
    const email = document.getElementById('signUpEmail');
    const password = document.getElementById('signUpPassword');
    const confirmedPassword = document.getElementById('signUpConfirmPassword');

    firstname.style.borderBottom = 'lightgray 2px solid';
    lastname.style.borderBottom = 'lightgray 2px solid';
    email.style.borderBottom = 'lightgray 2px solid';
    password.style.borderBottom = 'lightgray 2px solid';
    confirmedPassword.style.borderBottom = 'lightgray 2px solid';

    if (firstname.value === '' && lastname.value === '' && email.value === ''  && password.value === '' && confirmedPassword.value === '') {
      printError('Es darf kein Feld leer bleiben.', 'signUpFDB');
      firstname.style.borderBottom = 'red 2px solid';
      lastname.style.borderBottom = 'red 2px solid';
      email.style.borderBottom = 'red 2px solid';
      password.style.borderBottom = 'red 2px solid';
      confirmedPassword.style.borderBottom = 'red 2px solid';
    } else if (firstname.value === '') {
      printError('Es muss ein Vorname eingegeben werden.', 'signUpFDB');
      firstname.style.borderBottom = 'red 2px solid';
    } else if (lastname.value === '') {
      printError('Es muss ein Nachname eingegeben werden.', 'signUpFDB');
      lastname.style.borderBottom = 'red 2px solid';
    } else if (email.value === '') {
      printError('Es muss eine E-Mail Adresse eingegeben werden.', 'signUpFDB');
      email.style.borderBottom = 'red 2px solid';
    } else if (password.value === '') {
      printError('Es muss ein Passwort eingegeben werden.', 'signUpFDB');
      password.style.borderBottom = 'red 2px solid';
    } else if (confirmedPassword.value === '') {
      printError('Es muss ein Passwort eingegeben werden.', 'signUpFDB');
      confirmedPassword.style.borderBottom = 'red 2px solid';
    } else if (!validateName(firstname.value)) {
      printError('Ungültiger Vorname.', 'signUpFDB');
      firstname.style.borderBottom = 'red 2px solid';
    } else if (!validateName(lastname.value)) {
      printError('Ungültiger Nachname.', 'signUpFDB');
      lastname.style.borderBottom = 'red 2px solid';
    } else if (!validateEmail(email.value)) {
      printError('Ungültige E-Mail Adresse.', 'signUpFDB');
      email.style.borderBottom = 'red 2px solid';
    } else if (password.value !== confirmedPassword.value) {
      printError('Passwörter stimmen nicht überein.', 'signUpFDB');
      password.style.borderBottom = 'red 2px solid';
      confirmedPassword.style.borderBottom = 'red 2px solid';
    } else {
      console.log(firstname.value);
      console.log(lastname.value);
      console.log(email.value);
      console.log(password.value);
      console.log(confirmedPassword.value);

      const promise = firebase.auth().createUserWithEmailAndPassword(email.value, password.value);

      promise.catch((error) => {
        printError('Es ist ein Fehler aufgetreten, versuchen Sie es später erneut.', 'signUpFDB')
      });

      firebase.database().ref("Users/" + firebase.auth().currentUser.uid + "/userdata").set({
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value
      });
    }
  });

  changeToSignIn.addEventListener('click', () => {
    let signIn = document.getElementById('signInWrapper');
    let signUp = document.getElementById('signUpWrapper');

    signUp.style.opacity = 0;
    signUp.style.display = 'none';
    signIn.style.opacity = 1;
    signIn.style.display = 'block';
  });

  changeToSignUp.addEventListener('click', () => {
    let signIn = document.getElementById('signInWrapper');
    let signUp = document.getElementById('signUpWrapper');

    signIn.style.opacity = 0;
    signIn.style.display = 'none';
    signUp.style.opacity = 1;
    signUp.style.display = 'block';
  });


});

function validatePassword(password) {
  return /[a-z]/.test(password.value) && /[A-Z]/.test(password.value) && /[0-9]/.test(password.value) && /[^a-zA-Z0-9]/.test(password.value) && password.value.length > 7;
}

function validateEmail(email) {
  const splitEmail = email.split('@');
  return splitEmail.length === 2 && splitEmail[1].split('.').length === 2 && splitEmail[1].split('.')[1].length >= 2;
}

function validateName(name) {
    return /^[A-Za-z]+$/.test(name);
}

function printError(msg, id) {
  document.getElementById(id).textContent = msg;
}
