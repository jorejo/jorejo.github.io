let canvasEl = null;
let ctx = null;
let colorsEl = null;
let selectedColor = null;
let mouseIsDown = false;
let penX = null;
let penY = null;
let canvasURL = null;
const socket = io();

const init = () => {
    
    canvasEl = document.querySelector("#canvas");
    ctx = canvasEl.getContext("2d");

    colorsEl = document.querySelector(".colors");

    socket.emit("Loaded")

    console.log("Client loaded");
    
    socket.on("s-picture", (obj) =>{
        console.log("spicture recu");
        console.log(obj.imgData);
        var img = new Image();
        img.onload=start;
        img.src=obj.imgData;
        function start(){
            ctx.drawImage(img,0,0);
        }
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
        ctx.fillRect(penX,penY, 10 , 10);

        canvasURL = canvasEl.toDataURL("image/jpeg",1.00);
        console.log(canvasURL)
        socket.emit("c-picture", {
            imgData: canvasURL,
        })
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