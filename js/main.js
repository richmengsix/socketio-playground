$(document).ready(function(){
    // Initialize the board
    var paddleWidth = $("#playground").css("width").split("px")[0]/3;
    createPlayBoard(paddleWidth);

    // Initialize the game
    ticTacToe = new TicTacToe();
    ticTacToe.initialize();
    console.log(ticTacToe);

    $("#send-comment").click(function(){
        $("#comment-box").append("<li>CLICKED</li>");
    });
});

function createPlayBoard(width) {
    var board = "";
    for(var i = 0;i < 9;i++) {
        board += "<div class='paddle' style='width:" + width + "px;height:" + width + "px';></div>";
    } 
    $("#playground").append(board);
}

function drawCircle() {

}
function drawCross() {
    
}

function drawMark(mark) {
    if (mark == MARK_CIRCLE) {
        drawCircle();
    } else {
        drawCross();
    }
}

// Constant definition
MARK_NONE = 0;
MARK_CROSS = 1;
MARK_CIRCLE = 2;

// CLass definition
function Paddle(id, board) {
    this.pid = id;
    this.mark = MARK_NONE;
    this.ttt = board
    this.pname = function(){
        return "Paddle " + id;
    }
    this.inserted = function(mark) {
        drawMark(mark);
        this.mark = mark;
        this.ttt.decide(this.pid);
    }

}
// 0 1 2
// 3 4 5
// 6 7 8
function TicTacToe() {
    this.paddles = new Array();
    this.initialize = function() {
        for (var i = 0;i < 9;i++) {
            this.paddles[i] = new Paddle(i, this);
        }
    }
    this.decide = function(curId) {
        // Check column
        var winner = 0;
        var offset = curId % 3;
        if ((this.paddles[offset].mark == this.paddles[offset+3].mark) && (this.paddles[offset].mark == this.paddles[offset+6].mark)) {
            winner = this.paddles[offset].mark;
        }
        // Check row
        var offset = curId / 3;
        if ((this.paddles[3*offset].mark == this.paddles[3*offset+1].mark) && (this.paddles[3*offset].mark == this.paddles[3*offset+2].mark)) {
             winner = this.paddles[3*offset].mark;
        }

        // check cross
        if (curId % 2 == 0) {
            if (((this.paddles[0].mark == this.paddles[4].mark) && (this.paddles[0].mark == this.paddles[8].mark)) || ((this.paddles[2].mark == this.paddles[4].mark) && (this.paddles[2].mark == this.paddles[6].mark))) {
                winner = this.paddles[4].mark;
            }            
        }
        if (winner != 0) {
            this.end(winner);
        }
    }
    this.end = function(winner) {
        announceWinner(winner);
    }    
}

function announceWinner(winner) {
    alert("Player " + winner + " wins!");
}