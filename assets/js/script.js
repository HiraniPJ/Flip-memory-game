//js query of the animal flip game//

document.getElementById('cardContainer'). style.display ='none'; 

//userName display script//
function saveName() {
    const userName = document.getElementById('userName').value;
    if (userName) {
        document.getElementById('userNameSpan').textContent = userName;
        document.getElementById('userNameDisplay').classList.remove('hide');
        document.getElementById('name').style.display ='none';
        document.getElementById('cardContainer').style.display = 'flex';
    } else {
        alert("Please enter your name.");
    }
}

//flipCard Function//
 function flipCard(index) {
    const cards = document.querySelectorAll('.card');
    if (index < cards.length) {
        cards[index].classList.toggle('card-flipped');
    }
 }
//storage//
 $(function(){
    function set(key, value) { localStorage.setItem(key, value); }
    function get(key)        { return localStorage.getItem(key); }
    function increase(el)    { set(el, parseInt( get(el) ) + 1); }
    function decrease(el)    { set(el, parseInt( get(el) ) - 1); }

    var toTime = function(nr){
        if(nr == '-:-') return nr;
        else { var n = ' '+nr/1000+' '; return n.substring(0, n.length-1)+'s'; }
      };

      //startscreen//
      function startScreen(text){
        $('#game').removeAttr('class').empty();
        $('.cardContainer').fadeIn(250);
    
        $('.card1').text(text.substring(0, 1));
        $('.card2').text(text.substring(1, 2));
        $('.card3').text(text.substring(2, 3));
        $('.card4').text(text.substring(3, 4));
    
    // If won game
    if(text == 'nice')

        // If lost game
        else if(text == 'fail')

      }

      // Start game
  $('.play').on('click', function(){
    increase('flip_abandoned');
	$('.info').fadeOut();

    var difficulty = '',
        timer      = 1000,
        level      = $(this).data('level');

     // Set game timer and difficulty   
     if     (level ==  6) { difficulty = 'easy'; timer *= level * 4; }
     else if(level == 14) { difficulty = 'medium'; timer *= level * 5; }
     else if(level == 28) { difficulty = 'hard';   timer *= level * 6; }       

     $('#game').addClass(difficulty);

     $('.container').fadeOut(250, function(){
       var startGame  = $.now(),
           obj = [];

// Create and add shuffled cards to game
      for(i = 0; i < level; i++) { obj.push(i); }

          var shu  = shuffle( $.merge(obj, obj) ),
          cardSize = 100/Math.sqrt(shu.length);

      for(i = 0; i < shu.length; i++){
        var code = shu[i];
        if(code < 10) code = "0" + code;
        if(code == 30) code = 10;
        if(code == 31) code = 21;
        $('<div class="card" style="width:'+cardSize+'%;height:'+cardSize+'%;">'+
            '<div class="flipper"><div class="front"></div><div class="back" data-f="&#xf0'+code+';"></div></div>'+
          '</div>').appendTo('#game');
      }


 // Set card actions
 $('#game .card').on({'mousedown' : function(){
    if($('#game').attr('data-paused') == 1) {return;}
    var data = $(this).addClass('active').find('.back').attr('data-f');

    if( $('#game').find('.card.active').length > 1){
      setTimeout(function(){
        var thisCard = $('#game .active .back[data-f='+data+']');

        if( thisCard.length > 1 ) {
          thisCard.parents('.card').toggleClass('active card found').empty(); //yey
          increase('flip_matched');

          // Win game
          if( !$('#game .card').length ){
            var time = $.now() - startGame;
            if( get('flip_'+difficulty) == '-:-' || get('flip_'+difficulty) > time ){
              set('flip_'+difficulty, time); // increase best score
            }

            startScreen('nice');
          }
        }
        else {
          $('#game .card.active').removeClass('active'); // fail
          increase('flip_wrong');
        }
      }, 401);
    }
  }
});

//Set keyboard (p) pause and [esc} actions//
$(window).off().on('keyup', function(e){
    // Pause game. (p)
    if(e.keycode == 80)
    {
        if( $('#game').attr('data-paused') == 1 )
        {
            $('#game').attr('data-paused', '0');
        }
    } 
    else 
    {
        $('#game').attr('data-paused', '1');
    }

    // Abandon game. (Esc)
    if(e.keyCode == 27)
    {
        startScreen('flip');
        // If game was paused
        if( $('#game').attr('data-paused') == 1 ){
          $('#game').attr('data-paused', '0');
        }
    }
