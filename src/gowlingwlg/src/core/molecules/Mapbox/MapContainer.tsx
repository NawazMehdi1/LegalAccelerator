type MapContainerProps = {
  children: React.ReactNode;
};

const MapContainer = ({ children }: MapContainerProps) => {
  return <div className="w-full aspect-[13/8]">{children}</div>;
};

export default MapContainer;
