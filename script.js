class Book {
    constructor(name, author, year, status){
        this.name = name;
        this.author = author;
        this.year = year;
        this.status = status;
    }
  
}

class Library {
    static displayBooks(){
        let myLibrary = [
            {   name: 'A Study in Scarlet',
                author:'Arthur Conan Doyle',
                year: '1887',
                status: true
            }
        ];
        const library = myLibrary;
        library.forEach((book) => Library.addBookToLibray(book));
    } 

    static addBookToLibray(book){
        var readStat = document.createElement('input');
        const list = document.querySelector('#library-books');
        
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        `;

        row.appendChild(readStat);
        //readStat.setAttribute("type", "button");
        readStat.classList.add('btn','btn-primary', 'read');
        list.appendChild(row);   
        

        if(book.status) {
            readStat.classList.add('btn','btn-success');    
            readStat.value = 'Finished';
          } else {
            readStat.classList.add('btn','btn-primary');  
            readStat.value = 'Unread';
          }
      
          readStat.addEventListener('click', (e) => {
            if(book.status) {
              readStat.classList.remove('btn','btn-success');      
              readStat.classList.add('btn','btn-primary');    
              book.status = false;
              readStat.value = 'Unread';
            } else {
              book.status = true; 
              readStat.classList.remove('btn','btn-promary');  
              readStat.classList.add('btn','btn-success');
              readStat.value = 'Finished';
            }
        });
    }
}



document.addEventListener('DOMContentLoaded', Library.displayBooks);