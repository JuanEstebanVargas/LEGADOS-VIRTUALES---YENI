import type { Artwork } from '../../data/content'

type ArtworkCardProps = {
  artwork: Artwork
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <article className="info-card artwork-card">
      <div className={`artwork-media ${artwork.variant}`} aria-hidden="true" />
      <div className="artwork-body">
        <span className="card-kicker">{artwork.period}</span>
        <h3>{artwork.title}</h3>
        <p>{artwork.artist}</p>
        <div className="artwork-meta">
          <span>{artwork.year}</span>
          <span>{artwork.medium}</span>
        </div>
      </div>
    </article>
  )
}