import AllProducts from "../components/AllProducts";
import Categories from "../components/Categories";


const Home = () => {

    return (
        <div >
            <div className="mt-12">
                <h2 className="text-2xl">All Products</h2>
                <AllProducts />
            </div>

        </div>
    );
};

export default Home;