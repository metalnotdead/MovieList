const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");
//UI start

const ui = new UI();
const storage = new Storage();

//event listeners

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
    cardBody.addEventListener("click",deleteFilm);

    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if ( title === "" || director === "" || url === ""){
        //error
        ui.displayMessages("Please fill input fields...", "danger");
    } 
    else {
        const newFilm = new Film(title,director,url);
        ui.addFilmToUI(newFilm);
        storage.addFilmToStorage(newFilm);
        ui.displayMessages("Movie added succesfully!","success");
    }
    ui.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e){
    if (e.target.id === "delete-film"){
        ui.deleteFilmfromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Successfully removed!","success");
    }
}
function clearAllFilms(){

    if(confirm("Are you sure?")){
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
}}