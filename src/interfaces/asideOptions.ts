export interface AsideOptions {
    label: string; // Nombre de la sección
    type: 'checkbox' | 'radio'; // Tipo de sección (checkbox o radio)
    checked?: boolean // Indica si la opción está seleccionada por defecto
}