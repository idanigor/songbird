import birdsData from './birds'
import { data } from './data'
import { win, fail } from './quiz'

const resList = document.querySelector('.response-list')
const nodeList = resList.children
const responseImg = document.querySelector('.response-img')
const responseName = document.querySelector('.response-name')
const responseSubName = document.querySelector('.response-subname')
const responseText = document.querySelector('.response-text')
const report = document.querySelector('.report')

getResListText()

resList.addEventListener('click', (e) => {
	if (e.target.classList.contains('response-item')) {
		const itemId = e.target.id.slice(4)
		report.classList.add('hidden')
			if (itemId == data.bird.id) {
				win(e.target)
			} else {
				fail(e.target)
			}
			showBird(itemId)
	}
})

export function getResListText() {
	for (let i = 0; i < nodeList.length; i++) {
		nodeList[i].innerHTML = `<div class="status-item"></div>${birdsData[data.lang][data.level][i].name}`
	}
}

function showBird(id) {
	const path = birdsData[data.lang][data.level][(+id)-1]
	responseImg.style.backgroundImage = `url('${
		path.image
	}')`
	responseName.textContent = path.name
	responseSubName.textContent = path.species
	responseText.textContent = path.description
}