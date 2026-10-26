import Link from 'next/link'

export default function HeroCardList({ heroes }) {
  return (
    <div className="hero-grid">
      {heroes.map((hero) => (
        <Link
          key={hero.id}
          href={`/heroes/detail?id=${hero.id}`}
          className="hero-card"
        >
          {hero.avatar && <img src={hero.avatar} alt={hero.name} />}
          <h3>{hero.name}</h3>
          <p>{hero.alias}</p>
        </Link>
      ))}
    </div>
  )
}
