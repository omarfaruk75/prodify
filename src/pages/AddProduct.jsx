import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosCommon from "../hooks/useAxiosCommon";
import useAxiosSecure from "../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosCommon = useAxiosCommon();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosCommon.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const menuItem = {
                productName: data.name,
                category: data.category,
                price: parseFloat(data.price),
                description: data.description,
                ratings: data.ratings,
                brand: data.brand,
                creationDateTime: new Date().toLocaleString(),
                image: res.data.data.display_url
            }
            // 
            const menuRes = await axiosSecure.post('/product', menuItem);
            console.log(menuRes.data)
            if (menuRes.data.insertedId) {
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the Products.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    };

    return (
        <div className="w-[80%] mx-auto">

            <div >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Product Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Product Name"
                            {...register('name', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Descriptions</span>
                        </label>
                        <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Product Category*</span>
                            </label>
                            <select defaultValue="default" {...register('category', { required: true })}
                                className="select select-bordered w-full capitalize">
                                <option disabled value="default">Select Product category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Watch">Watch</option>
                                <option value="Audio">Audio</option>
                                <option value="Dress">Dress</option>
                            </select>
                        </div>

                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text"> Product Price*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text"> Product Ratings*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Ratings"
                                {...register('ratings', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Product Brand*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Product Brand"
                                {...register('brand', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>

                    </div>


                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn w-full">
                        Add Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;