import { APIRequestContext, TestInfo } from '@playwright/test'

export class ApiService {

  private readonly request: APIRequestContext
  private readonly testInfo: TestInfo

  constructor(request: APIRequestContext, testInfo: TestInfo) {
    this.request = request
    this.testInfo = testInfo
  }

  async validarCodigoRespuesta(url: string, expectedCode: number) {

    const response = await this.request.get(url)

    const realCode = response.status()

    let resultado = ''

    if (realCode === expectedCode) {

      resultado = `
      ✅ OK: Código de respuesta correcto
      Esperado : ${expectedCode}
      Recibido : ${realCode}
      API: ${url}
      `

    } else {

      resultado = `
      ⚠️ ALERTA: Código diferente al esperado
      Esperado : ${expectedCode}
      Recibido : ${realCode}
      `
    }

    await this.testInfo.attach('Validacion Codigo API', {
      body: resultado,
      contentType: 'text/plain'
    })

  }
}
