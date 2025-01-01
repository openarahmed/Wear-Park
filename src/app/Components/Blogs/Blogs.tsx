import React from "react";

const blogs = [
  {
    category: "SKIN",
    title: "10 Proven Ways to Increase Skin Brightness",
    date: "10-10-2024",
    comments: "0 Comments",
    image:
      "https://media.gettyimages.com/id/1215951317/photo/2-asian-chinese-female-friends-queuing-in-front-of-cashier-of-clothing-store-for-payment.jpg?s=612x612&w=gi&k=20&c=R0PBzTS_4kbjM0zhGRIHp09N1TOSVhpoqvQ3pMdf5zM=", // Replace with actual image path
  },
  {
    category: "CARE",
    title: "Why Choose SPF for Pore and Acne Care",
    date: "10-09-2024",
    comments: "0 Comments",
    image:
      "https://img.freepik.com/premium-photo/satisfied-customer-client-girl-shopper-buyer-shopaholic-buy-sale-clothes-shopping-mall-store_572828-6425.jpg", // Replace with actual image path
  },
  {
    category: "ULTIMATE",
    title: "Niacinamide: The Ultimate Cheat Sheet",
    date: "10-09-2024",
    comments: "0 Comments",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFD-VTQo7MBn0WeTIawSPINfyEPK4nz8FDJNcebLYud7hbFeo6u9DU4LxIv1p5fkX6YTs&usqp=CAU", // Replace with actual image path
  },
];

const BlogSection = () => {
  return (
    <section className="md:py-16 py-5 bg-white relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">ON THE BLOG</h2>
        <p className="text-gray-600 mt-5">Check Out Our Blog - The Chain</p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-0 px-5 lg:px-20">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="p-6 border border-gray-400  bg-white transition-all duration-300 hover:shadow-lg group relative overflow-hidden md:h-[400px] lg:w-[350px] mx-auto"
          >
            {/* Background Image on Hover */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ backgroundImage: `url(${blog.image})` }}
            ></div>

            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>

            {/* Content */}
            <div className="relative z-20 h-[400px]">
              <p className="text-sm font-semibold uppercase mb-2 group-hover:text-white">
                {blog.category}
              </p>
              <h3 className="text-xl font-bold mb-4 group-hover:text-white">
                {blog.title}
              </h3>
              <div className="text-sm text-gray-500 mb-4 group-hover:text-gray-300">
                <span>{blog.date}</span> | <span>{blog.comments}</span>
              </div>
              <div className="absolute bottom-10">
                <button className="ab mt-4 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  More Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center ">
        <button className="px-6 py-3 border border-black text-sm font-semibold rounded-md hover:bg-gray-100">
          CHECK OUT ALL BLOG
        </button>
      </div>
    </section>
  );
};

export default BlogSection;
