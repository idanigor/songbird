import birdsData from './birds'

export const data = {
	level: 0,
	bird: null,
	audio: null,
	isPlay: false,
	duration: 0,
	lang: 'ru',
	score: 0,
}
function getRandomNum(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export function updateDataBird() {
	data.bird = birdsData[data.lang][data.level][getRandomNum(0, 5)]
	console.log(data.bird)
}

updateDataBird()