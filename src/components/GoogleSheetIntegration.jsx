import React, { useState, useEffect, useMemo } from 'react';
import { fetchSheetData } from '../utils/googleSheetsService';
import { useCart } from '../context/CartContext';
import './GoogleSheetIntegration.css';

const GoogleSheetIntegration = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('name');
  const { addToCart, getItemQuantity } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, sortOption]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchSheetData();
      setProducts(data);
    } catch (err) {
      setError('Error al cargar productos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let result = [...products];
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term) ||
        (product.category && product.category.toLowerCase().includes(term))
      );
    }
    
    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      result = result.filter(product => 
        product.category && product.category === selectedCategory
      );
    }
    
    // Ordenar productos
    switch(sortOption) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'stock':
        result.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  };

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      addToCart(product, 1);
    }
  };

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const cats = products
      .map(product => product.category)
      .filter((cat, index, arr) => cat && arr.indexOf(cat) === index);
    return ['all', ...cats];
  }, [products]);

  // Calcular estadísticas
  const stats = useMemo(() => {
    const total = products.length;
    const available = products.filter(p => p.stock > 5).length;
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const outOfStock = products.filter(p => p.stock <= 0).length;
    
    return { total, available, lowStock, outOfStock };
  }, [products]);

  if (loading) {
    return (
      <div className="products-section">
        <h2>🛒 Nuestros Productos</h2>
        <div className="loading">
          <p>Cargando productos orgánicos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-section">
        <h2>🛒 Nuestros Productos</h2>
        <div className="error">
          <p>{error}</p>
          <button onClick={loadProducts} className="retry-btn">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-section">
      <h2>🛒 Nuestros Productos</h2>
      
      {/* Estadísticas */}
      <div className="products-stats">
        <div className="stat-item">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.available}</span>
          <span className="stat-label">Disponibles</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.lowStock}</span>
          <span className="stat-label">Poco Stock</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.outOfStock}</span>
          <span className="stat-label">Agotados</span>
        </div>
      </div>
      
      {/* Controles de filtrado y ordenamiento */}
      <div className="products-controls">
        <div className="search-and-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-controls">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Todas las categorías' : cat}
                </option>
              ))}
            </select>
            
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="name">Ordenar por nombre</option>
              <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="stock">Más stock primero</option>
          </select>
        </div>
      </div>
    </div>
      
      {/* Lista de productos */}
      <div className="products-grid">
        {filteredProducts.map((product) => {
          const quantityInCart = getItemQuantity(product.id);
          const isOutOfStock = product.stock <= 0;
          const isLowStock = product.stock <= 5 && product.stock > 0;

          return (
            <div key={product.id} className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
              <div className="product-image">
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = './placeholder-product.svg';
                  }}
                />
                {isOutOfStock && <div className="stock-overlay">Agotado</div>}
                {isLowStock && <div className="low-stock-badge">¡Últimas unidades!</div>}
                {product.category && (
                  <div className="category-badge">{product.category}</div>
                )}
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-details">
                  <span className="product-price">${product.price.toLocaleString()}</span>
                  <span className={`product-stock ${isLowStock ? 'low' : ''}`}>
                    Stock: {product.stock}
                  </span>
                </div>
                
                <div className="product-actions">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    disabled={isOutOfStock}
                    className={`add-to-cart-btn ${isOutOfStock ? 'disabled' : ''}`}
                  >
                    {isOutOfStock ? 'Agotado' : 'Agregar al Carrito'}
                  </button>
                  
                  {quantityInCart > 0 && (
                    <span className="cart-quantity">
                      En carrito: {quantityInCart}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>No se encontraron productos con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  );
};

export default GoogleSheetIntegration;