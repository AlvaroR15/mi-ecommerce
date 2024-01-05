import { BannerMain } from '../Partials/BannerMain'
import { Card } from '../Partials/Card'
import { LastProducts } from './LastProducts/LastProducts'

export const MainPage = () => {
    return (
        <>
            < BannerMain />
            < LastProducts />
            <h2>Oferta del dia</h2>
            < Card />
         
        </>
    )
}