# pagina_recuerdos
# Groupy — Momentos App

Aplicación web interactiva con diseño *mobile-first* y tema oscuro para guardar, organizar y revivir recuerdos fotográficos y vídeos en grupos privados.

## Características principales
- **Muro de recuerdos:** Visualización de publicaciones con filtrado por grupo y diseño en tarjetas adaptables.
- **Gestión de grupos:** Creación de grupos personalizados y acceso mediante códigos de invitación, con persistencia en `localStorage`.
- **Subida de contenido:** Modal dedicado para añadir recuerdos con título, descripción, grupo asignado y archivos multimedia (imagen o vídeo).
- **Recap mensual interactivo:** Reproductor automático a pantalla completa tipo *stories* (4 segundos por diapositiva, controles táctiles izquierda/derecha y soporte de vídeo) que mezcla los momentos del mes usando el algoritmo **Fisher-Yates**.
- **Enfoque en privacidad:** Control de visibilidad por grupo sin almacenamiento en servidores externos.

## Tecnologías utilizadas
- **HTML5:** Estructura semántica y modales accesibles.
- **CSS3:** Diseño responsivo, variables CSS personalizadas, *Glassmorphism* en barras de navegación y estética oscura de alto contraste.
- **JavaScript (Vanilla):** Gestión de estado, manipulación dinámica del DOM, almacenamiento local (`localStorage`) y reproductor de diapositivas.
- **Lucide Icons:** Iconografía vectorial ligera.

## Estructura del proyecto
- `index.html`: Interfaz principal con vistas de Muro, Grupos, Recap y ventanas modales.
- `styles.css`: Hojas de estilo con sistema de variables y barra de navegación inferior estilo app móvil.
- `app.js`: Lógica de navegación, persistencia de datos y motor de reproducción del Recap.
