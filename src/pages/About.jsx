const About = () => {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="relative">
        {/* Fondo decorativo visible siempre (para testear) */}
        <div className="absolute right-0 top-0 w-[50%] h-full z-0 mt-16">
          <div className="w-[300%] h-full bg-[rgba(240,240,255,0.6)] rounded-t-[150px]"></div>
        </div>

        {/* Contenido */}
        <section className="relative z-10 pt-40 w-5/6">
          <h2 className="text-3xl font-semibold text-primary">
            Acerca de Datos Abiertos
          </h2>
          <p className="text-gray-600 mt-6">
            Un equipo multidisciplinario de expertos en datos, tecnología y
            políticas públicas respalda este portal, con el objetivo de impulsar
            la innovación y garantizar el acceso abierto a la información.
          </p>

          <h2 className="mt-12 text-lg font-semibold text-black">
            Sobre nosotros
          </h2>
          <p className="text-gray-600">
            Te damos la bienvenida al Portal de Datos Abiertos de la
            Municipalidad de Quilmes, una plataforma orientada a promover la
            transparencia, la innovación y el aprovechamiento de los datos
            públicos para el beneficio de la comunidad. Nuestro propósito es
            ofrecer acceso libre y sin costo a datos abiertos, fomentando su uso
            para investigaciones, desarrollos tecnológicos y la toma de
            decisiones fundamentadas. Este portal ha sido diseñado para
            facilitar la conexión entre instituciones y usuarios, promoviendo el
            acceso y la reutilización de datos de manera segura y ética.
          </p>
        </section>
      </div>
    </div>
  )
}

export default About
