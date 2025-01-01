import React from "react";
import {
  FaShippingFast,
  FaHeadset,
  FaLock,
  FaPaperPlane,
} from "react-icons/fa";

const InfoSection = () => {
  const infoItems = [
    {
      icon: <FaShippingFast size={30} />,
      title: "FREE SHIPPING",
      description:
        "Free worldwide shipping and returns - customs and duties taxes included.",
    },
    {
      icon: <FaHeadset size={30} />,
      title: "CUSTOMER SERVICE",
      description:
        "We are available from Monday to Friday to answer your questions.",
    },
    {
      icon: <FaLock size={30} />,
      title: "SECURE PAYMENT",
      description: "Your payment information is processed securely.",
    },
    {
      icon: <FaPaperPlane size={30} />,
      title: "CONTACT US",
      description:
        "Need to contact us? Just send us an e-mail at info@yourstore.com.",
    },
  ];

  return (
    <section className="md:py-10 py-5 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 text-center">
        {infoItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-gray-800 mb-4">{item.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoSection;
