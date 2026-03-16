# AURALITH (VERSIÓN WEB)

## ANTEPROYECTO: ANTEPROYECTO – AURALITH
Soy Luis Cachero Mata, el año pasado cursé el ciclo formativo de Desarrollo de Aplicaciones Multiplataforma (DAM) y para el Trabajo de Fin de Grado desarrollé una aplicación móvil llamada Auralith.
Auralith fue un proyecto centrado en la música, concretamente en la reproducción y organización de canciones dentro de una aplicación propia. Permitía gestionar archivos de audio, reproducirlos desde una interfaz diseñada por mí y almacenar la información de cada canción en una base de datos estructurada. 
Sin embargo, Auralith no fue solo una práctica técnica. Elegí la temática musical porque es un ámbito que me interesa personalmente, y eso hizo que me implicara más en cada detalle del desarrollo. No lo veía únicamente como un proyecto académico que debía terminar, sino como una idea que realmente me apetecía construir y mejorar.

Para el Trabajo de Fin de Grado de Desarrollo de Aplicaciones Web (DAW), quiero retomar esa misma idea y darle una evolución natural, llevándola al entorno web. Mi intención es transformarla en una aplicación accesible desde navegador, ampliando sus funcionalidades y adaptándola a un entorno multiusuario.

La nueva versión de Auralith será una plataforma musical online en la que los usuarios podrán registrarse, iniciar sesión y gestionar su propio espacio dentro de la aplicación. Cada usuario tendrá su perfil, desde el cual podrá subir canciones, organizarlas, reproducirlas mediante un reproductor integrado en la web y crear listas de reproducción personalizadas.

Además, la aplicación contará con una base de datos que almacenará la información de usuarios, canciones y playlists. La idea es estructurar el proyecto siguiendo un modelo cliente-servidor, separando la parte visual de la lógica interna y el acceso a datos. De esta forma, el desarrollo será más ordenado y mantenible.

Entre las funcionalidades que me gustaría añadir destacan:
- Registro e inicio de sesión de usuarios.
- Gestión de perfiles personales.
- Subida y almacenamiento de archivos de audio.
- Reproductor musical integrado en la web.
- Creación, edición y eliminación de playlists.
- Sistema de búsqueda de canciones.
- Panel de administración para la gestión general del contenido.

Desde el punto de vista técnico, el proyecto implicará trabajar tanto el frontend como el backend. En la parte visual se utilizarán tecnologías como HTML, CSS y JavaScript para diseñar una interfaz clara e intuitiva. En la parte del servidor se gestionarán las peticiones, la lógica de la aplicación y la conexión con la base de datos. También se aplicarán aspectos como validación de formularios, control de sesiones y organización estructurada del proyecto.

Uno de mis objetivos principales es que la aplicación no sea solo funcional, sino también agradable de utilizar. Quiero cuidar la experiencia de usuario, intentando que la navegación sea sencilla y que la interfaz tenga coherencia visual. Aunque se trata de un proyecto académico, me gustaría que el resultado final tuviera un nivel de acabado cercano al de una aplicación real.

La elección de este proyecto tiene varios motivos. Por un lado, supone continuar y mejorar una idea ya trabajada anteriormente, demostrando una evolución respecto al TFG de DAM. Por otro lado, representa un reto técnico mayor, ya que implica integrar diferentes áreas del desarrollo web en una misma aplicación completa.

Con este Trabajo de Fin de Grado busco consolidar mis conocimientos como desarrollador web, enfrentándome a un proyecto que abarque análisis, diseño, desarrollo y pruebas. Mi intención es demostrar no solo que soy capaz de programar una aplicación funcional, sino también que puedo planificarla, estructurarla correctamente y desarrollarla de forma organizada.

En definitiva, Auralith en su versión web será la continuación natural de un proyecto anterior, pero adaptado a un entorno más amplio y con mayores posibilidades. Más que empezar desde cero, se trata de mejorar y hacer crecer una idea que ya forma parte de mi trayectoria académica.

## 50% del Proyecto (Estado Actual)
Hasta el momento, estas son las bases tecnológicas y visuales que ya hemos construido y consolidado, alcanzando la marca del 50% del proyecto:
- **Estructura Backend:** Implementación del servidor utilizando Node.js y framework Express, separando rutas, controladores y las vistas siguiendo una arquitectura Modelo-Vista-Controlador.
- **Base de Datos y Seguridad:** Diseño lógico e implementación SQL para almacenar Usuarios, Canciones, Álbumes y Playlists. Creación del sistema de "Registro e Inicio de sesión seguro" con JWT (o sesiones) y uso de variables de entorno, de modo que tu cuenta en `Auralith` ya es personal e intransferible.
- **Sistema de Rutas Privadas:** Ya existe control de acceso: los usuarios sin autenticar redirigen al login, y los autenticados tienen acceso a su vista `player` y vistas administrativas o personales.
- **Front-End y Experiencia de Usuario (UI/UX):** Integración de vistas renderizadas mediante plantillas dinámicas (EJS). Diseño de una interfaz visual atractiva, actual, con modo oscuro e inspiración en Glassmorphism.
- **Diseño Adaptativo (Responsive):** Hemos incorporado una cuadrícula nativa CSS, funciones fluidas `clamp()` y _media queries_ para asegurar que la plataforma pueda visualizarse perfectemente a cualquier resolución sin cortes de contenido en PC, tableta o smartphones.

## 80% del Proyecto
*Próximos desarrollos: Aquí se integrará la lógica del reproductor musical persistente, subida y validación de archivos de audio desde la interfaz web, creación interactiva de playlists y búsqueda en tiempo real de canciones.*

## 100% del Proyecto
*Próximos desarrollos: Panel de administración, últimas funciones sociales (seguidores), despliegues finales optimizados para producción en entorno cloud, revisión de bugs y pulido general previo a presentación.*