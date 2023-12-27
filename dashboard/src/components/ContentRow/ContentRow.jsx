import React,{ Component } from 'react';
import Card from './LastDataCard/LastDataCard';
import { getInfo } from '../../services/generalService';

class ContentRow extends Component  {
  constructor(){
    super()
    this.state = {
      listado: [],
      lastProduct: {},
      lastUser: {}
    }
  }

  async componentDidMount() {
    const response = await getInfo();
    this.setState({
      listado:response,
      lastProduct: response.lastProduct,
      lastUser: response.lastUser
    });
  }

  render() {
    const { lastProduct, lastUser } = this.state;
  return (
    <div className="row">
      <Card title={"Último producto registrado"}>

        <div className="text-center">
          <img className="img-fluid px-3 px-sm-4 mb-6 w-50 mx-auto" style={{ width: '40rem' }} src={lastProduct.imagen} alt={lastProduct.nombreProd} />
        </div>
        <div className='flex flex-column'>
          <h3 className='text-center font-bold text-gray-900'>{lastProduct.nombreProd}</h3>
          <h4 className='text-center'>${lastProduct.precio}</h4>
         {/*  <a className="mx-5 my-2 p-2 
                        rounded rounded-xl
                        bg-gray-900 shadow shadow-md
                        text-center text-white hover:no-underline
                        transition-all ease-in"
            target="_blank" rel="nofollow" href="/"
          >Ver todos los productos</a> */}
        </div>

      </Card>

      <Card title={"Último usuario registrado"}>

        <div className="text-center">
          <img className="img-fluid px-3 px-sm-4 mb-6 w-50 mx-auto rounded-circle" style={{ width: '40rem' }} src={lastUser.imagen} alt={lastUser.fullname} />
        </div>

        <div className='flex flex-column'>
          <h3 className='text-center font-bold text-gray-900'>{lastUser.fullname}</h3>
          <h4 className='text-center'>{lastUser.email}</h4>
        </div>
      </Card>

    </div>
  )
        }
}

export default ContentRow;