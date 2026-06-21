import { useEffect, useMemo, useState } from 'react'
import { featuredProperties, properties, propertyTypes } from './data/properties.js'

const SITE_URL = 'https://luxury-house-website-orcin.vercel.app'

const contact = {
  brand: 'Frank Creative / AlphaLab',
  name: 'แฟรงค์ เจตน์สฤษฎิ์',
  phone: '080-899-8155',
  email: 'am2.production29@gmail.com',
  lineUrl: 'https://line.me/R/ti/p/@alphalab.official.th',
  portfolio: 'https://www.frankcreative.site/',
}

const listingModes = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'sale', label: 'ซื้อ' },
  { value: 'rent', label: 'เช่า' },
]

const topLinks = [
  { href: '#home', label: 'หน้าแรก' },
  { href: '#search', label: 'ค้นหา' },
  { href: '#collections', label: 'แนะนำ' },
  { href: '#contact', label: 'ติดต่อ' },
]

const aliases = [
  { match: ['บ้านขาย', 'ซื้อบ้าน', 'บ้านพร้อมอยู่'], terms: ['บ้าน', 'บ้านเดี่ยว', 'ทาวน์โฮม', 'ขาย', 'ซื้อ'] },
  { match: ['บ้านเช่า', 'เช่าบ้าน'], terms: ['บ้าน', 'บ้านเดี่ยว', 'ทาวน์โฮม', 'เช่า', 'ให้เช่า'] },
  { match: ['ที่ดิน', 'ที่เปล่า'], terms: ['ที่ดิน', 'ที่ดินเปล่า', 'ขาย'] },
  { match: ['อาคารพาณิชย์', 'ตึกแถว'], terms: ['อาคารพาณิชย์', 'อาคาร', 'ธุรกิจ'] },
  { match: ['โกดัง', 'โรงงาน'], terms: ['โกดัง', 'โรงงาน', 'คลังสินค้า'] },
  { match: ['ออฟฟิศ', 'สำนักงาน'], terms: ['ออฟฟิศ', 'สำนักงาน'] },
  { match: ['คอนโด'], terms: ['คอนโด'] },
  { match: ['พูลวิลล่า', 'วิลล่า'], terms: ['พูลวิลล่า', 'วิลล่า', 'เขาใหญ่', 'ภูเก็ต', 'หัวหิน'] },
  { match: ['โคราช', 'นครราชสีมา'], terms: ['โคราช', 'นครราชสีมา', 'ตัวเมืองนครราชสีมา', 'ถนนมิตรภาพ', 'เซฟวัน'] },
  { match: ['ใกล้ฉัน'], terms: ['โคราช', 'นครราชสีมา', 'กรุงเทพ', 'เขาใหญ่'] },
]

const normalize = (value) => String(value ?? '').toLowerCase().replace(/\s+/g, '')
const toRad = (value) => (value * Math.PI) / 180

const getDistanceKm = (from, to) => {
  const radius = 6371
  const dLat = toRad(to.lat - from.lat)
  const dLng = toRad(to.lng - from.lng)
  const lat1 = toRad(from.lat)
  const lat2 = toRad(to.lat)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return Number((radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1))
}

const buildTerms = (keyword) => {
  const raw = keyword.trim().toLowerCase()
  const compact = normalize(raw)
  if (!compact) return []
  const terms = new Set([raw, compact, ...raw.split(/[\s,]+/).filter(Boolean)])
  aliases.forEach((alias) => {
    if (alias.match.some((word) => compact.includes(normalize(word)))) {
      alias.terms.forEach((term) => terms.add(term))
    }
  })
  return Array.from(terms).map(normalize).filter((term) => term.length > 1)
}

const formatDate = () => new Intl.DateTimeFormat('th-TH', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}).format(new Date())

function TopBar({ theme, onToggleTheme, scrolled }) {
  return (
    <header className={`topBar ${scrolled ? 'scrolled' : ''}`}>
      <a className="brandMark" href="/">
        <span>AE</span>
        <div>
          <strong>ALPHA ESTATE</strong>
          <small>Premium property</small>
        </div>
      </a>
      <nav className="topNav" aria-label="Primary">
        {topLinks.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>
      <div className="topActions">
        <button className="themeToggle" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? 'โหมดสว่าง' : 'โหมดมืด'}
        </button>
        <a className="navCta" href={`tel:${contact.phone}`}>โทร</a>
      </div>
    </header>
  )
}

