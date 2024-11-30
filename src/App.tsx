import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { StoreProvider } from './contexts/StoreContext';
import { ProductCard } from './components/ProductCard';
import { AdminPanel } from './components/AdminPanel';
import { useStore } from './contexts/StoreContext';
import { ShoppingBag, Settings } from 'lucide-react';

function ProductList() {
  const { products } = useStore();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                <span className="font-semibold text-xl">ShopGram</span>
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                to="/admin"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Settings className="h-5 w-5" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <StoreProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Layout>
      </StoreProvider>
    </Router>
  );
}

export default App;