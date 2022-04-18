let canvasEl = null;
let ctx = null;
let colorsEl = null;
let selectedColor = null;
let mouseIsDown = false;
let penX = null;
let penY = null;

const init = () => {
    
    console.log("init2");
    canvasEl = document.querySelector("#canvas");
    ctx = canvasEl.getContext("2d");

    colorsEl = document.querySelector(".colors");

    const socket = io();
    socket.on("s-draw-pen", ({color, penX , penY}) =>{
        console.log(color, penX , penY);
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(penX,penY, 10 , 10)
    })
    colorsEl.addEventListener("click",(evt) => {
        if (evt.target.matches("li")){
            selectedColor = evt.target.classList.value;
            console.log(selectedColor)
        }
        
    });

    canvasEl.addEventListener("mousedown",(evt) => {
        if (selectedColor == null){
            return;
        };
        penX = Math.floor(evt.offsetX / 10) * 10;
        penY = Math.floor(evt.offsetY / 10) * 10;
        mouseIsDown =true;
        ctx.beginPath();
        ctx.fillStyle = selectedColor;
        ctx.fillRect(penX,penY, 10 , 10)
        socket.emit("c-draw-pen", {
            color: selectedColor,
            penX,
            penY,
        } )
    });

    canvasEl.addEventListener("mouseup",(evt) => {
        mouseIsDown =false;
    });

    canvasEl.addEventListener("mousemove",(evt) =>{
        if (selectedColor == null || !mouseIsDown){
        return;
        };
    });

}



window.addEventListener("load", init);