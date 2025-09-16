import Link from "next/link";

export default function Logo() {
  return (
    <Link aria-label="home" href="/" className="inline-block">
      <div
        className="ml-logo"
        style={{
          width: 132,
          height: 40,
          backgroundImage:
            'url("https://cdn.millionluxury.com/image-resizing?image=https://maustorageprod.blob.core.windows.net/spinfileuat/Spin/Data/Estate/IMG/ceb693ad6b7643fc8c1be271d6a9c068.svg?v=740")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'left center',
          filter: 'invert(1)',
        }}
      />
    </Link>
  );
}
