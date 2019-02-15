document.addEventListener('DOMContentLoaded', sendRequest);

function sendRequest() {
  const main = document.getElementById('content'),
        preloader = document.getElementById('loader'),
        request = new XMLHttpRequest();
  
  request.addEventListener('load' , onLoad);
  request.addEventListener('progress' , onProgress);
  request.open('GET', 'https://neto-api.herokuapp.com/currency', true);
  request.send();

  function onLoad() {
    if (request.status === 200) {
      preloader.classList.add('hidden');
      main.classList.remove('hidden');
      const response = JSON.parse(request.responseText);
      setData(response);
    };
  };

  function onProgress() {
    preloader.classList.remove('hidden');
  };
};

function setData(data) {
  const from = document.getElementById('from'),
        to = document.getElementById('to'),
        source = document.getElementById('source'),
        result = document.getElementById('result');
  
  data.forEach((currency) => {
    from.innerHTML = to.innerHTML += `<option name="${currency.title}" value="${currency.value}">${currency.code}</option>`;
  });
  
  convertCurrency();
  from.addEventListener('change', convertCurrency);
  to.addEventListener('change', convertCurrency);
  source.addEventListener('input', convertCurrency);
  
  function convertCurrency() { 
    result.innerHTML = (to.value * source.value / from.value).toFixed(2);   
  };
};