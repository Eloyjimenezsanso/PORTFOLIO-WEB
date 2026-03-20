# Portfolio — Eloy Jiménez Sansó

## Estructura de archivos

```
portfolio/
├── index.html          ← Página principal
├── style.css           ← Todos los estilos
├── main.js             ← Lógica (ticker, animación, overlay)
├── projects.js         ← Datos de los proyectos (EDITAR AQUÍ)
└── assets/
    ├── liebre.png                    ← Logo animado del hero
    ├── sobre-foto-1.jpg              ← Foto sección Sobre Mí (izquierda)
    ├── sobre-foto-2.jpg              ← Foto sección Sobre Mí (derecha)
    └── projects/
        ├── rebranding-lottusse/
        │   ├── thumb.jpg             ← Portada del ticker
        │   ├── 01.jpg
        │   └── 02.jpg
        ├── palomo/
        │   ├── thumb.jpg
        │   └── 01.jpg
        └── ... (una carpeta por proyecto)
```

## Cómo añadir imágenes

1. Crea una carpeta dentro de `assets/projects/` con el id del proyecto
2. Pon la imagen de portada como `thumb.jpg`
3. El resto de imágenes como `01.jpg`, `02.jpg`, etc.
4. En `projects.js`, actualiza las rutas del proyecto correspondiente

## Cómo editar un proyecto

Abre `projects.js` y modifica el objeto del proyecto.
Cada proyecto tiene esta estructura:

```js
{
    id: "nombre-unico",
    title: "Nombre del Proyecto",
    year: "2025",
    category: "Branding",
    desc: "Descripción corta del proyecto.",
    tools: ["Figma", "Photoshop"],
    thumb: "assets/projects/nombre-unico/thumb.jpg",
    isVideo: false,   // true si la portada del ticker es un vídeo
    media: [
        // Imagen a ancho completo:
        { type: "image", src: "assets/projects/nombre-unico/01.jpg", cols: 1 },
        // Dos imágenes en la misma fila:
        { type: "image", src: "assets/projects/nombre-unico/02.jpg", cols: 2 },
        { type: "image", src: "assets/projects/nombre-unico/03.jpg", cols: 2 },
        // Vídeo:
        { type: "video", src: "assets/projects/nombre-unico/video.mp4", cols: 1 },
    ]
}
```

## Cómo publicar en Vercel

1. Crea una cuenta en https://github.com (gratuito)
2. Crea un repositorio nuevo y sube esta carpeta
3. Ve a https://vercel.com, conecta tu cuenta de GitHub
4. Importa el repositorio → Vercel lo publica automáticamente
5. Cada vez que actualices los archivos en GitHub, Vercel se actualiza solo

## Cómo ver la web en local (sin subirla)

Opción A — con VS Code:
1. Instala la extensión "Live Server"
2. Click derecho en index.html → "Open with Live Server"

Opción B — con terminal:
```
cd portfolio
npx serve .
```
