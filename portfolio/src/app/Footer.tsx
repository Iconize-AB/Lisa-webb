export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16 px-8 py-4">
      <div className="max-w-[1400px] mx-auto flex mb-16 justify-between items-center text-sm">
        <div>CONTACT US</div>
        <div className="flex gap-8">
          <div>
            <span>EMAIL: </span>
            <a href="mailto:hey@lisastudios.se" className="hover:underline">
              hey@lisastudios.se
            </a>
          </div>
          <div>
            <span>PHONE: </span>
            <a href="tel:+4686586864" className="hover:underline">
              +4686586864
            </a>
          </div>
          <div>
            <span>OFFICE: </span>
            <span>NORR MÄLARSTRAND 12</span>
          </div>
          <div>
            <span>SOCIAL: </span>
            <a href="#" className="hover:underline">
              Lisastudios
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 