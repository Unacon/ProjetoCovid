import * as ElemFunc from './elements.js';

// GET DADOS
///GET DADOS PAIS
async function getDateWorld(){
  const response = await fetch(`https://covid19.mathdro.id/api`);
  const json = await response.json();
  return json;
}

async function getDateCountry(id = ''){
  const response = await fetch(`https://covid19.mathdro.id/api/countries/${id}`);
  const json = await response.json();
  return json;
}

///GET DADOS ESTADOS
async function getDateProvinceState(id){
  const response = await fetch(`https://covid19.mathdro.id/api/countries/${id}/confirmed`);
  const json = await response.json();
  return json;
}

async function run(){
  ElemFunc.toClean();// LIMPA A TELA
   
  const country = await getDateCountry(); // DADOS DOS PAISES
  //Dado do Mundo e setando no front-end
  const world = await getDateWorld();
  ElemFunc.WorldDateElement[0].innerHTML = `${world.confirmed.value.toLocaleString()}`;
  ElemFunc.WorldDateElement[1].innerHTML = `${world.deaths.value.toLocaleString()}`;
  ElemFunc.WorldDateElement[2].innerHTML = `${world.recovered.value.toLocaleString()}`;



  //Cria as opções dos paises
  ElemFunc.creatOptionCountry(country.countries);  

  //EVENTO QUANDO É SELECIONADO ALGUM PAIS
  ElemFunc.CountryElement.addEventListener('change', async () => {     
    const countryName = ElemFunc.CountryElement.value;  
    
    //SETA OS ESTADOS NO FRONT PARA ESCOLHA
    const states = await getDateProvinceState(countryName); 
    ElemFunc.creatOptionState(states); 

    
    const resultCountry = await getDateCountry(countryName);
    
    //SETA OS DADOS DO PAIS NO FRONT-END
    ElemFunc.nameCountryElement.innerHTML = `${ElemFunc.CountryElement.value}`;
    ElemFunc.countryDate[0].innerHTML = `${resultCountry.confirmed.value.toLocaleString()}`;
    ElemFunc.countryDate[1].innerHTML = `${resultCountry.recovered.value.toLocaleString()}`;
    ElemFunc.countryDate[2].innerHTML = `${resultCountry.deaths.value.toLocaleString()}`;       
  });
  
  

  //EVENTO DO BOTÃO 'CONFIRMAR'
  ElemFunc.buttonElement.addEventListener('click', async () =>{
    //Nome do estado
    const states = await getDateProvinceState(ElemFunc.CountryElement.value); 
    
    //Limpa dados da tela
    ElemFunc.toClean();
    
    //AUTENTICADOR DE ENTRADAS
    const authenticate = ElemFunc.authenticateInput();
    
    //Captura os dados que o cliente deseja caso authenticate estive correta
    if(authenticate){    
      //Filtra os estados que o cliente deseja
      let stateResult = states.filter((state) => state.provinceState === ElemFunc.stateElement.value);

      //Mostra os dados que o cliente deseja no front-end      
      ElemFunc.outputDate(stateResult[0]);      
    }
    else{
      alert('Selecione uma cidade e pelo menos um campo');
      
    }
  }); 

};

run();


// var projection = d3.geoNaturalEarth2();
// console.log(d3.geoPath());
//window.location.href = "http://pt.stackoverflow.com"; MUDAR DE PAGINA