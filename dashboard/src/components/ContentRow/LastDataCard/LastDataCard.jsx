function Card(props) {
    const {
        title = ""
    } = props;
    
    return(
        
        <div className="col-lg-6 mb-4">
          <div className="transition-all ease-in card bg-white hover:shadow-xl hover:shadow-slate-200 mb-4">
            <div className="card-header py-3">
              <h5 className="m-0 font-bold text-gray-900 text-end">{title}</h5>
            </div>
            <div className="card-body">
              { props.children }
            </div>
          </div>
        </div>
    )
}

export default Card;