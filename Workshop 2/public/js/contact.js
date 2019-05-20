var emailNode = $('#email');
var nameNode = $('#name');
var commentNode = $('#comment');
var emailOk = false;
var nameOk = false;
var commentOk = false;
var arrobaOK = false;
var periodOk = false;

 emailNode.blur(checkEmail);
nameNode.blur(checkName);
commentNode.blur(checkComment);

($('#email').keydown(function (event) {
  console.log(event.which)

  $('#email').addClass('is-invalid');

  switch (event.which) {
    case 50:
      console.log('se presiono arroba')
      arrobaOK = true;
      break;
    case 190:
      periodOk = true;
      break;
    default:
  }

  if (!(arrobaOK) && !(periodOk)) {
    $('#emailValidator').empty();
    $('#emailValidator').append('El email debe contener Punto y @');
  } else if (arrobaOK && !(periodOk)) {
    console.log('se presiono el arroba')
    $('#emailValidator').empty();
    $('#emailValidator').append('El email debe contener Punto');
  } else if (periodOk && !(arrobaOK)) {
    console.log('se presiono el punto')
    $('#emailValidator').empty();
    $('#emailValidator').append('El email debe contener arroba');
  } else if (arrobaOK && periodOk) {
    $('#email').removeClass('is-invalid');
    $('#emailValidator').empty();

  }

}

));
function checkEmail() {

  if ($('#email').val() && $('#email').val().search('@') > 0 && $('#email').val().search('\\.') > 0) {
    $('#email').removeClass('is-invalid');
    $('#email').addClass('is-valid');
    emailOk = true;
    arrobaOK = false;
    periodOk = false;
    if (emailOk && nameOk && commentOk) {
      $('#button').attr('disabled', false);
    }
  } else {
    $('#email').removeClass('is-valid');
    $('#email').addClass('is-invalid');
  }
}

function checkName() {
  if ($('#name').val()) {
    $('#name').removeClass('is-invalid');
    $('#name').addClass('is-valid');
    nameOk = true;
    if (emailOk && nameOk && commentOk) {
      $('#button').attr('disabled', false);
    }
  } else {
    $('#name').removeClass('is-valid');
    $('#name').addClass('is-invalid');
  }
}


function checkComment() {
  if ($('#comment').val()) {
    $('#comment').removeClass('is-invalid');
    $('#comment').addClass('is-valid');
    commentOk = true;
    if (emailOk && nameOk && commentOk) {
      $('#button').attr('disabled', false);
    }
  } else {
    $('#comment').removeClass('is-valid');
    $('#comment').addClass('is-invalid');
  }
}

