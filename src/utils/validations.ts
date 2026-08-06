export const validateEmail = (email: string): boolean => {
    // Expresión regular básica para validar formato de email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const validatePhone = (phone: string): boolean => {
    /**
   * Expresión regular:
   * ^\+            → debe comenzar con "+"
   * [0-9]{1,3}     → código de país (1 a 3 dígitos)
   * \s?            → espacio opcional
   * [0-9]{1,2}     → código de área (ej. 9 en Chile)
   * \s?            → espacio opcional
   * [0-9]{6,10}$   → número principal (6 a 10 dígitos)
   */
    const regex = /^\+[0-9]{1,3}\s?[0-9]{1,2}\s?[0-9]{6,10}$/;
    return regex.test(phone);
}