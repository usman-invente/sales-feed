import { Link } from 'react-router-dom'
import './About.css'

const principles = [
  {
    number: '01',
    title: 'Good things go around',
    description:
      'A lamp moves to a new living room. A favorite chair gets another chapter. Keeping good things in use just feels right.',
    symbol: '↗',
  },
  {
    number: '02',
    title: 'Neighbors make it better',
    description:
      'Every listing connects real people nearby. A small hello can turn a good find into a really good day.',
    symbol: '⌁',
  },
  {
    number: '03',
    title: 'Your own kind of good',
    description:
      'No perfect homes or matching sets required. Just the pieces, people, and little discoveries that feel like you.',
    symbol: '✳',
  },
]

export default function About() {
  return (
    <div className="story-page">
      <section className="story-hero">
        <div className="story-hero-copy">
          <span className="story-eyebrow"><span>✳</span> A NOTE FROM GOODKIND</span>
          <h1>Good things<br />deserve <em>another</em><br />good thing.</h1>
          <p className="story-hero-intro">
            We believe the best things in life aren’t always brand new. They’re
            found, loved, passed on, and loved all over again.
          </p>
          <a className="story-scroll-link" href="#our-why">
            A little more about us <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="story-hero-photo">
          <img
            src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1400&q=85"
            alt="A warm, lived-in home filled with carefully chosen furniture and plants"
          />
          <div className="story-photo-note">
            <span>GOOD THINGS</span>
            <span>FIND GOOD HOMES <i>♡</i></span>
          </div>
          <span className="story-photo-caption">More life for the things we love.</span>
        </div>
        <div className="story-hero-bottom">
          <span>LESS STUFF, MORE STORY</span>
          <span className="story-hero-flower" aria-hidden="true">✳</span>
          <span>MADE FOR THE NEXT CHAPTER</span>
        </div>
      </section>

      <section className="story-intro" id="our-why">
        <div className="story-intro-label">
          <span className="story-eyebrow">THE SHORT VERSION</span>
          <span className="story-intro-aside">A marketplace with a little more heart.</span>
        </div>
        <div className="story-intro-copy">
          <h2>We’re here for the<br />things <em>worth keeping.</em></h2>
          <p>
            Goodkind started with a simple thought: there’s already so much
            lovely stuff in the world. The chair with the perfect worn-in
            cushions. The bowl you reach for every morning. The jacket that
            makes an ordinary day feel a little more you.
          </p>
          <p>
            Those things deserve to keep going. So we made a place for people
            nearby to pass them along, find their next favorite, and make a
            little more room for good in the everyday.
          </p>
        </div>
      </section>

      <section className="story-beliefs" aria-labelledby="beliefs-title">
        <div className="story-beliefs-heading">
          <span className="story-eyebrow">WHAT WE BELIEVE</span>
          <h2 id="beliefs-title">Small things. <em>Good energy.</em></h2>
          <p>A few ideas we come back to, every day.</p>
        </div>
        <div className="story-principles">
          {principles.map((principle) => (
            <article className="story-principle" key={principle.number}>
              <div className="principle-topline">
                <span>{principle.number}</span>
                <span className="principle-symbol" aria-hidden="true">{principle.symbol}</span>
              </div>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="story-community">
        <div className="story-community-photo">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85"
            alt="A thoughtful, plant-filled neighborhood workspace"
            loading="lazy"
          />
          <span className="community-stamp" aria-hidden="true">NEARBY<br />IS A NICE<br />PLACE TO BE <i>✳</i></span>
        </div>
        <div className="story-community-copy">
          <span className="story-eyebrow">GOODKIND, CLOSE BY</span>
          <h2>Good finds.<br /><em>Good neighbors.</em></h2>
          <p>
            The best part isn’t just finding the thing. It’s finding it from
            someone down the street, sharing a quick hello, and knowing that
            something you loved is about to be loved again.
          </p>
          <p className="community-signoff">That’s the kind of marketplace we want to be part of.</p>
          <Link className="story-button" to="/">
            Find your next good thing <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="story-last-word">
        <span className="story-last-flower" aria-hidden="true">✳</span>
        <p>Here’s to the things we find, the things we pass on,<br />and all the good in between.</p>
        <span className="story-last-signoff">With good feelings, <b>goodkind</b></span>
      </section>
    </div>
  )
}
