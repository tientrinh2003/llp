"use client";

import Image from "next/image";

export default function ProjectsPage() {
  return (
    <>
      <main className="px-6 md:px-12 py-12 bg-white">
        {/* Phần text + hình */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text bên trái */}
          <div className="max-w-[700px] h-[550px] border border-gray-300 p-12 rounded-md shadow-md bg-white flex flex-col justify-between">
            <h1 className="text-[32px] font-bold mb-4 text-center md:text-left">
              Chúng tôi tin rằng <br />
              <span className="text-[#F8E05C]">giá trị cốt lõi</span>{" "}
              của một sản phẩm không chỉ nằm ở{" "}
              <span className="text-[#F8E05C]">công nghệ</span>, mà còn ở{" "}
              <span className="text-[#F8E05C]">dịch vụ đi kèm</span>.
            </h1>

            <p className="text-gray-700 leading-relaxed text-center md:text-left">
              Chính nhờ vào sự kết hợp giữa chất lượng của sản phẩm và dịch vụ uy tín,
              chúng tôi đã nhận được sự tin tưởng và là lựa chọn bền vững của nhiều đối tác,
              từ các doanh nghiệp lớn cho đến những khách hàng cá nhân.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-6 justify-center md:justify-start">
              <span className="text-[#F8E05C] text-[35px]">★</span>
              <span className="text-[#F8E05C] text-[35px]">★</span>
              <span className="text-[#F8E05C] text-[35px]">★</span>
            </div>

            {/* Form Feedback */}
            <div className="mt-6 flex gap-2">
              <input
                type="text"
                placeholder="Viết trải nghiệm và cảm nhận của bạn..."
                className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-medium px-6 py-2 rounded-full transition-colors">
                Gửi
              </button>
            </div>
          </div>

          {/* Hình bên phải */}
          <div className="flex justify-center">
            <Image
              src="/images/handshake.jpg"
              alt="Bắt tay hợp tác"
              width={700}
              height={500}
              className="rounded-lg shadow-md object-cover"
            />
          </div>
        </div>
      </main>

      {/* Section doanh nghiệp tin dùng (full width, tách riêng khỏi main) */}
      <TrustedSection />
    </>
  );
}

// Component TrustedSection
function TrustedSection() {
  return (
    <section
      className="relative w-screen bg-gray-800 text-white pt-24 pb-20 mt-2"
      style={{
        clipPath: "polygon(0 5%, 50% 15%, 100% 5%, 100% 95%, 50% 95%, 0 95%)",
      }}
    >
      <h2 className="text-center text-2xl font-bold mb-8">
        Được tin dùng bởi các doanh nghiệp
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 px-55">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg w-[200px] h-[150px] shadow-md flex items-center justify-center"
          >
            <img src="/images/rex.png" alt="rex" className="max-h-12" />
          </div>
        ))}
      </div>
    </section>
  );
}