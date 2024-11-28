var bookmarkName = document.getElementById('bookmarkName');
var siteURL = document.getElementById('siteURL');
var btnSubmit = document.getElementById('btnSubmit');
var btnupdate = document.getElementById('btnupdate');
var validationError = document.getElementById('validationError');

var bookmarks = [];

if(localStorage.getItem('allBookmarks')){
    bookmarks = JSON.parse(localStorage.getItem('allBookmarks'));
    display(bookmarks);
}

var lastIndex;

function submit(){
   if(validateName(bookmarkName.value) && validateURL(siteURL.value)){
    var bookmark = {
        bname : bookmarkName.value ,
        site : siteURL.value
    }
    bookmarks.push(bookmark);
    localStorage.setItem('allBookmarks', JSON.stringify(bookmarks));
    clear();
    bookmarkName.classList.remove('is-valid' , 'valid-shadow');
    siteURL.classList.remove('is-valid' , 'valid-shadow');
    display(bookmarks);
   }else {
    validationError.classList.remove('d-none');
    }
}
function validateName(Name){
    bookmarkName.classList.add('is-invalid');
    bookmarkName.classList.replace('focused','invalid-shadow');
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].bname == Name || Name.length < 3){
            return false;
        }
    } 
    bookmarkName.classList.replace('is-invalid' , 'is-valid');
    bookmarkName.classList.replace('invalid-shadow' , 'valid-shadow');
    return true;
}
function validateURL(url){
    siteURL.classList.add('is-invalid');
    siteURL.classList.replace('focused','invalid-shadow');
    var urlReg = /^(https|HTTPS|http|HTTP):\/\/(www|WWW)\..+\.[a-z]{2,3}\/?/;
    if(urlReg.test(url)){
        siteURL.classList.replace('is-invalid' , 'is-valid');
        siteURL.classList.replace('invalid-shadow' , 'valid-shadow');
        return true;
    }else{
        return false;
    }
}
function closeModal(){
    validationError.classList.add('d-none');
}
function clear(){
    bookmarkName.value = null;
    siteURL.value = null;
}
function display(arr){
    var savedItems = ``;
    for(var i = 0; i < arr.length; i++){
        savedItems += `
            <tr class="text-center">
                <th scope="row">${i+1}</th>
                <td>${arr[i].bname}</td>
                <td><button type="button" id="btnVisit" class="btn px-1 px-md-3">
                    <i class="fa-solid fa-eye text-white"></i>
                    <a href="${arr[i].site}" target="_blank">Visit</a>
                </button></td>
                <td><button type="button" onclick="setMarkToUpdate(${i})" id="btnUpdate" class="btn px-1 px-md-3">
                    <i class="fa-solid fa-pen-to-square text-white"></i>
                    Update
                </button></td>
                <td><button type="button" onclick="deleteMark(${i})" id="btnDelete" class="btn px-1 px-md-3">
                    <i class="fa-solid fa-trash-can text-white"></i>
                    Delete
                </button></td>
            </tr>
        `
    }
    document.getElementById('bodyRows').innerHTML = savedItems;
}
function search(key){
    var result = [];
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].bname.toLowerCase().includes(key.toLowerCase())){
            result.push(bookmarks[i]);
        }
    }
    display(result);
}
function setMarkToUpdate(index){
    lastIndex = index;
    bookmarkName.value = bookmarks[index].bname;
    siteURL.value = bookmarks[index].site;
    btnSubmit.classList.replace('d-block' , 'd-none');
    btnupdate.classList.replace('d-none' , 'd-block');
}
function update(){
    bookmarks[lastIndex].bname = bookmarkName.value;
    bookmarks[lastIndex].site = siteURL.value;
    localStorage.setItem('allBookmarks' , JSON.stringify(bookmarks));
    clear();
    display(bookmarks);
    btnupdate.classList.replace('d-block' , 'd-none');
    btnSubmit.classList.replace('d-none' , 'd-block');
}
function deleteMark(index){
    bookmarks.splice(index , 1);
    localStorage.setItem('allBookmarks' , JSON.stringify(bookmarks));
    display(bookmarks);
}