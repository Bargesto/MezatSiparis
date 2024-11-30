import { useStore } from '../contexts/StoreContext';
import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';

export function AdminPanel() {
  const { products, orders } = useStore();

  const exportOrders = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const productOrders = orders
      .filter(order => order.productId === productId)
      .map(order => ({
        'Instagram Username': order.instagramUsername,
        'Ürün': product.name,
        'Beden': order.size,
        'Fiyat': `${product.price.toFixed(2)} TL`,
        'Tarih': new Date(order.timestamp).toLocaleString(),
      }));

    const ws = XLSX.utils.json_to_sheet(productOrders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    XLSX.writeFile(wb, `${product.name}-orders.xlsx`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      
      <div className="space-y-4">
        {products.map(product => {
          const productOrders = orders.filter(order => order.productId === product.id);
          
          return (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.price.toFixed(2)} TL</p>
                </div>
                <button
                  onClick={() => exportOrders(product.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Download size={20} />
                  Export Orders
                </button>
              </div>
              
              <p className="mt-2 text-gray-600">
                Total Orders: {productOrders.length}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}