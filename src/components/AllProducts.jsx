
// export default AllProducts;
import { useEffect, useState } from "react";
import { axiosCommon } from "../hooks/useAxiosCommon";
import ProductCard from "./ProductCard";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [itemPerpage, setItemPerpage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const [searchText, setSearchText] = useState('');
    const [sort, setSort] = useState('');
    const [count, setCount] = useState(0);

    // Fetch products based on the current page and items per page
    useEffect(() => {
        const getData = async () => {
            const { data } = await axiosCommon(`${import.meta.env.VITE_APP_URL}/products-page?page=${currentPage}&size=${itemPerpage}&filter=${filter}&sort=${sort}&search=${search}`);
            setProducts(data);
        }
        getData();
    }, [currentPage, filter, search, sort, itemPerpage]);

    // Fetch the total count of products once
    useEffect(() => {
        const getCount = async () => {
            const { data } = await axiosCommon(`${import.meta.env.VITE_APP_URL}/products-count?filter=${filter}&search=${search}`);
            setCount(data.count);
        }
        getCount();
    }, [filter, search]);

    // Calculate the number of pages
    const numberOfPages = Math.ceil(count / itemPerpage);
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1);

    // Handle pagination button click
    const handlePaginationButton = (value) => {
        setCurrentPage(value);
    }
    const handleReset = () => {
        setFilter('');
        setSort('');
        setSearchText('')
        setSearch('')

    }
    const handleSearch = e => {
        e.preventDefault();
        const text = e.target.search.value;
        console.log(text);
        setSearch(searchText);
    }
    return (
        <div>
            {/* Other UI elements */}


            <div>
                <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
                    <div>
                        <select
                            onChange={e => setFilter(e.target.value)}
                            value={filter}
                            name='category'
                            id='category'

                            className='border p-4 rounded-lg'
                        >
                            <option value=''>Filter By Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Storage">Storage</option>
                            <option value="Audio">Audio</option>
                            <option value="Wearables">Wearables</option>
                        </select>
                    </div>

                    <form onSubmit={handleSearch}>
                        <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                            <input
                                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                                type='text'
                                name='search'
                                onChange={(e) => setSearchText(e.target.value)}
                                value={searchText}
                                placeholder='Enter Job Title'
                                aria-label='Enter Job Title'
                            />

                            <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                                Search
                            </button>
                        </div>
                    </form>
                    <div>
                        <select
                            onChange={e => {
                                setSort(e.target.value)
                                currentPage(1)
                            }}
                            value={sort}
                            name='sort'
                            id='sort'
                            className='border p-4 rounded-md'
                        >
                            <option value=''>Sort By Deadline</option>
                            <option value='dsc'>Descending Order</option>
                            <option value='asc'>Ascending Order</option>
                        </select>
                    </div>
                    <button onClick={handleReset} className='btn'>Reset</button>
                </div>
                {/* <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {/* {jobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))} */}</div>
            <div className='grid grid-cols-1 gap-4 mt-8 shadow-xl xl:mt-16 md:grid-cols-2 lg:grid-cols-3'>
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {/* Pagination Section */}
            <div className='flex justify-center mt-12'>
                <button
                    onClick={() => handlePaginationButton(currentPage - 1)}
                    // onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'>
                    <div className='flex items-center -mx-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M7 16l-4-4m0 0l4-4m-4 4h18'
                            />
                        </svg>

                        <span className='mx-1'>previous</span>
                    </div>
                </button>

                {pages.map(btnNum => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}
                        key={btnNum}
                        className={`px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline ${currentPage === btnNum ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}

                <button
                    // onClick={() => setCurrentPage(prev => Math.min(prev + 1, numberOfPages))}
                    onClick={() => handlePaginationButton(currentPage + 1)}
                    disabled={currentPage === numberOfPages}
                    className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
                    <div className='flex items-center -mx-1'>
                        <span className='mx-1'>Next</span>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default AllProducts;
