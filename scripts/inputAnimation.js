window.addEventListener('load', () => {
  for (let input of document.getElementsByTagName('input')) {

    if (input.type === 'text') {
      input.addEventListener('focus', () => {
        let text = document.getElementById(`${input.id}LBL`).style;

        if (window.innerWidth > 1000) {

          text.fontSize = '8pt';
          text.top = '0';

          input.addEventListener('blur', () => {
            if (input.value === '') {
              text.fontSize = '12pt';
              text.top = '1vw';
            }
          });
        } else {
          text.fontSize = '200%';
          text.top = '0';

          input.addEventListener('blur', () => {
            if (input.value === '') {
              text.fontSize = '300%';
              text.top = '5vw';
            }
          });
        }
      });
    }
  }
});
