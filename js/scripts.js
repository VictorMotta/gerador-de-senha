// Seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");
const filterGeneratePassword = document.querySelector(
  "#filter-generate-password"
);
const numberPassword = document.querySelector("#number-password");
const checkGenerateUpperCase = document.querySelector(
  "#check-generate-upper-case"
);
const checkGenerateLowerCase = document.querySelector(
  "#check-generate-lower-case"
);
const checkGenerateNumber = document.querySelector("#check-generate-number");
const checkGenerateSymbol = document.querySelector("#check-generate-symbol");
const ativarButton = document.querySelector("#aplica-button");
const checkBoxes = document.querySelectorAll(".check");
const copyButton = document.querySelector("#copiar");

//Funções
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
  const symbols = "(){}[]=<>/,.:;!@#$%&*-+*";

  return symbols[Math.floor(Math.random() * symbols.length)];
};

const checkBox = () => {
  let noCheckedBoxes = true;
  for (i = 0; i < checkBoxes.length; ++i) {
    if (checkBoxes[i].checked) {
      noCheckedBoxes = false;
    }
  }
  if (noCheckedBoxes) {
    checkBoxes[0].checked = true;
  }
};
const generatePassword = (
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbol
) => {
  let password = "";

  checkBox();

  const passwordLength = numberPassword.value;

  if (passwordLength > 20) {
    return;
  }

  const generators = [];
  if (checkGenerateUpperCase.checked) {
    generators.push(getLetterUpperCase);
  }
  if (checkGenerateLowerCase.checked) {
    generators.push(getLetterLowerCase);
  }
  if (checkGenerateNumber.checked) {
    generators.push(getNumber);
  }
  if (checkGenerateSymbol.checked) {
    generators.push(getSymbol);
  }

  for (let i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      const randomValue =
        generators[Math.floor(Math.random() * generators.length)]();

      password += randomValue;
    });
  }

  password = password.slice(0, passwordLength);

  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("#texto").value = password;
};

//Eventos
generatePasswordButton.addEventListener("click", () => {
  filterGeneratePassword.style.display = "block";
  generatePassword(
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
  );
});

ativarButton.addEventListener("click", () => {
  generatePassword(
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
  );
});

copyButton.addEventListener("click", () => {
  let textoCopiado = generatedPasswordElement.querySelector("#texto");
  textoCopiado.select();
  textoCopiado.setSelectionRange(0, 99999);
  document.execCommand("copy");
  copyButton.value = "Copied";
  setTimeout(function () {
    copyButton.value = "Copy";
  }, 500);
});
