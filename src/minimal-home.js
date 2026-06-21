import { properties } from './data/sampleProperties'

const navItems = [
  { label: 'ค้นหา', href: '#top' },
  { label: 'รายการ', href: '#บ้านเด่น' },
  { label: 'ภาพ', href: '#แกลเลอรี' },
  { label: 'ข้อมูล', href: '#รายละเอียด' },
  { label: 'ติดต่อ', href: '#ติดต่อ' },
]

const getRandomProperty = () => {
  if (!properties.length) return null
  const index = Math.floor(Math.random() * properties.length)
  return properties[index]
}

const findPropertyCardByTitle = (title) => {
  const cards = Array.from(document.querySelectorAll('.property-card'))
  return cards.find((card) => card.textContent.includes(title))
}

const hydrateHeroShowcase = () => {
  const hero = document.querySelector('.hero-section')
  const heroBg = document.querySelector('.hero-bg')
  const heroCard = document.querySelector('.hero-card')
  const randomProperty = getRandomProperty()

  if (!hero || !heroBg || !heroCard || !randomProperty || hero.dataset.minimalHeroReady === 'true') return

  hero.dataset.minimalHeroReady = 'true'
  hero.classList.add('minimal-random-hero')
  heroBg.style.backgroundImage = `url(${randomProperty.image})`

  heroCard.classList.add('minimal-hero-card')
  heroCard.innerHTML = `
    <span>${randomProperty.status} · ${randomProperty.propertyLabel}</span>
    <h2>${randomProperty.title}</h2>
    <p>${randomProperty.location}</p>
    <strong>${randomProperty.price}</strong>
    <button class="minimal-hero-detail" type="button">ดูข้อมูลทรัพย์นี้</button>
  `

  const detailButton = heroCard.querySelector('.minimal-hero-detail')
  detailButton?.addEventListener('click', () => {
    const card = findPropertyCardByTitle(randomProperty.title)
    if (card) card.click()
    document.querySelector('#รายละเอียด')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

const createBottomNav = () => {
  if (document.querySelector('.floating-bottom-nav')) return

  const nav = document.createElement('nav')
  nav.className = 'floating-bottom-nav'
  nav.setAttribute('aria-label', 'Quick navigation')

  nav.innerHTML = navItems
    .map(
      (item) => `
        <a href="${item.href}">
          <span>${item.label}</span>
        </a>
      `,
    )
    .join('')

  document.body.appendChild(nav)

  const syncNavTone = () => {
    const isScrolled = window.scrollY > 80
    nav.classList.toggle('is-scrolled', isScrolled)
    document.body.classList.toggle('page-is-scrolled', isScrolled)
  }

  syncNavTone()
  window.addEventListener('scroll', syncNavTone, { passive: true })
}

const bootMinimalHome = () => {
  hydrateHeroShowcase()
  createBottomNav()
}

window.addEventListener('load', bootMinimalHome)

const observer = new MutationObserver(() => {
  bootMinimalHome()
})

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
})
