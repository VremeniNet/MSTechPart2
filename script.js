const mainVideo = document.getElementById('mainVideo')
const main = document.getElementById('main')

function positionClips() {
	const root = main.getBoundingClientRect()
	document.querySelectorAll('.clip').forEach(clip => {
		const video = clip.querySelector('video')
		if (!video) return

		const rect = clip.getBoundingClientRect()
		video.style.width = main.clientWidth + 'px'
		video.style.height = main.clientHeight + 'px'
		video.style.top = -(rect.top - root.top) + 'px'
		video.style.left = -(rect.left - root.left) + 'px'
	})
}

function initClipVideos() {
	const clips = document.querySelectorAll('.clip')

	clips.forEach(clip => {
		clip.querySelectorAll('video').forEach(v => v.remove())
	})

	clips.forEach(clip => {
		const clone = mainVideo.cloneNode()

		clone.removeAttribute('id')
		clone.removeAttribute('style')

		clone.autoplay = true
		clone.loop = true
		clone.muted = true
		clone.playsInline = true

		clone.style.position = 'absolute'
		clone.style.objectFit = 'cover'

		clip.appendChild(clone)
	})

	requestAnimationFrame(() => {
		setTimeout(() => {
			positionClips()
		}, 20)
	})
}

window.addEventListener('resize', () => {
	positionClips()
})

mainVideo.addEventListener('loadedmetadata', () => {
	mainVideo.play()
	initClipVideos()
})

mainVideo.addEventListener('timeupdate', () => {
	const t = mainVideo.currentTime
	document.querySelectorAll('.clip video').forEach(v => {
		if (Math.abs(v.currentTime - t) > 0.05) {
			v.currentTime = t
		}
	})
})
