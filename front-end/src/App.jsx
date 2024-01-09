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
         </main>
      < Footer />
      </>

        
   );
}

export default App;
