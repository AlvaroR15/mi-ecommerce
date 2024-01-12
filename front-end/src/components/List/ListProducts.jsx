import { Card } from "../Partials/Card"
import './listProducts.css'

export const ListProducts = () => {
    return (
        <section className="list-products">
            <h2>Catálogo</h2>
            <div className="container-list-products">
                < Card />
                < Card />
                < Card />
                < Card />
                < Card />
            </div>
        </section>
    )
}
