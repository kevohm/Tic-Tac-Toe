const entry = document.querySelectorAll(".box")
const messageBox = document.querySelector(".popup")
const messageP = document.querySelector(".popup .message p")
const closeMsg = document.querySelector(".popup .message header .exit")
const currentP = document.querySelector(".stats .message h4");
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const settings = document.querySelector(".stats .popup-settings")
const settingsPopup = document.querySelector(".stats .scores .players .settings")
const settingExit = document.querySelector(".popup-settings .exit")
const mode = document.getElementById("mode")
const player = document.getElementById("player")
const theme = document.getElementById("theme")
const body = document.body

//events listeners
document.addEventListener("DOMContentLoaded",()=>{
    checkDefaults()
    setDefaults()
    LoadData()
})
settingsPopup.addEventListener("click", ()=>{
    settings.classList.toggle("active")
})
settingExit.addEventListener("click",()=>{
    settings.classList.remove("active")
})

entry.forEach((tile, index)=>{
    tile.addEventListener("click",()=>{
        instance.update(index)
    })
})
closeMsg.addEventListener("click", ()=>messageBox.classList.remove("active"))
const optionList = [[mode,"setMode"],[theme, "setTheme"],[player, "setPlayerToStart"]]
optionList.forEach((item)=>{
    item[0].addEventListener("change",(e)=>{
        e.preventDefault()
        const {value} = e.target
        if(item[1] !== "setTheme"){
            if(instance.rounds === 0){
                if (item[1] === "setPlayerToStart"){
                    instance[item[1]](parseInt(value))
                }else{
                    instance[item[1]](value)
                    
                }
                LoadData();
            }else{
                if (item[1] === "setMode"){
                    e.target.value = instance.mode
                }else{
                    e.target.value = instance.playerToStart
                }
            }
        }else{
            instance[item[1]](value)
            changeTheme(value)
            LoadData();
        }
    })
})

//functions
const updatePlayer = ()=>{
    if (instance.rounds === 0){
        alert("reset")
    }
}

const updateScore = (...players)=>{
    const data = [...new Set(players)]
    data.forEach((elem)=>instance.scores[elem] += 1)
    const scores = instance.scores
    player1.innerHTML = scores['1']
    player2.innerHTML = scores['2']
}

const LoadData  = ()=>{
    currentP.innerHTML = `Current player is player ${instance.currentPlayer}`
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
const checkDefaults = ()=>{
    let defaults = localStorage.getItem("defaults")
    if (defaults){
        defaults = JSON.parse(defaults)
        Object.entries(defaults).forEach((item)=>{
            if(item[0] === "playerToStart"){
                instance.setPlayerToStart(parseInt(item[1]))
            }else if(item[0] === "theme"){
                instance.setTheme(item[1])
            }else if(item[0] === "mode"){
                instance.setMode(item[1])
            }
        })
    }else{
        const {theme,playerToStart,mode } = instance
        localStorage.setItem("defaults", JSON.stringify({theme,playerToStart,mode}))
    }
}
const setDefaults = ()=>{
    mode.value = instance.mode
    changeTheme(instance.theme)
    theme.value = instance.theme
    player.value = instance.playerToStart
}

const changeTheme = (theme)=>{
    if (theme === "light"){
        body.classList.remove("dark-mode")
    }else if(theme === "dark"){
        body.classList.add("dark-mode")
    }
}