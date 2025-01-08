import { StatsGrid } from './stats/StatsGrid';
import { StatsHeader } from './stats/StatsHeader';
import { useStats } from '@/hooks/stats/useStats';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

const Statistics = () => {
  const { stats, isLoading, currentPage, setCurrentPage, totalPages } = useStats();

  return (
    <section id="statistics" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-cosmic"></div>
      <div className="container mx-auto px-4 relative">
        <StatsHeader />
        <StatsGrid stats={stats} />
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
};

export default Statistics;