import Image from "next/image";
import Link from "next/link";
import { FaEye, FaHeart, FaStar } from "react-icons/fa";
import { FaRightLeft } from "react-icons/fa6";

const products = [
  {
    name: "Deep Leather Blouse",
    base: "Women's Collection",
    price: "$280.00",
    salePrice: "On sale from $280.00",
    rating: 4.5,
    image:
      "https://oval-square.com/cdn/shop/files/20389-7016_13_800x.jpg?v=1723646356",
    isOnSale: true,
  },
  {
    name: "Deep Leather Blouse",
    base: "Summer Collection",
    price: "$305.00",
    rating: 4,
    image:
      "https://oval-square.com/cdn/shop/files/20389-6009_13_1600x.jpg?v=1723646324",
    isOnSale: false,
  },
  {
    name: "Deep Leather Blouse",
    base: "Leather Collection",
    price: "$305.00",
    rating: 3.5,
    image:
      "https://oval-square.com/cdn/shop/files/20389-6009_15_800x.jpg?v=1723646324",
    isOnSale: false,
  },
  {
    name: "Lila LS Blouse",
    base: "Exclusive Collection",
    price: "$89.00",
    rating: 5,
    image:
      "https://cdhstudio.com/cdn/shop/files/22_cd653f6a-fb42-4cd5-adf0-0ff5f8a402ff.webp?v=1723535950&width=1200",
    isOnSale: false,
  },
];

const BestCollaborations = () => {
  return (
    <section className=" px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-start">
          Best of collaborations
        </h2>
        <p className="text-gray-600 mb-8 text-start">
          We partner with various organizations in our areas that support
          creative
        </p>
        <div className="grid justify-end pr-5 text-xl font-semibold">
          <button className="">View More</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="group relative p-4 bg-white rounded-md">
              <div className="relative overflow-hidden">
                {/* Black overlay with opacity */}
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10"></div>
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 rounded-md h-[300px] md:h-full mx-auto"
                  width={500}
                  height={750}
                />
                {product.isOnSale && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-20">
                    Sale -8%
                  </span>
                )}
                {/* Social Media Icons */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <Link href="https://facebook.com">
                    <FaHeart className="w-5 h-5 text-white" />
                  </Link>
                  <Link href="https://instagram.com">
                    <FaEye className="w-5 h-5 text-white" />
                  </Link>
                  <Link href="https://instagram.com">
                    <FaRightLeft className="w-5 h-5 text-white" />
                  </Link>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-sm text-gray-500 font-medium">
                  {product.base}
                </h4>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex justify-center items-center mt-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(product.rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  {product.isOnSale ? product.salePrice : product.price}
                </p>
              </div>
              {/* Add to Cart Button */}
              <div className="absolute bottom-40 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button className="w-[80%] bg-white text-black px-6 py-2 text-sm font-semibold border-t border-gray-200">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestCollaborations;
