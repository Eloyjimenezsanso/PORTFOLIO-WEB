// ─────────────────────────────────────────────────────────────
//  projects.js — Datos de todos los proyectos
//
//  Para añadir o editar un proyecto, modifica este array.
//  Cada proyecto tiene:
//    - id:       identificador único (no tocar)
//    - title:    nombre del proyecto
//    - year:     año
//    - category: categoría (aparece en la card del ticker)
//    - desc:     descripción corta
//    - tools:    array de programas usados
//    - thumb:    imagen de portada del ticker
//    - isVideo:  true si la portada es un vídeo
//    - media:    array de contenido del overlay
//                cada item: { type: "image"|"video", src: "...", cols: 1|2|3 }
//                cols = cuántas columnas ocupa en la fila (1 = ancho completo)
// ─────────────────────────────────────────────────────────────

const PROJECTS = [
    {
        id: "palomo",
        title: "Palomo Spain",
        year: "2025",
        category: "Motion",
        desc: "Campaña de motion graphics para Palomo Spain.",
        tools: ["After Effects", "Cinema 4D", "Premiere"],
        thumb: "assets/projects/palomo/thumb.jpg",
        isVideo: false,
        media: [
            { type: "image", src: "assets/projects/palomo/01.jpg", cols: 1 },
            { type: "image", src: "assets/projects/palomo/02.jpg", cols: 1 },
        ]
    },
    {
        id: "rebranding-lottusse",
        title: "Rebranding Lottusse",
        year: "2026",
        category: "Branding",
        desc: "Rebranding íntegro de la identidad corporativa de Lottusse 1877. Partiendo del diseño del logotipo por parte del estudio de Naranjo Etxeberria, diseñé todas las aplicaciones de la marca.",
        tools: ["Figma", "Photoshop", "Indesign", "After Effects"],
        thumb: "assets/projects/rebranding-lottusse/thumb.jpg",
        isVideo: false,
        media: [
            { type: "image", src: "assets/projects/rebranding-lottusse/01.jpg", cols: 1 },
            { type: "image", src: "assets/projects/rebranding-lottusse/02.jpg", cols: 1 },
            { type: "image", src: "assets/projects/rebranding-lottusse/03.jpg", cols: 1 },
            { type: "image", src: "assets/projects/rebranding-lottusse/04.jpg", cols: 1 },
        ]
    },
    {
        id: "web-lottusse",
        title: "Rebranding Web Lottusse",
        year: "2026",
        category: "Web",
        desc: "Rediseño de la web de Lottusse 1877.",
        tools: ["Figma", "Framer"],
        thumb: "assets/projects/web-lottusse/lottusse_web.mp4",
        isVideo: false,
        media: [
            { type: "image", src: "assets/projects/web-lottusse/lottusse_web.mp4", cols: 1 },
        ]
    },
    {
        id: "motion-reel",
        title: "Motion Reel 2025",
        year: "2025",
        category: "Motion",
        desc: "Recopilación de los trabajos de motion graphics del año.",
        tools: ["After Effects", "Cinema 4D", "Premiere"],
        thumb: "assets/projects/motion-reel/thumb.jpg",
        isVideo: false,
        media: [
            { type: "video", src: "assets/projects/motion-reel/reel.mp4", cols: 1 },
        ]
    },
    {
        id: "bulgari",
        title: "Bulgari Serpenti",
        year: "2024",
        category: "Art Direction",
        desc: "Art direction para campaña Bulgari Serpenti.",
        tools: ["Photoshop", "After Effects", "Midjourney"],
        thumb: "assets/projects/bulgari/thumb.jpg",
        isVideo: false,
        media: [
            { type: "image", src: "assets/projects/bulgari/01.jpg", cols: 1 },
            { type: "image", src: "assets/projects/bulgari/02.jpg", cols: 1 },
        ]
    },
    {
        id: "lookbook",
        title: "Lottusse Look Book FW25",
        year: "2025",
        category: "Editorial",
        desc: "Dirección y diseño editorial del Look Book Otoño/Invierno 2025 de Lottusse.",
        tools: ["Indesign", "Photoshop", "Lightroom"],
        thumb: "assets/projects/lookbook/thumb.jpg",
        isVideo: false,
        media: [
            { type: "image", src: "assets/projects/lookbook/01.jpg", cols: 1 },
            { type: "image", src: "assets/projects/lookbook/02.jpg", cols: 1 },
        ]
    },
    {
        id: "sunset-kitchen",
        title: "Sunset Kitchen",
        year: "2024",
        category: "Branding",
        desc: "Identidad visual completa para Sunset Kitchen.",
        tools: ["Figma", "Illustrator", "Photoshop"],
        thumb: "assets/projects/sunset-kitchen/thumb.jpg",
        isVideo: false,
        media: [
            { type: "image", src: "assets/projects/sunset-kitchen/01.jpg", cols: 1 },
        ]
    },
    {
        id: "gymnasium",
        title: "Gymnasium",
        year: "2024",
        category: "Digital",
        desc: "Diseño digital para Gymnasium.",
        tools: ["Figma", "Photoshop"],
        thumb: "assets/projects/gymnasium/thumb.jpg",
        isVideo: false,
        media: [
            { type: "image", src: "assets/projects/gymnasium/01.jpg", cols: 1 },
        ]
    },
    {
        id: "facilitea",
        title: "Facilitea Cars",
        year: "2023",
        category: "Motion",
        desc: "Motion graphics para campaña Facilitea Cars.",
        tools: ["After Effects", "Premiere"],
        thumb: "assets/projects/facilitea/thumb.jpg",
        isVideo: false,
        media: [
            { type: "video", src: "assets/projects/facilitea/video.mp4", cols: 1 },
        ]
    },
    {
        id: "black-friday",
        title: "Black Friday Lottusse '24",
        year: "2024",
        category: "Digital",
        desc: "Campaña digital Black Friday 2024 para Lottusse.",
        tools: ["Photoshop", "After Effects", "Figma"],
        thumb: "assets/projects/black-friday/thumb.jpg",
        isVideo: false,
        media: [
            { type: "image", src: "assets/projects/black-friday/01.jpg", cols: 1 },
            { type: "image", src: "assets/projects/black-friday/02.jpg", cols: 1 },
        ]
    },
]
