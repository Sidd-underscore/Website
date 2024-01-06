export function Photo({ className, photoData }) {
  return (
    <img
      className={"rounded-lg " + className}
      key={photoData.name}
      src={photoData.path}
      alt={photoData.name}
      title={photoData.name}
    />
  );
}
