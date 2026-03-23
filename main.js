// ─────────────────────────────────────────────────────────────
//  main.js — Portfolio Eloy Jiménez Sansó
// ─────────────────────────────────────────────────────────────

const CARD_W         = 220
const CARD_H         = 138
const GAP = window.innerWidth <= 768 ? 80 : 200
const AUTO_SPEED     = 0.15
const INTRO_DURATION = 2800

// ── Referencias DOM ──────────────────────────────────────────
const introOverlay    = document.getElementById('introOverlay')
const projectOverlay  = document.getElementById('projectOverlay')
const overlayBackdrop = document.getElementById('overlayBackdrop')
const overlayClose    = document.getElementById('overlayClose')
const navbar          = document.getElementById('navbar')

// ── Estado carrusel ──────────────────────────────────────────
let cylinderAngle  = 0
let carouselActive = false
let rafId          = null

let isDragging     = false
let dragStartX     = 0
let dragStartAngle = 0
let dragMoved      = false
let lastDragX      = 0
let dragVelocity   = 0

let scrollVelocity = 0

let tiltX       = 0
let tiltY       = 0
let targetTiltX = 0
let targetTiltY = 0

// ─────────────────────────────────────────────────────────────
//  0. NAVBAR
// ─────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20)
    applyHeroParallax()
    applySobreParallax()
}, { passive: true })

// ─────────────────────────────────────────────────────────────
//  PARALLAX HERO
// ─────────────────────────────────────────────────────────────
function applyHeroParallax() {
    const hero = document.getElementById('hero')
    if (!hero) return

    const heroRect = hero.getBoundingClientRect()
    const scrolled = -heroRect.top
    if (scrolled < 0) return

    const heroContent = document.querySelector('.hero-content')
    if (heroContent) {
        heroContent.style.transform = `translateY(${-scrolled * 0.08}px)`
    }

    const tickerSection = document.querySelector('.ticker-section')
    if (tickerSection) {
        tickerSection.style.transform = `translateY(${-scrolled * 0.35}px)`
    }

    const cylinder = document.getElementById('carouselCylinder')
    if (cylinder) {
        const items = cylinder.querySelectorAll('.ticker-item')
        items.forEach((item, i) => {
            const extra = Math.sin(i * 0.8) * 0.12
            item.style.marginTop = `${-scrolled * extra}px`
        })
    }
}

// ─────────────────────────────────────────────────────────────
//  PARALLAX SOBRE MÍ — nuevo hab-grid
// ─────────────────────────────────────────────────────────────

function setupHabReveal() {
    const items = document.querySelectorAll('.hab-reveal')
    if (!items.length) return

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.15 })

    items.forEach(item => observer.observe(item))
}

function applyHabParallax() {
    const isMobile = window.innerWidth <= 768
    if (isMobile) return

    const winH = window.innerHeight

    document.querySelectorAll('.hab-reveal.is-visible').forEach(wrapper => {
        const inner = wrapper.querySelector('.hab-img-inner')
        if (!inner) return

        const rect     = wrapper.getBoundingClientRect()
        const centerY  = rect.top + rect.height * 0.5
        const progress = (centerY - winH * 0.5) / (winH * 0.5) // -1 → +1
        const clampP   = Math.max(-1, Math.min(1, progress))
        const offsetY  = clampP * 30 // máx 12px de desplazamiento

        // Combinar parallax con el scale (1.0 cuando visible)
        inner.style.transform = `scale(1.0) translateY(${offsetY.toFixed(2)}px)`
        inner.style.webkitTransform = `scale(1.0) translateY(${offsetY.toFixed(2)}px)`
    })
}

function applySobreParallax() {
    applyHabParallax()
}

// ─────────────────────────────────────────────────────────────
//  1. CARRUSEL 3D
// ─────────────────────────────────────────────────────────────

