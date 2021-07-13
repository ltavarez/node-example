const inputName = document.getElementById("name");
const inputPhone = document.getElementById("phone");
const selectContactType = document.getElementById("contact-type");

function Clear() {
  inputName.value = "";
  inputName.focus();
  inputName.classList.remove("input-error");

  inputPhone.value = "";
  inputPhone.classList.remove("input-error");

  selectContactType.value = "";
  selectContactType.classList.remove("input-error");
}

function CreateContactElement() {
  let isValid = Validate();

  if (isValid) {
    const mainContainer = document.getElementById("contact-container");

    const divColMd4 = document.createElement("div");
    divColMd4.setAttribute("class", "col-md-4 mt-4");

    const divCard = document.createElement("div");
    divCard.setAttribute("class", "card");

    const divCardHeader = document.createElement("div");
    divCardHeader.setAttribute("class", "card-header bg-success text-white");

    const h5CardTitle = document.createElement("h5");
    h5CardTitle.setAttribute("class", "card-title");
    h5CardTitle.innerText = "Contacto - " + selectContactType.value;

    const divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");

    const ulListGroup = document.createElement("ul");
    ulListGroup.setAttribute("class", "list-group list-group-flush");

    const liName = document.createElement("li");
    liName.setAttribute("class", "list-group-item");
    liName.innerText = "Nombre: " + inputName.value;

    const liPhone = document.createElement("li");
    liPhone.setAttribute("class", "list-group-item");
    liPhone.innerText = "Telefono: " + inputPhone.value;

    const btnDelete = document.createElement("button");
    btnDelete.setAttribute("class", "btn btn-outline-danger float-end mt-2");
    btnDelete.innerText = "Eliminar";
    btnDelete.addEventListener("click",function(){
       
        if(confirm("Estas seguro que deseas eliminar este contacto?")){
            mainContainer.removeChild(divColMd4);
        }

    });

    divCardHeader.appendChild(h5CardTitle);

    divCardBody.appendChild(ulListGroup);
    divCardBody.appendChild(btnDelete);

    ulListGroup.appendChild(liName);
    ulListGroup.appendChild(liPhone);

    divCard.appendChild(divCardHeader);
    divCard.appendChild(divCardBody);

    divColMd4.appendChild(divCard);

    mainContainer.append(divColMd4);

    Clear();
  } else {
    alert("Debe completar toda la info");
  }
}

function Validate() {
  let isValid = true;

  // name validation
  const valueName = inputName.value;

  if (valueName == "" || valueName == null || valueName == undefined) {
    isValid = false;
    inputName.classList.add("input-error");
  } else {
    inputName.classList.remove("input-error");
  }

  // phone validation
  const valuePhone = inputPhone.value;

  if (valuePhone == "" || valuePhone == null || valuePhone == undefined) {
    isValid = false;
    inputPhone.classList.add("input-error");
  } else {
    inputPhone.classList.remove("input-error");
  }

  // contact type validation
  const valueContactType = selectContactType.value;

  if (
    valueContactType == "" ||
    valueContactType == null ||
    valueContactType == undefined
  ) {
    isValid = false;
    selectContactType.classList.add("input-error");
  } else {
    selectContactType.classList.remove("input-error");
  }

  return isValid;
}
