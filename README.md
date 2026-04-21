# Memoria del Proyecto TFG: AURALITH (Versión Web)

> **Nota:** Este documento establece la estructura completa y el contenido técnico detallado de la memoria del proyecto Auralith. Para alcanzar la extensión de 50 páginas requerida para la entrega final del TFG, se recomienda exportar este contenido a un procesador de textos (Word o LaTeX), añadir portadas, índices, diagramas (diagramas de clases, entidad-relación, casos de uso), capturas de pantalla a tamaño completo en cada vista principal, y fragmentos de código clave comentados.

---

## 1. Introducción y Motivación

Soy Luis Cachero Mata. El año pasado cursé el ciclo formativo de Desarrollo de Aplicaciones Multiplataforma (DAM) y para el Trabajo de Fin de Grado desarrollé una aplicación móvil llamada **Auralith**.

Auralith fue un proyecto centrado en la música, concretamente en la reproducción y organización de canciones dentro de una aplicación propia. Permitía gestionar archivos de audio, reproducirlos desde una interfaz diseñada por mí y almacenar la información de cada canción en una base de datos estructurada. Sin embargo, Auralith no fue solo una práctica técnica. Elegí la temática musical porque es un ámbito que me apasiona personalmente, lo que provocó que me implicara más en cada detalle del desarrollo. Nunca lo vi únicamente como un proyecto académico que debía terminar, sino como una idea que realmente me apetecía construir, pulir y mejorar de cara al futuro.

Para el Trabajo de Fin de Grado de **Desarrollo de Aplicaciones Web (DAW)**, decidí retomar esta idea base y darle una evolución total y natural: llevarla al entorno web. Mi intención ha sido transformar una app móvil aislada en una **plataforma musical online** completamente funcional, accesible desde cualquier navegador, con una estructura multi-dispositivo y multiusuario.

### 1.1 Objetivos del Proyecto
La nueva versión web de Auralith es una plataforma en la que los usuarios pueden registrarse, iniciar sesión y gestionar un espacio musical propio. 
Entre los objetivos principales que establece al comenzar se encontraban:
- Crear un sistema sólido de Registro e inicio de sesión de usuarios.
- Permitir la gestión de perfiles personales y librerías de música.
- Integrar la reproducción de audio fluida y sin cortes a lo largo de la navegación web.
- Proveer un reproductor musical completamente personalizado (sin depender de las interfaces de audio por defecto de los navegadores).
- Separar la lógica cliente-servidor mediante una arquitectura estructurada y escalable.

Desde el punto de vista del usuario final, mi objetivo se centró en que la plataforma no fuera simplemente funcional, sino que tuviera un diseño atractivo, dinámico, moderno (implementando tendencias como el *Glassmorphism* y modos oscuros) y que se comportara como una aplicación real en la cual un usuario disfrutaría pasar el tiempo.

### 1.2 Justificación del Proyecto
La elección de este proyecto se justifica en varios motivos de peso:
1. **Evolución Profesional:** Supone continuar y mejorar enormemente una idea en la que trabajé anteriormente, probando una evolución directa respecto al TFG de DAM.
2. **Reto Técnico Complejo:** Integrar frontend, backend, seguridad, persistencia de variables globales de audio, y bases de datos relacionales en una misma aplicación.
3. **Consolidación de Conocimientos:** Permite demostrar mis capacidades como Full-Stack Developer integrando despliegue de servidores.

---

## 2. Tecnologías Utilizadas

Para el desarrollo de Auralith Web, he optado por un stack tecnológico basado en JavaScript, permitiendo un flujo de trabajo unificado ("Isomórfico") tanto en el frontend como en el backend.

