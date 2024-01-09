import './filterProducts.css'
import { Card } from './Card/Card'

export const FilterProducts = () => {
    const categories = ['Remeras','Camperas','Buzos','Calzado','Accesorio']
    return (
        <section className="filter-products">
            <h2>Categorias</h2>
            <div className="filter-genre">
                <div className="man box">
                    <h4>Hombre</h4>
                    {
                        categories.map(category => < Card category={category} key={category} />)
                    }
                </div>
                <div className="woman box">
                    <h4>Mujer</h4>
                    {
                        categories.map(category => < Card category={category} key={category} />)
                    }
                </div>
            </div>
        </section>
    )
}