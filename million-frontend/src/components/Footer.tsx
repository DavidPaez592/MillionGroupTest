import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import { FaInstagram, FaXTwitter, FaYoutube, FaPinterestP } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-zinc-200 pt-10 pb-4 px-4 md:px-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-0">
        {/* Left: Logo + Address */}
        <div className="flex-1 min-w-[220px] flex flex-col items-start gap-4">
          <Logo />
          <div className="text-sm text-zinc-800 leading-tight">
            237 S Dixie Hwy 4th Flr Suite 465
            <br />
            Coral Gables, FL 33133
          </div>
        </div>
        {/* Center: Socials + Divider */}
        <div className="flex flex-row md:flex-col items-center md:items-end gap-6 md:gap-0 md:relative">
          <div className="flex flex-col gap-4 md:mb-0 md:mr-8">
            <Link
              href="#"
              aria-label="Instagram"
              className="text-zinc-700 hover:text-black text-2xl"
            >
              <FaInstagram />
            </Link>
            <Link
              href="#"
              aria-label="X (Twitter)"
              className="text-zinc-700 hover:text-black text-2xl"
            >
              <FaXTwitter />
            </Link>
            <Link href="#" aria-label="YouTube" className="text-zinc-700 hover:text-black text-2xl">
              <FaYoutube />
            </Link>
            <Link
              href="#"
              aria-label="Pinterest"
              className="text-zinc-700 hover:text-black text-2xl"
            >
              <FaPinterestP />
            </Link>
          </div>
          {/* Vertical divider */}
          <div className="hidden md:block h-32 border-l border-zinc-300 absolute left-full top-0" />
        </div>
        {/* Right: Legal + EHO */}
        <div className="flex-1 min-w-[220px] flex flex-col items-start md:items-end gap-2">
          <Image
            src="/Logo-EHO.svg"
            alt="Equal Housing Opportunity"
            width={60}
            height={40}
            className="mb-2"
          />
          <div className="text-xs text-zinc-700">© Million Realty LLC 2025</div>
          <div className="text-xs text-zinc-500 max-w-xs mb-2 md:text-right">
            Million Realty LLC, doing business as MILLION, is a licensed real estate broker in
            Florida.
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-xs text-zinc-700 underline">
            <Link href="#">ADA Compliance</Link>
            <Link href="#">Legal Disclaimer</Link>
            <Link href="#">Equal Housing Opportunity</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
