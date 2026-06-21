import { useEffect, useMemo, useState } from 'react'
import { featuredProperties, properties, propertyTypes } from './data/properties.js'

const contact = {
  phone: '098-000-0000',
  lineUrl: 'https://line.me/R/ti/p/@yourlineid',
  email: 'sales@example.com',
}

const listingModes = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'sale', label: 'ซื้อ' },
  { value: 'rent', label: 'เช่า' },
]

const bottomLinks = [
  { href: '#home', label: 'หน้าแรก' },
  { href: '#search', label: 'ค้นหา' },
  { href: '#properties', label: 'ทรัพย์' },
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

function App() {
  const [heroProperty] = useState(() => featuredProperties[Math.floor(Math.random() * featuredProperties.length)] || properties[0])
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [listingMode, setListingMode] = useState('all')
  const [propertyType, setPropertyType] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [userLocation, setUserLocation] = useState(null)
  const [geoStatus, setGeoStatus] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  const visibleProperties = filteredProperties.slice(0, 60)

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

  return (
    <main>
      <section id="home" className="hero" style={{ '--hero-image': `url(${heroProperty.image})` }}>
        <div className="heroOverlay" />
        <div className="heroContent">
          <div className="heroCopy">
            <p className="eyebrow">ALPHA ESTATE SHOWCASE</p>
            <h1>อสังหาเด่นแบบสุ่ม ทุกครั้งที่เปิดเว็บ</h1>
            <p className="heroLead">หน้าแรกเน้นพื้นที่โล่ง ภาพใหญ่ และข้อมูลสำคัญเท่านั้น ส่วนรายละเอียดให้กดดูต่อเพื่อไม่ให้เว็บแออัด</p>
            <div className="heroActions">
              <a href="#search" className="primaryBtn">ค้นหาอสังหา</a>
              <button className="ghostBtn" onClick={() => setSelectedProperty(heroProperty)}>ดูข้อมูลทรัพย์นี้</button>
            </div>
          </div>

          <article className="heroCard">
            <span className="pill">{heroProperty.listingLabel}</span>
            <h2>{heroProperty.title}</h2>
            <p>{heroProperty.location}</p>
            <strong>{heroProperty.priceText}</strong>
            <div className="miniFacts">
              <span>{heroProperty.propertyLabel}</span>
              <span>{heroProperty.landSize}</span>
              <span>{heroProperty.status}</span>
            </div>
            <button onClick={() => setSelectedProperty(heroProperty)}>ดูข้อมูลสั้น</button>
          </article>
        </div>
      </section>

      <section id="search" className="searchPanel">
        <div className="sectionHead compact">
          <p className="eyebrow">SEARCH FLOW</p>
          <h2>เลือกเช่า ซื้อ หรือดูทั้งหมด</h2>
          <p>กรองเท่าที่จำเป็นก่อน แล้วค่อยให้ผู้ใช้จิ้มดูรายละเอียดเพิ่ม</p>
        </div>
        <div className="filterGlass">
          <div className="segmented">
            {listingModes.map((mode) => (
              <button key={mode.value} className={listingMode === mode.value ? 'active' : ''} onClick={() => setListingMode(mode.value)}>{mode.label}</button>
            ))}
          </div>
          <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="ค้นหาทำเล เช่น โคราช เขาใหญ่ โกดังให้เช่า บ้านใกล้ฉัน" />
          <div className="typeChips">
            {propertyTypes.map((type) => (
              <button key={type.value} className={propertyType === type.value ? 'active' : ''} onClick={() => setPropertyType(type.value)}>{type.label}</button>
            ))}
          </div>
          <div className="filterActions">
            <button onClick={requestLocation} className="locationBtn">ใช้พิกัดของฉัน</button>
            <button onClick={clearFilters} className="clearBtn">ล้างตัวกรอง</button>
            <span>{geoStatus}</span>
          </div>
        </div>
      </section>

      <section id="properties" className="propertySection">
        <div className="sectionHead">
          <p className="eyebrow">PROPERTY LIST</p>
          <h2>พบ {filteredProperties.length} รายการจากข้อมูลเดโม 200 ชุด</h2>
          <p>แสดงตัวอย่าง 60 รายการแรก เพื่อให้หน้าโหลดเร็วและยังดูโล่ง</p>
        </div>
        <div className="propertyGrid">
          {visibleProperties.map((property) => (
            <article className="propertyCard" key={property.id}>
              <button className="imageButton" onClick={() => setSelectedProperty(property)}>
                <img src={property.image} alt={`${property.propertyLabel} ${property.location}`} loading="lazy" />
                <span>{property.listingLabel}</span>
              </button>
              <div className="cardBody">
                <small>{property.propertyLabel} · {property.location}</small>
                <h3>{property.title}</h3>
                <strong>{property.priceText}</strong>
                <p>{property.bedrooms ? `${property.bedrooms} ห้องนอน · ` : ''}{property.bathrooms ? `${property.bathrooms} ห้องน้ำ · ` : ''}{property.landSize}</p>
                {property.distance !== null && <p className="distance">ห่างจากคุณประมาณ {property.distance} กม.</p>}
                <button onClick={() => setSelectedProperty(property)}>ดูรายละเอียด</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contactSection">
        <div>
          <p className="eyebrow">CONTACT</p>
          <h2>สนใจทรัพย์ไหน ให้ผู้ใช้ติดต่อได้ทันที</h2>
          <p>หน้าเว็บเดโมนี้วางปุ่มโทร LINE และฟอร์มติดต่อไว้เฉพาะจุดสำคัญ เพื่อลดความแออัดของหน้าแรก</p>
        </div>
        <div className="contactCard">
          <a href={`tel:${contact.phone}`}>โทร {contact.phone}</a>
          <a href={contact.lineUrl} target="_blank" rel="noreferrer">ติดต่อ LINE</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </section>

      <nav className={`bottomNav ${isScrolled ? 'scrolled' : ''}`} aria-label="เมนูล่าง">
        {bottomLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>

      {selectedProperty && (
        <div className="modalBackdrop" onClick={() => setSelectedProperty(null)}>
          <article className="propertyModal" onClick={(event) => event.stopPropagation()}>
            <button className="closeBtn" onClick={() => setSelectedProperty(null)}>×</button>
            <img src={selectedProperty.image} alt={selectedProperty.title} />
            <div>
              <span className="pill">{selectedProperty.listingLabel}</span>
              <h2>{selectedProperty.title}</h2>
              <p>{selectedProperty.summary}</p>
              <strong>{selectedProperty.priceText}</strong>
              <div className="modalFacts">
                <span>{selectedProperty.propertyLabel}</span>
                <span>{selectedProperty.location}</span>
                <span>{selectedProperty.landSize}</span>
                <span>{selectedProperty.usableArea}</span>
              </div>
              <div className="heroActions">
                <a className="primaryBtn" href={contact.lineUrl} target="_blank" rel="noreferrer">สอบถามผ่าน LINE</a>
                <a className="ghostBtn dark" href={`tel:${contact.phone}`}>โทรทันที</a>
              </div>
            </div>
          </article>
        </div>
      )}
    </main>
  )
}

export default App
