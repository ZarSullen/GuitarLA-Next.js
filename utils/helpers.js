export const fechaNueva = fechaNueva => {
    const fecha = new Date(fechaNueva)
    const options = {year: "numeric", month: "long", day: "2-digit"}
    return fecha.toLocaleDateString("es-MX", options)
}