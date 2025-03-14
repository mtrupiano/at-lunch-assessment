import MapIcon from "@/assets/icons/Map--Streamline-Heroicons-Outline.svg";
import ListIcon from "@/assets/icons/List-Bullet--Streamline-Heroicons-Outline.svg";

export default function ToggleMapListViewButton({
  isShowingMap,
  handleClick,
}: {
  isShowingMap: boolean;
  handleClick: () => void;
}) {
  return (
    <button
      type="button"
      className="sm:hidden h-[48px] w-[117px] bg-theme-blue-800 hover:bg-theme-blue-900 transition duration-200 rounded-[24px] text-white cursor-pointer absolute left-1/2 bottom-[24px] transform -translate-x-1/2 -translate-y-1/2 focus:ring-2 focus:ring-gray-400"
      onClick={handleClick}
    >
      <div className="flex justify-center space-x-2">
        {isShowingMap ? (
          <>
            <ListIcon fill="white" />
            <span className="font-bold text-white">List</span>
          </>
        ) : (
          <>
            <MapIcon fill="none" stroke="white" />
            <span className="font-bold text-white">Map</span>
          </>
        )}
      </div>
    </button>
  );
}
