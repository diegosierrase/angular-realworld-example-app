# angular-realworld-example-app

Este proyecto es una implementación de la aplicación [conduit](https://github.com/gothinkster/angular-realworld-example-app) utilizando Angular 20.0.0. Incluye configuraciones para ejecutar la aplicación con un mock de la API utilizando [MSW (Mock Service Worker)](https://mswjs.io/), lo que permite el desarrollo y las pruebas sin depender de una API backend real.

## Herramientas Necesarias

Para poder ejecutar este proyecto, debes tener las siguientes herramientas instaladas y configuradas en tu sistema:

* **Node.js**: Se recomienda usar la versión especificada en `engines` del `package.json`, que es `^20.11.1`. Puedes descargarla desde [nodejs.org](https://nodejs.org/).
    * **Verificar instalación**: Abre tu terminal y ejecuta `node -v` y `npm -v`.

* **Angular CLI**: Es la herramienta de línea de comandos oficial de Angular.
    * **Instalar**: `npm install -g @angular/cli`
    * **Verificar instalación**: `ng version` (debería mostrar Angular CLI 20.0.0 o superior).

* **Git**: Sistema de control de versiones. Es probable que ya lo tengas instalado.
    * **Verificar instalación**: `git --version`

## Cómo Clonar y Configurar el Proyecto

Sigue estos pasos para obtener una copia local del proyecto y preparar su ejecución:

1.  **Clonar el repositorio**:
    Abre tu terminal y ejecuta el siguiente comando para clonar el proyecto desde GitHub:

    ```bash
    git clone https://github.com/diegosierrase/angular-realworld-example-app.git
    ```

2.  **Navegar al directorio del proyecto**:
    Una vez clonado, entra al directorio del proyecto:

    ```bash
    cd angular-realworld-example-app
    ```

3.  **Instalar dependencias**:
    Este comando descargará e instalará todas las dependencias del proyecto listadas en `package.json`:

    ```bash
    npm install
    ```
    Este proceso puede tardar unos minutos.

4.  **Configurar Husky (Hooks de Git - Opcional pero recomendado)**:
    El proyecto utiliza `husky` para gestionar hooks de Git (como pre-commit). Este paso debería ejecutarse automáticamente con `npm install` debido al script `prepare`, pero si no es así, o si tienes algún problema, puedes forzarlo:

    ```bash
    npm run prepare
    ```

## Cómo Levantar el Proyecto

Este proyecto está configurado para ejecutarse con **MSW (Mock Service Worker)** para simular la API backend. Esto significa que no necesitas un servidor de backend real funcionando para desarrollar y probar la aplicación.

1.  **Iniciar el servidor de desarrollo de Angular con MSW (Modo Mock):**
    Para iniciar la aplicación Angular en tu entorno local, ejecuta el siguiente comando:

    ```bash
    npm start
    ```
    Este comando levantará el servidor de desarrollo de Angular y activará el Service Worker de MSW, que interceptará las llamadas a la API y responderá con datos simulados.

## Acceder a la Aplicación

Una vez que el servidor de desarrollo esté en ejecución (verás un mensaje en la terminal indicando que está compilado), podrás acceder a la aplicación en tu navegador web.

* **URL de Acceso**:
    Abre tu navegador y navega a:

    ```
    http://localhost:4200/
    ```

## Información del Mock de Login

El proyecto está configurado con un mock para la autenticación de usuarios. Para realizar un login exitoso en la aplicación mientras usas el modo mock, debes utilizar las siguientes credenciales:

* **Usuario (Email)**: `test@example.com`
* **Contraseña**: `Pruebas2020!`

Estas credenciales están definidas en los handlers de MSW (`src/mocks/handlers.ts`) y son solo para propósitos de desarrollo y prueba local con el mock activado.

---
