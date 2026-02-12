import { Page, TestInfo } from '@playwright/test'

export class PageApi {

  private readonly page: Page
  private readonly testInfo: TestInfo

  constructor(page: Page, testInfo: TestInfo) {
    this.page = page
    this.testInfo = testInfo
  }

  async validarCodigoRespuesta(url: string, expectedCode: number) {

    const response = await this.page.goto(url)
    const realCode = response?.status()

    let resultado = ''

    if (realCode === expectedCode) {

      resultado = `
      ✅ OK: Código de respuesta correcto
      Esperado : ${expectedCode}
      Recibido : ${realCode}
      `

    } else {

      resultado = `
      ⚠️ ALERTA: Código diferente al esperado
      Esperado : ${expectedCode}
      Recibido : ${realCode}
      `
    }

    // Adjuntar al HTML report
    await this.testInfo.attach('Validacion Codigo Respuesta', {
      body: resultado,
      contentType: 'text/plain'
    })

  }
}
