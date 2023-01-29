var $currentDay = $('#currentDay')
var today = dayjs();
var saveButton = $('button')
// const map = new Map();
var localStorageMap = JSON.parse(localStorage.getItem(`map`)) || [];
var bodyOb = {}

function saveEvent(bodyText, id) {
  // inputs the id from line 24 and creates
  bodyOb[id] = bodyText;
  // spread property 
  var newStorage = {...bodyOb, ...localStorageMap}
  console.log(bodyOb);
  // init();

  localStorage.setItem('map', JSON.stringify(newStorage));
}

$("button").on("click", function(event) {
  
  event.preventDefault();

  // this refers to the button element
  var bodyText = this.parentElement.querySelector('.description').value.trim();
  var bodyId = this.parentElement.querySelector('.description').id;
  saveEvent(bodyText, bodyId);
});

function checkTime() {
  console.log(today.format('h'));
  // step1 - grab id we want to compare
  var $hour9 = $('#hour-9');
  timeEl = $hour9.children('div').text();
  
  // step2 - split the string at "-"
  // removes the AM/PM from the time to get the number
  timeEl = timeEl.substring(0, timeEl.length - 2);

  // step3 - convert the id into an integer
  // turns the timeEl string into a number
  timeEl = parseInt(timeEl, 10);
  // step4 - for loop comparison checking for time and id
  if (timeEl < today.format('HH')) {
    $hour9.addClass('past');
  }

  // step5 - apply correct class


}

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

function init() {
  // for every key in my key pairs in the localStorageMap object
  for(key in localStorageMap) {
    // console.log(key);
    // ${key} tells JQuery what id to look for to set the text value
    // this allows for the text to be set on the specific area
    $(`#${key}`).text(localStorageMap[key])
  }

  $currentDay.text(today.format('dddd, MMMM D'));
  checkTime();
}

init();
