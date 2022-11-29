import birdsData from './birds'
import { data } from './data'

export const playBtn = document.querySelector('.play')
const mute = document.querySelector('.mute')
const progressSoundBar = document.querySelector('.progress')
const durationSoundBar = document.querySelector('.duration')
const timeCurrentTime = document.querySelector('.time-progress')
const timeDuration = document.querySelector('.time-duration')
const progressVolumeBar = document.querySelector('.volume-progress')
const durationVolumeBar = document.querySelector('.volume-duration')

getAudio(data.bird.audio)

playBtn.addEventListener('click', () => {
	if (!data.isPlay) {
		data.audio.play()
		data.isPlay = true
		playBtn.classList.add('pause')
		data.audio.addEventListener('ended', () => {
			playBtn.classList.remove('pause')
			data.isPlay = false
		})

		data.audio.addEventListener('timeupdate', (e) => {
			const { duration, currentTime } = data.audio
			const progressPercent = (currentTime / duration) * 100
			progressSoundBar.style.width = progressPercent + '%'
		})

		data.audio.addEventListener('timeupdate', () => {
			timeCurrentTime.textContent = timer(data.audio.currentTime)
		})
	} else {
		data.audio.pause()
		data.isPlay = false
		playBtn.classList.remove('pause')
	}
})

mute.addEventListener('click', () => {
	if (mute.classList.contains('mute-on')) {
		mute.classList.remove('mute-on')
		data.audio.muted = false
		progressVolumeBar.style.width = data.audio.volume * 100 + '%'
	} else {
		mute.classList.add('mute-on')
		data.audio.muted = true
		progressVolumeBar.style.width = '0%'
	}
})

durationSoundBar.addEventListener('click', (event) => {
	const progress = event.offsetX
	const progressWidth = progress / durationSoundBar.offsetWidth
	progressSoundBar.style.width = progressWidth * 100 + '%'
})

durationSoundBar.addEventListener('click', (event) => {
	const width = durationSoundBar.clientWidth
	data.audio.currentTime = (event.offsetX / width) * data.audio.duration
})

durationVolumeBar.addEventListener('click', (event) => {
	const progress = event.offsetX
	const progressWidth = progress / durationVolumeBar.offsetWidth
	progressVolumeBar.style.width = progressWidth * 100 + '%'
})

durationVolumeBar.addEventListener('click', (event) => {
	const width = durationVolumeBar.clientWidth
	data.audio.volume = event.offsetX / width
})

function timer(seconds) {
	const h = Math.floor(seconds / 3600)
	const m = Math.floor((seconds % 3600) / 60)
	const s = Math.round(seconds % 60)
	return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
		.filter(Boolean)
		.join(':')
}
export function getAudio(url) {
	progressSoundBar.style.width = '0%'
	timeCurrentTime.textContent = '0:00'
	const audio = new Audio(url)
	data.audio = audio
	audio.onloadedmetadata = () => {
		data.duration = audio.duration
		timeDuration.textContent = `${timer(audio.duration)}`
	}
}
