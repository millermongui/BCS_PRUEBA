import {Locator, Page} from "@playwright/test"

export class MapCuentas {

  readonly imgCarrito: Locator
  readonly rtaproducto: Locator
  readonly rtaPresio: Locator
  readonly btncheckout: Locator
  readonly txtApellido: Locator
  readonly txtCodigoPostal: Locator
  readonly btnContinuar: Locator
  readonly btnFinalizar: Locator
  readonly exitosa: Locator

  constructor(page: Page) {
    
    this.btnContinuar = page.getByRole('button', { name: 'Continuar' })





    this.imgCarrito = page.locator('a.shopping_cart_link')
    this.rtaproducto = page.locator('.inventory_item_name')
    this.rtaPresio = page.locator('.inventory_item_price')

    this.btncheckout = page.getByRole('button', { name: 'Checkout' })
    this.txtApellido = page.getByRole('textbox', { name: 'Last Name' })
    this.txtCodigoPostal = page.getByRole('textbox', { name: 'Zip/Postal Code' })
    
    this.btnFinalizar = page.getByRole('button', { name: 'Finish' })

    this.exitosa = page.getByRole('heading', { name: 'Thank you for your order!' })
  }
}
