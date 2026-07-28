import type { Artwork } from '../../data/content'

type ArtworkCardProps = {
  artwork: Artwork
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const mediaClassName = `artwork-media ${artwork.image ? 'artwork-media-image' : artwork.variant}`

  return (
    <article className="info-card artwork-card">
      <div
        className={mediaClassName}
        aria-hidden="true"
        style={artwork.image ? { backgroundImage: `url(${artwork.image})` } : undefined}
      />
      <div className="artwork-body">
        <span className="card-kicker">{artwork.period}</span>
        <h3>{artwork.title}</h3>
        <p>{artwork.artist}</p>
        <div className="artwork-meta">
          <span>{artwork.year}</span>
          <span>{artwork.medium}</span>
        </div>
        {artwork.href ? (
          <a className="c-card__link" href={artwork.href} target="_blank" rel="noopener noreferrer">
            Ver más información
          </a>
        ) : null}
      </div>
    </article>
  )
}