export const buttonElement = document.querySelector('#button');

export const confirmedElement = document.querySelector('#confirmed');
export const countryDate = document.querySelectorAll('.CountryDate');

export const dateElement = document.querySelectorAll(".date");
export const deathsElement = document.querySelector('#deaths');

export const recuperedElement = document.querySelector('#recupered');
export const resetElement = document.querySelector('#reset');
export const resultDateElement = document.querySelectorAll('.resultDate');
export const resultStateElement = document.querySelector('#resultState');

export const spanElement = document.querySelector('#teste');
export const stateElement = document.querySelector('#state');

export const CountryElement = document.querySelector('#country');
export const countryNameElement = document.querySelector('.countryName');

export const nameCountryElement = document.querySelector('#nameCountry');
export const dateResultElement = document.querySelectorAll('.dateResult');

export const WorldDateElement = document.querySelectorAll('.WorldDate');



//LIMPAS AS OPTIONS DOS ESTADOS
export function optionToClean(){
  let valor = stateElement.length;
  for(let i=0;i<valor;i++){        
    stateElement.removeChild(stateElement.childNodes[0])
  };
}

//Cria as opções dos estados
export function creatOptionState(states){  
  optionToClean();
  states.forEach((State) => {
    let newOption = document.createElement('option');   
    newOption.value = State.provinceState;
    newOption.text = State.provinceState;    
    stateElement.add(newOption)
  });
};

//Cria as opções dos paises 
export function creatOptionCountry(countries){  
  countries.forEach((country) => {
    let newOption = document.createElement('option');   
    newOption.value = country.iso3;
    newOption.text = country.name;
    newOption.className = 'countryName';
    CountryElement.add(newOption);    
  });
};


//LIMPA DADOS DA TELA
export function toClean(){
  resultStateElement.innerHTML = '';
  resultDateElement.forEach((resultDate) => {
    resultDate.innerHTML = '';
  });
  resultDateElement.innerHTML = '';
  dateResultElement.forEach((result) => result.style.display = 'none');
 
};

//AUTENTICA ENTRADAS
export function authenticateInput(){
  let authenticate = false;
  if(stateElement.value == 'null'){     
    return false;
  };  
  dateElement.forEach((date) =>{    
    if(date.checked){      
      authenticate = true;
    };
  });
  return authenticate;
};

//Mostra os dados que o cliente deseja no front-end
export function outputDate(stateResult){     
  // dateResultElement.forEach((result) => result.style.display = 'block');             
  resultStateElement.innerHTML = `${stateResult.provinceState} `;// Estado
  dateElement.forEach((box,key) =>{
    //Mostra somente os dados selecionados    
    if(box.checked){   
      dateResultElement[key].style.display = 'block';
        
      if(stateResult[box.id] === null){          
        resultDateElement[key].innerHTML = `- ${resultDateElement[key].id}: Sem informações`;                  
      }else{               
        resultDateElement[key].innerHTML = `${stateResult[box.id].toLocaleString()}`;                      
      }
    };
  });
};

//EVENTO DO BOTÃO "RESETAR"
//LIMPA DADOS DA TELA E INPUTS
resetElement.addEventListener('click', () =>{
  stateElement.selectedIndex = 0;
  dateElement.forEach((date) =>{
    date.checked = false;
  });  
  toClean();
});

//SETA TITULO DOS RESULTADO DA PESQUISA
dateResultElement[0].insertAdjacentHTML('afterbegin',`Confirmed`);
dateResultElement[1].insertAdjacentHTML('afterbegin',`Recovered`);
dateResultElement[2].insertAdjacentHTML('afterbegin',`Deaths`);

