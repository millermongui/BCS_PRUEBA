import { Page, TestInfo, expect } from '@playwright/test'
import { MapLogin } from '../MapsObject/MapLogin'
import { step } from '../utils/util'

export class PageLogin {

  private readonly mapLogin: MapLogin
  private readonly page: Page
  private readonly testInfo: TestInfo

  constructor(page: Page, testInfo: TestInfo) {
    this.page = page
    this.testInfo = testInfo
    this.mapLogin = new MapLogin(page)
  }

  async login(username: string, password: string) {

    // 1️⃣ Click menú portal
    await step(this.page, this.testInfo, 'IngresarPortal',
      async () => {
        await this.mapLogin.menuIngresarPortal.click()
      },
      this.mapLogin.menuIngresarPortal
    )

    // 2️⃣ Esperar nueva pestaña
    const [portalPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.mapLogin.menuIngPortalPersona.click()
    ])

    await portalPage.waitForLoadState('domcontentloaded')

    const portalMapLogin = new MapLogin(portalPage)

    // 3️⃣ Escribir usuario simulando humano
    await step(portalPage, this.testInfo, 'Usuario',
      async () => {

        await expect(portalMapLogin.txtUsuario).toBeVisible({ timeout: 10000 })

        await portalMapLogin.txtUsuario.click()

        // 🔥 SIMULA ESCRITURA REAL
        await portalMapLogin.txtUsuario.pressSequentially(username, { delay: 100 })

      },
      portalMapLogin.txtUsuario
    )

    // 4️⃣ Esperar que botón se active dinámicamente
    await step(portalPage, this.testInfo, 'BotonSiguiente',
      async () => {

        await expect(portalMapLogin.btnSiguiente).toBeVisible({ timeout: 10000 })

        await portalPage.waitForFunction(() => {
          const btn = document.querySelector('[data-role="usernamethenpassword-username__next"]')
          return btn && !btn.hasAttribute('disabled')
        })

        await portalMapLogin.btnSiguiente.click()

      },
      portalMapLogin.btnSiguiente
    )

    // 5️⃣ Validar contraseña
    await step(portalPage, this.testInfo, 'ValidarCampoContrasena',
      async () => {
        await expect(portalMapLogin.txtContrasena).toBeVisible({ timeout: 10000 })
      },
      portalMapLogin.txtContrasena
    )

    // 6️⃣ Escribir contraseña
    await step(portalPage, this.testInfo, 'IngresarContrasena',
      async () => {
        await portalMapLogin.txtContrasena.click()
        await portalMapLogin.txtContrasena.pressSequentially(password, { delay: 100 })
      },
      portalMapLogin.txtContrasena
    )

    await step(portalPage, this.testInfo, 'ValidarMensajeErrorContrasena',
  async () => {

    await expect(portalMapLogin.msnError).toBeVisible({ timeout: 10000 })

    await expect(portalMapLogin.msnError)
      .toHaveText('Datos incorrectos. Verifique la longitud de su contraseña.')

  },
  portalMapLogin.msnError
)

  }
}
