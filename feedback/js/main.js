document.addEventListener('DOMContentLoaded', init);

function init() {
  const fields = document.querySelectorAll('.contentform input'),
        messageField = document.querySelector('.contentform textarea'),
        buttons = document.getElementsByClassName('button-contact');

  messageField.addEventListener('input', validateField);
  Array.from(fields).forEach((field) => {
    field.addEventListener('input', validateField);
  });
  
  Array.from(buttons).forEach((button) => {
    button.addEventListener('click', onClick)
  })
                              
  function validateField() {
    if (this.name === 'lastname' || this.name === 'name' || this.name === 'city') {
      this.value = this.value[0].toUpperCase() + this.value.slice(1);
    } else if (this.name === 'email') {
      const rule = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/;
      rule.test(this.value) ? this.classList.remove('wrong') : this.classList.add('wrong');
    } else if (this.name === 'zip') {
      const rule = /^\d{6}$/;
      rule.test(this.value) ? this.classList.remove('wrong') : this.classList.add('wrong');
    } else if (this.name === 'phone') {
      const rule = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
      rule.test(this.value) ? this.classList.remove('wrong') : this.classList.add('wrong');
    };
    
    validateForm();
  }
  
  function validateForm() {
    function isFilled(field) {
      return field.value === '';
    };
    
    function isCorrect(field) {
      return field.classList.contains('wrong');
    };

    if (!(Array.from(fields).some(isFilled) || messageField.value === '' || Array.from(fields).some(isCorrect))) {
        buttons[0].removeAttribute('disabled');
    } else {
        buttons[0].setAttribute('disabled', 'disabled');
    };
  };
  
  function onClick(event) {
    event.preventDefault()
    document.getElementsByClassName('contentform')[0].classList.toggle('hidden');
    document.getElementById('output').classList.toggle('hidden');
    if (!document.getElementById('output').classList.contains('hidden')) fillOutput()
  };
  
  function fillOutput() {
    const outputTags = document.querySelectorAll('main output')
    Array.from(outputTags).forEach((output) => {
      if (output.id === 'message') {
        output.value = messageField.value;
      } else {
        Array.from(fields).forEach((field) => {
          if (field.name === output.id) output.value = field.value;
        });
      };
    });
  };
};