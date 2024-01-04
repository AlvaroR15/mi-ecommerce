import { BannerMain } from '../Partials/BannerMain'
import { Card } from '../Partials/Card'

export const MainPage = () => {
    return (
        <>
            < BannerMain />
            <section style={{display:'flex', gap: '2rem', flexWrap: 'wrap'}}>
            < Card />
            < Card />
            < Card />
            < Card />
            < Card />
            < Card />
            < Card />
            < Card />
         </section>
        </>
    )
}