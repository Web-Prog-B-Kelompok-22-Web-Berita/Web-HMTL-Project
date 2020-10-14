var feild = document.querySelector('textarea');
var backup = feild.getAttribute('placeholder');
var btn = document.querySelector('btncmnt');
var clear = document.getElementById('clear');

feild.onfocus = function(){
    this.setAttribute('placeholder', '');
    this.style.borderColor = '#333';

}

feild.onblur = function(){
    this.setAttribute('placeholder', backup)
}

clear.onclick = function(){
    feild.value = '';
}
