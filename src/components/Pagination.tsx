// src/pages/admin/users/components/Pagination.tsx
import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  const prev = () => onPageChange(Math.max(1, page - 1));
  const next = () => onPageChange(Math.min(totalPages, page + 1));

  const pagesToShow = (() => {
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let p = start; p <= end; p++) pages.push(p);
    return pages;
  })();

  return (
    <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
      <Button onClick={prev} disabled={page === 1} size="sm">
        <span className="hidden sm:inline">Prev</span>
        <span className="sm:hidden">&lt;</span>
      </Button>
      {page > 3 && (
        <button
          className="px-2 sm:px-3 py-1 rounded-md text-sm"
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      )}
      {page > 4 && <span className="px-1 sm:px-2">…</span>}

      {pagesToShow.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-2 sm:px-3 py-1 rounded-md text-sm ${
            p === page ? "bg-primary text-white" : "border"
          }`}
        >
          {p}
        </button>
      ))}

      {page < totalPages - 3 && <span className="px-1 sm:px-2">…</span>}
      {page < totalPages - 2 && (
        <button
          className="px-2 sm:px-3 py-1 rounded-md text-sm"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      )}

      <Button onClick={next} disabled={page === totalPages} size="sm">
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">&gt;</span>
      </Button>
    </div>
  );
}
