import * as p5 from 'p5'

new p5((p: p5) => {
	p.setup = () => {
		p.createCanvas(500, 500)
		p.background(0)
		p.fill(255)
		p.circle(100, 100, 20)
	}

	// p.draw = () => {
	// 	p.background(0)
	// 	p.fill(255)
	// 	p.circle(100, 100, 20)
	// }
})