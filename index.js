const entry = document.querySelectorAll(".box")
const messageBox = document.querySelector(".popup")
const messageP = document.querySelector(".popup .message p")
const closeMsg = document.querySelector(".popup .message header .exit")
const currentP = document.querySelector(".stats .message h4");
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
class Box{
    constructor(currentPlayer=1,tiles=[0,0,0,0,0,0,0,0,0]){
        this.currentPlayer = currentPlayer
        this.tiles = tiles
        this.scores = {'1':0,'2':0}
        this.rounds = 0
    }
    update(index){
        if (this.tiles[index] > 0){
            alert("invalid move")
            return
        }
        this.rounds += 1
        currentP.innerHTML = `Current player is player ${this.currentPlayer}`
        if (this.currentPlayer == 1){
            this.tiles[index] = 1
            this.currentPlayer = 2
        }else{
            this.tiles[index] = 2
            this.currentPlayer = 1
        }
        LoadData()
        console.log(this.tiles)
        const winner = this.checkWinnner()
        if (winner && this.rounds > 4){
            toggleError(`Player ${winner} wins`)
            this.scores[winner] += 1
            updateScore(this.scores)
            this.endGame()
        }
        if (!this.tiles.includes(0)){
            this.restart()
        }
    }
    endGame(){
        this.tiles = [0,0,0,0,0,0,0,0,0]
        this.currentPlayer = 1
        this.rounds = 0
        LoadData()
    }
    restart(){
        toggleError("Match has ended!")
        this.endGame()
    }
    checkWinnner(){
        let winner = null
        const possibilities = [
            [1,[0,1,2]],[2,[0,1,2]],
            [1,[3,4,5]],[2,[3,4,5]],
            [1,[6,7,8]],[2,[6,7,8]],
            [1,[0,4,8]],[2,[0,4,8]],
            [1,[2,4,6]],[2,[2,4,6]],
            [1,[0,3,6]],[2,[0,3,6]],
            [1,[1,4,7]],[2,[1,4,7]],
            [1,[2,5,8]],[2,[2,5,8]],]
        for (let i = 0; i < possibilities.length; i++){
            let index = possibilities[i][0]
            let arr = possibilities[i][1]
            winner = this.checkIndex(index,arr)
            if(winner){
                return winner
            }
        }
        return winner
    }
    checkIndex(index,arr){
        const tiles = this.tiles
        if (tiles[arr[0]] === index && tiles[arr[1]] == index && tiles[arr[2]] == index){
            return `${index}`
        }
        return null
    }
}

const instance = new Box()

document.addEventListener("DOMContentLoaded",()=>{
    currentP.innerHTML = `Current player is player ${instance.currentPlayer}`
})

//events
entry.forEach((tile, index)=>{
    tile.addEventListener("click",()=>{
        instance.update(index)
    })
})
closeMsg.addEventListener("click", ()=>messageBox.classList.remove("active"))

const updateScore = (scores)=>{
    player1.innerHTML = scores['1']
    player2.innerHTML = scores['2']
}

const LoadData  = ()=>{
    entry.forEach((tile, index)=>{
        data = instance.tiles[index]
        if (data == 1){
            tile.innerHTML = 'X'
        }else if (data == 2){
            tile.innerHTML = '0'
        }else{
            tile.innerHTML = ''
        }
    })
}
const toggleError = (msg="")=>{
    messageBox.classList.toggle("active")
    messageP.innerHTML = msg
}
