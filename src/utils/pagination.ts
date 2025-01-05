export const ITEMS_PER_PAGE = 6;

export const getPaginatedData = <T>(items: T[], currentPage: number): T[] => {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  return items.slice(startIndex, endIndex);
};

export const getTotalPages = (totalItems: number): number => {
  return Math.ceil(totalItems / ITEMS_PER_PAGE);
};