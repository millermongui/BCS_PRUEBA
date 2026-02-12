import { Page, TestInfo, Locator } from '@playwright/test'
import fs from 'fs'
import path from 'path'

/* =========================================
   TIMESTAMP
========================================= */
function getTimestamp(): string {
  return new Date()
    .toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', '_')
    .replace('Z', '')
}

/* =========================================
   LIMPIAR CARPETA OUTPUT
========================================= */
export function LimpiarOutput(): void {
  const outputDir = process.env.OUTPUTDATA || 'outputData'
  const fullPath = path.resolve(process.cwd(), outputDir)

  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true })
  }

  fs.mkdirSync(fullPath, { recursive: true })
}

/* =========================================
   LIMPIAR TODOS LOS HIGHLIGHTS
========================================= */
async function clearHighlights(page: Page): Promise<void> {
  try {
    await page.evaluate(() => {
      const elements = document.querySelectorAll('[data-playwright-highlight="true"]')
      elements.forEach((el: any) => {
        el.style.outline = ''
        el.style.outlineOffset = ''
        el.removeAttribute('data-playwright-highlight')
      })
    })
  } catch {
    // no romper test
  }
}

/* =========================================
   APLICAR HIGHLIGHT
========================================= */
async function highlightElement(locator: Locator, color = 'green'): Promise<void> {
  try {
    await locator.evaluate((el: any, c: string) => {
      el.setAttribute('data-playwright-highlight', 'true');
      el.style.outline = `4px solid ${c}`;   // usa el color dinámicamente
      el.style.outlineOffset = '2px';
      el.style.transition = 'all 0.2s ease-in-out';
    }, color);
  } catch {
    // no romper si el DOM cambia
  }
}


/* =========================================
   CAPTURA IMAGEN
========================================= */
export async function CapturaImagen(
  page: Page,
  testInfo: TestInfo,
  name: string
): Promise<void> {

  const outputDir = process.env.OUTPUTDATA || 'outputData';
  const testFolder = testInfo.title.replace(/[^a-zA-Z0-9]/g, '_');

  const fullPath = path.resolve(process.cwd(), outputDir, testFolder);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });

  const timestamp = getTimestamp();
  const fileName = `${name}-${timestamp}.png`;
  const filePath = path.join(fullPath, fileName);

  // 🔹 Tomar screenshot
  await page.screenshot({
    path: filePath,
    fullPage: true
  });

  // 🔹 Adjuntar al reporte HTML
  const buffer = fs.readFileSync(filePath);
  await testInfo.attach(name, { body: buffer, contentType: 'image/png' });
}


/* =========================================
   STEP INTELIGENTE
========================================= */
export async function step(
  page: Page,
  testInfo: TestInfo,
  name: string,
  action: () => Promise<void>,
  locator?: Locator
): Promise<void> {
  try {
    // 🔹 Limpiar highlights anteriores
    await clearHighlights(page);

    // 🔹 Aplicar highlight actual en verde (OK)
    if (locator) {
      try {
        await locator.waitFor({ state: 'visible', timeout: 3000 });
        await highlightElement(locator, 'green'); // ✅ verde para OK
        await page.waitForTimeout(300);
      } catch {}
    }

    // 🔹 Ejecutar acción
    await action();

    // 🔹 Captura OK
    await CapturaImagen(page, testInfo, `OK-${name}`);

    // 🔹 Limpiar highlights
    await clearHighlights(page);

  } catch (error) {
    // 🔹 Si hay error, resaltar en rojo
    if (locator) {
      try {
        await highlightElement(locator, 'red'); // ✅ rojo para ERROR
        await page.waitForTimeout(300);
      } catch {}
    }

    // 🔹 Captura ERROR
    await CapturaImagen(page, testInfo, `ERROR-${name}`);
    await clearHighlights(page);
    throw error;  // volver a lanzar el error para que falle el test
  }
}

