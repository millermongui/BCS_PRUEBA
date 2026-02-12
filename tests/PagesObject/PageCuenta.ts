import { Page, TestInfo ,expect} from '@playwright/test'
import { step } from '../utils/util'
import {MapCuentas} from '../MapsObject/MapCuenta'

export class PageCuenta {

  private readonly mapCuentas: MapCuentas
  private readonly page: Page
  private readonly testInfo: TestInfo

  constructor(page: Page, testInfo: TestInfo) {
    this.page = page
    this.testInfo = testInfo
    this.mapCuentas = new MapCuentas(page)
  }

   async cuentaAmiga() {

    await step(this.page, this.testInfo, 'AperturaCuenta',
      async () => {
        await this.mapCuentas.btnContinuar.click()
      },
      this.mapCuentas.btnContinuar
    )

    await step(this.page, this.testInfo, 'AperturaCuenta',
      async () => {
        await this.mapCuentas.btnContinuar.click()
      },
      this.mapCuentas.btnContinuar
    )
   

  }
}