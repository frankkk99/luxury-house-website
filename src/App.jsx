import { useEffect, useMemo, useRef, useState } from 'react'
import { featuredProperties, properties, propertyTypes } from './data/properties.js'

const contact = {
  brand: 'ALPHA ESTATE',
  creator: 'Frank Creative / AlphaLab',
  phone: '080-899-8155',
  email: 'am2.production29@gmail.com',
  lineUrl: 'https://line.me/R/ti/p/@alphalab.official.th',
  portfolio: 'https://www.frankcreative.site/',
}

const intentOptions = [
  { value: 'sale', label: 'ซื้อ', note: 'ค้นหาบ้าน ที่ดิน หรืออสังหาสำหรับเป็นเจ้าของ' },
  { value: 'rent', label: 'เช่า', note: 'ค้นหาที่พักอาศัย ออฟฟิศ หรือพื้นที่ธุรกิจพร้อมใช้งาน' },
]

const typeOptions = propertyTypes.filter((type) => type.value !== 'all')
const priceOptions = [
  { value: 'all', label: 'ทุกงบ' },
  { value: 'starter', label: 'เริ่มต้น' },
  { value: 'mid', label: 'กลาง' },
  { value: 'premium', label: 'พรีเมียม' },
  { value: 'luxury', label: 'ลักชัวรี' },
]

const normalize = (value) => String(value ?? '').toLowerCase().replace(/\s+/g, '')
const toRad = (value) => (value * Math.PI) / 180

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

const defaultUi = {
  cardWidth: 320,
  cardHeight: 220,
  heroHeight: 88,
  sectionGap: 38,
  topOpacity: 26,
}

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

const loadUi = () => {
  try {
    const saved = localStorage.getItem('estate-flow-ui')
    return saved ? { ...defaultUi, ...JSON.parse(saved) } : defaultUi
  } catch {
    return defaultUi
  }
}

function applyUi(settings) {
  const root = document.documentElement
  root.style.setProperty('--flow-card-width', `${settings.cardWidth}px`)
  root.style.setProperty('--flow-card-img', `${settings.cardHeight}px`)
  root.style.setProperty('--flow-hero-height', `${settings.heroHeight}vh`)
  root.style.setProperty('--flow-section-gap', `${settings.sectionGap}px`)
  root.style.setProperty('--flow-top-opacity', `${settings.topOpacity / 100}`)
}

function priceMatches(property, priceRange) {
  if (priceRange === 'all') return true
  const isRent = property.listingType === 'rent'
  const price = property.price
  if (priceRange === 'starter') return isRent ? price <= 30000 : price <= 3000000
  if (priceRange === 'mid') return isRent ? price > 30000 && price <= 50000 : price > 3000000 && price <= 6000000
  if (priceRange === 'premium') return isRent ? price > 50000 && price <= 80000 : price > 6000000 && price <= 10000000
  if (priceRange === 'luxury') return isRent ? price > 80000 : price > 10000000
  return true
}

function TransparentSearchBar({ query, onQuery, onSearch, theme, onTheme, onBack, currentStep }) {
  const showSearch = currentStep !== 'detail'
  return (
    <header className={`flowTopBar step-${currentStep}`}>
      <button className="brandChip" onClick={() => window.location.assign('/')}>
        <span>AE</span>
        <strong>ALPHA ESTATE</strong>
      </button>
      {showSearch && (
        <form className="topSearch" onSubmit={(event) => { event.preventDefault(); onSearch?.() }}>
          <input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="ค้นหาทำเล บ้าน ที่ดิน อาคาร หรือคอนโด" />
          <button>ค้นหา</button>
        </form>
      )}
      <div className="topTools">
        {['types', 'detail'].includes(currentStep) && <button onClick={onBack}>ย้อนกลับ</button>}
        <button onClick={onTheme}>{theme === 'dark' ? '☀️ สว่าง' : '🌙 มืด'}</button>
        <a href={`tel:${contact.phone}`}>โทร</a>
      </div>
    </header>
  )
}

