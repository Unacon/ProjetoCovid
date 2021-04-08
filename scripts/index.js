




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
  //coleta dados da API
  const resultCountry = await getDateCountry();
  const states = await getDateProvinceState();
  
  //.toLocaleString() => Sensivel ao numeros
  //Dados do Brasil
  countryDate[0].innerHTML = `- Confirmados: ${resultCountry.confirmed.value.toLocaleString()}`;
  countryDate[1].innerHTML = `- Recuperados: ${resultCountry.recovered.value.toLocaleString()}`;
  countryDate[2].innerHTML = `- Falecidos: ${resultCountry.deaths.value.toLocaleString()}`;
  


  
  //Cria as opções das cidades
  states.forEach((State) => {
    let newOption = document.createElement('option');
    newOption.value = State.provinceState;
    newOption.text = State.provinceState;
    stateElement.add(newOption);
  });

  buttonElement.addEventListener('click', () =>{
    //Limpa dados da tela
    resultStateElement.innerHTML = '';
    resultDateElement.forEach((resultDate) => {
      resultDate.innerHTML = '';
    })
    resultDateElement.innerHTML = '';

    function authenticateInput(){
      let authenticate = true;
      if(stateElement.value == 'null'){
        authenticate = false;
      };
      dateElement.forEach((date) =>{
        console.log('date.checked',date.checked);
        if(date.checked){
          return authenticate;
        };
      });
      return false;
    };
    authenticate = authenticateInput();
    console.log('authenticate',authenticate);
    //Captura os dados que o cliente deseja caso algum estado seja selecionado
    if(stateElement.value !== 'null'){
      console.log(stateElement.value);
      dateElement.forEach((date) =>{
        console.log(date.checked);
      });       
      //Filtra os estados que o cliente deseja
      stateResult = states.filter((state) =>  state.provinceState == stateElement.value);
      console.log(stateResult);
      //Mostra os dados que o cliente deseja no front-end
      stateResult.forEach((state) => {                
        resultStateElement.innerHTML = `${state.provinceState} :`;
        dateElement.forEach((box,key) =>{
          if(box.checked){                          
            resultDateElement[key].innerHTML = `- ${box.id}: ${state[box.id]}`;                      
          };
        });
      });

    }else{
      alert('Seleciona uma cidade');
    }
  });  
};

const resultDateElement = document.querySelectorAll('.resultDate');
const resultStateElement = document.querySelector('#resultState');
console.log(resultStateElement);

const stateElement = document.querySelector('#state');
const confirmedElement = document.querySelector('#confirmed');
const recuperedElement = document.querySelector('#recupered');
const deathsElement = document.querySelector('#deaths');
const buttonElement = document.querySelector('#button');
const resetElement = document.querySelector('#reset');
const dateElement = document.querySelectorAll(".date");






//Reseta os dados
resetElement.addEventListener('click', () =>{
  stateElement.selectedIndex = 0;
  dateElement.forEach((date) =>{
    date.checked = false;
  });  
  resultStateElement.innerHTML = '';
    resultDateElement.forEach((resultDate) => {
      resultDate.innerHTML = '';
    })
    resultDateElement.innerHTML = '';
});









run();