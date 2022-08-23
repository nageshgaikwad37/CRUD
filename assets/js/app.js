let cl= console.log;

const studentForm = document.getElementById('studentForm');
const studentInfo = document.getElementById('studentInfo');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const contact = document.getElementById('contact');
const email = document.getElementById('email');
const submitbtn = document.getElementById('submit');
const updatebtn = document.getElementById('update');

let stdArray =[];

function uuidv4(){
    return "xxxxxxxx-xxxx-4xxx-yxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){
        var r = (Math.random()*16) | 0,
        v=c =="x" ? r: (r & 0x3) | 0x8;
        return v. toString(16); 
    });
}

const getLocalData = () => {
    return JSON.parse(localStorage.getItem('stdArray'));
}


const onEditHandler = (ele) => {
    // let getId = ele.getAttribute('data-id');
    let getEditId = ele.dataset.id;
    localStorage.setItem('setEditId',getEditId)
    let arr = getLocalData();

    let getObj = arr.find(ele => ele.id === getEditId);
    fname.value = getObj.firstName;
    lname.value = getObj.lastName;
    contact.value = getObj.contact;
    email.value = getObj.email;
    
    submitbtn.classList.add('d-none');
    updatebtn.classList.remove('d-none');
}

const onDeleteHandler = (ele) => {
    let getDeleteId = ele.dataset.id;
    let getData = getLocalData();
    stdArray = getData.filter(ele => ele.id != getDeleteId);
    tamplating(stdArray);
    localStorage.setItem('stdArray', JSON.stringify(stdArray));
}

const tamplating = (arr) => {
    result = '';
    arr.forEach((ele, i) => {
        result += 
        `<tr>
             <td>${i +1}</td>
             <td>${ele.firstName}</td>
             <td>${ele.lastName}</td>
             <td>${ele.email}</td>
             <td>${ele.contact}</td>
             <td><button class="btn btn-success" data-id ="${ele.id}" onclick = 'onEditHandler(this)' >Edit</button></td>
             <td><button class="btn btn-danger" data-id ="${ele.id}" onclick = 'onDeleteHandler(this)' >Delete</button></td>
         </tr>`
    })
    studentInfo.innerHTML = result;
}

const onStdInfoSubmit = (e) => {
       e.preventDefault();
       let obj = { 
        firstName : fname.value,
        lastName : lname.value,
        email : email.value,
        contact : contact.value,
        id : uuidv4()
    };
    stdArray.push(obj);
    tamplating(stdArray);
    localStorage.setItem('stdArray',JSON.stringify(stdArray));
    e.target.reset();

}

const onStdInfoUpdate = () => {
    
    strArray = getLocalData();
    let getUpdateId = localStorage.getItem('setEditId');
    stdArray.forEach((ele) => {
        if(ele.id === getUpdateId){
             ele.firstName = fname.value;
             ele.laststName = lname.value;
             ele.contact = contact.value;
             ele.email = email.value;

        }
    })
    tamplating(stdArray)
    localStorage.setItem('stdArray',JSON.stringify(stdArray));
    submitbtn.classList.remove('d-none');
    updatebtn.classList.add('d-none');
    studentForm.reset();

}


  if(localStorage.getItem('stdArray')){
        stdArray = getLocalData();
       tamplating(stdArray);

    }

    studentForm.addEventListener("submit",onStdInfoSubmit);
    updatebtn.addEventListener("click",onStdInfoUpdate);