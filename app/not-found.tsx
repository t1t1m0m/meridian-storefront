import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-editorial flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-7xl font-extrabold tracking-tightest text-cobalt">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-ink">
        This page slipped out of focus
      </h1>
      <p className="mt-3 max-w-sm text-muted">
        The frame or page you were looking for isn’t here. Let’s get you back to
        something in view.
      </p>
      <Link href="/products" className="btn-primary mt-8">
        Browse the collection
      </Link>
    </div>
  );
}
