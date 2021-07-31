let mainTbody = document.querySelector('#mainTbody');
let editDeleteTbody = document.querySelector('#editDeleteTbody');


let accBtn = document.querySelector('#accBtn');
let addAccBtn = document.querySelector('#addAccBtn');
let editDeleteAccBtn = document.querySelector('#editDeleteAccBtn');
let saveBtn = document.querySelector('#saveBtn');
let editFormBtn = document.querySelector('#editFormBtn')


let mainView = document.querySelector('#main-view');
let addFormView = document.querySelector('#add-form-view');
let editDeleteView = document.querySelector('#edit-delete-view')
let editFormView = document.querySelector('#edit-form-view')

let nameInput = document.querySelector('input[name="name"]');
let depositInput = document.querySelector('input[name="deposit"]');
let cCardInput = document.querySelector('input[name="credit_card"]');

let editIdInput = document.querySelector('input[name="edit-id"]');
let editnameInput = document.querySelector('input[name="edit-name"]');
let editdepositInput = document.querySelector('input[name="edit-deposit"]');
let editCcardInput = document.querySelector('input[name="edit-credit_card"]');

createTable();

accBtn.addEventListener('click',createTable);
addAccBtn.addEventListener('click',displayAddView);
saveBtn.addEventListener('click',addNewAccount);
editFormBtn.addEventListener('click',editAccount);
editDeleteAccBtn.addEventListener('click',createEditDeleteTable)






function addNewAccount() {
  let name = nameInput.value;
  let deposit = depositInput.value;
  let cCard = cCardInput.value;

  // let fd = new FormData();
  //     fd.append('name',name);
  //     fd.append('deposit',deposit);
  //     fd.append('credit_card',cCard);

  let newAccount = {
    name : name,
    deposit : deposit,
    credit_card : cCard
  }


  let xml = new XMLHttpRequest();
      xml.open('POST','backend/saveAccount.php');
      xml.onreadystatechange = function () {
        if(xml.readyState === 4 && xml.status === 200){
          if(xml.responseText == "Ok"){
            createTable();
          }
        }
      }
      xml.send(JSON.stringify(newAccount))
}

function displayAddView() {
  mainView.style.display = "none";
  addFormView.style.display = "block";
  editDeleteView.style.display = "none";
  editFormView.style.display = "none";
}

function displayMainView() {
  mainView.style.display = "block";
  addFormView.style.display = "none";
  editDeleteView.style.display = "none";
  editFormView.style.display = "none";
}


function displayEditDeleteAccountView() {
  mainView.style.display = "none";
  addFormView.style.display = "none";
  editDeleteView.style.display = "block";
  editFormView.style.display = "none";
}

function createTable() {
  let xml = new XMLHttpRequest();
    xml.open('GET','backend/getAllAccounts.php');
    xml.onreadystatechange = function () {
      if(xml.readyState === 4 && xml.status === 200){
        let accounts = JSON.parse(xml.responseText);
        let text = ``;
        accounts.forEach(account => {
          text += `
          <tr>
              <td>${account.name}</td>
              <td>${account.deposit}</td>
              <td>${account.credit_card}</td>
          </tr>
          `.trim();
        })
        mainTbody.innerHTML = text;
        displayMainView()
      }
    }
    xml.send();
}


function createEditDeleteTable() {
  let xml = new XMLHttpRequest();
    xml.open('GET','backend/getAllAccounts.php');
    xml.onreadystatechange = function () {
      if(xml.readyState === 4 && xml.status === 200){
        let accounts = JSON.parse(xml.responseText);
        let text = ``;
        accounts.forEach( account => {
          text += `
          <tr>
              <td>${account.name}</td>
              <td>${account.deposit}</td>
              <td>${account.credit_card}</td>
              <td><button data-id="${account.id}" class="editBtn btn btn-warning btn-sm form-control">Edit</button></td>
              <td><button id="${account.id}" class="deleteBtn btn btn-danger btn-sm form-control">Delete</button></td>
          </tr>
          `.trim();          
        })  
        editDeleteTbody.innerHTML = text;
        let deleteBtns = document.querySelectorAll('.deleteBtn');
        let editBtns = document.querySelectorAll('.editBtn');
        for (let i = 0; i < deleteBtns.length; i++) {
          deleteBtns[i].addEventListener('click',deleteAccount);
          editBtns[i].addEventListener('click',displayEditAccountForm);
        };
        displayEditDeleteAccountView();
      }
    }
    xml.send();
}


function deleteAccount(){
    let deleteAccId = {
      id : this.id,
    }
  let sure = confirm('Are you sure?')
  if (sure) {
    let xml = new XMLHttpRequest();
      xml.open('POST','backend/deleteAccount.php')
      xml.onreadystatechange = function () {
        if (xml.readyState === 4 && xml.status === 200) {
          createTable();
        }
      }
    xml.send(JSON.stringify(deleteAccId));
  } 
}



function displayEditAccountForm() {
  mainView.style.display = "none";
  addFormView.style.display = "none";
  editDeleteView.style.display = "none";
  editFormView.style.display = "block";

  let index = this.getAttribute('data-id')


  let xml = new XMLHttpRequest();
      xml.open('GET','backend/getAllAccounts.php');
      xml.onreadystatechange = function () {
        if(xml.readyState === 4 && xml.status === 200){
          let accounts = JSON.parse(xml.responseText);
          accounts.forEach(account => {
            if(account.id === index){
              editIdInput.value = account.id
              editnameInput.value = account.name
              editdepositInput.value = account.deposit
              editCcardInput.value = account.credit_card
              }
            })    
          }
        }
  xml.send();
}
  


function editAccount() {

  let editId = editIdInput.value;
  let editName = editnameInput.value;
  let editDeposit = editdepositInput.value;
  let editCcard = editCcardInput.value;

  console.log(editCcard);
 

  let editAccount = {
    id : editId,
    name : editName,
    deposit : editDeposit,
    credit_card : editCcard
  }


  let xml = new XMLHttpRequest();
      xml.open('POST','backend/editAccount.php');
      xml.onreadystatechange = function () {
        if(xml.readyState === 4 && xml.status === 200){
          if(xml.responseText == "Ok"){
            createTable();
          }
        }
      }
      xml.send(JSON.stringify(editAccount))
}



