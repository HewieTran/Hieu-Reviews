const sideMenu = document.getElementById('side-menu');


function openSlideMenu() {
    sideMenu.style.width = '250px';

};

function closeSlideMenu() {
    sideMenu.style.width = '0';
    // document.getElementById('main').style.marginLeft = '0';
};


// Add Quill WYSIWYG
var quill = new Quill('#editor', {
    theme: 'snow'
});


