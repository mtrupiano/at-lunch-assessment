import BookmarkResting from "@/assets/icons/Bookmark-Simple--Streamline-Phosphor.svg";
import BookmarkSelected from "@/assets/icons/Bookmark-Simple-Fill--Streamline-Phosphor-Fill.svg";

export default function BookmarkButton({
  enabled,
  handleClick,
}: {
  enabled: boolean;
  handleClick: () => void;
}) {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleClick();
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:bg-gray-100 active:bg-gray-100 transition-all duration-200 cursor-pointer p-2 rounded-full"
    >
      {enabled ? (
        <BookmarkSelected className="text-theme-blue-800" />
      ) : (
        <BookmarkResting className="text-theme-blue-800" />
      )}
    </button>
  );
}
