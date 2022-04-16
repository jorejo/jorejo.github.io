let canvasEl = null;
let ctx = null;
let colorsEl = null;
let selectedColor = null;
var fs = require("fs");


const init = () => {
    console.log("init");
    canvasEl = document.querySelector("#canvas");
    ctx = canvasEl.getContext("2d");

    colorsEl = document.querySelector(".colors");

    colorsEl.addEventListener("click",(evt) => {
        if (evt.target.matches("li")){
            selectedColor = evt.target.classList.value;
            console.log(selectedColor)
        }
        
    });

    canvasEl.addEventListener("click",(evt) => {
        console.log(Math.floor(evt.offsetX / 10) * 10, Math.floor(evt.offsetY / 10) * 10);
        if (selectedColor == null){
        return;
        };
        ctx.beginPath();
        ctx.fillStyle = selectedColor;
        ctx.fillRect(Math.floor(evt.offsetX / 10) * 10, Math.floor(evt.offsetY / 10) * 10, 10 , 10)



    });

    canvasEl.addEventListener("mousemove",(evt) =>{
        if (selectedColor == null){
            return;
        }
    })

}



window.addEventListener("load", init);