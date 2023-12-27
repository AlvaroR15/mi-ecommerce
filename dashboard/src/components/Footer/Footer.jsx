function Footer() {
    return (
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center">
              <span className="font-black text-lg">&copy; Uptown Urban</span>

              {/* Créditos para pantallas chicas */}
              <div className="sm:hidden block flex flex-column gap-4 justify-center mt-4">
                <a className="text-gray-700" href="https://www.github.com/FacuFarfan">Facundo Farfán</a>
                <a className="text-gray-700" href="https://www.github.com/AlvaroR15">Álvaro Ramos</a>
                <a className="text-gray-700" href="https://www.github.com/Man29Toconas">Emmanuel Toconás</a>
                <a className="text-gray-700" href="https://www.github.com/NT125">Ignacio Torres</a>
              </div>

              {/* Créditos para pantallas medianas en adelante */}
              <div className="hidden sm:flex flex-row gap-6 justify-center mt-4">
                <a className="text-gray-700" href="https://www.github.com/FacuFarfan">Facundo Farfán</a>
                <a className="text-gray-700" href="https://www.github.com/AlvaroR15">Álvaro Ramos</a>
                <a className="text-gray-700" href="https://www.github.com/Man29Toconas">Emmanuel Toconás</a>
                <a className="text-gray-700" href="https://www.github.com/NT125">Ignacio Torres</a>
              </div>
            </div>
          </div>
        </footer>
    )
}

export default Footer;