import { Page, TestInfo ,expect} from '@playwright/test'
import { MaphomeBCS } from '../MapsObject/MaphomeBCS'
import { step } from '../utils/util'

export class PagehomeBCS {

  private readonly maphomeBCS: MaphomeBCS
  private readonly page: Page
  private readonly testInfo: TestInfo

  constructor(page: Page, testInfo: TestInfo) {
    this.page = page
    this.testInfo = testInfo
    this.maphomeBCS = new MaphomeBCS(page)
  }

   async aperturaCuenta(numerocc: string) {

    await step(this.page, this.testInfo, 'AperturaCuenta',
      async () => {
        await this.maphomeBCS.linkAbrirCuenta.click()
      },
      this.maphomeBCS.linkAbrirCuenta
    )

    await step(this.page, this.testInfo, 'TipoDocumento',
      async () => {
        await this.maphomeBCS.cbxTipodocumento.click()
      },
      this.maphomeBCS.cbxTipodocumento
    )

   await step(this.page, this.testInfo, 'SeleccionarTipoDocumento',
  async () => {

    // 1️⃣ Esperar que el listbox esté visible
    await expect(this.page.getByRole('listbox'))
      .toBeVisible({ timeout: 10000 })

    // 2️⃣ Esperar que la opción del Map exista y esté visible
    await expect(this.maphomeBCS.listTipoDocumento)
      .toBeVisible({ timeout: 10000 })

    // 3️⃣ Click a la opción
    await this.maphomeBCS.listTipoDocumento.click()

  },
  this.maphomeBCS.listTipoDocumento
)

  await step(this.page,this.testInfo,'NumeroDocumento',
      async () => {
        await this.maphomeBCS.txtNumDocumento.fill(numerocc)},this.maphomeBCS.txtNumDocumento
      )

  await expect(this.maphomeBCS.cbxTerminosyCondiciones)
    .toBeVisible({ timeout: 10000 })

  await this.maphomeBCS.cbxTerminosyCondiciones.check()

  await expect(this.maphomeBCS.cbxTerminosyCondiciones)
    .toBeChecked()

  await expect(this.maphomeBCS.cbxTerminosyCondiciones)
    .toBeVisible({ timeout: 10000 })

  await this.maphomeBCS.cbxTratamientoDatos.check()

  await expect(this.maphomeBCS.cbxTratamientoDatos)
    .toBeChecked() 

  await step(this.page, this.testInfo, 'Abrircuenta',
      async () => {
        await this.maphomeBCS.btnAbrirCuenta.click()
      },
      this.maphomeBCS.btnAbrirCuenta
    )

  }
}