import { getInfo } from "../../services/generalService"
import React, { Component } from "react"
import Card from "./DataSummaryCard/DataSummaryCard"


class DataSummary extends Component {
    constructor(){
        super()
        this.state = {
            listado:[]
        }
    }
    async componentDidMount(){

        const response = await getInfo();
        this.setState({listado: response})
    }
    render(){
      return (
        <div className="row flex justify-content-center">
          {
            Array.isArray(this.state.listado.info) && this.state.listado.info.map((card, i) => <Card key={i + card.titulo} titulo={card.titulo} cifra={card.total} icono={card.icono} />)
          }
        </div>
      )
    }
}

export default DataSummary;