export const ListLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="h-48 bg-background-secondary animate-pulse rounded-2xl border border-gray-800"
        />
      ))}
    </div>
  );
};