function PropertyMiniCard({ property, onOpen }) {
  return (
    <article className="miniProperty">
      <button className="miniPoster" onClick={() => onOpen(property)} aria-label={`ดูข้อมูล ${property.title}`}>
        <img src={property.image} alt={`${property.propertyLabel} ${property.location}`} loading="lazy" />
        <span>{property.listingLabel}</span>
      </button>
      <div className="miniInfo">
        <small>{property.propertyLabel} · {property.location}</small>
        <h3>{property.title}</h3>
        <strong>{property.priceText}</strong>
        <p>{property.bedrooms ? `${property.bedrooms} ห้องนอน · ` : ''}{property.landSize}</p>
      </div>
    </article>
  )
}

function PropertyCarousel({ title, subtitle, items, onOpen }) {
  if (!items.length) return null
  return (
    <section className="carouselSection" aria-label={title}>
      <div className="rowHead">
        <div>
          <p className="eyebrow">PROPERTY SELECTION</p>
          <h2>{title}</h2>
        </div>
        <span>{subtitle}</span>
      </div>
      <div className="netflixRow">
        {items.map((property) => (
          <PropertyMiniCard key={property.id} property={property} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}

function PropertyModal({ property, onClose }) {
  if (!property) return null

  const openFull = () => {
    window.open(`/property/${property.slug}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="modalBackdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <article className="propertyModal" onClick={(event) => event.stopPropagation()}>
        <button className="closeBtn" onClick={onClose} aria-label="ปิด">×</button>
        <div className="modalImage">
          <img src={property.image} alt={property.title} loading="lazy" />
        </div>
        <div className="modalContent">
          <span className="pill">{property.listingLabel}</span>
          <h2>{property.title}</h2>
          <p>{property.location} · {property.propertyLabel}</p>
          <strong>{property.priceText}</strong>
          <div className="modalFacts">
            <span>{property.landSize}</span>
            <span>{property.usableArea}</span>
            <span>{property.status}</span>
            {property.parking > 0 && <span>จอดรถ {property.parking} คัน</span>}
          </div>
          <p>{property.summary}</p>
          <div className="modalActions">
            <button className="primaryDark" onClick={openFull}>ดูข้อมูลเต็มในหน้าต่างใหม่</button>
            <a href={contact.lineUrl} target="_blank" rel="noreferrer">สอบถาม LINE</a>
            <a href={`tel:${contact.phone}`}>โทร {contact.phone}</a>
          </div>
        </div>
      </article>
    </div>
  )
}

function PropertyDetailPage({ property, theme, toggleTheme, scrolled }) {
  const [activeImage, setActiveImage] = useState(property?.image)

  useEffect(() => {
    if (!property) return
    document.title = `${property.title} | ${property.priceText} | ALPHA ESTATE`
    const description = `${property.listingLabel} ${property.propertyLabel} ${property.location} ราคา ${property.priceText} พร้อมข้อมูลครบและช่องทางติดต่อ`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
  }, [property])

  if (!property) {
    return (
      <main className="detailPage notFound">
        <TopBar theme={theme} onToggleTheme={toggleTheme} scrolled={scrolled} />
        <section className="emptyDetail">
          <p className="eyebrow">NOT FOUND</p>
          <h1>ไม่พบข้อมูลทรัพย์นี้</h1>
          <a className="primaryBtn darkText" href="/">กลับหน้าแรก</a>
        </section>
      </main>
    )
  }

  const gallery = property.gallery?.length ? property.gallery : [property.image]

  return (
    <main className="detailPage">
      <TopBar theme={theme} onToggleTheme={toggleTheme} scrolled={scrolled} />
      <section className="detailHero">
        <div className="detailGallery">
          <img className="detailMainImage" src={activeImage || property.image} alt={property.title} loading="eager" />
          <div className="thumbRow">
            {gallery.map((image) => (
              <button key={image} onClick={() => setActiveImage(image)} className={activeImage === image ? 'active' : ''}>
                <img src={image} alt={`${property.title} gallery`} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
        <article className="detailPanel">
          <span className="pill">{property.listingLabel}</span>
          <h1>{property.title}</h1>
          <p>{property.location} · {property.propertyLabel}</p>
          <strong>{property.priceText}</strong>
          <div className="modalFacts">
            <span>{property.landSize}</span>
            <span>{property.usableArea}</span>
            <span>{property.status}</span>
            {property.bedrooms > 0 && <span>{property.bedrooms} ห้องนอน</span>}
            {property.bathrooms > 0 && <span>{property.bathrooms} ห้องน้ำ</span>}
            {property.parking > 0 && <span>จอดรถ {property.parking} คัน</span>}
          </div>
          <p>{property.fullDescription || property.summary}</p>
          <div className="detailContact">
            <a href={contact.lineUrl} target="_blank" rel="noreferrer">ติดต่อ LINE</a>
            <a href={`tel:${contact.phone}`}>โทร {contact.phone}</a>
            <a href={`mailto:${contact.email}`}>อีเมล</a>
          </div>
        </article>
      </section>
      <section className="seoDetailCopy">
        <p className="eyebrow">PROPERTY DETAIL</p>
        <h2>{property.propertyLabel} {property.location} สำหรับ{property.listingLabel}</h2>
        <p>
          รวมข้อมูลสำคัญของทรัพย์ รายละเอียดพื้นที่ ราคา ทำเล รูปภาพ และช่องทางติดต่อ
          เพื่อให้ผู้สนใจตัดสินใจและนัดหมายเข้าชมได้สะดวก
        </p>
      </section>
    </main>
  )
}

function App() {
  const detailSlug = window.location.pathname.startsWith('/property/')
    ? decodeURIComponent(window.location.pathname.replace('/property/', '').replace(/\/$/, ''))
    : null

  const detailProperty = useMemo(
    () => properties.find((property) => property.slug === detailSlug),
    [detailSlug],
  )

  const [theme, setTheme] = useState(() => localStorage.getItem('estate-theme') || 'light')
  const [heroProperty] = useState(() => featuredProperties[Math.floor(Math.random() * featuredProperties.length)] || properties[0])
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [listingMode, setListingMode] = useState('all')
  const [propertyType, setPropertyType] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [userLocation, setUserLocation] = useState(null)
  const [geoStatus, setGeoStatus] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('estate-theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (detailSlug) return
    document.title = 'ALPHA ESTATE | ค้นหาบ้าน ที่ดิน และอสังหาริมทรัพย์ทำเลดี'
  }, [detailSlug])

  const filteredProperties = useMemo(() => {
    const terms = buildTerms(keyword)
    const base = properties
      .map((property) => {
        const distance = userLocation ? getDistanceKm(userLocation, property) : null
        return { ...property, distance }
      })
      .filter((property) => listingMode === 'all' || property.listingType === listingMode)
      .filter((property) => propertyType === 'all' || property.propertyType === propertyType)
      .filter((property) => {
        if (terms.length === 0) return true
        const text = normalize([
          property.title,
          property.location,
          property.propertyLabel,
          property.status,
          property.tags.join(' '),
          property.listingLabel,
          property.summary,
        ].join(' '))
        return terms.some((term) => text.includes(term))
      })
      .sort((a, b) => {
        if (userLocation) return (a.distance ?? 99999) - (b.distance ?? 99999)
        return a.id - b.id
      })

    return base.length > 0 ? base : properties.slice(0, 24)
  }, [keyword, listingMode, propertyType, userLocation])

  const collections = useMemo(() => [
    {
      title: 'ทรัพย์แนะนำ',
      subtitle: 'รายการคัดสรรสำหรับเริ่มดู',
      items: filteredProperties.slice(0, 18),
    },
    {
      title: 'บ้านและทาวน์โฮม',
      subtitle: 'เหมาะสำหรับอยู่อาศัยและครอบครัว',
      items: filteredProperties.filter((item) => ['house', 'townhome'].includes(item.propertyType)).slice(0, 18),
    },
    {
      title: 'ที่ดิน อาคาร และโกดัง',
      subtitle: 'เหมาะสำหรับลงทุนหรือทำธุรกิจ',
      items: filteredProperties.filter((item) => ['land', 'commercial', 'warehouse', 'office'].includes(item.propertyType)).slice(0, 18),
    },
    {
      title: 'รายการให้เช่า',
      subtitle: 'บ้าน คอนโด ออฟฟิศ และโกดังให้เช่า',
      items: filteredProperties.filter((item) => item.listingType === 'rent').slice(0, 18),
    },
  ], [filteredProperties])

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('เบราว์เซอร์นี้ยังไม่รองรับการใช้พิกัด')
      return
    }
    setGeoStatus('กำลังขออนุญาตใช้พิกัด...')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        setGeoStatus('ใช้พิกัดแล้ว ระบบจะเรียงรายการใกล้คุณขึ้นก่อน')
      },
      () => setGeoStatus('ยังไม่ได้รับอนุญาตใช้พิกัด สามารถค้นหาด้วยทำเลแทนได้'),
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  const clearFilters = () => {
    setListingMode('all')
    setPropertyType('all')
    setKeyword('')
  }

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  if (detailSlug) {
    return (
      <PropertyDetailPage
        property={detailProperty}
        theme={theme}
        toggleTheme={toggleTheme}
        scrolled={isScrolled}
      />
    )
  }

  return (
    <main>
      <TopBar theme={theme} onToggleTheme={toggleTheme} scrolled={isScrolled} />

      <section id="home" className="hero" style={{ '--hero-image': `url(${heroProperty.image})` }}>
        <div className="heroOverlay" />
        <div className="heroContent">
          <div className="heroCopy">
            <p className="eyebrow">FEATURED PROPERTY · {formatDate()}</p>
            <h1>คัดสรรอสังหาริมทรัพย์ทำเลดี พร้อมดูรายละเอียดได้ทันที</h1>
            <p className="heroLead">
              เลือกดูบ้าน ที่ดิน คอนโด อาคารพาณิชย์ และทรัพย์เพื่อการลงทุน พร้อมภาพชัด รายละเอียดสำคัญ และช่องทางติดต่อโดยตรง
            </p>
            <div className="heroActions">
              <a href="#search" className="primaryBtn">เริ่มค้นหา</a>
              <button className="ghostBtn" onClick={() => setSelectedProperty(heroProperty)}>ดูทรัพย์แนะนำ</button>
            </div>
          </div>

          <article className="heroCard">
            <span className="pill">{heroProperty.listingLabel}</span>
            <h2>{heroProperty.title}</h2>
            <p>{heroProperty.location} · {heroProperty.propertyLabel}</p>
            <strong>{heroProperty.priceText}</strong>
            <div className="miniFacts">
              <span>{heroProperty.landSize}</span>
              <span>{heroProperty.status}</span>
              <span>{heroProperty.usableArea}</span>
            </div>
            <div className="heroCardActions">
              <button onClick={() => setSelectedProperty(heroProperty)}>ดูข้อมูลสั้น</button>
              <button onClick={() => window.open(`/property/${heroProperty.slug}`, '_blank', 'noopener,noreferrer')} className="subtleBtn">เปิดหน้าเต็ม</button>
            </div>
          </article>
        </div>
      </section>

      <section id="search" className="searchPanel">
        <div className="sectionHead compact">
          <p className="eyebrow">PROPERTY SEARCH</p>
          <h2>ค้นหาอสังหาตามทำเลและประเภทที่ต้องการ</h2>
          <p>เลือกซื้อ เช่า หรือดูทั้งหมด พร้อมกรองประเภททรัพย์และใช้พิกัดเพื่อเรียงรายการใกล้คุณก่อน</p>
        </div>

        <div className="filterGlass">
          <div className="segmented">
            {listingModes.map((mode) => (
              <button key={mode.value} className={listingMode === mode.value ? 'active' : ''} onClick={() => setListingMode(mode.value)}>
                {mode.label}
              </button>
            ))}
          </div>

          <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="ค้นหาทำเล เช่น โคราช เขาใหญ่ โกดังให้เช่า บ้านใกล้ฉัน" />

          <div className="typeChips">
            {propertyTypes.map((type) => (
              <button key={type.value} className={propertyType === type.value ? 'active' : ''} onClick={() => setPropertyType(type.value)}>
                {type.label}
              </button>
            ))}
          </div>

          <div className="filterActions">
            <button onClick={requestLocation} className="locationBtn">ใช้พิกัดของฉัน</button>
            <button onClick={clearFilters} className="clearBtn">ล้างตัวกรอง</button>
            <span>{geoStatus || `พบ ${filteredProperties.length} รายการพร้อมดูรายละเอียด`}</span>
          </div>
        </div>
      </section>

      <section id="collections" className="collectionWrap">
        {collections.map((row) => (
          <PropertyCarousel key={row.title} title={row.title} subtitle={row.subtitle} items={row.items} onOpen={setSelectedProperty} />
        ))}
      </section>

      <section id="contact" className="contactSection">
        <div>
          <p className="eyebrow">CONTACT</p>
          <h2>สอบถามและนัดชมทรัพย์ได้โดยตรง</h2>
          <p>
            เลือกรายการที่สนใจ แล้วติดต่อผ่านโทรศัพท์ LINE หรืออีเมลได้ทันที
            เพื่อรับข้อมูลเพิ่มเติมและนัดหมายเข้าชมทรัพย์
          </p>
        </div>
        <div className="contactCard">
          <strong>{contact.brand}</strong>
          <span>{contact.name}</span>
          <a href={`tel:${contact.phone}`}>โทร {contact.phone}</a>
          <a href={contact.lineUrl} target="_blank" rel="noreferrer">ติดต่อ LINE OA</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.portfolio} target="_blank" rel="noreferrer">ดูผลงาน Frank Creative</a>
        </div>
      </section>

      <nav className={`bottomDock ${isScrolled ? 'scrolled' : ''}`} aria-label="Quick navigation">
        <a href="#search">ค้นหา</a>
        <a href="#collections">ทรัพย์</a>
        <a href="#contact">ติดต่อ</a>
      </nav>

      <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </main>
  )
}

export default App
