📑 Análisis de Diseño y Estructura - Fake Store
Este documento detalla las decisiones técnicas y creativas tomadas durante el desarrollo de la aplicación, enfocándose en la arquitectura de datos, la experiencia de usuario (UX) y la interfaz (UI).

🎨 1. Decisiones de Interfaz (UI) y Experiencia de Usuario (UX)
Estética Cyberpunk / Futurista
Se optó por un estilo visual Dark Mode con acentos neón por las siguientes razones:

Contraste y Jerarquía: El fondo oscuro (#0a111a) permite que los elementos críticos, como precios en naranja neón y botones en azul cian, resalten inmediatamente (Efecto Von Restorff).

Identidad Visual: El uso de backdrop-filter: blur() (Glassmorphism) en el header y los modales aporta una sensación de profundidad y modernidad técnica.

Feedback e Interactividad
Estados de Carga: Se implementó un loader animado para gestionar la latencia de la API de forma transparente para el usuario.

Microinteracciones: El uso de transform: scale() y filter: brightness() en las tarjetas de productos proporciona un feedback visual inmediato de que el elemento es interactivo.

🏗️ 2. Estructura de Datos y Almacenamiento
Representación de Productos
Los productos se gestionan como un Array de Objetos obtenido de la API. Cada objeto mantiene sus propiedades originales (id, title, price, image, category), facilitando el mapeo directo a componentes HTML.

Gestión del Carrito (Persistent State)
El carrito se representa mediante una estructura de datos tipo Array, donde cada objeto incluye los datos del producto más una propiedad adicional: quantity.

Lógica de adición: Se utiliza el método .find() para verificar si un producto ya existe. Si existe, se incrementa la propiedad quantity; de lo contrario, se añade al array con quantity: 1.

Persistencia: Se utiliza localStorage para serializar (JSON.stringify) el estado del carrito. Esto garantiza que el usuario no pierda su selección al recargar la página o cerrar el navegador.

🔍 3. Filtros y Usabilidad
Desde la perspectiva de la usabilidad (Heurísticas de Nielsen), los filtros se implementaron bajo los siguientes criterios:

Barra de Búsqueda (Control del Usuario)
Permite al usuario encontrar productos específicos de forma rápida sin navegar por todo el catálogo. Implementada con lógica de coincidencia de cadenas (.includes()) para mayor flexibilidad.

Filtros de Categoría (Carga Cognitiva)
En lugar de un menú desplegable oculto, se usaron botones de acceso directo. Esto reduce la carga cognitiva al exponer todas las opciones disponibles de inmediato, permitiendo una navegación exploratoria eficiente.

Slider de Precios (Prevención de Errores)
El slider permite acotar el rango de precios visualmente. Es superior a los campos de texto manuales porque:

Evita errores de sintaxis (letras en campos de número).

Define límites claros, permitiendo al usuario conocer el rango de precios de la tienda de un vistazo.

Ordenamiento y Filtrado Combinado
La lógica de applyFilters() asegura que todas las condiciones (nombre, categoría y precio) se cumplan simultáneamente mediante un filtrado secuencial, respetando el modelo mental del usuario donde cada filtro suma una restricción.