const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
populatedUI()

let ticketPrice = +movieSelect.value;

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    count.innerHTML = selectedSeats.length;
    total.innerHTML = '$' + (selectedSeats.length) * ticketPrice; 

    const seatIndex = [...selectedSeats].map(seat =>[...seats].indexOf(seat))
    localStorage.setItem('selectedSeat',JSON.stringify(seatIndex))
}

function populatedUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeat'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat ,index)=>{
            if(selectedSeats.indexOf(index) >-1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex  = selectedMovieIndex; 
    }

}

function setMovieData(movieIndex , movieValue){
    localStorage('selectedMovieIndex', movieIndex);
    localStorage('selectedMovieValue', movieValue);
}

movieSelect.addEventListener('change' , (e)=>{
ticketPrice = +e.target.value;
setMovieData(e.target.selectedIndex , e.target.value)
updateSelectedCount();
})

updateSelectedCount();


container.addEventListener('click' ,(e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount()
    }

})
