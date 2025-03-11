// ShopByCategory.tsx
import Image from "next/image";
import Link from "next/link";

export const categories = [
  {
    name: "Jeans",
    items: 2,
    image:
      "https://www.gerberchildrenswear.com/cdn/shop/files/Gerber_1-pack-baby-neutral-blue-straight-fit-jeans-evyr-d_image_1_1800x1800.jpg?v=1721762942",
  },
  {
    name: "Coats",
    items: 1,
    image: "https://pngimg.com/d/coat_PNG28.png",
  },
  {
    name: "Tees",
    items: 1,
    image:
      "https://www.byrobertjames.com/cdn/shop/products/NAVYSLUBMAXFRONT_ea257a48-a62b-4f84-8624-ae156489cdff.jpg?v=1615489503",
  },
  {
    name: "Knits",
    items: 7,
    image: "https://i.ebayimg.com/images/g/e~8AAOSwM8hmHj9q/s-l400.jpg",
  },
  {
    name: "Blazers",
    items: 2,
    image:
      "https://5.imimg.com/data5/RP/GQ/MY-38642310/men-s-party-wear-blazer.jpg",
  },
  {
    name: "Blouses",
    items: 5,
    image:
      "https://png.pngtree.com/png-vector/20240719/ourmid/pngtree-d-pin-by-ravitha-balki-on-work-blouse-embroidery-neck-designs-png-image_13146525.png",
  },
];

const ShopByCategory = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          SHOP BY CATEGORY
        </h2>
        <p className="text-gray-600 mb-8">
          Discover the latest ready-to-wear dresses.
        </p>
        <div className="flex justify-between items-center gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={`/${category.name.toLowerCase()}`}>
              <div className="text-center group">
                <div className="overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    className="object-cover mb-4 w-full h-[40px] md:h-[100px] lg:h-[200px] transition-transform duration-300 group-hover:scale-105"
                    width={500}
                    height={500}
                  />
                </div>
                <h3 className="text-sm md:text-lg font-semibold">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
