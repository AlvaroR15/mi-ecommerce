import './App.css'
import { MainPage } from './components/Main/MainPage';
import { Header } from './components/Partials/Header/Header'
import { Footer } from './components/Partials/Footer/Footer'
import './components/Partials/partials.css'
import { FilterProducts } from './components/Main/FilterProducts/FilterProducts';
import { BannerMain } from './components/Partials/BannerMain';

function App() {

   return (
      <>
      < Header />
         <main>
            < MainPage />
            < FilterProducts />
            < BannerMain />
            {/* < Detail price={39800} name='Zapatillas Adidas' description='Zapatillas blancas adidas que son para vos ahre jeje.' talle={40} /> */}
         </main>
      < Footer />
      </>

        
   );
}

export default App;
