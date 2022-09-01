import { RoundedButton } from "../../components/RoundedButton";
import { usePagination, DOTS } from "../../utils/usePagination";

export function Pagination({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) return null;

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="flex flex-row gap-4 flex-wrap">
      <li key={"<"}>
        <RoundedButton
          onClick={onPrevious}
          disabled={currentPage === 1}
          text={"<"}
        />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li key={DOTS + pageNumber}>
              <RoundedButton text={"..."} />
            </li>
          );
        }

        return (
          <li key={pageNumber}>
            <RoundedButton
              isActive={pageNumber === currentPage}
              onClick={() => {
                onPageChange(pageNumber);
              }}
              text={pageNumber}
            />
          </li>
        );
      })}
      <li key={">"}>
        <RoundedButton
          onClick={onNext}
          text={">"}
          disabled={currentPage === lastPage}
        />
      </li>
    </ul>
  );
}
