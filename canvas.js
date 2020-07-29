  const canvas = document.getElementById("newSignature");
  let context = canvas.getContext("2d"); // contexte de travail
  canvas.width = 300;
  canvas.height = 300;
  context.fillStyle = "#fff";
  context.strokeStyle = "black";
  context.lineWidth = 1.5;
  context.lineCap = "round";
  context.fillRect(0, 0, canvas.width, canvas.height);
  var disableSave = true;
  var pixels = [];
  var cpixels = [];
  var xyLast = {};
  var xyAddLast = {};
  var calculate = false;
  let drawing = false;
  let start = false;


  function getMousePos(e){
    let rect = canvas.getBoundingClientRect()
    return{
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

  function signature(e){
    let mousePos = getMousePos(e) //on recupere notre position de la souris
    context.beginPath()// debut du dessin
  }


canvas.addEventListener('mousedown', () => { //function flecher
    drawing = true;
    start = false;

});

//si on relache la souris
canvas.addEventListener("mouseup", () => {
  drawing = false;
  start = false;
});

//si on quitte le canvas
canvas.addEventListener("mouseleave", () => {
  drawing = false;
  start = false;
});

canvas.addEventListener("mousemove", (e) => {
    

    if (drawing === true) {//si un click sur le cancas a ete effectuer
    if (!start) { // si "start" est différent de false
    	signature(e);
    	let mousePos = getMousePos(e)//recuperation de la positoin de la souris
    	context.moveTo(mousePos.x, mousePos.y)
    	start = true;
    }
    else {
    	let mousePos = getMousePos(e)//recuperation de la positoin de la souris
        context.lineTo(mousePos.x, mousePos.y)
        context.stroke() //affichage du trait
    }
    }
    });

bouton_réserver.addEventListener("click",function (){ // fait apparaitre canvas et les boutons.
document.getElementById('newSignature').style.display = "block"
document.getElementById('container_signature').style.display = "block"
document.getElementById('btn_canvas').style.display = "block"
});

btn_clear = document.getElementById('btn_clear'); // permet d'effacer la signature 

btn_clear.addEventListener("click", function() {
  const canvas = document.getElementById("newSignature");
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, 300, 300);
});
 
btn_close = document.getElementById('btn_close'); // permet de fermer le canvas, toute en gardant la signature.

btn_close.addEventListener("click", function() {
	document.getElementById('newSignature').style.display = "none";
	document.getElementById('container_signature').style.display = "none"
	document.getElementById('btn_canvas').style.display = "none"

});
