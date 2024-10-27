const creatbtn = document.querySelector('.creatbtn');
const welcome=document.querySelector('.welcome')
const colorOptions = document.querySelectorAll('.color-option');
const list = document.querySelector('#list'); 
const pop = document.querySelector('.popup');
const form2=document.querySelector('form')
const edit=document.querySelector('.edit');
const mode=document.querySelector('.darkmode input[type="checkbox"]');
const header=document.querySelector('.header');

const userexist=JSON.parse(localStorage.getItem("name"));
if(userexist){
    welcome.innerHTML= `<h1 class="welcome">Welcome ${userexist}</h1>`
}
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

//popup

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
         creatbtn.click();
    }
});

creatbtn.addEventListener('click',(e)=>{
    pop.style.display='block';
})



//Submit

