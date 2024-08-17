
const ProductCard = ({ product }) => {
    const { productName, image, description, brand, price, category, ratings, creationDateTime } = product;

    return (
        <div className="my-2">
            <div className="flex flex-col bg-base-100  shadow-2xl py-6 h-[400px]">
                <figure className="px-10  flex-1 ">
                    <img
                        src={image}
                        alt="Shoes"
                        className="rounded-xl h-[200px] w-full" />
                </figure>
                <div className="px-10 py-4 flex-1">
                    <h2 className="card-title"> {productName}</h2>
                    <p className="">Description: {description?.substring(0, 40)}</p>
                    <p className="flex"><span className="flex-1">Price: {price} </span> <span>Category: {category}</span></p>
                    <p className="flex"><span className="flex-1">Rating: {ratings} </span> <span>Brand: {brand}</span></p>
                    <p>Time: {creationDateTime}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;