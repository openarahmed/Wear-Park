// ShopByCategory.tsx
import Image from "next/image";
import Link from "next/link";

export const categories = [
  {
    name: "T-Shirt",
    items: 10,
    image:
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/T26252s4.jpg?im=Resize,width=750", // Replace with actual image URL
  },
  {
    name: "Drop Sholder",
    items: 5,
    image: "https://axarobd.com/wp-content/uploads/2024/09/DSCF1915.webp", // Replace with actual image URL
  },
  {
    name: "trouser",
    items: 8,
    image:
      "https://artisanclick.com/wp-content/uploads/2023/12/MG_2979-scaled.jpg", // Replace with actual image URL
  },
  {
    name: "Underwear",
    items: 15,
    image:
      "https://www.pakaapparel.com/cdn/shop/files/Mens_Underwear_Blue_1_1500x.webp?v=1743024282", // Replace with actual image URL
  },
  {
    name: "Pollo-Shirt",
    items: 7,
    image: "https://beagiver.com.ph/wp-content/uploads/2019/07/polo_collar.jpg", // Replace with actual image URL
  },
  {
    name: "Pants",
    items: 12,
    image:
      "https://hunterselement.com.au/cdn/shop/files/FieldPants-Main-MajorBrown-RGB_f8e1017e-f2c1-4ede-9c6b-467987eaa439.jpg?v=1707950472", // Replace with actual image URL
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
          Discover our wide range of clothing categories.
        </p>
        <div className="flex justify-between items-center gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
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
