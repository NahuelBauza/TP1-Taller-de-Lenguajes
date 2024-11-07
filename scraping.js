const puppeteer = require('puppeteer');
const XLSX = require('xlsx');

// Función para scraping de Teclab
async function scrapeTeclab(page) {
  await page.goto('https://teclab.edu.ar/tecnologia-y-desarrollo/lenguajes-de-programacion-mas-usados/', { waitUntil: 'domcontentloaded' });

  const teclabData = await page.evaluate(() => {
    const listElement = document.querySelector('.wp-block-list');
    if (!listElement) return [];

    const items = Array.from(listElement.querySelectorAll('li'));
    return items.slice(0, 10).map((item, index) => {
      const language = item.innerText.trim();
      return { language, rank: index + 1 };
    });
  });

  return teclabData;
}

// Función para scraping de Talently
async function scrapeTalently(page) {
  await page.goto('https://talently.tech/blog/los-10-lenguajes-de-programacion-mas-utilizados/', { waitUntil: 'domcontentloaded' });

  const talentlyData = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('h2, h3'));
    return items.slice(4, 14).map((item, index) => {
      const language = item.innerText.split('.')[1]?.trim();
      return { language, rank: index + 1 };
    });
  });

  return talentlyData;
}

// Función para scraping de Lowcode
async function scrapeLowcode(page) {
  await page.goto('https://lowcode.com.ar/los-10-lenguajes-de-programacion-mas-usados-actualmente/', { waitUntil: 'domcontentloaded' });

  const lowcodeData = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.wp-block-heading'));
    return items.slice(0, 10).map((item, index) => {
      let language = item.innerText.trim();
      
      // Eliminar los dos primeros caracteres
      language = language.slice(2).trim();
      
      return { language, rank: index + 1 };
    });
  });

  return lowcodeData;
}

// Función principal para ejecutar el scraping y exportar a Excel
async function runScraping() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const teclabData = await scrapeTeclab(page);
  const talentlyData = await scrapeTalently(page);
  const lowcodeData = await scrapeLowcode(page);

  await browser.close();

  // Crear un array para almacenar los datos combinados
  const allLanguages = [];

  for (let i = 0; i < 10; i++) {
    allLanguages.push({
      teclabRank: i + 1,
      teclabLanguage: teclabData[i]?.language || 'N/A',
      talentlyRank: i + 1,
      talentlyLanguage: talentlyData[i]?.language || 'N/A',
      lowcodeRank: i + 1,
      lowcodeLanguage: lowcodeData[i]?.language || 'N/A',
    });
  }

  // Crear un archivo Excel
  const workbook = XLSX.utils.book_new();
  const rows = [
    ["Ranking Teclab", "Lenguaje Teclab", "Ranking Talently", "Lenguaje Talently", "Ranking Lowcode", "Lenguaje Lowcode"],
    ...allLanguages.map(item => [
      item.teclabRank,
      item.teclabLanguage,
      item.talentlyRank,
      item.talentlyLanguage,
      item.lowcodeRank,
      item.lowcodeLanguage
    ])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Top 10 Rankings");

  // Guardar el archivo Excel
  XLSX.writeFile(workbook, "RankingLenguajes2024.xlsx");
}

// Ejecutar el scraping
runScraping().catch(console.error);
