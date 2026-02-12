import {Locator, Page} from "@playwright/test"

export class MapLogin{

    readonly menuIngresarPortal: Locator
    readonly menuIngPortalPersona: Locator
    readonly txtUsuario: Locator
    readonly btnSiguiente: Locator
    readonly txtContrasena: Locator
    readonly msnError: Locator

    constructor(page:Page)
    {
        this.menuIngresarPortal=page.locator('.dropdown-portal-login')
        this.menuIngPortalPersona=page.getByRole('link',{name:'Ingresar al Portal Personas'})
        this.txtUsuario=page.getByRole('textbox',{name:'Usuario'})
        this.btnSiguiente=page.getByRole('button',{name:'Siguiente'})
        this.txtContrasena=page.getByRole('textbox',{name:'Contraseña'})
        this.msnError=page.locator('#password-error-usernamethenpassword')
    }
}