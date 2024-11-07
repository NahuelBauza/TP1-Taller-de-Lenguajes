# Proyecto de Web Scraping para Rankings de Lenguajes mas usados de Programación

## Descripción
Este proyecto consiste en un script de web scraping desarrollado en Node.js utilizando la biblioteca Puppeteer para la extracción de información de tres fuentes web. El objetivo es obtener un ranking actualizado de los 10 lenguajes de programación más utilizados según diferentes fuentes y consolidar la información en un archivo Excel.

### Sitios web de origen:
- **Teclab**: Proporciona un listado de los lenguajes de programación más usados.
- **Fuente**: https://teclab.edu.ar/tecnologia-y-desarrollo/lenguajes-de-programacion-mas-usados/#1

- **Talently**: Fuente de información sobre los lenguajes de programación más utilizados en la actualidad.
- **Fuente**: https://talently.tech/blog/los-10-lenguajes-de-programacion-mas-utilizados/

- **Lowcode**: Lista los lenguajes de programación más usados en la actualidad.
- **Fuente**: https://lowcode.com.ar/los-10-lenguajes-de-programacion-mas-usados-actualmente/

## Tecnologías Utilizadas
- **Node.js**: Entorno de ejecución de JavaScript en el lado del servidor.
- **Puppeteer**: Biblioteca que permite automatizar la navegación web para extraer datos.
- **XLSX**: Biblioteca para la manipulación de archivos Excel.

## Configuración y Ejecución
### Requisitos previos
- Node.js (v14 o superior)
- npm (v6 o superior)
Ejecutar el script con el siguiente comando en la terminal ```bash: node scraping.js

### Instalación de dependencias 
Ejecuta el siguiente comando para instalar las dependencias necesarias:
``bash: npm install puppeteer xlsx

### Ejecución del Script
Ejecuta el siguiente comando para correr el script de scraping:
``bash: node scraping.js 