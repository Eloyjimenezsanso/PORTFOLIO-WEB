// ─────────────────────────────────────────────────────────────
//  main.js — Lógica principal
// ─────────────────────────────────────────────────────────────

const CARD_W         = 380
const CARD_H         = 260
const GAP            = 16
const TICKER_SPEED   = 0.8   // px por frame
const INTRO_DELAY    = 80    // ms antes de animar
const INTRO_DURATION = 2500  // ms que dura la intro antes de activar el ticker

// ── Referencias DOM ──────────────────────────────────────────
const introOverlay   = document.getElementById('introOverlay')
const tickerTrack    = document.getElementById('tickerTrack')
const projectOverlay = document.getElementById('projectOverlay')
const overlayBackdrop= document.getElementById('overlayBackdrop')
const overlayClose   = document.getElementById('overlayClose')

// ── Estado ───────────────────────────────────────────────────
let tickerPos    = 0
let tickerActive = false
let rafId        = null

// ─────────────────────────────────────────────────────────────
//  1. INTRO ANIMATION
// ─────────────────────────────────────────────────────────────

function buildIntro() {
    const tickerTop = document.querySelector('.ticker-section').getBoundingClientRect().top + window.scrollY

    PROJECTS.forEach((project, i) => {
        const card = document.createElement('div')
        card.className = 'intro-card'

        const finalX = i * (CARD_W + GAP)
        const finalY = tickerTop

        // Estado inicial: pequeñas y agrupadas arriba-izquierda
        card.style.cssText = `
            transform: translateX(${i * 5}px) translateY(${-CARD_H * 0.5}px) scale(0.13);
            opacity: 0;
            top: ${finalY}px;
        `

        if (project.isVideo) {
            const video = document.createElement('video')
            video.src = project.thumb
            video.autoplay = true
            video.muted = true
            video.loop = true
            video.playsInline = true
            card.appendChild(video)
        } else {
            const img = document.createElement('img')
            img.src = project.thumb
            img.alt = project.title
            card.appendChild(img)
        }

        introOverlay.appendChild(card)

        // Animar hacia la posición final con stagger
        setTimeout(() => {
            const delay = 0.05 + i * 0.07
            card.style.transition = `transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, opacity 0.4s ease ${delay}s`
            card.style.transform  = `translateX(${finalX}px) translateY(${finalY}px) scale(1)`
            card.style.opacity    = '1'
        }, INTRO_DELAY)
    })

    // Tras la intro: fade out y activar ticker
    setTimeout(() => {
        introOverlay.classList.add('done')
        setTimeout(() => {
            introOverlay.style.display = 'none'
            startTicker()
        }, 500)
    }, INTRO_DURATION)
}

// ─────────────────────────────────────────────────────────────
//  2. TICKER
// ─────────────────────────────────────────────────────────────

function buildTicker() {
    // Duplicamos los proyectos para el loop infinito
    ;[...PROJECTS, ...PROJECTS].forEach((project, i) => {
        const item = document.createElement('div')
        item.className = 'ticker-item'
        item.dataset.id = project.id

        const mediaWrap = document.createElement('div')
        mediaWrap.className = 'ticker-media'

        if (project.isVideo) {
            const video = document.createElement('video')
            video.src = project.thumb
            video.autoplay = true
            video.muted = true
            video.loop = true
            video.playsInline = true
            mediaWrap.appendChild(video)
        } else {
            const img = document.createElement('img')
            img.src = project.thumb
            img.alt = project.title
            mediaWrap.appendChild(img)
        }

        // Overlay de hover
        const overlay = document.createElement('div')
        overlay.className = 'ticker-overlay'
        overlay.innerHTML = `
            <p class="ticker-overlay-cat">${project.category}</p>
            <p class="ticker-overlay-title">${project.title}</p>
        `
        mediaWrap.appendChild(overlay)

        // Label debajo
        const label = document.createElement('div')
        label.className = 'ticker-label'
        label.innerHTML = `
            <p class="ticker-label-cat">${project.category}</p>
            <p class="ticker-label-title">${project.title}</p>
        `

        item.appendChild(mediaWrap)
        item.appendChild(label)

        // Click → abrir overlay
        item.addEventListener('click', () => openProject(project.id))

        tickerTrack.appendChild(item)
    })
}

function startTicker() {
    tickerActive = true
    const totalWidth = (CARD_W + GAP) * PROJECTS.length

    function loop() {
        if (!tickerActive) return
        tickerPos -= TICKER_SPEED
        if (Math.abs(tickerPos) >= totalWidth) tickerPos = 0
        tickerTrack.style.transform = `translateX(${tickerPos}px)`
        rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
}

// ─────────────────────────────────────────────────────────────
//  3. PROJECT OVERLAY
// ─────────────────────────────────────────────────────────────

function openProject(id) {
    const project = PROJECTS.find(p => p.id === id)
    if (!project) return

    // Rellena el sidebar
    document.getElementById('overlayTitle').textContent = project.title
    document.getElementById('overlayYear').textContent  = project.year
    document.getElementById('overlayDesc').textContent  = project.desc

    const toolsList = document.getElementById('overlayToolsList')
    toolsList.innerHTML = project.tools.map(t => `<p>${t}</p>`).join('')

    // Rellena el contenido (imágenes/vídeos)
    const content = document.getElementById('overlayContent')
    content.innerHTML = ''

    // Agrupa los media en filas según cols
    let i = 0
    while (i < project.media.length) {
        const item = project.media[i]
        const cols = item.cols || 1

        if (cols === 1) {
            // Elemento a ancho completo
            content.appendChild(createMediaEl(item))
            i++
        } else {
            // Varios en la misma fila
            const row = document.createElement('div')
            row.className = `media-row cols-${cols}`
            let count = 0
            while (i < project.media.length && count < cols) {
                row.appendChild(createMediaEl(project.media[i]))
                i++
                count++
            }
            content.appendChild(row)
        }
    }

    // Muestra el overlay
    content.scrollTop = 0
    projectOverlay.classList.remove('overlay-hidden')
    projectOverlay.classList.add('overlay-visible')
    overlayBackdrop.classList.add('active')
    document.body.style.overflow = 'hidden'
}

function createMediaEl(item) {
    if (item.type === 'video') {
        const video = document.createElement('video')
        video.src = item.src
        video.controls = true
        video.muted = true
        video.loop = true
        video.playsInline = true
        return video
    } else {
        const img = document.createElement('img')
        img.src = item.src
        img.alt = ''
        img.loading = 'lazy'
        return img
    }
}

function closeProject() {
    projectOverlay.classList.remove('overlay-visible')
    projectOverlay.classList.add('overlay-hidden')
    overlayBackdrop.classList.remove('active')
    document.body.style.overflow = ''
}

// ─────────────────────────────────────────────────────────────
//  4. EVENT LISTENERS
// ─────────────────────────────────────────────────────────────

overlayClose.addEventListener('click', closeProject)
overlayBackdrop.addEventListener('click', closeProject)

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProject()
})

// ─────────────────────────────────────────────────────────────
//  5. INIT
// ─────────────────────────────────────────────────────────────

// Espera a que el DOM esté listo y el ticker section esté pintado
window.addEventListener('load', () => {
    buildTicker()   // construye el ticker (oculto bajo la intro)
    buildIntro()    // lanza la animación de entrada
})
