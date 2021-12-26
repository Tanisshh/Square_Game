var player1 = prompt("Hey you are Blue. Enter your name.");
var player1col =  "rgb(0, 0, 255)";

var player2 = prompt("Hey you are Red. Enter your Name.");
var player2col = "rgb( 255, 0, 0)";

var table = $('table tr');

function changeColor(rowindex, colIndex, color){
  return table.eq(rowindex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returnColor(rowindex, colIndex){
  return table.eq(rowindex).find('td').eq(colIndex).find('button').css('background-color');
}


function checkBottom(colIndex){
  var colorReport = returnColor(4, colIndex);
  for (var row = 4; row > -1; row--) {
    colorReport = returnColor(row, colIndex);
    if(colorReport === 'rgb(255, 255, 0)'){
      return row;
    }
  }
}


function checkMatch(one, two, three, four){
  return (one === two && two === three && three === four && one !== 'rgb(255, 255, 0)' && one !== undefined);
}

function horizontalWin(){
  for(var row=0; row<5; row++){
    for(var col = 0; col<4; col++){
      if(checkMatch(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))){
        return true;
      }
      else{
        continue;
      }
    }
  }
}

function diagonalWin(){
  for(var col=0; col<5; col++){
    for(var row = 0; row<5; row++){
      if(checkMatch(returnColor(row, col), returnColor(row+1, col+1), returnColor(row+2, col+2), returnColor(row+3, col+3))){
        return true;
      }
      else if(checkMatch(returnColor(row, col), returnColor(row-1, col+1), returnColor(row-2, col+2), returnColor(row-3, col+3))){
        return true;
      }
      else{
        continue;
      }
    }
  }
}


function verticalWin(){
  for(var col=0; col<5; col++){
    for(var row = 0; row<4; row++){
      if(checkMatch(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col))){
        return true;
      }
      else{
        continue;
      }
    }
  }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1col;
$('h3').text(currentName+' its your turn.');



$('.board button').on('click', function(){
  var col = $(this).closest('td').index();
  var btmAvail = checkBottom(col);
  changeColor(btmAvail, col, currentColor);


  if(horizontalWin()  || verticalWin() || diagonalWin()){
    $('h1').text(currentName + " You Have Won the Game...😎");

    $('h2').text("Please Restart");
    $('h3').fadeOut('fast');
    $('.board button').fadeOut(4000);
  }



  currentPlayer = currentPlayer * -1;
  if(currentPlayer === 1){
    currentName = player1;
    $('h3').text(currentName+' its your turn.');
    currentColor = player1col;
  }
  else{
    currentName = player2;
    $('h3').text(currentName+' its your turn.');
    currentColor= player2col;
  }

})
