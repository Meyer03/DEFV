const button = document.querySelector('#button');
const input = document.querySelector('#input');
const answer = document.querySelector('#answer');
const error = document.querySelector('#error');

const API_ENDPOINT = 'https://yesno.wtf/api';

let isRequestInProgress = false;

const setIsRequestInProgress = value => {
  isRequestInProgress = value;
};

const setButtonState = isDisabled => {
  button.disabled = isDisabled;
};

const showAnswer = answerImageUrl => {
  answer.innerHTML = `<img src="${answerImageUrl}" width="600px" height="400px">`;
};

const fetchAnswer = () => {
  setIsRequestInProgress(true);
  setButtonState(true);

  fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(data => {
      showAnswer(data.image);
      setIsRequestInProgress(false);
      setButtonState(false);
    });
};

const showError = () => {
  error.innerHTML = 'Escribe algo primero...';
  setTimeout(() => {
    error.innerHTML = '';
  }, 3000);
};

const getAnswer = () => {
  if (isRequestInProgress) return;
  if (!input.value) return showError();
  fetchAnswer();
};

const handleKeyEnter = event => {
  if (event.keyCode === 13) {
    getAnswer();
  }
};

button.addEventListener('click', getAnswer);
