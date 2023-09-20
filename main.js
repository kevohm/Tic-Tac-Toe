class TicTacToe{
    constructor(currentPlayer=1,tiles=[0,0,0,0,0,0,0,0,0]){
        this.currentPlayer = currentPlayer
        this.playerToStart = currentPlayer
        this.tiles = tiles
        this.scores = {'1':0,'2':0}
        this.rounds = 0
        this.theme = "light"
        this.mode = "player"
        this.default = {
            "theme":["light","dark"],
            "mode":["player","computer"],
            "player":[1,2]
        }
    }
    updateDefaults(type, data){
        const defaults = JSON.parse(localStorage.getItem("defaults"))
        localStorage.setItem("defaults", JSON.stringify({...defaults, [type]:data}))
    }
    setMode(mode){
        if (this.default.mode.includes(mode)){
            this.mode  = mode
            this.updateDefaults("mode",mode)
        }
        
    }
    setTheme(theme){
        if (this.default.theme.includes(theme)){
            this.theme  = theme
            this.updateDefaults("theme",theme)
        }
    }
    setCurrent(current){
        if (this.default.player.includes(current)){
            this.currentPlayer = current
        }
        
    }
    setPlayerToStart(playerToStart){
        if (this.default.player.includes(playerToStart)){
            this.playerToStart = playerToStart
            if (this.rounds === 0){
                this.currentPlayer = playerToStart
            }
            this.updateDefaults("playerToStart",playerToStart)
        }
        
    }
    update(index){
        if (this.tiles[index] > 0){
            alert("invalid move")
            return
        }
        this.rounds += 1
        if (this.currentPlayer == 1){
            this.tiles[index] = 1
            this.setCurrent(2)
        }else{
            this.tiles[index] = 2
            this.setCurrent(1)
        }
        LoadData()
        if(this.rounds > 4){
        const winner = this.checkWinnner()
        if (winner){
            toggleError(`Player ${winner} wins`)
            updateScore(winner)
            this.endGame()
        }
        }
        if (!this.tiles.includes(0)){
            updateScore("1","2")
            this.restart()
        }
    }
    endGame(){
        this.tiles = [0,0,0,0,0,0,0,0,0]
        this.setCurrent(this.playerToStart)
        this.rounds = 0
        LoadData()
    }
    restart(){
        toggleError("Match has as a draw !")
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

const instance = new TicTacToe()