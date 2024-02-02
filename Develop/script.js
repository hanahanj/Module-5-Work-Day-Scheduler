// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.




$(document).ready(function(){
  var today = dayjs();
  var time = dayjs().format('hh'); 
  var saveBtn = $('.saveBtn');
  var past = $('.past');
  var present = $('.present');
  var future = $('.future');

  $(function () {

  $('#currentDay').text(today.format('MMM D, YYYY'));
  // $('#currentTime').text(time);
  console.log(time);

  
    
  
  

  // TODO: Add a listener for click events on the save button.
  saveBtn.on('click', function () {
    // get the specific time slot
    var timeSlot = $(this).parent().attr('id');

    // Log any input in this tmeslot to local storage
    var entry = $(this).siblings(".description").val();

    localStorage.setItem("entry " + timeSlot, JSON.stringify(entry));



  });



  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

 // Military time threshold to confirm if the timeslot is past, present, future
 var milTime = dayjs().format('HH');
 console.log("military time " + milTime); 


 const divs = document.querySelectorAll('div');

 divs.forEach(div =>{

   const linkNumber = parseInt(div.getAttribute('data-linkNumber'));

   
   if (linkNumber == 0){
     div.classList.add('na')
   }
   else if (linkNumber < milTime){
     div.classList.add('past')
     div.classList.remove('present');
     div.classList.remove('future');

   } else if (linkNumber == milTime) { 
     div.classList.add('present')
     div.classList.remove('past');
     div.classList.remove('future');
   } else{
     div.classList.add('future')
     div.classList.remove('past');
     div.classList.remove('present');
   }
 });


  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
 
  


  // TODO (Extra): Get current time to display and realtime update.


});

function display() {
  $('.time-block').each(function() {
    var timeSlot = $(this).attr('id');
    var logEntry = localStorage.getItem(timeSlot);

    if (logEntry !== null) {
      $(this).children('.description').val(JSON.parse(logEntry));
      console.log("Entries Written to Blocks");
    }
  });
}

display();

});