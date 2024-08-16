
import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ProductCard from './ProductCard';
import axios from 'axios';

//const Categories = ({ products }) => {
const Categories = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_APP_URL}/products`)
            // const { data } = await axios("http://localhost:5000/products")

            setProducts(data);
        }
        getData();
    }, [])

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [sortDirection, setSortDirection] = useState('asc'); // State for sorting direction

    const brands = [...new Set(products.map(product => product.brand))];
    const categories = [...new Set(products.map(product => product.category))];
    const priceRanges = ['0-50', '51-100', '101-200', '201+'];

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const filteredProducts = products
        .filter(product => {
            const matchBrand = selectedBrand ? capitalize(product.brand) === capitalize(selectedBrand) : true;
            const matchCategory = selectedCategory ? capitalize(product.category) === capitalize(selectedCategory) : true;
            const matchPrice = selectedPriceRange ? (
                selectedPriceRange === '0-50' && product.price <= 50 ||
                selectedPriceRange === '51-100' && product.price > 50 && product.price <= 100 ||
                selectedPriceRange === '101-200' && product.price > 100 && product.price <= 200 ||
                selectedPriceRange === '201+' && product.price > 200
            ) : true;
            return matchBrand && matchCategory && matchPrice;
        })
        .sort((a, b) => {
            return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
        });

    return (
        <Tabs>
            <div className='container mx-auto px-12'>
                <div className='flex items-center justify-center'>
                    <TabList>
                        <Tab>Brand Name</Tab>
                        <Tab>Category Name</Tab>
                        <Tab>Price Range</Tab>
                    </TabList>
                </div>

                <div className="flex justify-end mt-4">
                    <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>

                <TabPanel>
                    <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                        <option value=''>All Brands</option>
                        {brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                    <div className='grid grid-cols-1 gap-4 mt-8 xl:mt-16 shadow-xl md:grid-cols-2 lg:grid-cols-3'>
                        {filteredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </TabPanel>

                <TabPanel>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value=''>All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <div className='grid grid-cols-1 gap-4 mt-8 xl:mt-16 shadow-xl md:grid-cols-2 lg:grid-cols-3'>
                        {filteredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </TabPanel>

                <TabPanel>
                    <select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)}>
                        <option value=''>All Price Ranges</option>
                        {priceRanges.map(range => (
                            <option key={range} value={range}>{range}</option>
                        ))}
                    </select>
                    <div className='grid grid-cols-1 gap-4 mt-8 shadow-xl xl:mt-16 md:grid-cols-2 lg:grid-cols-3'>
                        {filteredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </TabPanel>
            </div>
        </Tabs>
    );
};

export default Categories;