### 2.1 Tecnologías del Frontend (Cliente)
- **HTML5 (Marcado Semántico):** Utilizado para estructurar firmemente el esqueleto de la aplicación, haciendo uso de etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<footer>`) que favorecen la accesibilidad y el SEO.
- **CSS3 Avanzado y Vanilla CSS:** Se ha diseñado la aplicación completamente desde cero utilizando CSS puro, lo que proporciona control milimétrico sobre la interfaz. Implementé:
  - **CSS Grid y Flexbox** para estructuras espaciales complejas.
  - **Media Queries** y diseño _Mobile-First_ garantizando un diseño plenamente adaptativo en todas las resoluciones (Responsive Design).
  - **Variables CSS (Custom Properties)** para temas globales (colores y espaciados).
- **JavaScript (ES6+) Vanilla:** El comportamiento interactivo del navegador (reproducción de audios, validaciones de los formularios, actualización del DOM en tiempo real) se resolvió utilizando JavaScript moderno sin depender de librerías externas pesadas, asegurando el mejor rendimiento posible.
- **EJS (Embedded JavaScript Templating):** Motor de plantillas que permite generar el HTML de forma dinámica en el lado del servidor, inyectando los datos de la base de datos (canciones, nombres de usuario) directamente en las vistas antes de enviarlas al cliente.

### 2.2 Tecnologías del Backend (Servidor)
- **Node.js:** Entorno de ejecución de JavaScript del lado del servidor que destaca por su naturaleza asíncrona y orientada a eventos, lo que lo hace ideal para aplicaciones web dinámicas y eficientes.
- **Express.js:** Un framework rápido, minimalista y flexible para Node.js, utilizado para estructurar las rutas de la aplicación, gestionar peticiones HTTP, manejar middlewares (como la protección de rutas) y organizar la arquitectura en general.
- **Autenticación (Seguridad):** 
  - **Bcrypt:** Algoritmo de hashing incorporado para cifrar de manera segura las contraseñas de los usuarios en la base de datos, asegurando que nunca viajen ni se guarden como texto plano.
  - **JSON Web Tokens (JWT) / Cookies de Sesión:** Implementación de autenticación persistente ("Stateless" o control de sesión), permitiendo que el servidor reconozca los permisos del usuario sin sobrecargar consultas repetitivas a la base de datos.

### 2.3 Base de Datos y Herramientas Externas
- **PostgreSQL (A través de CockroachDB / Render):** Sistema avanzado de bases de datos relacional para guardar tablas de `Usuarios`, `Canciones`, `Álbumes` y `Playlists`.
- **Git y GitHub:** Control de versiones del proyecto.
- **Render / Heroku:** Plataformas como servicio (PaaS) encargadas de alojar la aplicación y base de datos para estar disponible en la red global de internet.

---

## 3. Arquitectura del Sistema: Diseño y Organización

El proyecto ha sido estructurado meticulosamente bajo el patrón arquitectónico **Modelo-Vista-Controlador (MVC)**, asegurando que el código sea limpio y altamente escalable:

- **Modelo (Models / Database):** Representa la estructura lógica interna y es la capa responsable de comunicarse directamente con la Base de Datos mediante sentencias SQL, procesar los datos en bruto y devolverlos.
- **Vistas (Views):** Utilizando las plantillas `.ejs`, las vistas se encargan exclusivamente de la representación gráfica ("Lo que el usuario ve"). Contienen fragmentos reutilizables (partials) como barras de navegación, lo cual evita duplicidad de código.
- **Controladores (Controllers):** Constituyen el cerebro del sistema intermedio. Su función es recibir peticiones a través del enrutador ("Router"), solicitar los datos requeridos al Modelo, y enviar estos datos procesados para renderizar la Vista correspondiente.

---

## 4. Partes Principales y Explicación de Pantallas

### 4.1 Pantalla de Acceso (Login y Registro)
Es la puerta de entrada a la aplicación.
- **Funcionamiento:** Estas pantallas proporcionan formularios limpios donde el usuario debe introducir credenciales. Si los datos no son consistentes, se advierte al usuario.
- **Seguridad:** La contraseña se envía y es interceptada por el backend. En el caso del registro, se realiza un _hash_ y se guarda cifrada. Durante el _login_, se compara el hash de la base de datos para verificar la validación y generar un token/sesión que persistirá durante la navegación.

### 4.2 La Vista Principal (El Reproductor - 'Player')
Es el núcleo central ("Core") de toda la aplicación. Se compone estructuralmente de varios módulos independientes llamados como 'partials':

#### A. Barra Lateral (Sidebar Navigation)
Se ubica generalmente a la izquierda (en _desktop_) y se convierte en un menú inferior/desplegable en plataformas móviles gracias a las sentencias CSS adaptables.
- **Función:** Permite la navegación sin cambiar el contexto global; se puede ir al inicio, al perfil de usuario o buscar música fácilmente.

#### B. Área de Contenido Principal (Main Feed)
El bloque central más extenso por diseño, el cual muestra las listas de canciones.
- **Lógica e Implicación técnica:** Aquí es donde EJS brilla en el servidor. El controlador realiza la consulta de cuántas canciones existen en base de datos. Una estructura iterativa (usualmente un bucle `forEach` en EJS) maqueta e imprime en HTML todas las "tarjetas" (cards) musicales que se ven en pantalla independientemente de si hay 5 o 5.000 canciones.

#### C. La Barra de Reproducción de Audio (Player Bar)
La pestaña ubicada fija en parte inferior de la ventana, encargada de la música real.
- **¿Qué la forma?** Consta de la portada de la canción actual, los controles (play, pausa, siguiente, anterior), la barra de progreso general y un controlador de volumen.
- **¿Qué hace?** Tras bastidores, esta barra interactúa mediante el archivo `audio-player.js` con el elemento dinámico `new Audio()` de HTML5. Escucha eventos click que dictan cuándo pausar o reproducir. 
- **Destacado:** Esta arquitectura fue uno de los grandes retos; la dificultad de evitar que la música se corte cuando el usuario hace clic en otro apartado de la web ha exigido soluciones avanzadas de estado global o carga de vistas parciales asíncronas para mantener el reproductor siempre vivo y sonando.

### 4.3 Panel de Administración
Dedicado únicamente para cuentas de rol de nivel 'Admin'. Permite al creador incorporar material, subir información general (metadatos como artista, año, URL del audio) y borrar reportes conflictivos en la base de datos sin necesidad de usar un cliente SQL pesado.

---

## 5. Diseño y "Responsive Design" (Experiencia de Usuario)

Si hay algo a destacar metodológicamente, ha sido el absoluto mimo prestado al área visual. La idea se distanciaba de crear un "producto viable mínimo"; quería un producto premium.
Para ello se emplearon:
- **Colores armonizados:** Con gradientes tenues, sombreados paralelos y transparencias difusas sobre fondos abstractos que dan una experiencia inmersiva ligada a la música electrónica y moderna.
- **Diseño Adaptativo (Responsive):** Empleando de manera continua _Media Queries_ a los cortes clave de 768px (Tabletas) y 480px (Móviles). Se resolvieron múltiples problemas complejos, como desbordamientos (overflow) horizontales, reemplazando elementos y contrayéndolos sin comprometer la facilidad de toques (touch-targets).

---

## 6. Conclusiones y Próximos Pasos (Futuro de la App)

A lo largo del desarrollo de Auralith en su versión web, he conseguido cumplir satisfactoriamente el paso de una aplicación nativa/móvil al contexto dinámico y vivo del navegador. He superado los inconvenientes en Render sobre la conectividad a base de datos externa y superado barreras técnicas de adaptación multiplataforma.
El producto presente sienta una base extraordinariamente sólida; es intuitivo, elegante y con un enrutamiento seguro real.

En futuras implementaciones, fuera del alcance inicial de la memoria, se contemplarán integraciones como un sistema social para seguir usuarios y un sistema mejorado de caché que reducirá los tiempos de consumo de datos optimizando el ancho de banda general.

Auralith en su versión web ha sido, indudablemente, mi paso definitivo hacia el desarrollo profesional de Software, y concretamente, mi meta más ambiciosa en el desarrollo Full-Stack.