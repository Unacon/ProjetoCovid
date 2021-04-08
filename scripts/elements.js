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

//Cria as opções das cidades 
export function creatOption(states){
  states.forEach((State) => {
    let newOption = document.createElement('option');
    newOption.value = State.provinceState;
    newOption.text = State.provinceState;
    stateElement.add(newOption);
  });
};

//LIMPA DADOS DA TELA
export function toClean(){
  resultStateElement.innerHTML = '';
  resultDateElement.forEach((resultDate) => {
    resultDate.innerHTML = '';
  });
  resultDateElement.innerHTML = '';
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
  stateResult.forEach((state) => {                
    resultStateElement.innerHTML = `${state.provinceState} :`;// Estado

    dateElement.forEach((box,key) =>{
      //Mostra somente os dados selecionados
      if(box.checked){                          
        resultDateElement[key].innerHTML = `- ${resultDateElement[key].id}: ${state[box.id].toLocaleString()}`;                      
      };
    });

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

