import React from "react";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image"; // Import Next.js Image component

const Gallery = () => {
  // Array of objects with image URLs and alt texts
  const galleryItems = [
    {
      id: 1,
      src: "https://solink.com/wp-content/uploads/2023/11/how-to-sell-retail-clothing.jpg",
      alt: "Gallery Image 1",
    },
    {
      id: 2,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBwARZpC1OVgQCHh9JbNmL52o4rWFjVwlEw&s",
      alt: "Gallery Image 2",
    },
    {
      id: 3,
      src: "https://cdn.prod.website-files.com/5f846474179977492db36eab/60fe808297533566b64f570f_black%20clothes.jpeg",
      alt: "Gallery Image 3",
    },
    {
      id: 4,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl8ZTOzUOeNMycgRoatfWpZWB-1XN0fx0sVA&s",
      alt: "Gallery Image 4",
    },
    {
      id: 5,
      src: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2024-06/240610-beauty-awards-2024-face-makeup-winners-vl-social-74fb90.jpg",
      alt: "Gallery Image 5",
    },
    {
      id: 6,
      src: "https://ae01.alicdn.com/kf/H2af4c7307e0d4f6d9882bd83ab54127ag.jpg",
      alt: "Gallery Image 6",
    },
    {
      id: 7,
      src: "https://n-img1.junaroad.com/uiproducts/21359414/pri_175_p-1719509450.jpg",
      alt: "Gallery Image 7",
    },
    {
      id: 8,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ--7eTkCla3p9u645Ne_Y_rK8kOfqt_BiMkw&s",
      alt: "Gallery Image 8",
    },
  ];

  return (
    <main className="py-5 md:py-16 max-w-7xl mx-auto hidden">
      <div className="text-center uppercase md:pb-10">
        <h1 className="text-gray-300 pb-5">Follow us on</h1>
        <h1 className="text-3xl md:text-5xl font-bold">#instagram</h1>
      </div>
      <div className="gallery-container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {/* Map through the galleryItems array to create the cards */}
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="relative group overflow-hidden cursor-pointer md:h-[300px]"
          >
            {/* Image Card using Next.js Image component */}
            <div className="w-full h-full">
              <Image
                src={item.src} // Image source from the object
                alt={item.alt} // Alt text from the object
                width={300} // Specify width
                height={300} // Specify height
                objectFit="cover" // Ensures the image covers the area without distortion
                className="transition-transform duration-300 h-[150px] md:h-[300px]"
              />
            </div>

            {/* Overlay and Instagram Icon */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300">
              <div className="absolute inset-0 flex justify-center items-center">
                <FaInstagram className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Gallery;