function buildCarousel() {
    const cylinder = document.getElementById('carouselCylinder')
    const scene    = document.getElementById('carouselScene')
    if (!cylinder || !scene) { console.error('No carousel elements'); return }

    const count     = PROJECTS.length
    const perimeter = count * (CARD_W + GAP)
    const radius    = Math.round(perimeter / (2 * Math.PI))
    const angleStep = 360 / count

    PROJECTS.forEach((project, i) => {
        const item = document.createElement('div')
        item.className     = 'ticker-item'
        item.dataset.id    = project.id
        item.dataset.index = i

        const angleY = i * angleStep
        item.style.transform = `rotateY(${angleY}deg) translateZ(${radius}px)`

        const mediaWrap     = document.createElement('div')
        mediaWrap.className = 'ticker-media'

        if (project.isVideo) {
            const v       = document.createElement('video')
            v.src         = project.thumb
            v.autoplay    = true
            v.muted       = true
            v.loop        = true
            v.playsInline = true
            mediaWrap.appendChild(v)
        } else {
            const img   = document.createElement('img')
            img.src     = project.thumb
            img.alt     = project.title
            img.loading = 'lazy'
            mediaWrap.appendChild(img)
        }

        const label     = document.createElement('div')
        label.className = 'ticker-label'
        label.innerHTML = `<p class="ticker-label-title">${project.title}</p>`

        item.appendChild(mediaWrap)
        item.appendChild(label)

        item.addEventListener('click', () => {
            if (dragMoved) return
            openProject(project.id)
        })

        cylinder.appendChild(item)
    })

    setupCarouselControls(scene)
    setupMouseTilt()
}

function startCarousel() {
    carouselActive = true
    const cylinder  = document.getElementById('carouselCylinder')
    const count     = PROJECTS.length
    const angleStep = 360 / count
    if (!cylinder) return

    function loop() {
        if (!carouselActive) return

        if (!isDragging) {
            dragVelocity   *= 0.93
            scrollVelocity *= 0.93
            cylinderAngle  += AUTO_SPEED + dragVelocity + scrollVelocity
        }

        cylinder.style.transform = `rotateY(${cylinderAngle}deg)`

        const items = cylinder.querySelectorAll('.ticker-item')
        items.forEach((item, i) => {
            let rel = ((i * angleStep + cylinderAngle) % 360 + 360) % 360
            if (rel > 180) rel = 360 - rel
            const isFront = rel < angleStep / 2
            item.classList.toggle('is-front', isFront)

            const t    = rel / 180
            const blur = parseFloat((t * t * 6).toFixed(2))
            item.style.filter  = `blur(${blur}px)`
            item.style.opacity = 1
        })

        rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
}

// ─────────────────────────────────────────────────────────────
//  2. CONTROLES
// ─────────────────────────────────────────────────────────────

function setupCarouselControls(scene) {
    scene.addEventListener('mousedown', (e) => {
        isDragging     = true
        dragMoved      = false
        dragStartX     = e.clientX
        dragStartAngle = cylinderAngle
        lastDragX      = e.clientX
        dragVelocity   = 0
        e.preventDefault()
    })

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return
        const delta = e.clientX - dragStartX
        if (Math.abs(delta) > 4) dragMoved = true
        cylinderAngle = dragStartAngle + delta * 0.25
        dragVelocity  = (e.clientX - lastDragX) * 0.25
        lastDragX     = e.clientX
        const cyl = document.getElementById('carouselCylinder')
        if (cyl) cyl.style.transform = `rotateY(${cylinderAngle}deg)`
    })

    window.addEventListener('mouseup', () => { isDragging = false })

    scene.addEventListener('touchstart', (e) => {
        isDragging     = true
        dragMoved      = false
        dragStartX     = e.touches[0].clientX
        dragStartAngle = cylinderAngle
        lastDragX      = e.touches[0].clientX
        dragVelocity   = 0
    }, { passive: true })

    scene.addEventListener('touchmove', (e) => {
        if (!isDragging) return
        const delta = e.touches[0].clientX - dragStartX
        if (Math.abs(delta) > 4) dragMoved = true
        cylinderAngle = dragStartAngle + delta * 0.25
        dragVelocity  = (e.touches[0].clientX - lastDragX) * 0.25
        lastDragX     = e.touches[0].clientX
        const cyl = document.getElementById('carouselCylinder')
        if (cyl) cyl.style.transform = `rotateY(${cylinderAngle}deg)`
    }, { passive: true })

    scene.addEventListener('touchend', () => { isDragging = false })

    scene.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault()
            scrollVelocity = Math.max(-10, Math.min(10, scrollVelocity + e.deltaX * 0.05))
        }
    }, { passive: false })
}

