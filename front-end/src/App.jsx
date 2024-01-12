import './App.css'
import { MainPage } from './components/Main/MainPage';
import { Header } from './components/Partials/Header/Header'
import { Footer } from './components/Partials/Footer/Footer'
import './components/Partials/partials.css'
import { FilterProducts } from './components/Main/FilterProducts/FilterProducts';
import { BannerMain } from './components/Partials/BannerMain';
import { ListProducts } from './components/List/ListProducts';
import { AuthForm } from './components/Forms/AuthForm/AuthForm';
import { Login } from './components/Forms/AuthForm/Login';
import { Register } from './components/Forms/AuthForm/Register';

function App() {

   return (
      <>
      < Header />
         <main>
            < MainPage />
            < FilterProducts />
            < BannerMain />
            < ListProducts />
         </main>
      < Footer />
      </>

        
   );
}

export default App;
