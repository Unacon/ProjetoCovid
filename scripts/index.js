import * as ElemFunc from './elements.js';

// GET DADOS
///GET DADOS PAIS
async function getDateCountry(){
  const response = await fetch('https://covid19.mathdro.id/api/countries/BRA');
  const json = await response.json();
  return json;
}

///GET DADOS ESTADOS
async function getDateProvinceState(){
  const response = await fetch('https://covid19.mathdro.id/api/countries/BR/confirmed');
  const json = await response.json();
  return json;
}

async function run(){
  //coleta dados da API-COVID
  const resultCountry = await getDateCountry();
  const states = await getDateProvinceState();
  
  //.toLocaleString() => Sensivel ao numeros
  //Dados do Brasil
  ElemFunc.countryDate[0].innerHTML = `- Confirmados: ${resultCountry.confirmed.value.toLocaleString()}`;
  ElemFunc.countryDate[1].innerHTML = `- Recuperados: ${resultCountry.recovered.value.toLocaleString()}`;
  ElemFunc.countryDate[2].innerHTML = `- Falecidos: ${resultCountry.deaths.value.toLocaleString()}`;
  
  //Cria as opções das cidades 
  ElemFunc.creatOption(states);

  //EVENTO DO BOTÃO 'CONFIRMAR'
  ElemFunc.buttonElement.addEventListener('click', () =>{
    //Limpa dados da tela
    ElemFunc.toClean();

    //AUTENTICADOR DE ENTRADAS
    const authenticate = ElemFunc.authenticateInput();
    
    //Captura os dados que o cliente deseja caso authenticate estive correta
    if(authenticate){    
      //Filtra os estados que o cliente deseja
      let stateResult = states.filter((state) => state.provinceState === ElemFunc.stateElement.value);

      //Mostra os dados que o cliente deseja no front-end
      ElemFunc.outputDate(stateResult);      
    }
    else{
      alert('Selecione uma cidade e pelo menos um campo');
    }
  }); 

};

run();


// var projection = d3.geoNaturalEarth2();
console.log(d3.geoPath());