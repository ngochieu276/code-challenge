import { Search } from "lucide-react";

export const ListEmpty = () => {
  return (
    <div className="text-center py-20 bg-background-secondary rounded-2xl border border-gray-800 border-dashed">
      <div className="w-16 h-16 bg-background-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
        <Search
          className="text-text-secondary"
          size={32}
        />
      </div>
      <h3 className="text-xl font-bold text-text-primary mb-2">No Resources Found</h3>
      <p className="text-text-secondary max-w-sm mx-auto">
        Try adjusting your search or filters, or create a new resource.
      </p>
    </div>
  );
};
