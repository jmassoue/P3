class Carousel{

	constructor(){
		this.slide = ''
		this.lenght = ''
		this.deg = ''
		this.z = ''
		this.move = 0
		this.intervalId = {
			interval: null
		}
		this.init()
	}

	init()
	{
		window.addEventListener("load", this.load())
		window.addEventListener("load", this.play())

	}
	rotate(direction)
	{
		this.move += direction

		for(let i = 0; i < this.lenght; i++){
			this.slide[i].style.transform = "rotateY(" + (this.deg * (i +this.move)) +"deg) translateZ(" + this.z + "px)"
		}
	}

	load()
	{
		this.slide = document.getElementsByClassName('slide')
		this.lenght = this.slide.length

		this.deg = 360 / this.lenght
		this.z = (this.slide[0].offsetWidth / 2) / Math.tan((this.deg / 2) * (Math.PI / 195)) // <- Ici le 195 tu peut le modifier pour mettre de l'espace entre tes bloc. Mini 180(coller) et tu peut monter.

		for(let i = 0; i < this.lenght; i++){
			this.slide[i].style.transform = "rotateY(" + (this.deg * i) + "deg) translateZ(" + this.z + "px)"
		}
	}

	play()
	{
		this.intervalId.interval = setInterval(() => {
            carousel.rotate(-1)
        }, 5000)
	}

	stop()
	{
		clearInterval(this.intervalId.interval)
	}
}

const carousel = new Carousel()

document.addEventListener("keydown", function(e){
	if (e.keyCode === 37){
		carousel.rotate(1)
	}

	else if (e.keyCode === 39){
		carousel.rotate(-1)
	}
});