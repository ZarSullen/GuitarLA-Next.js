/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Para configurar cosas, aqui agregamos la opcion de que nos de formatos avif
  images: {
    formats: ["image/avif", "image/webp"],
    // Dominio para poder poner fotos de cloudinary
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
