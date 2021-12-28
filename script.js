// Selecting HTML Elements
const movieSelect = document.getElementById("movie");
// Making it a number type
let ticketPrice = +movieSelect.value;

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");

populateUI();

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Function for count & Total Update
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;

  // Local Storage
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCount;
  total.innerText = (selectedSeatsCount * ticketPrice );

}

// Movie Select Event
movieSelect.addEventListener('change', e=>{
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Event Listener on Selection Container
container.addEventListener('click', e=>{
    if(
      e.target.classList.contains('seat') && 
      !e.target.classList.contains('occupied')
    )  
    { 
      e.target.classList.toggle('selected');

      //Fuction call to update the figures
      updateSelectedCount();


    }
})

// Initial count and total set
updateSelectedCount();