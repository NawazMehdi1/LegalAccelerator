import WorldMap from 'core/atoms/Icons/WorldMap';

const LoadingPanel = () => {
  return (
    <div className="flex justify-center items-center animate-pulse h-full py-28 bg-gray-200">
      <WorldMap className="w-24" />
    </div>
  );
};

export default LoadingPanel;
