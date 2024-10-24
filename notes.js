        const creatbtn = document.querySelector('.creatbtn');
        const colorOptions = document.querySelectorAll('.color-option');
        const list = document.querySelector('#list'); 
        const pop = document.querySelector('.popup');
        const form2=document.querySelector('form')
        const edit=document.querySelector('.edit');
        let time=document.querySelector('.Editedok');
        let created=document.querySelector('.created');
        var color;
        let currentnote=null;

        
        const obj = JSON.parse(localStorage.getItem('form'));
        console.log(obj);
        const nameelement = document.querySelector('.welcome');
        nameelement.innerHTML = `<h1 class="welcome">Welcome ${obj.Username}</h1>`;

        creatbtn.addEventListener('click', () => {
            pop.style.display='block';
        });

        colorOptions.forEach(option => {
                option.addEventListener('click', (event) => {
                   color= event.target.getAttribute('data-color'); 
                   pop.style.backgroundColor=color;
                });
        });
        list.addEventListener('click', (e) => {
            if (e.target.classList.contains('close')) {
                e.target.parentElement.remove(); 
            } else if (e.target.classList.contains('edit')) {
            
                currentnote = e.target.parentElement; 
                const title = currentnote.querySelector('h2').textContent;
                const content = currentnote.querySelector('textarea').value;
                const category = currentnote.querySelector('p').textContent;
                
                form2.title.value = title;
                form2.content.value = content;
                form2.category.value = category;
                pop.style.display = 'block';
            }
        }
    );

        form2.addEventListener("submit", (e) => {
            const title = form2.title.value;
            const content = form2.content.value;
            const category = form2.category.value;
            if(currentnote)
            {
                e.preventDefault();
                currentnote.querySelector('h2').textContent = title;
                currentnote.querySelector('textarea').value = content;
                currentnote.querySelector('p').textContent=category;
                currentnote.style.backgroundColor = color; 
                form2.reset();
                pop.style.display='none';
                const currentDate = new Date();
                const day = String(currentDate.getDate()).padStart(2, '0'); z
                const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
                const year = currentDate.getFullYear(); 
                const hours = String(currentDate.getHours()).padStart(2, '0');
                const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                const seconds = String(currentDate.getSeconds()).padStart(2, '0');
                
                const formattedDate = `${day}.${month}.${year}`;
                console.log(formattedDate); 
                time.innerHTML=`
                <h3 class="time">Last Edited : ${formattedDate} ${hours}:${minutes}:${seconds}</h3>`
                
            }
            else{
                e.preventDefault();
                console.log("Create button clicked");
            let newnote = document.createElement('div');
            newnote.innerHTML = `
                <h2>${title}</h2>
                <p>${category}</p>
                <span class="edit">Edit</span>
                <span class="close">x</span>
                <textarea placeholder="text here..." rows="10" cols="30">${content}</textarea> `;
                const currentDate = new Date();
                const day = String(currentDate.getDate()).padStart(2, '0'); 
                const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
                const year = currentDate.getFullYear(); 
                const formattedDate = `${day}.${month}.${year}`;
                created.innerHTML=`
                 <h3 class="created">${formattedDate}</h3>`
                newnote.classList.add('note');
                newnote.style.backgroundColor=color  
                list.appendChild(newnote);
                localStorage.setItem("list",JSON.stringify(list))
            form2.reset();
            pop.style.display = 'none';   
            }
              
        })    

        
        
            


        
        
        
       
            
            