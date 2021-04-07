




// GET DADOS

async function getDateCountry(){
  const response = await fetch('https://covid19.mathdro.id/api/countries/BRA');
  const json = await response.json();

  return json;

}
async function getDateProvinceState(){
  const response = await fetch('https://covid19.mathdro.id/api/countries/BR/confirmed');
  const json = await response.json();
  return json;
}

const spanElement = document.querySelector('#teste');
const countryDate = document.querySelectorAll('.CountryDate');

async function run(){
  const resultCountry = await getDateCountry();
  const resultState = await getDateProvinceState();
  //.toLocaleString() => Sensivel ao numeros
  //Dados do Brasil
  countryDate[0].innerHTML = `- Confirmados: ${resultCountry.confirmed.value.toLocaleString()}`;
  countryDate[1].innerHTML = `- Recuperados: ${resultCountry.recovered.value.toLocaleString()}`;
  countryDate[2].innerHTML = `- Falecidos: ${resultCountry.deaths.value.toLocaleString()}`;
  // console.log(resultState);
  resultState.forEach((State) => {
    // console.log(State.provinceState);
  }); 


}

run();

const stateElement = document.querySelector('#state');
const confirmedElement = document.querySelector('#confirmed');
const recuperedElement = document.querySelector('#recupered');
const deathsElement = document.querySelector('#deaths');
const buttonElement = document.querySelector('#button');
const resetElement = document.querySelector('#reset');

const dateElement = document.querySelectorAll(".date");

//Retorna os dados
buttonElement.addEventListener('click', () =>{
  if(stateElement.value !== 'null'){
    console.dir(stateElement.value);
    dateElement.forEach((date) =>{
      console.log(date.checked);
    });  
  }else{
    alert('Seleciona uma cidade');
  }
});


//Reseta os dados
resetElement.addEventListener('click', () =>{
  stateElement.selectedIndex = 0;
  dateElement.forEach((date) =>{
    date.checked = false;
  });
});