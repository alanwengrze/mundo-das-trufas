
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full mx-auto px-4 py-6 md:py-12 md:max-w-7xl">
      {children}
    </div>
  );
}
