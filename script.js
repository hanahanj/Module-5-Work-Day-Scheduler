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

  // Display current date
  $('#currentDay').text(today.format('MMM D, YYYY'));
  // $('#currentTime').text(time);
  console.log(time);

  //  Add a listener for click events on the save button.
  saveBtn.on('click', function () {
    
    // check local storage and see if there is anything alread saved
    var storedTimeBlocks = JSON.parse(localStorage.getItem('timeSlotsKey'));

    // get the specific time slot for the entry that was saved
    var timeBlock = $(this).parent().attr('id');

    // Log the data in the description field to local storage
    var entry = $(this).siblings(".description").val();

 
// if entries are already stored in local Storage, add the new saved item to the existing object
    if (storedTimeBlocks !=null){
     
      storedTimeBlocks [timeBlock] = entry;
        
     
    } else {
      // if there is nothing in local Storage, make a new object
      storedTimeBlocks={}
      storedTimeBlocks [timeBlock] = entry;
    }

    // save to  local storage
    localStorage.setItem("timeSlotsKey", JSON.stringify(storedTimeBlocks));
    

  });
  

 // Military time threshold to confirm if the timeslot is past, present, future
 var milTime = dayjs().format('HH');
 console.log("military time " + milTime); 

//  apply the past, present, or future class to each time block by comparing the id to the current hour.
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



// get any user input that was saved in localStorage and set
//   the values of the corresponding textarea elements. HINT: How can the id
//   attribute of each time-block be used to do this?

function loadFromLocalStorage (){
var storedTimeBlocks = JSON.parse(localStorage.getItem('timeSlotsKey'));
  console.log(storedTimeBlocks);

if (storedTimeBlocks != null ){
  console.log(storedTimeBlocks);

  for (let timeBlock in storedTimeBlocks){
  console.log(timeBlock); 
  document.getElementById(timeBlock).children[1].value=storedTimeBlocks[timeBlock];

  }


}
}

loadFromLocalStorage();


});