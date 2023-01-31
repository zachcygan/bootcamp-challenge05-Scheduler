var $currentDay = $('#currentDay');
var today = dayjs();
var saveButton = $('button');
var localStorageMap = JSON.parse(localStorage.getItem(`map`)) || [];
var bodyOb = {}

//from bootstrap
var alertList = document.querySelectorAll('.alert')
var alerts =  [].slice.call(alertList).map(function (element) {
  return new bootstrap.Alert(element)
})


function saveLocalStorage(bodyText, id) {
  // inputs the id from line 24 and creates
  
  bodyOb[id] = bodyText;
  // ... is a deep copy, or a spread operator
  // copies of localStorageMap and bodyOb, instead of the actual object
  // newStorage combines old localStorageMap and the new bodyOb to allow for overwriting
  var newStorage = {...localStorageMap, ...bodyOb}

  localStorage.setItem('map', JSON.stringify(newStorage));
}

// grabs all buttons and adds an event listener
$("button").on("click", saveEvent);

function saveEvent(event) {
  event.preventDefault();

  // checks to ensure shit code does not fire on alert close
  // alert close is a button
  if (this.className === 'btn-close') {
    $('.alert').addClass('d-none');
    return;
  }

  // this refers to the button element
  var bodyText = $(this).parent().children('.description').val().trim();
  var bodyId = $(this).parent().children('.description').attr('id');
  saveLocalStorage(bodyText, bodyId);

  $('.alert').removeClass('d-none');
};

function checkTime() {
  // sets text for date and time
  $currentDay.text(dayjs().format('dddd, MMMM D, hh:mm:ss a'));
  // step1 - grab id we want to compare
  var currentHour = dayjs().format('HH');

  // loops through the hour ids and applies their color
  for (var i = 0; i <= 8; i++) {
    // grabs all of the hour ids
    var timeDiv = $(`#hour-${i+9}`)
    
    // grabs the div that holds the time text
    timeEl = timeDiv.children('div').text();

    // removes the AM/PM from the time to get the number by deleting 2 characters in the string
    timeEl = timeEl.substring(0, timeEl.length - 2);

    // turns timeEl and currentHour into a number
    timeEl = parseInt(timeEl, 10);
    currentHour = parseInt(currentHour, 10);

    // we changed the time to accomodate a 24 hour clock
    if (i >= 4) {
      timeEl += 12;
    }

    // removes any classes from previous time
    timeDiv.removeClass('past');
    timeDiv.removeClass('present');
    timeDiv.removeClass('future');

    // for loop comparison checking for time and id to apply correct color
    if (timeEl < currentHour) {
      timeDiv.addClass('past');
    } else if (timeEl === currentHour) {
      timeDiv.addClass('present');
    } else {
      timeDiv.addClass('future')
    }
  }
}

function init() {
  // for every key in my key pairs in the localStorageMap object
  for(key in localStorageMap) {
    // ${#key} tells JQuery what id to look for to set the text value
    // this allows for the text to be set on the specific area
    //localStorMap[key] = localStorageMap.key
    var keyValue = $(`#${key}`);
    keyValue.text(localStorageMap[key])
  }
  checkTime();
}

setInterval(checkTime, 1000);

init();
