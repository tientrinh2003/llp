// app/components/Header.tsx
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-8 px-4 sm:px-16 bg-background">
      <div className="hidden md:block">
        <Image
          src="/products/ff5ceac5ad34970be379ea07a3142f5d0ae3e34b.gif"
          alt="Security Camera"
          width={286}
          height={329}
          className="object-contain scale-x-[-1]"
          unoptimized={true}
          priority={true}
        />
      </div>

      <div className="flex flex-col items-center">
<div className="text-[94px] font-bold text-primary tracking-wider font-stencil">
  llp
</div>

        <p className="text-muted-foreground mt-2 text-center">
          Tiên phong phân phối thiết bị công nghệ
        </p>
      </div>

      <div className="hidden md:block">
        <Image
          src="/products/ff5ceac5ad34970be379ea07a3142f5d0ae3e34b.gif"
          alt="Security Camera"
          width={286}
          height={329}
          unoptimized={true}
          priority={true}
        />
      </div>
    </header>
  );
};

export default Header;
