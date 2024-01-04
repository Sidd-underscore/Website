export function Photo({photoData}) {
    return (
        <img className="rounded-lg" key={photoData.name} src={photoData.path} alt={photoData.name} title={photoData.name} />
    )
}