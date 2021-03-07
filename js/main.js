const vm = new Vue({
    el: '#app',
    data: {
        player1: {play: false, win: false, sign:[] },
        player2: {play: false, win: false, sign:[] },
        rows: [
            [
                {idx: 1, class: "cell", value: "", editable: true},
                {idx: 2, class: "cell", value: "", editable: true},
                {idx: 3, class: "cell", value: "", editable: true}
            ],
            [
                {idx: 4, class: "cell", value: "", editable: true},
                {idx: 5, class: "cell", value: "", editable: true},
                {idx: 6, class: "cell", value: "", editable: true}
            ],
            [
                {idx: 7, class: "cell", value: "", editable: true},
                {idx: 8, class: "cell", value: "", editable: true},
                {idx: 9, class: "cell", value: "", editable: true}
            ],
        ],
        resultText: "Play the game ?",
        resultWin: [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,5,9],
            [3,5,7],
            [1,4,7],
            [2,5,8],
            [3,6,9]            
        ],
        turn: 9
    },
    methods: {
        change: function(idx1, idx2) {
            if (this.rows[idx1][idx2].editable && (this.player1.play || this.player2.play)) {
                this.rows[idx1][idx2].editable = false
                this.rows[idx1][idx2].value = this.player1.play ? 'x' : 'o'
                this.rows[idx1][idx2].class = this.player1.play ? 'cell ocolor' : 'cell xcolor'

                this.player1.play ? this.player1.sign.push(this.rows[idx1][idx2].idx) : this.player2.sign.push(this.rows[idx1][idx2].idx)

                this.winner()
            }
        },
        winner: function () {
            let playerSign = this.player1.play ? this.player1.sign : this.player2.sign;
            let win = false;
            let count = 0;
            let i = 0;
            this.turn = this.turn - 1
            
            while (!win && i < this.resultWin.length) {
                for (let index = 0; index < this.resultWin[i].length; index++) {
                    if (playerSign.includes(this.resultWin[i][index])) {
                        ++count
                    }else {
                        count = 0;
                    }
                }

                if (count == 3) {
                    win = true
                }
                count = 0
                i++
            }

            if (win) {
                this.resultText = this.player1.play ? "Player 1 is Winner" : "Player 2 is Winner"
                this.player1.win = this.player1.play ? true : false
                this.player2.win = this.player2.play ? true : false
                this.gameOver()
            }else if(this.turn == 0){
                this.resultText = "Game is tie"
                this.player1.win = true
                this.player2.win = true
                this.gameOver()
            }else{
                this.player1.play = !this.player1.play
                this.player2.play = !this.player2.play
                this.resultText = this.player1.play ? "Player 1 turn" : "Player 2 turn"
            }
        },
        start: function () {
            this.player1.play = true
            this.resultText = this.player1.play ? "Player 1 turn" : "Player 2 turn"
        },
        restart: function () {
            this.player1.play = true
            this.player2.play = false
            this.player1.win = false
            this.player2.win = false
            this.player1.sign = []
            this.player2.sign = []

            this.resultText = this.player1.play ? "Player 1 turn" : "Player 2 turn"

            for (let index = 0; index < this.rows.length; index++) {
                for (let index2 = 0; index2 < this.rows[index].length; index2++) {
                    this.rows[index][index2].class = "cell"
                    this.rows[index][index2].value = ""
                    this.rows[index][index2].editable = true
                }
                
            }
        },
        gameOver: function () {
            for (let index = 0; index < this.rows.length; index++) {
                for (let index2 = 0; index2 < this.rows[index].length; index2++) {
                    this.rows[index][index2].editable = false
                }
                
            }
        }
    }
})