# Guía de Instalación del Backend

Esta guía proporciona instrucciones paso a paso para configurar y ejecutar el backend del proyecto.

## Prerrequisitos

1. **Instalar Node.js**
   - Descarga e instala Node.js desde [https://nodejs.org/es](https://nodejs.org/es).
>[!IMPORTANT]
>Espera a que se instale por completo el node js

   - Verifica la instalación ejecutando:
     ```bash
     node -v
     npm -v
     ```

2. **Instalar MySQL o XAMPP**
   - Descarga e instala MySQL o XAMPP para configurar un servidor de base de datos local.
>[!NOTE]
>Puedes decargar XAMPP desde: https://www.apachefriends.org/es/download.html

## Pasos de Instalación
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">
<h2>3. Clonar el Repositorio</h2>
   - Clona el repositorio del proyecto usando:
     ```bash
     git clone https://github.com/jazielSlayer/Frontend-SAT.git
     ```

<h2>4. Instalar Dependencias</h2>
   - Navega al directorio del proyecto e instala las dependencias requeridas:
     ```bash
     npm install
     ```

<h2>5. Configurar Variables de Entorno</h2>

>[!IMPORTANT]
>Este archivo es importante para no guardar datos sensibles como contraseñas

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
>[!NOTE]
>Nesesitas activar la verificacion de dos pasos de tu cuenta de google
   - Genera una contraseña específica para la aplicación desde [Contraseñas de Aplicaciones de Google](https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4MBatzGXSV5f-OI9U1v8ujdutvXwSkByemPACclTJANJBc6yTPJhopYmYIYqE_NtoCxRqvJMY_kx_E6loH_xljv-dPt1oqRblPceA-A_a9meGtBeoU) y agrégala al archivo `.env` (reemplaza la contraseña de ejemplo):
     ```powershell
     Add-Content -Path .env -Value "CONTRASENA_APP=tu-contraseña-generada"
     ```
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">
<h2>6. Configurar la Base de Datos</h2>
   - Ejecuta el script de la base de datos (`db`) para crear la estructura de la base de datos necesaria.

<h2>7. Compilar el Proyecto</h2>

   - Compila el proyecto para transformar la carpeta `src` en la carpeta `dist`:
     ```bash
     npm run build
     ```
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">
<h2>8. Ejecutar el Proyecto</h2>

   - Inicia el servidor de desarrollo (se reinicia automáticamente al hacer cambios):
     ```bash
     npm run dev
     ```

   - Alternativamente, ejecuta el proyecto compilado:
>[!IMPORTANT]
>Este comando es importante para crear el API para el frontend.

   ```bash
   npm run build
   ```