function setupMouseTilt() {
    let currentPX = 50
    let currentPY = 40
    let targetPX  = 50
    let targetPY  = 40

    window.addEventListener('mousemove', (e) => {
        targetPX = 20 + (e.clientX / window.innerWidth)  * 60
        targetPY = 20 + (e.clientY / window.innerHeight) * 40
    })

    function tiltLoop() {
        const dx = targetPX - currentPX
        const dy = targetPY - currentPY
        if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
            currentPX += dx * 0.03
            currentPY += dy * 0.03
            const scene = document.getElementById('carouselScene')
            if (scene) scene.style.perspectiveOrigin = `${currentPX.toFixed(2)}% ${currentPY.toFixed(2)}%`
        }
        requestAnimationFrame(tiltLoop)
    }
    tiltLoop()
}

// ─────────────────────────────────────────────────────────────
//  3. INTRO
// ─────────────────────────────────────────────────────────────

function buildIntro() {
    document.body.classList.add('intro-active')
    const tickerSection = document.querySelector('.ticker-section')
    if (tickerSection) tickerSection.style.opacity = '1'

    const cylinder = document.getElementById('carouselCylinder')
    const scene    = document.getElementById('carouselScene')
    if (!cylinder || !scene) return

    const count     = PROJECTS.length
    const angleStep = 360 / count

    const finalPerimeter = count * (CARD_W + GAP)
    const finalRadius    = Math.round(finalPerimeter / (2 * Math.PI))
    const startRadius    = 20

    let introAngle  = 0
    let introY      = window.innerHeight * 0.6
    let introRadius = startRadius
    let introSpeed  = 5.5
    let introRAF    = null
    let phase       = 'rising'
    let expandStart = null

    function applyIntroState() {
        const items = cylinder.querySelectorAll('.ticker-item')
        items.forEach((item, i) => {
            const angleY = i * angleStep
            item.style.transform = `rotateY(${angleY}deg) translateZ(${introRadius}px)`
        })
        cylinder.style.transform = `translateY(${introY}px) rotateY(${introAngle}deg)`
    }

    function lerp(a, b, t) { return a + (b - a) * t }
    function easeOut(t) { return 1 - Math.pow(1 - t, 3) }

    function introLoop(ts) {
        if (phase === 'rising') {
            introAngle += introSpeed
            introY      = lerp(introY, 0, 0.07)
            introSpeed  = lerp(introSpeed, AUTO_SPEED, 0.025)

            applyIntroState()

            if (Math.abs(introY) < 8) {
                phase       = 'expanding'
                expandStart = ts
            }
            introRAF = requestAnimationFrame(introLoop)

        } else if (phase === 'expanding') {
            const elapsed  = ts - expandStart
            const duration = 900
            const t        = Math.min(elapsed / duration, 1)
            const e        = easeOut(t)

            introAngle  += introSpeed
            introRadius  = lerp(startRadius, finalRadius, e)
            introSpeed   = lerp(introSpeed, AUTO_SPEED, 0.03)

            applyIntroState()

            if (t < 1) {
                introRAF = requestAnimationFrame(introLoop)
            } else {
                introRAF = null
                const items = cylinder.querySelectorAll('.ticker-item')
                items.forEach((item, i) => {
                    const angleY = i * angleStep
                    item.style.transform = `rotateY(${angleY}deg) translateZ(${finalRadius}px)`
                })
                cylinder.style.transform = `rotateX(0deg) rotateY(${introAngle}deg)`
                cylinderAngle = introAngle

                startCarousel()

                // Fade in de los títulos al terminar la intro
                document.querySelectorAll('.ticker-label').forEach(label => {
                    label.style.opacity = '1'
                })

                document.body.classList.remove('intro-active')
                introOverlay.classList.add('done')
                setTimeout(() => {
                    introOverlay.style.display = 'none'
                }, 600)
            }
        }
    }

    setTimeout(() => {
        applyIntroState()
        introRAF = requestAnimationFrame(introLoop)
    }, 100)
}

// ─────────────────────────────────────────────────────────────
//  4. PROJECT OVERLAY
// ─────────────────────────────────────────────────────────────

