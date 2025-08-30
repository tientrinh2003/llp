import Image from "next/image";

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-16 bg-background py-6 md:py-0">
      {/* Left Image */}
      <div className="hidden md:block">
        <Image
          src="/products/ff5ceac5ad34970be379ea07a3142f5d0ae3e34b.gif"
          alt="Security Camera"
          width={180}
          height={220}
          className="object-contain scale-x-[-1]"
          unoptimized={true}
          priority={true}
        />
      </div>

      {/* Center Logo & Slogan */}
      <div className="flex flex-col items-center flex-1">
        <div className="text-[48px] sm:text-[94px] font-bold text-primary tracking-wider font-stencil text-center">
          llp
        </div>
        <p className="text-muted-foreground mt-2 text-center text-base sm:text-lg">
          Tiên phong phân phối thiết bị công nghệ
        </p>
      </div>

      {/* Right Image */}
      <div className="hidden md:block">
        <Image
          src="/products/ff5ceac5ad34970be379ea07a3142f5d0ae3e34b.gif"
          alt="Security Camera"
          width={180}
          height={220}
          className="object-contain"
          unoptimized={true}
          priority={true}
        />
      </div>
    </header>
  );
};

export default Header;