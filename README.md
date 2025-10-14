# Guía de Instalación del Backend

Esta guía proporciona instrucciones paso a paso para configurar y ejecutar el backend del proyecto.

## Prerrequisitos

1. **Instalar Node.js**
   - Descarga e instala Node.js desde [https://nodejs.org/es](https://nodejs.org/es).
   - Verifica la instalación ejecutando:
[!NOTE]
Espera a que se instale por completo el node js
     ```bash
     node -v
     npm -v
     ```

2. **Instalar MySQL o XAMPP**
   - Descarga e instala MySQL o XAMPP para configurar un servidor de base de datos local.

## Pasos de Instalación

3. **Clonar el Repositorio**
   - Clona el repositorio del proyecto usando:
     ```bash
     git clone https://github.com/jazielSlayer/Frontend-SAT.git
     ```

4. **Instalar Dependencias**
   - Navega al directorio del proyecto e instala las dependencias requeridas:
     ```bash
     npm install
     ```

5. **Configurar Variables de Entorno**
   - Crea un archivo `.env` en la raíz del proyecto:
     ```powershell
     New-Item -Path .env -ItemType File -Force
     ```
   - Agrega las siguientes variables al archivo `.env`:
     ```powershell
     Add-Content -Path .env -Value "DB_HOST=localhost"
     Add-Content -Path .env -Value "DB_USER=root"
     Add-Content -Path .env -Value "DB_PASSWORD="
     Add-Content -Path .env -Value "DB_DATABASE=saf"
     ```
   - Agrega tu correo electrónico para la variable `CORREO_APP` (reemplaza `example@gmail.com` con tu correo real):
     ```powershell
     Add-Content -Path .env -Value "CORREO_APP=example@gmail.com"
     ```
   - Genera una contraseña específica para la aplicación desde [Contraseñas de Aplicaciones de Google](https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4MBatzGXSV5f-OI9U1v8ujdutvXwSkByemPACclTJANJBc6yTPJhopYmYIYqE_NtoCxRqvJMY_kx_E6loH_xljv-dPt1oqRblPceA-A_a9meGtBeoU) y agrégala al archivo `.env` (reemplaza la contraseña de ejemplo):
     ```powershell
     Add-Content -Path .env -Value "CONTRASENA_APP=tu-contraseña-generada"
     ```

6. **Configurar la Base de Datos**
   - Ejecuta el script de la base de datos (`db`) para crear la estructura de la base de datos necesaria.

7. **Compilar el Proyecto**
   - Compila el proyecto para transformar la carpeta `src` en la carpeta `dist`:
     ```bash
     npm run build
     ```

8. **Ejecutar el Proyecto**
   - Inicia el servidor de desarrollo (se reinicia automáticamente al hacer cambios):
     ```bash
     npm run dev
     ```
   - Alternativamente, ejecuta el proyecto compilado:
     ```bash
     npm start
     ```