function openProject(id) {
    const project = PROJECTS.find(p => p.id === id)
    if (!project) return

    document.getElementById('overlayTitle').textContent    = project.title
    document.getElementById('overlayYear').textContent     = project.year
    document.getElementById('overlayDesc').textContent     = project.desc
    document.getElementById('overlayToolsList').innerHTML  = project.tools.map(t => `<p>${t}</p>`).join('')

    const content     = document.getElementById('overlayContent')
    content.innerHTML = ''

    let i = 0
    while (i < project.media.length) {
        const item = project.media[i]
        const cols = item.cols || 1
        if (cols === 1) {
            content.appendChild(createMediaEl(item)); i++
        } else {
            const row = document.createElement('div')
            row.className = `media-row cols-${cols}`
            let count = 0
            while (i < project.media.length && count < cols) {
                row.appendChild(createMediaEl(project.media[i])); i++; count++
            }
            content.appendChild(row)
        }
    }

    content.scrollTop = 0
    requestAnimationFrame(() => {
        projectOverlay.classList.remove('overlay-hidden')
        projectOverlay.classList.add('overlay-visible')
        overlayBackdrop.classList.add('active')
        document.body.style.overflow = 'hidden'
    })
}

function createMediaEl(item) {
    if (item.type === 'video') {
        const v = document.createElement('video')
        v.src         = item.src
        v.autoplay    = true
        v.muted       = true
        v.loop        = true
        v.playsInline = true
        v.controls    = item.controls || false
        return v
    }
    if (item.type === 'gif') {
        const img = document.createElement('img')
        img.src = item.src; img.alt = ''; img.loading = 'lazy'
        return img
    }
    const img = document.createElement('img')
    img.src = item.src; img.alt = ''; img.loading = 'lazy'
    return img
}

function closeProject() {
    projectOverlay.classList.remove('overlay-visible')
    projectOverlay.classList.add('overlay-hidden')
    overlayBackdrop.classList.remove('active')
    document.body.style.overflow = ''
}

overlayClose.addEventListener('click', closeProject)
overlayBackdrop.addEventListener('click', closeProject)
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProject() })

// ─────────────────────────────────────────────────────────────
//  5. MOBILE MENU
// ─────────────────────────────────────────────────────────────

function closeMenu() {
    document.getElementById('menuBtn')?.classList.remove('open')
    document.getElementById('mobileMenu')?.classList.remove('open')
}

// ─────────────────────────────────────────────────────────────
//  6. INIT
// ─────────────────────────────────────────────────────────────

window.addEventListener('load', () => {
    if (typeof PROJECTS === 'undefined' || !Array.isArray(PROJECTS) || PROJECTS.length === 0) {
        console.error('PROJECTS no está definido o está vacío. Revisa projects.js')
        return
    }

    console.log(`Iniciando con ${PROJECTS.length} proyectos`)

    buildCarousel()
    buildIntro()
    setupHabReveal()

    const menuBtn    = document.getElementById('menuBtn')
    const mobileMenu = document.getElementById('mobileMenu')
    menuBtn?.addEventListener('click', () => {
        const isOpen = menuBtn.classList.toggle('open')
        mobileMenu.classList.toggle('open', isOpen)
    })

    setupExperienciaScroll()
})

// ─────────────────────────────────────────────────────────────
//  8. EXPERIENCIA — SCROLL ABANICO (solo desktop)
// ─────────────────────────────────────────────────────────────
function setupExperienciaScroll() {
    // En mobile: layout estático, sin animación abanico
    if (window.innerWidth <= 768) return

    const bloque    = document.querySelector('.sobre-bloque--experiencia')
    const container = document.querySelector('.experiencia-cards')
    const cards     = document.querySelectorAll('.exp-card')
    if (!bloque || !container || !cards.length) return

    let offsets = []

    function calcOffsets() {
        cards.forEach(card => card.style.transform = 'translateX(0px)')
        container.style.gap = '16px'

        const firstRect = cards[0].getBoundingClientRect()
        offsets = Array.from(cards).map(card => {
            const rect = card.getBoundingClientRect()
            return rect.left - firstRect.left
        })
    }

    function updateCards() {
        const rect     = bloque.getBoundingClientRect()
        const total    = window.innerHeight
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / (total * 0.9))))
        const eased    = 1 - Math.pow(1 - progress, 3)

        cards.forEach((card, i) => {
            const offset = offsets[i] || 0
            card.style.transform = `translateX(${-offset + offset * eased}px)`
        })
    }

    setTimeout(() => {
        calcOffsets()
        updateCards()
    }, 200)

    window.addEventListener('scroll', updateCards, { passive: true })
    window.addEventListener('resize', () => {
        // Si se redimensiona a mobile, limpiar transforms
        if (window.innerWidth <= 768) {
            cards.forEach(c => c.style.transform = '')
            return
        }
        calcOffsets()
        updateCards()
    })
}