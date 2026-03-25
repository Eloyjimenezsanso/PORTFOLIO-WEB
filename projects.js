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
//    - thumb:    imagen o vídeo de portada del ticker
//    - isVideo:  true si la portada es un vídeo (.mp4, .webm)
//    - media:    array de contenido del overlay
//                { type: "image"|"video", src: "...", cols: 1|2|3 }
//                cols = columnas que ocupa en la fila (1 = ancho completo)
// ─────────────────────────────────────────────────────────────

const PROJECTS = [
    {
        id: "palomo",
        title: "Palomo Spain",
        year: "2025",
        category: "Motion",
        desc: "Reinterpretación de la página de producto de la web de Palomo Spain.",
        tools: ["Figma"],
        thumb: "assets/projects/palomo/palomo_pdp.mp4",
        isVideo: true,
        media: [
            { type: "video", src: "assets/projects/palomo/palomo_pdp.mp4", cols: 1 }
        ]
    },
    {
        id: "rebranding-lottusse",
        title: "Rebranding Lottusse",
        year: "2026",
        category: "Branding",
        desc: "Rebranding íntegro de la identidad corporativa de Lottusse 1877. Partiendo del diseño del logotipo por parte del estudio de Naranjo Etxeberria, diseñé todas las aplicaciones de la marca.",
        tools: ["Figma", "Photoshop", "InDesign", "After Effects"],
        thumb: "assets/projects/lottusse1877/lottusse1877_01.mp4",
        isVideo: true,
        media: [
            { type: "video", src: "assets/projects/lottusse1877/lottusse1877_01.mp4", cols: 1, controls: true },
            { type: "image", src: "assets/projects/lottusse1877/lottusse1877_02.jpg", cols: 2 },
            { type: "image", src: "assets/projects/lottusse1877/lottusse1877_03.jpg", cols: 2 },
            { type: "image", src: "assets/projects/lottusse1877/lottusse1877_04.jpeg", cols: 1 },
            { type: "image", src: "assets/projects/lottusse1877/lottusse1877_05.jpeg", cols: 1 },
            { type: "image", src: "assets/projects/lottusse1877/lottusse1877_06.jpg", cols: 2 },
            { type: "image", src: "assets/projects/lottusse1877/lottusse1877_07.jpg", cols: 2 },
            { type: "image", src: "assets/projects/lottusse1877/lottusse1877_08.jpg", cols: 1 },
        ]
    },
    {
        id: "web-lottusse",
        title: "Rebranding Web Lottusse",
        year: "2026",
        category: "Web",
        desc: "Rebranding integro de la web de Lottusse 1877. Este proyecto se centra en la traer a la contemporaneidad la marca de 150 años de historia, reflejando sus valores de artesanía y lujo que los caracterizan.",
        tools: ["Figma", "After Effects"],
        thumb: "assets/projects/web-lottusse/lottusse_web.mp4",
        isVideo: true,   // ← corregido: era false, pero thumb es un .mp4
        media: [
            { type: "video", src: "assets/projects/web-lottusse/lottusse_web.mp4", cols: 1, controls: true },
        ]
    },
    {
        id: "motion-reel",
        title: "Motion Reel 2025",
        year: "2025",
        category: "Motion",
        desc: "Recopilación de algunos de los proyectos que he trabajado como motion grapher.",
        tools: ["After Effects", "Cinema 4D", "Blender", "Photoshop", "Illustrator"],
        thumb: "assets/projects/reel/portada.mp4",
        isVideo: true,
        media: [
            { type: "video", src: "assets/projects/reel/motion_reel.mp4", cols: 1, controls: true },
            { type: "video", src: "assets/projects/bulgari/bulgari_3.mp4", cols: 3 },
            { type: "image", src: "assets/projects/bulgari/bulgari_13.jpeg", cols: 3 },
            { type: "video", src: "assets/projects/bulgari/bulgari_6.mp4", cols: 3 },
            { type: "image", src: "assets/projects/cocina/cocina1.jpg", cols: 1 },
            { type: "image", src: "assets/projects/cocina/cocina8.jpg", cols: 3 },
            { type: "image", src: "assets/projects/cocina/cocina9.jpg", cols: 3 },
            { type: "image", src: "assets/projects/cocina/cocina6.jpg", cols: 3 },
            { type: "video", src: "assets/projects/reel/reel_dimoni.mp4", cols: 2 },
            { type: "video", src: "assets/projects/reel/reel_paisaje.mp4", cols: 2 },
            { type: "video", src: "assets/projects/reel/reel_bolas1.mp4", cols: 3 },
            { type: "video", src: "assets/projects/reel/reel_bolas2.mp4", cols: 3 },
            { type: "video", src: "assets/projects/reel/reel_bolas3.mp4", cols: 3 },
            { type: "video", src: "assets/projects/blackfriday/bf_02.mp4", cols: 1 },

        ]
    },
    {
        id: "bulgari",
        title: "Bulgari Serpenti",
        year: "2024",
        category: "Art Direction",
        desc: "Fundada en Roma en 1884, la firma rápidamente afianzó una reputación de excelencia italiana con exquisita artesanía y magníficas creaciones de joyería. Su colección más extraordinaria es sin duda SERPENTI. Cautivado por el diseño de sus joyas y vasta historia, decidí crear este proyecto a modo de homenaje. El proyecto se realizó completamente en Cinema 4D. Tanto modelaje, texturizado, luces y animación. Finalmente, se compuso el vídeo y añadió la música en After Effects.",
        tools: ["Cinema 4D", "After Effects"],
        thumb: "assets/projects/bulgari/bulgari_13.jpeg",
        isVideo: false,
        media: [
            { type: "video", src: "assets/projects/bulgari/bulgari.mp4", cols: 1, controls: true },
            { type: "gif", src: "assets/projects/bulgari/bulgari_1.gif", cols: 3 },
            { type: "gif", src: "assets/projects/bulgari/bulgari_2.gif", cols: 3 },
            { type: "video", src: "assets/projects/bulgari/bulgari_3.mp4", cols: 3 },
            { type: "image", src: "assets/projects/bulgari/bulgari_4.jpg", cols: 2 },
            { type: "image", src: "assets/projects/bulgari/bulgari_5.jpg", cols: 2 },
            { type: "video", src: "assets/projects/bulgari/bulgari_6.mp4", cols: 1 },
            { type: "image", src: "assets/projects/bulgari/bulgari_7.jpeg", cols: 1 },
            { type: "image", src: "assets/projects/bulgari/bulgari_8.jpeg", cols: 1 },
            { type: "image", src: "assets/projects/bulgari/bulgari_9.png", cols: 1 },
            { type: "image", src: "assets/projects/bulgari/bulgari_10.jpeg", cols: 3 },
            { type: "image", src: "assets/projects/bulgari/bulgari_11.jpg", cols: 3 },
            { type: "image", src: "assets/projects/bulgari/bulgari_12.jpeg", cols: 3 },
            { type: "image", src: "assets/projects/bulgari/bulgari_13.jpeg", cols: 1 },

        ]
    },
    
    {
        id: "sunset-kitchen",
        title: "Sunset Kitchen",
        year: "2024",
        category: "Branding",
        desc: "Este proyecto comenzó siendo mi primera toma de contacto con Blender. Sin una utilidad más allá del puro gusto de pasártelo bien creando algo nuevo, probando cosas nuevas, experimentar e ir descubriendo nuevas posibilidades. Algo que debía servir para dar los primeros pasos de aprender un nuevo programa, acabó siendo uno de las piezas que más he disfrutado creando.",
        tools: ["Blender"],
        thumb: "assets/projects/cocina/cocina1.jpg",
        isVideo: false,
        media: [
            { type: "image", src: "assets/projects/cocina/cocina1.jpg", cols: 1 },
            { type: "image", src: "assets/projects/cocina/cocina2.jpg", cols: 3 },
            { type: "image", src: "assets/projects/cocina/cocina3.jpg", cols: 3 },
            { type: "image", src: "assets/projects/cocina/cocina4.jpg", cols: 3 },
            { type: "image", src: "assets/projects/cocina/cocina5.jpg", cols: 1 },
            { type: "image", src: "assets/projects/cocina/cocina6.jpg", cols: 2 },
            { type: "image", src: "assets/projects/cocina/cocina7.jpg", cols: 2 },
            { type: "image", src: "assets/projects/cocina/cocina8.jpg", cols: 2 },
            { type: "image", src: "assets/projects/cocina/cocina9.jpg", cols: 2 },
        ]
    },
    {
        id: "gymnasium",
        title: "Gymnasium",
        year: "2025",
        category: "Digital",
        desc: "Experimentación en la creación de imagenes con Midjourney y luego aplicadas a una imaginaria web de fotografía de deportes.",
        tools: ["Midjourney"],
        thumb: "assets/projects/gymnasium/gymnasium_18.mp4",
        isVideo: true,
        media: [
            { type: "image", src: "assets/projects/gymnasium/gymnasium_7.png", cols: 1 },
            { type: "video", src: "assets/projects/gymnasium/gymnasium_18.mp4", cols: 1 },
            { type: "image", src: "assets/projects/gymnasium/gymnasium_6.png", cols: 2 },
            { type: "image", src: "assets/projects/gymnasium/gymnasium_11.png", cols: 2 },
            { type: "image", src: "assets/projects/gymnasium/gymnasium_8.png", cols: 3 },
            { type: "image", src: "assets/projects/gymnasium/gymnasium_9.png", cols: 3 },
            { type: "image", src: "assets/projects/gymnasium/gymnasium_10.png", cols: 3 },
            { type: "image", src: "assets/projects/gymnasium/gymnasium_5.png", cols: 1 },
            { type: "image", src: "assets/projects/gymnasium/gymnasium_1.png", cols: 2 },
            { type: "image", src: "assets/projects/gymnasium/gymnasium_2.png", cols: 2 },
            { type: "image", src: "assets/projects/gymnasium/gymnasium_3.png", cols: 2 },
            { type: "image", src: "assets/projects/gymnasium/gymnasium_4.png", cols: 2 },
            { type: "image", src: "assets/projects/gymnasium/gymnasium_12.png", cols: 1 },
            { type: "image", src: "assets/projects/gymnasium/gymnasium_15.png", cols: 1 },
            { type: "image", src: "assets/projects/gymnasium/gymnasium_16.png", cols: 2 },
            { type: "image", src: "assets/projects/gymnasium/gymnasium_17.png", cols: 2 },
        ]
    },
    {
        id: "facilitea",
        title: "Facilitea Cars",
        year: "2025",
        category: "Motion",
        desc: "Propuesta de actualización UX / UI de la interfaz de Facilitea a la hora de destacar productos específicos.",
        tools: ["After Effects", "Figma"],
        thumb: "assets/projects/north/north1.mp4",
        isVideo: true,
        media: [
            { type: "video", src: "assets/projects/north/north1.mp4", cols: 1, controls: true },
        ]
    },
    {
        id: "black-friday",
        title: "Black Friday Lottusse '24",
        year: "2024",
        category: "Digital",
        desc: "Proyecto realizado para la marca de moda LOTTUSSE. Se trata de una campaña para las rebajas de Black Friday 2024, en la cual el objetivo principal era mostrar sus rebajas pero desde un enfoque dinámico a la par que elegante y limpio. El proyecto se divide en dos piezas principales. El spot 1 se realizó para utilizar como primer lanzamiento de las rebajas y avisar de los elementos clave (fechas y porcentajes). Sirve como teaser de la campaña prinicipal. La segunda pieza se trata del video principal de la campaña. En el se muestra una gran cantidad de  tickets de compra, evocando el consumismo de los clientes por las rebajas, los cuales no hacen más que acumularse bajo sus productos.",
        tools: ["Blender", "After Effects", "Photoshop"],
        thumb: "assets/projects/blackfriday/bf11.jpg",
        isVideo: false,
        media: [
            { type: "video", src: "assets/projects/blackfriday/bf_spot1.mp4", cols: 1, controls: true },
            { type: "image", src: "assets/projects/blackfriday/bf11.jpg", cols: 3 },
            { type: "image", src: "assets/projects/blackfriday/bf12.jpg", cols: 3 },
            { type: "image", src: "assets/projects/blackfriday/bf13.jpg", cols: 3 },
            { type: "image", src: "assets/projects/blackfriday/bf14.jpg", cols: 3 },
            { type: "image", src: "assets/projects/blackfriday/bf15.jpg", cols: 3 },
            { type: "image", src: "assets/projects/blackfriday/bf16.jpg", cols: 3 },
            { type: "video", src: "assets/projects/blackfriday/bf_01.mp4", cols: 2 },
            { type: "video", src: "assets/projects/blackfriday/bf_02.mp4", cols: 2 },
            { type: "video", src: "assets/projects/blackfriday/bf_spot2.mp4", cols: 1, controls: true },
            { type: "video", src: "assets/projects/blackfriday/bf_03.mp4", cols: 3 },
            { type: "video", src: "assets/projects/blackfriday/bf_04.mp4", cols: 3 },
            { type: "video", src: "assets/projects/blackfriday/bf_05.mp4", cols: 3 },
        ]
    },
]
