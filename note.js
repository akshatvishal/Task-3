const creatbtn = document.querySelector('.creatbtn');
const welcome=document.querySelector('.welcome')
const colorOptions = document.querySelectorAll('.color-option');
const list = document.querySelector('#list'); 
const pop = document.querySelector('.popup');
const form2=document.querySelector('form')
const edit=document.querySelector('.edit');
const mode=document.querySelector('.darkmode input[type="checkbox"]');
const header=document.querySelector('.header');
let currentnote=null;
var color='#FF0000'
const currentUser=JSON.parse(localStorage.getItem("currentUser"));
console.log(currentUser);
if(currentUser){
    console.log(currentUser);
    welcome.innerHTML= `<h1 class="welcome">Welcome ${currentUser.username}</h1>`
}

//loadnote
currentUser.list.forEach((element)=>{
    creatNote(element)
})

//Darkmode

mode.addEventListener('change',(e)=>{
    if(mode.checked){
        document.body.style.backgroundColor='black';
        header.style.backgroundColor='#170F55';
    }
    else{
        document.body.style.backgroundColor='white'
        header.style.backgroundColor='#3B28CC';
    }
})
//colorchoice

colorOptions.forEach(option => {
    option.addEventListener('click', (event) => {
       color= event.target.getAttribute('data-color'); 
       pop.style.backgroundColor=color;
    });
});

//popup

window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
         creatbtn.click();
    }
});

creatbtn.addEventListener('click',(e)=>{
    pop.style.display='block';
})



//notecreation

form2.addEventListener("submit",(e)=>{
    e.preventDefault()
        const title=form2.title.value;
        const category=form2.category.value;
        const content=form2.content.value;
        const Notecolor=color;
    if(currentnote){
        currentnote=null;
    }
    else{
        const Newnote={title, category , content , Notecolor};
        currentUser.list.push(Newnote);
        creatNote(Newnote)
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        form2.reset();
        pop.style.display = 'none'; 
    }
})

function creatNote(note){
    let newnote = document.createElement('div');
        newnote.innerHTML = `
                <h2 tabindex="1">${note.title}</h2>
                <p>${note.category}</p>
                <span class="edit">Edit</span>
                <span class="close">x</span>
                <textarea placeholder="text here..." rows="10" cols="30">${note.content}</textarea> `;
                newnote.classList.add('note');
                newnote.style.backgroundColor=note.Notecolor  
                list.appendChild(newnote);

}

// Update login info
let users = JSON.parse(localStorage.getItem("form")) || []; 

users.forEach((user, index) => {
    // Check if the username and email match
    if (user.username === currentUser.username && user.email === currentUser.email) {
        users.splice(index, 1); 
        console.log(index)
    }
});

users.push(currentUser);
localStorage.setItem("form", JSON.stringify(users));
