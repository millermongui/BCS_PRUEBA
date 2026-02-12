import {Locator, Page, } from "@playwright/test"

export class MaphomeBCS{

    readonly linkAbrirCuenta: Locator
    readonly cbxTipodocumento: Locator
    readonly listTipoDocumento: Locator
    readonly cbxTerminosyCondiciones: Locator
    readonly txtNumDocumento: Locator
    readonly cbxTratamientoDatos: Locator
    readonly btnAbrirCuenta: Locator

    constructor(page:Page)
    {
        this.linkAbrirCuenta =page.getByRole('link',{name:'Abrir Cuentamiga'})
        this.cbxTipodocumento = page.getByRole('combobox', { name: 'Tipo de documento' })
        this.listTipoDocumento=page.locator('li[data-value="CC"]')
        this.txtNumDocumento = page.getByRole('spinbutton', { name: 'Número de documento' })
        this.cbxTerminosyCondiciones = page.getByRole('checkbox', { name: 'Acepta términos y condiciones' })
        this.cbxTratamientoDatos = page.getByRole('checkbox', { name: 'Acepta tratamiento de datos' })
        this.btnAbrirCuenta = page.getByTestId('buttonLabel-testid')
    }
}