import { test,expect } from '@playwright/test'
import { PageLogin } from './PagesObject/PageLogin'
import { PagehomeBCS } from './PagesObject/PagehomeBCS'
import { LimpiarOutput } from './utils/util'
import { PageCuenta } from './PagesObject/PageCuenta'
import { PageApi } from './PagesObject/PageApi'
import { ApiService } from './PagesObject/ApiService'

/**
 * 🔥 Limpia la carpeta UNA SOLA VEZ
 * antes de ejecutar todos los tests
 */
test.beforeAll(() => {
  LimpiarOutput()
})

test('INGRESAR AL PORTAL CLIENTE NO EXISTENTE', async ({ page }, testInfo) => {

  const pageLogin = new PageLogin(page, testInfo)

  await page.goto(process.env.URL!)
  await pageLogin.login(process.env.USERNAME!, process.env.PASSWORD!)
  
})

test('CREAR CUENTA DATOS DE VALIDACION ERRONEOS', async ({ page }, testInfo) => {

  const pagehomeBCS = new PagehomeBCS(page, testInfo)
  const pageCuenta = new PageCuenta(page, testInfo)

  await page.goto(process.env.URL!)
  await pagehomeBCS.aperturaCuenta(process.env.DOCUMENTO!)
  await pageCuenta.cuentaAmiga();
})

test('VALIDACION CODIGO DE RESPUESTA', async ({ page }, testInfo) => {

  const pageApi = new PageApi(page, testInfo)

  await pageApi.validarCodigoRespuesta(
    process.env.URL_API!,
    Number(process.env.CODE)
  )
})

test('VALIDACION CODIGO API SIN UI', async ({ request }, testInfo) => {

  const apiService = new ApiService(request, testInfo)

  await apiService.validarCodigoRespuesta(
    process.env.URL_API!,
    Number(process.env.CODE)
  )

})