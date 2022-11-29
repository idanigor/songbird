// const gallerySection = document.querySelector('.gallery') //!добавить секцию

const navList = document.querySelector('.nav-list')
const buttonStart = document.querySelector('.button-start')
const buttonResultFull = document.querySelector('.button-result-full')
const buttonResultWin = document.querySelector('.button-result-win')
const buttonResultAction = document.querySelector('.button-result-action')

navList.addEventListener('click', (e) => {
	const target = e.target
	if (target.classList.contains('nav-item')) {
		clearActive()
		addHidden()
		target.classList.add('active')
		document.querySelector(`.${target.id.slice(4)}`).classList.remove('hidden')
	}
})

buttonStart.addEventListener('click', () => {
	document.querySelector('#nav-quiz').click()
})

buttonResultFull.addEventListener('click', () => {
	window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
})

buttonResultAction.addEventListener('click', () => {
	document.querySelector('#nav-quiz').click()
})

function clearActive() {
	const node = document.querySelectorAll('.nav-item')
	node.forEach((e) => e.classList.remove('active'))
}

function addHidden() {
	const node = document.querySelectorAll('section')
	node.forEach((e) => e.classList.add('hidden'))
}
