class Canvas {
	constructor() {
		this.canvas = document.getElementById("newSignature");
		this.btn_valid = document.getElementById('btn_valid');
		this.context = this.canvas.getContext("2d"); // contexte de travail
		this.canvas.width = 300;
		this.canvas.height = 300;
		this.context.fillStyle = "#fff";
		this.context.strokeStyle = "black";
		this.context.lineWidth = 1.5;
		this.context.lineCap = "round";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.disableSave = true;
		this.pixels = [];
		this.cpixels = [];
		this.xyLast = {};
		this.xyAddLast = {};
		this.calculate = false;
		this.drawing = false;
		this.start = false;
		this.controle_mouse();
		this.action_button();
		this.mouseUp();
		this.mouseLeave();
		this.mouseMove();
		this.button_book();
	}

	getMousePos(e) {
		let rect = this.canvas.getBoundingClientRect()
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		}
	}

	signature(e) {
		let mousePos = this.getMousePos(e) //on recupere notre position de la souris
		this.context.beginPath() // debut du dessin
	}


	controle_mouse(e) {
		this.canvas.addEventListener('mousedown', () => { //function flecher
			this.drawing = true;
			this.start = false;
		})
	}

	mouseUp() {
		//si on relache la souris
		this.canvas.addEventListener("mouseup", () => {
			this.drawing = false;
			this.start = false;
		});
	}

	mouseLeave() {
		//si on quitte le canvas
		this.canvas.addEventListener("mouseleave", () => {
			this.drawing = false;
			this.start = false;
		});
	}

	mouseMove() {
		this.canvas.addEventListener("mousemove", (e) => {

			if (this.drawing === true) { //si un click sur le canvas a ete effectuer
				if (!this.start) { // si "start" est différent de false
					this.signature(e);
					this.btn_valid.style.display = "inline-block";
					let mousePos = this.getMousePos(e) //recuperation de la positoin de la souris
					this.context.moveTo(mousePos.x, mousePos.y)
					this.start = true;
				} else {
					let mousePos = this.getMousePos(e) //recuperation de la positoin de la souris
					this.context.lineTo(mousePos.x, mousePos.y)
					this.context.stroke() //affichage du trait
				}
			}
		});
	}

	action_button() {
		const btn_clear = document.getElementById('btn_clear'); // permet d'effacer la signature 

		btn_clear.addEventListener("click", (e) => {
			console.log(this.context)
			this.context.clearRect(0, 0, 300, 300);
			
		});

		const btn_close = document.getElementById('btn_close'); // permet de fermer le canvas, toute en gardant la signature.

		btn_close.addEventListener("click", function () {
			document.getElementById('newSignature').style.display = "none";
			document.getElementById('container_signature').style.display = "none"
			document.getElementById('btn_canvas').style.display = "none"

		});


	}

	button_book() {
		button_book.addEventListener("click", function () { // fait apparaitre canvas et les boutons.
		document.getElementById('newSignature').style.display = "block"
		document.getElementById('container_signature').style.display = "block"
		document.getElementById('btn_canvas').style.display = "block"
});
}

	
};
//fin de la class

const canvas = new Canvas();