function UiPanel({ visible, settings, onChange, onReset, onClose }) {
  if (!visible) return null
  const controls = [
    ['heroHeight', 'ความสูงหน้าแรก', 72, 112, 'vh'],
    ['cardWidth', 'ความกว้างการ์ด', 220, 380, 'px'],
    ['cardHeight', 'ความสูงภาพการ์ด', 160, 260, 'px'],
    ['sectionGap', 'ช่องไฟแต่ละส่วน', 24, 96, 'px'],
    ['topOpacity', 'ความโปร่งแถบบน', 8, 72, '%'],
  ]
  return (
    <aside className="flowEditor">
      <div className="flowEditorHead">
        <div>
          <p>UI EDIT MODE</p>
          <h2>ปรับขนาดแบบสด</h2>
        </div>
        <button onClick={onClose}>×</button>
      </div>
      {controls.map(([key, label, min, max, suffix]) => (
        <label key={key} className="flowRange">
          <span>{label}<b>{settings[key]}{suffix}</b></span>
          <input type="range" min={min} max={max} value={settings[key]} onChange={(event) => onChange(key, Number(event.target.value))} />
        </label>
      ))}
      <button className="resetUi" onClick={onReset}>รีเซ็ต</button>
    </aside>
  )
}

function IntentScreen({ onChoose }) {
  return (
    <section className="intentScreen">
      <div className="intentInner">
        <p className="flowEyebrow">START YOUR SEARCH</p>
        <h1>ต้องการซื้อหรือเช่า?</h1>
        <div className="intentChoices">
          {intentOptions.map((option) => (
            <button key={option.value} onClick={() => onChoose(option.value)}>
              <span>{option.label}</span>
              <small>{option.note}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function TypeScreen({ intent, selectedTypes, onToggleType, onNext, onBack }) {
  const intentLabel = intent === 'rent' ? 'เช่า' : 'ซื้อ'
  return (
    <section className="typeScreen">
      <div className="typeInner">
        <p className="flowEyebrow">STEP 2</p>
        <h1>เลือกประเภทอสังหาที่ต้องการ{intentLabel}</h1>
        <p>เลือกได้หลายประเภท แล้วระบบจะจัดกลุ่มรายการแนะนำให้ดูเป็นแถว carousel</p>
        <div className="typeGridSelect">
          {typeOptions.map((type) => (
            <button key={type.value} className={selectedTypes.includes(type.value) ? 'active' : ''} onClick={() => onToggleType(type.value)}>
              {type.label}
            </button>
          ))}
        </div>
        <div className="stepActions">
          <button className="softButton" onClick={onBack}>ย้อนกลับ</button>
          <button className="mainButton" onClick={onNext}>{selectedTypes.length ? `ดู ${selectedTypes.length} ประเภทที่เลือก` : 'ดูทั้งหมด'}</button>
        </div>
      </div>
    </section>
  )
}

function PropertyCard({ property, onOpen }) {
  return (
    <article className="flowCard">
      <button className="flowPoster" onClick={() => onOpen(property)} aria-label={`ดู ${property.title}`}>
        <img src={property.image} alt={`${property.propertyLabel} ${property.location}`} loading="lazy" />
        <span>{property.listingLabel}</span>
      </button>
      <div className="flowCardInfo">
        <small>{property.propertyLabel} · {property.location}</small>
        <h3>{property.title}</h3>
        <strong>{property.priceText}</strong>
        <p>{property.distance !== null && property.distance !== undefined ? `ใกล้คุณประมาณ ${property.distance} กม.` : property.status}</p>
      </div>
    </article>
  )
}

function CarouselRow({ number, title, subtitle, items, onOpen, action }) {
  if (!items.length) return null
  return (
    <section className="flowCarousel">
      <div className="flowRowHead">
        <div>
          <span>{number}</span>
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
        </div>
        {action}
      </div>
      <div className="flowRowScroll">
        {items.map((property) => <PropertyCard key={`${title}-${property.id}`} property={property} onOpen={onOpen} />)}
      </div>
    </section>
  )
}

function FilterBar({ intent, onIntentChange, selectedTypes, onToggleType, priceRange, onPriceChange, onClear }) {
  return (
    <div className="quickFilterBar">
      <div className="filterGroup intentFilter" aria-label="เลือกซื้อหรือเช่า">
        <button className={!intent ? 'active' : ''} onClick={() => onIntentChange('')}>ทั้งหมด</button>
        {intentOptions.map((option) => (
          <button key={option.value} className={intent === option.value ? 'active' : ''} onClick={() => onIntentChange(option.value)}>{option.label}</button>
        ))}
      </div>
      <div className="filterGroup typeFilter" aria-label="เลือกประเภทอสังหา">
        {typeOptions.slice(0, 7).map((type) => (
          <button key={type.value} className={selectedTypes.includes(type.value) ? 'active' : ''} onClick={() => onToggleType(type.value)}>{type.label}</button>
        ))}
      </div>
      <div className="filterGroup priceFilter" aria-label="เลือกช่วงราคา">
        {priceOptions.map((option) => (
          <button key={option.value} className={priceRange === option.value ? 'active' : ''} onClick={() => onPriceChange(option.value)}>{option.label}</button>
        ))}
        <button className="clearFilter" onClick={onClear}>ล้าง</button>
      </div>
    </div>
  )
}

function ResultsScreen({ rows, onOpen, onLocation, geoStatus, selectedTypes, intent, onIntentChange, onToggleType, priceRange, onPriceChange, onClearFilters, total }) {
  const headline = intent === 'rent' ? 'อสังหาให้เช่าที่คัดมาให้' : intent === 'sale' ? 'อสังหาน่าซื้อที่คัดมาให้' : 'อสังหาแนะนำสำหรับคุณ'
  return (
    <section className="resultsScreen listingFirstScreen">
      <div className="resultsIntro">
        <p className="flowEyebrow">ALPHA ESTATE</p>
        <h1>{headline}</h1>
        <p>{total} รายการ · เลือกซื้อ/เช่า ประเภท และงบประมาณได้ทันที</p>
      </div>
      <FilterBar
        intent={intent}
        onIntentChange={onIntentChange}
        selectedTypes={selectedTypes}
        onToggleType={onToggleType}
        priceRange={priceRange}
        onPriceChange={onPriceChange}
        onClear={onClearFilters}
      />
      <div className="flowRows">
        {rows.map((row, index) => (
          <CarouselRow
            key={row.key}
            number={String(index + 1).padStart(2, '0')}
            title={row.title}
            subtitle={row.subtitle}
            items={row.items}
            onOpen={onOpen}
            action={row.key === 'nearby' ? <button className="miniAction" onClick={onLocation}>{geoStatus || 'ใช้พิกัด'}</button> : null}
          />
        ))}
      </div>
      <footer className="resultsContactFooter">
        <span>ALPHA ESTATE</span>
        <a href={contact.lineUrl} target="_blank" rel="noreferrer">LINE</a>
        <a href={`tel:${contact.phone}`}>{contact.phone}</a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </footer>
      <div className="mobileResultContactBar">
        <a href={contact.lineUrl} target="_blank" rel="noreferrer">LINE</a>
        <a href={`tel:${contact.phone}`}>โทร</a>
      </div>
    </section>
  )
}

function PropertyModal({ property, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef(null)
  const gallery = property?.gallery?.length ? property.gallery : property ? [property.image].filter(Boolean) : []

  useEffect(() => {
    setActiveIndex(0)
  }, [property?.id])

  if (!property) return null

  const openFull = () => window.open(`/property/${property.slug}`, '_blank', 'noopener,noreferrer')
  const goTo = (direction) => setActiveIndex((current) => (current + direction + gallery.length) % gallery.length)
  const onTouchStart = (event) => { touchStartX.current = event.touches[0].clientX }
  const onTouchEnd = (event) => {
    if (touchStartX.current === null || gallery.length < 2) return
    const diff = touchStartX.current - event.changedTouches[0].clientX
    if (Math.abs(diff) > 36) goTo(diff > 0 ? 1 : -1)
    touchStartX.current = null
  }

  return (
    <div className="flowModalBackdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <article className="flowModal" onClick={(event) => event.stopPropagation()}>
        <button className="flowClose" onClick={onClose}>×</button>
        <div className="modalImageStage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <img src={gallery[activeIndex]} alt={property.title} loading="lazy" />
          {gallery.length > 1 && (
            <>
              <button className="modalNav prev" onClick={() => goTo(-1)} aria-label="รูปก่อนหน้า">‹</button>
              <button className="modalNav next" onClick={() => goTo(1)} aria-label="รูปถัดไป">›</button>
              <div className="modalDots">{gallery.map((image, index) => <button key={image} className={index === activeIndex ? 'active' : ''} onClick={() => setActiveIndex(index)} aria-label={`ดูรูป ${index + 1}`} />)}</div>
            </>
          )}
        </div>
        <div className="flowModalContent">
          <span className="statusPill">{property.listingLabel}</span>
          <h2>{property.title}</h2>
          <p>{property.location} · {property.propertyLabel}</p>
          <strong>{property.priceText}</strong>
          <div className="factLine">
            <span>{property.landSize}</span>
            <span>{property.usableArea}</span>
            <span>{property.status}</span>
          </div>
          <p>{property.summary}</p>
          <div className="modalButtons">
            <button onClick={openFull}>เปิดดูข้อมูลเต็ม</button>
            <a href={contact.lineUrl} target="_blank" rel="noreferrer">LINE</a>
            <a href={`tel:${contact.phone}`}>โทร</a>
          </div>
        </div>
      </article>
    </div>
  )
}

function DetailPage({ property, related, theme, onTheme }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const gallery = property?.gallery?.length ? property.gallery : [property?.image].filter(Boolean)

  useEffect(() => {
    if (!gallery.length) return undefined
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % gallery.length), 4200)
    return () => window.clearInterval(timer)
  }, [gallery.length])

  useEffect(() => {
    if (!property) return
    document.title = `${property.title} | ${property.priceText} | ALPHA ESTATE`
  }, [property])

  if (!property) {
    return <main className="detailShell"><section className="emptyDetail"><h1>ไม่พบข้อมูลทรัพย์นี้</h1><a href="/">กลับหน้าแรก</a></section></main>
  }

  return (
    <main className="detailShell compactDetailShell">
      <TransparentSearchBar query="" onQuery={() => {}} onSearch={() => {}} theme={theme} onTheme={onTheme} currentStep="detail" onBack={() => window.location.assign('/')} />
      <section className="propertyHeroDetail">
        <img src={gallery[activeIndex]} alt={property.title} />
        <div className="detailOverlayText">
          <span className="statusPill">{property.listingLabel}</span>
          <h1>{property.title}</h1>
          <p>{property.location} · {property.propertyLabel}</p>
          <strong>{property.priceText}</strong>
        </div>
      </section>

      <div className="detailThumbs">
        {gallery.map((image, index) => (
          <button key={image} className={index === activeIndex ? 'active' : ''} onClick={() => setActiveIndex(index)}>
            <img src={image} alt={`${property.title} ${index + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      <section className="detailInfoGrid">
        <div>
          <p className="flowEyebrow">DETAIL</p>
          <h2>รายละเอียดทรัพย์</h2>
          <p>{property.fullDescription || property.summary}</p>
        </div>
        <aside>
          <span>{property.landSize}</span>
          <span>{property.usableArea}</span>
          <span>{property.status}</span>
          {property.bedrooms > 0 && <span>{property.bedrooms} ห้องนอน</span>}
          {property.bathrooms > 0 && <span>{property.bathrooms} ห้องน้ำ</span>}
        </aside>
      </section>

      <section className="autoRecommend">
        <CarouselRow number="01" title="อสังหาแนะนำ" subtitle="เลื่อนอัตโนมัติจากรายการใกล้เคียง" items={[...related, ...related].slice(0, 24)} onOpen={(item) => window.open(`/property/${item.slug}`, '_blank', 'noopener,noreferrer')} />
      </section>

      <footer className="detailStickyContact">
        <a href={contact.lineUrl} target="_blank" rel="noreferrer">ติดต่อ LINE</a>
        <a href={`tel:${contact.phone}`}>โทร {contact.phone}</a>
      </footer>
    </main>
  )
}

function App() {
  const detailSlug = window.location.pathname.startsWith('/property/')
    ? decodeURIComponent(window.location.pathname.replace('/property/', '').replace(/\/$/, ''))
    : null
  const detailProperty = useMemo(() => properties.find((property) => property.slug === detailSlug), [detailSlug])
  const [theme, setTheme] = useState(() => localStorage.getItem('estate-theme') || 'light')
  const [step, setStep] = useState('results')
  const [intent, setIntent] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [priceRange, setPriceRange] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [geoStatus, setGeoStatus] = useState('')
  const canEditUi = ['localhost', '127.0.0.1'].includes(window.location.hostname)
  const [editVisible, setEditVisible] = useState(() => canEditUi && new URLSearchParams(window.location.search).get('edit') === 'true')
  const [uiSettings, setUiSettings] = useState(loadUi)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('estate-theme', theme)
  }, [theme])

  useEffect(() => {
    applyUi(uiSettings)
    localStorage.setItem('estate-flow-ui', JSON.stringify(uiSettings))
  }, [uiSettings])

  const enrichedProperties = useMemo(() => {
    return properties.map((property, index) => ({
      ...property,
      distance: userLocation ? getDistanceKm(userLocation, property) : null,
      views: 9000 - ((index * 137) % 7000),
      isSpecial: index % 7 === 0 || property.status.includes('นัดชม'),
      isNew: property.id > 160,
    }))
  }, [userLocation])

  const filtered = useMemo(() => {
    const terms = buildTerms(query)
    return enrichedProperties
      .filter((property) => !intent || property.listingType === intent)
      .filter((property) => selectedTypes.length === 0 || selectedTypes.includes(property.propertyType))
      .filter((property) => priceMatches(property, priceRange))
      .filter((property) => {
        if (!terms.length) return true
        const text = normalize([property.title, property.location, property.propertyLabel, property.listingLabel, property.status, property.tags.join(' ')].join(' '))
        return terms.some((term) => text.includes(term))
      })
  }, [enrichedProperties, intent, priceRange, query, selectedTypes])

  const related = useMemo(() => {
    if (!detailProperty) return featuredProperties
    return properties.filter((item) => item.propertyType === detailProperty.propertyType && item.id !== detailProperty.id).slice(0, 16)
  }, [detailProperty])

  const rows = useMemo(() => {
    const fallback = enrichedProperties.filter((property) => (!intent || property.listingType === intent) && priceMatches(property, priceRange))
    const base = filtered.length ? filtered : fallback
    return [
      { key: 'recommended', title: 'แนะนำสำหรับคุณ', subtitle: 'รายการเด่นที่เหมาะกับการตัดสินใจเร็ว', items: base.filter((item) => featuredProperties.some((featured) => featured.id === item.id)).concat(base).slice(0, 18) },
      { key: 'nearby', title: 'ใกล้ฉัน', subtitle: userLocation ? 'เรียงตามระยะทางจากตำแหน่งของคุณ' : 'กดใช้พิกัดเพื่อเรียงรายการใกล้คุณ', items: [...base].sort((a, b) => (a.distance ?? 99999) - (b.distance ?? 99999)).slice(0, 18) },
      { key: 'new', title: 'เข้าใหม่', subtitle: 'รายการล่าสุดที่เพิ่มเข้าระบบ', items: [...base].sort((a, b) => b.id - a.id).slice(0, 18) },
      { key: 'special', title: 'น่าสนใจ', subtitle: 'ราคาและสถานะที่เหมาะสำหรับนัดชม', items: base.filter((item) => item.isSpecial || item.status.includes('นัดชม')).slice(0, 18) },
    ]
  }, [enrichedProperties, filtered, intent, priceRange, userLocation])

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('ไม่รองรับพิกัด')
      return
    }
    setGeoStatus('กำลังใช้พิกัด...')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        setGeoStatus('เรียงใกล้คุณแล้ว')
      },
      () => setGeoStatus('ยังไม่ได้อนุญาตพิกัด'),
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  const toggleType = (value) => {
    setSelectedTypes((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value])
  }

  const clearFilters = () => {
    setIntent('')
    setSelectedTypes([])
    setPriceRange('all')
    setQuery('')
  }

  const updateUi = (key, value) => setUiSettings((current) => ({ ...current, [key]: value }))
  const resetUi = () => setUiSettings(defaultUi)
  const toggleTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark')

  if (detailSlug) {
    return <DetailPage property={detailProperty} related={related} theme={theme} onTheme={toggleTheme} />
  }

  return (
    <main className={`flowApp flowStep-${step}`}>
      <TransparentSearchBar
        query={query}
        onQuery={setQuery}
        onSearch={() => setStep('results')}
        theme={theme}
        onTheme={toggleTheme}
        currentStep={step}
        onBack={() => setStep('results')}
      />

      {step === 'intent' && <IntentScreen onChoose={(value) => { setIntent(value); setStep('results') }} />}
      {step === 'types' && <TypeScreen intent={intent} selectedTypes={selectedTypes} onToggleType={toggleType} onNext={() => setStep('results')} onBack={() => setStep('results')} />}
      {step === 'results' && (
        <ResultsScreen
          rows={rows}
          onOpen={setSelectedProperty}
          onLocation={requestLocation}
          geoStatus={geoStatus}
          selectedTypes={selectedTypes}
          intent={intent}
          onIntentChange={setIntent}
          onToggleType={toggleType}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          onClearFilters={clearFilters}
          total={filtered.length}
        />
      )}

      <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      {canEditUi && <UiPanel visible={editVisible} settings={uiSettings} onChange={updateUi} onReset={resetUi} onClose={() => setEditVisible(false)} />}
    </main>
  )
}

export default App
