import { createBrowserRouter as Router } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';


const routes = Router([
    {
        path: '/',
        element: <HomeScreen />,
    },
    {
        path: '/product/:id',
        element: <ProductScreen />,
    }
])


export default routes;