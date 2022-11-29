import birdsData from './birds'
import { data, updateDataBird } from './data'
import { getResListText } from './response-list'
import { playBtn, getAudio } from './player'

const buttonNext = document.querySelector('.button-next')
const questionImg = document.querySelector('.question-img')
const questionName = document.querySelector('.question-name')
const score = document.querySelector('.score')
const scoreWin = document.querySelector('.result-score-win')
const scoreAction = document.querySelector('.result-score-action')
const report = document.querySelector('.report')
const buttonResultWin = document.querySelector('.button-result-win')

buttonNext.addEventListener('click', nextLevel)

buttonResultWin.addEventListener('click', () => {
	console.log('начать игру заново')
	data.level = 0
	updateDataBird()
	data.score = 0
	data.duration = 0
	getAudio(data.bird.audio)
	getResListText()
	document.querySelector('.result-container-win').classList.add('hidden')
	document.querySelector('.result-container-action').classList.remove('hidden')
	score.textContent = data.score
	scoreWin.textContent = data.score
	scoreAction.textContent = data.score
	data.winStatus = false
	toggleBtnNext()
	setBirdTitleStyle()
	setTemplateStyle()
	report.classList.remove('hidden')
	document.querySelector('#nav-quiz').click()
	console.log(data)
})

export function win(target) {
	if (!data.winStatus) {
		const itemId = target.id.slice(4)
		const audio = new Audio('./sounds/win.mp3')
		audio.play()
		playStop()
		target.firstChild.classList.add('win-item')
		data.score += 5 - document.querySelectorAll('.fail-item').length
		score.textContent = data.score
		scoreWin.textContent = data.score
		scoreAction.textContent = data.score
		data.winStatus = true
		toggleBtnNext()
		setBirdIdStyle(itemId)
	}
}
export function fail(target) {
	if (!data.winStatus) {
		const audio = new Audio('./sounds/fail.mp3')
		audio.play()
		target.firstChild.classList.add('fail-item')
	}
}

function nextLevel() {
	if (data.level === 5) {
		if (data.score === 30) {
			document
				.querySelector('.result-container-full')
				.classList.remove('hidden')
		} else {
			document.querySelector('.result-container-win').classList.remove('hidden')
		}
		document.querySelector('.result-container-action').classList.add('hidden')
		document.querySelector('#nav-result').click()
	} else {
		data.winStatus = false
		data.level++
		getResListText()
		toggleBtnNext()
		setBirdTitleStyle()
		updateDataBird()
		playStop()
		getAudio(data.bird.audio)
		setTemplateStyle()
		report.classList.remove('hidden')
		console.log(data)
	}
}

function playStop() {
	data.audio.pause()
	data.isPlay = false
	playBtn.classList.remove('pause')
}

function toggleBtnNext() {
	document.querySelector('.button-next').classList.toggle('passive')
}

function setBirdTitleStyle() {
	const list = document.querySelector('.birds-type-list')
	list.querySelector('.active').classList.remove('active')
	list.children[data.level].classList.add('active')
}

function setBirdIdStyle(id) {
	const path = birdsData[data.lang][data.level][+id - 1]
	questionImg.style.backgroundImage = `url('${path.image}')`
	questionName.textContent = path.name
}

function setTemplateStyle() {
	questionImg.style.backgroundImage = ''
	questionName.textContent = '***'
}
