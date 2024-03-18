//js query of the animal flip game//

document.getElementById('cardContainer'). style.display ='none'; 

//userName display script//
function saveName() {
    const userName =document.getElementById('userName').ariaValueText;
    if (userName) {
        document.getElementById('userNameSpan').textContent = userName;
        document.getElementById('userNameDisplay').classList.remove('hide');
        document.getElementById('name').style.display ='none';
        document.getElementById('cardContainer').style.display = 'flex';
    } else {
        alert("Please enter your name.");
    }
}