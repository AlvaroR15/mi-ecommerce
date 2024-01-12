import './App.css'
import { MainPage } from './components/Main/MainPage';
import { Header } from './components/Partials/Header/Header'
import { Footer } from './components/Partials/Footer/Footer'
import './components/Partials/partials.css'
import { FilterProducts } from './components/Main/FilterProducts/FilterProducts';
import { BannerMain } from './components/Partials/BannerMain';
import { ListProducts } from './components/ListProducts/ListProducts';
import { AuthForm } from './components/Forms/AuthForm/AuthForm';
import { Login } from './components/Forms/AuthForm/Login';
import { Register } from './components/Forms/AuthForm/Register';
import { Detail } from './components/ListProducts/Detail/Detail';
import { Cart } from './components/ListProducts/Cart/Cart';

function App() {

   return (
      <>
      < Header />
         <main>
            {/* < MainPage /> */}
            {/* < FilterProducts /> */}
            {/* < BannerMain /> */}
            {/* < ListProducts /> */}
            < Cart />
            < Cart />
            < Cart />
            < Cart />
            < Cart />
            {/* < Detail price={39800} name='Zapatillas Adidas' description='Zapatillas blancas adidas que son para vos ahre jeje.' talle={40} /> */}
         </main>
      < Footer />
      </>

        
   );
}

export default App;
