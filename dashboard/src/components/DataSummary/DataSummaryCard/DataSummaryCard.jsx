function Card(props) {

    {/* Declarando valores por defecto (en caso de no pasar valores por props) */ }
    const {
        titulo = "Datos",
        cifra = 0,
        icono = "fas fa-question fa-2x",
    } = props;


    return (
        <div className="col-md-4 mb-4">
            <div className='transition-all ease-in card hover:shadow-xl hover:shadow-slate-200 h-100 py-2'>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className={`text-xs font-weight-bold text-gray-900 text-uppercase mb-1`}>{titulo}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{cifra}</div>
                        </div>
                        <div className="col-auto">
                            <i className={`${icono} text-gray-300`}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;