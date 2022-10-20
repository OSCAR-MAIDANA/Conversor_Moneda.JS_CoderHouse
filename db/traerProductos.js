
export const traerProductos = async () => {
    const response = await fetch('./db/productos.json')
    const data = await response.json()
    return data

}