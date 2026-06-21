import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CalendarCheck,
  Car,
  CheckCircle2,
  ChevronRight,
  Home,
  LandPlot,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Trees,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'

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

const propertyTypes = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'house', label: 'บ้านเดี่ยว' },
  { value: 'townhome', label: 'ทาวน์โฮม' },
  { value: 'commercial', label: 'อาคาร' },
  { value: 'land', label: 'ที่ดินเปล่า' },
]

const properties = [
  {
    id: 1,
    title: 'The Grand Courtyard Residence',
    location: 'โคราช · ใกล้ถนนมิตรภาพ',
    listingType: 'sale',
    propertyType: 'house',
    propertyLabel: 'บ้านเดี่ยว',
    price: 'เริ่มต้น 4.59 ล้านบาท',
    status: 'พร้อมเข้าอยู่',
    coordinates: { lat: 14.9799, lng: 102.0977 },
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    specs: {
      bedrooms: 4,
      bathrooms: 4,
      parking: 3,
      area: '82 ตร.วา',
      usable: '245 ตร.ม.',
    },
    highlight: 'บ้านเดี่ยวหลังใหญ่ ฟังก์ชันครบ เหมาะกับครอบครัวที่ต้องการพื้นที่ใช้ชีวิตจริง',
  },
  {
    id: 2,
    title: 'Serene Pool Villa',
    location: 'เขาใหญ่ · บรรยากาศส่วนตัว',
    listingType: 'sale',
    propertyType: 'house',
    propertyLabel: 'พูลวิลล่า',
    price: 'เริ่มต้น 8.90 ล้านบาท',
    status: 'เปิดจอง',
    coordinates: { lat: 14.5639, lng: 101.3721 },
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
    specs: {
      bedrooms: 3,
      bathrooms: 4,
      parking: 2,
      area: '96 ตร.วา',
      usable: '310 ตร.ม.',
    },
    highlight: 'พูลวิลล่าส่วนตัว พร้อมพื้นที่พักผ่อนกลางแจ้งและมุมรับแขกเปิดโล่ง',
  },
  {
    id: 3,
    title: 'Minimal Urban Home',
    location: 'ตัวเมืองนครราชสีมา · ใกล้ห้างและโรงเรียน',
    listingType: 'rent',
    propertyType: 'townhome',
    propertyLabel: 'ทาวน์โฮม',
    price: '25,000 บาท / เดือน',
    status: 'ให้เช่า',
    coordinates: { lat: 14.9837, lng: 102.1098 },
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      parking: 2,
      area: '64 ตร.วา',
      usable: '188 ตร.ม.',
    },
    highlight: 'บ้านโมเดิร์นเรียบง่าย ดูแลไม่ยาก เดินทางสะดวก เหมาะกับครอบครัวเริ่มต้น',
  },
  {
    id: 4,
    title: 'Prime Roadside Land',
    location: 'โคราช · ติดถนนใหญ่ เหมาะลงทุน',
    listingType: 'sale',
    propertyType: 'land',
    propertyLabel: 'ที่ดินเปล่า',
    price: '8.90 ล้านบาท',
    status: 'ขาย',
    coordinates: { lat: 14.9455, lng: 102.0604 },
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85',
    specs: {
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      area: '2 ไร่ 1 งาน',
      usable: 'ติดถนนใหญ่',
    },
    highlight: 'ที่ดินเปล่าทำเลติดถนน เหมาะสำหรับสร้างบ้าน โกดัง หรือถือระยะยาวเพื่อการลงทุน',
  },
]

const gallery = [
  {
    label: 'Facade',
    title: 'ภายนอกบ้าน',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    label: 'Living',
    title: 'ห้องรับแขก',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
  },
  {
    label: 'Kitchen',
    title: 'ครัวและพื้นที่ทานอาหาร',
    image:
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1200&q=85',
  },
  {
    label: 'Bedroom',
    title: 'ห้องนอนใหญ่',
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
  },
]

const sellingPoints = [
  {
    icon: Sparkles,
    title: 'ดีไซน์เรียบหรู',
    text: 'ใช้โทนอบอุ่น โปร่ง สะอาด และจัดสัดส่วนให้บ้านดูแพงตั้งแต่ภาพแรก',
  },
  {
    icon: Trees,
    title: 'พื้นที่ใช้ชีวิตจริง',
    text: 'จัดฟังก์ชันห้องนั่งเล่น ครัว ห้องนอน และพื้นที่กลางแจ้งให้รองรับครอบครัว',
  },
  {
    icon: ShieldCheck,
    title: 'น่าเชื่อถือ',
    text: 'แสดงข้อมูลบ้าน ราคา ทำเล สถานะ และช่องทางติดต่อชัดเจน ลดความลังเลของผู้ซื้อ',
  },
]

const nearby = [
  ['ถนนหลัก', '3 นาที'],
  ['ห้างสรรพสินค้า', '8 นาที'],
  ['โรงพยาบาล', '10 นาที'],
  ['โรงเรียน', '12 นาที'],
]

const toRadians = (degree) => (degree * Math.PI) / 180

const getDistanceKm = (origin, destination) => {
  const earthRadiusKm = 6371
  const latDelta = toRadians(destination.lat - origin.lat)
  const lngDelta = toRadians(destination.lng - origin.lng)
  const originLat = toRadians(origin.lat)
  const destinationLat = toRadians(destination.lat)

  const a =
    Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
    Math.cos(originLat) * Math.cos(destinationLat) * Math.sin(lngDelta / 2) * Math.sin(lngDelta / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return Number((earthRadiusKm * c).toFixed(1))
}

function App() {
  const [activeProperty, setActiveProperty] = useState(properties[0])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const [listingMode, setListingMode] = useState('all')
  const [propertyType, setPropertyType] = useState('all')
  const [searchLocation, setSearchLocation] = useState('')
  const [userLocation, setUserLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState('')

  const propertiesWithDistance = useMemo(
    () =>
      properties.map((property) => ({
        ...property,
        distanceKm: userLocation ? getDistanceKm(userLocation, property.coordinates) : null,
      })),
    [userLocation],
  )

  const filteredProperties = useMemo(() => {
    const keyword = searchLocation.trim().toLowerCase()

    return propertiesWithDistance
      .filter((property) => listingMode === 'all' || property.listingType === listingMode)
      .filter((property) => propertyType === 'all' || property.propertyType === propertyType)
      .filter((property) => {
        if (!keyword) return true
        return `${property.title} ${property.location} ${property.propertyLabel}`.toLowerCase().includes(keyword)
      })
      .sort((a, b) => {
        if (a.distanceKm === null || b.distanceKm === null) return 0
        return a.distanceKm - b.distanceKm
      })
  }, [listingMode, propertyType, propertiesWithDistance, searchLocation])

  const displayProperties = filteredProperties.length > 0 ? filteredProperties : propertiesWithDistance
  const activePropertyDetails = propertiesWithDistance.find((property) => property.id === activeProperty.id) ?? activeProperty

  const mainSpecs = useMemo(
    () => [
      { icon: BedDouble, label: 'ห้องนอน', value: activePropertyDetails.specs.bedrooms > 0 ? `${activePropertyDetails.specs.bedrooms} ห้อง` : '-' },
      { icon: Bath, label: 'ห้องน้ำ', value: activePropertyDetails.specs.bathrooms > 0 ? `${activePropertyDetails.specs.bathrooms} ห้อง` : '-' },
      { icon: Car, label: 'ที่จอดรถ', value: activePropertyDetails.specs.parking > 0 ? `${activePropertyDetails.specs.parking} คัน` : '-' },
      { icon: LandPlot, label: 'ที่ดิน', value: activePropertyDetails.specs.area },
      { icon: Ruler, label: 'พื้นที่ใช้สอย', value: activePropertyDetails.specs.usable },
    ],
    [activePropertyDetails],
  )

  const handleUseLocation = () => {
    if (!('geolocation' in navigator)) {
      setLocationStatus('เบราว์เซอร์นี้ยังไม่รองรับการใช้พิกัด')
      return
    }

    setLocationStatus('กำลังขออนุญาตใช้พิกัดจากเครื่องของคุณ...')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setLocationStatus('ใช้พิกัดของคุณแล้ว ระบบจัดเรียงรายการใกล้ที่สุดให้ก่อน')
      },
      (error) => {
        const messages = {
          1: 'คุณยังไม่ได้อนุญาตให้ใช้พิกัด สามารถกดใหม่แล้วเลือก Allow ได้',
          2: 'ไม่สามารถอ่านพิกัดได้ ลองเปิด Location Service แล้วกดใหม่อีกครั้ง',
          3: 'ใช้เวลาค้นหาพิกัดนานเกินไป ลองกดใหม่อีกครั้ง',
        }
        setLocationStatus(messages[error.code] || 'ไม่สามารถใช้พิกัดได้ในตอนนี้')
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormStatus('ส่งข้อมูลตัวอย่างแล้ว สามารถเชื่อมต่อฟอร์มจริงกับ LINE, Email หรือ CRM ได้')
  }

  const navItems = ['บ้านเด่น', 'แกลเลอรี', 'รายละเอียด', 'ทำเล', 'ติดต่อ']

  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Luxury Home">
          <span className="brand-mark">
            <Home size={18} />
          </span>
          <span>
            <strong>ALPHA ESTATE</strong>
            <small>Luxury House Collection</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`}>
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="ghost-link" href={contact.lineUrl} target="_blank" rel="noreferrer">
            LINE
          </a>
          <a className="primary-link" href={`tel:${contact.phone.replaceAll('-', '')}`}>
            โทรเลย
          </a>
          <button className="menu-button" onClick={() => setIsMenuOpen((value) => !value)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setIsMenuOpen(false)}>
              {item}
            </a>
          ))}
        </div>
      )}

      <main id="top">
        <section className="hero-section">
          <div className="hero-bg" style={{ backgroundImage: `url(${activePropertyDetails.image})` }} />
          <div className="hero-overlay" />
          <div className="hero-content hero-content-minimal">
            <div className="search-panel" aria-label="Property search">
              <div className="search-panel-header">
                <span>ค้นหาอสังหา</span>
                <strong>เลือกจากเป้าหมาย แล้วค่อยกรองรายละเอียด</strong>
              </div>

              <div className="segmented-control" aria-label="เลือกเช่า ซื้อ หรือทั้งหมด">
                {listingModes.map((mode) => (
                  <button
                    key={mode.value}
                    className={listingMode === mode.value ? 'active' : ''}
                    type="button"
                    onClick={() => setListingMode(mode.value)}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              <label className="search-field">
                ทำเล / โครงการ
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(event) => setSearchLocation(event.target.value)}
                  placeholder="เช่น โคราช, เขาใหญ่, ใกล้ห้าง"
                />
              </label>

              <div className="property-type-filter" aria-label="ประเภทอสังหา">
                {propertyTypes.map((type) => (
                  <button
                    key={type.value}
                    className={propertyType === type.value ? 'active' : ''}
                    type="button"
                    onClick={() => setPropertyType(type.value)}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              <div className="location-row">
                <button className="use-location-button" type="button" onClick={handleUseLocation}>
                  <MapPin size={17} /> ใช้พิกัดของฉัน
                </button>
                <a className="search-submit" href="#บ้านเด่น">
                  ดูผลลัพธ์ <ArrowRight size={17} />
                </a>
              </div>

              {locationStatus && <p className="location-status">{locationStatus}</p>}
            </div>
          </div>

          <aside className="hero-card" aria-label="Featured property">
            <span>{activePropertyDetails.status}</span>
            <h2>{activePropertyDetails.title}</h2>
            <p>
              <MapPin size={16} /> {activePropertyDetails.location}
            </p>
            <strong>{activePropertyDetails.price}</strong>
            {activePropertyDetails.distanceKm !== null && <small>ห่างจากคุณประมาณ {activePropertyDetails.distanceKm} กม.</small>}
          </aside>
        </section>

        <section className="section property-section" id="บ้านเด่น">
          <div className="section-heading">
            <p className="eyebrow dark">Selected Properties</p>
            <h2>รายการอสังหาที่ตรงกับการค้นหา</h2>
            <p>
              พบ {filteredProperties.length} รายการจากตัวกรองปัจจุบัน
              {userLocation ? ' · เรียงจากระยะใกล้ที่สุด' : ' · กดใช้พิกัดเพื่อดูรายการใกล้คุณ'}
            </p>
          </div>

          <div className="property-grid">
            {displayProperties.map((property) => (
              <button
                key={property.id}
                className={`property-card ${property.id === activePropertyDetails.id ? 'active' : ''}`}
                onClick={() => setActiveProperty(property)}
              >
                <img src={property.image} alt={`${property.title} ${property.location}`} />
                <div className="property-card-body">
                  <div className="card-badges">
                    <span>{property.status}</span>
                    <span>{property.propertyLabel}</span>
                  </div>
                  <h3>{property.title}</h3>
                  <p>
                    <MapPin size={15} /> {property.location}
                  </p>
                  <strong>{property.price}</strong>
                  {property.distanceKm !== null && <small>ห่างจากคุณประมาณ {property.distanceKm} กม.</small>}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="gallery-section" id="แกลเลอรี">
          <div className="gallery-intro">
            <p className="eyebrow dark">Image-first Gallery</p>
            <h2>แกลเลอรีแบบเว็บบ้านหรู</h2>
            <p>ใช้ภาพใหญ่ คุมระยะห่าง และลดข้อความ เพื่อให้บ้านดูน่าสนใจขึ้นโดยไม่ต้องยัดข้อมูลแน่นเกินไป</p>
          </div>
          <div className="gallery-grid">
            {gallery.map((item, index) => (
              <article className={`gallery-card gallery-${index + 1}`} key={item.title}>
                <img src={item.image} alt={item.title} />
                <div>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section detail-section" id="รายละเอียด">
          <div className="detail-copy">
            <p className="eyebrow dark">Property Detail</p>
            <h2>{activePropertyDetails.title}</h2>
            <p className="large-text">{activePropertyDetails.highlight}</p>
            <ul className="check-list">
              <li>
                <CheckCircle2 size={18} /> ภาพบ้านจริงควรถูกจัดเป็นหมวด Exterior, Living, Bedroom, Kitchen, Bathroom
              </li>
              <li>
                <CheckCircle2 size={18} /> ข้อมูลสำคัญต้องอ่านจบได้ภายใน 5–10 วินาที
              </li>
              <li>
                <CheckCircle2 size={18} /> ปุ่ม LINE / โทร / นัดชมบ้าน ต้องเห็นชัดทั้งเดสก์ท็อปและมือถือ
              </li>
            </ul>
          </div>

          <div className="spec-panel">
            <div className="price-box">
              <span>ราคา</span>
              <strong>{activePropertyDetails.price}</strong>
              <p>{activePropertyDetails.status}</p>
            </div>
            <div className="spec-grid">
              {mainSpecs.map((spec) => {
                const Icon = spec.icon
                return (
                  <div className="spec-item" key={spec.label}>
                    <Icon size={22} />
                    <span>{spec.label}</span>
                    <strong>{spec.value}</strong>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="selling-section">
          {sellingPoints.map((point) => {
            const Icon = point.icon
            return (
              <article key={point.title}>
                <Icon size={26} />
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            )
          })}
        </section>

        <section className="section location-section" id="ทำเล">
          <div className="map-card">
            <div className="map-visual">
              <MapPin size={44} />
              <span>Google Maps Area</span>
            </div>
            <div className="map-details">
              <p className="eyebrow dark">Location</p>
              <h2>ทำเลชัด ช่วยให้ตัดสินใจง่ายขึ้น</h2>
              <p>พื้นที่นี้สามารถฝัง Google Maps จริง หรือใส่ภาพแผนที่โครงการพร้อมจุดสำคัญรอบบ้านได้</p>
              <div className="nearby-list">
                {nearby.map(([place, time]) => (
                  <div key={place}>
                    <span>{place}</span>
                    <strong>{time}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="ติดต่อ">
          <div className="contact-copy">
            <p className="eyebrow dark">Book a Visit</p>
            <h2>สนใจบ้านหลังนี้ นัดชมบ้านได้ทันที</h2>
            <p>
              ฟอร์มนี้ทำเป็นตัวอย่าง สามารถเชื่อมต่อกับ Email, LINE Notify, Google Sheets, CRM หรือระบบหลังบ้านได้ภายหลัง
            </p>

            <div className="contact-methods">
              <a href={`tel:${contact.phone.replaceAll('-', '')}`}>
                <Phone size={20} />
                <span>
                  โทร
                  <strong>{contact.phone}</strong>
                </span>
              </a>
              <a href={contact.lineUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={20} />
                <span>
                  LINE
                  <strong>สอบถาม / นัดชมบ้าน</strong>
                </span>
              </a>
              <a href={`mailto:${contact.email}`}>
                <CalendarCheck size={20} />
                <span>
                  Email
                  <strong>{contact.email}</strong>
                </span>
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              ชื่อผู้ติดต่อ
              <input type="text" placeholder="กรอกชื่อของคุณ" required />
            </label>
            <label>
              เบอร์โทร
              <input type="tel" placeholder="เช่น 098-000-0000" required />
            </label>
            <label>
              บ้านที่สนใจ
              <select defaultValue={activePropertyDetails.title}>
                {properties.map((property) => (
                  <option key={property.id}>{property.title}</option>
                ))}
              </select>
            </label>
            <label>
              ข้อความเพิ่มเติม
              <textarea placeholder="ต้องการนัดชมวันไหน หรือสอบถามข้อมูลเพิ่มเติม" rows="4" />
            </label>
            <button type="submit">
              ส่งข้อมูลให้ติดต่อกลับ <ChevronRight size={18} />
            </button>
            {formStatus && <p className="form-status">{formStatus}</p>}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <Building2 size={22} />
          <span>ALPHA ESTATE</span>
        </div>
        <p>Luxury real estate website concept · Built with React + Vite</p>
      </footer>

      <div className="sticky-cta" aria-label="Quick contact">
        <a href={`tel:${contact.phone.replaceAll('-', '')}`}>
          <Phone size={18} /> โทร
        </a>
        <a href={contact.lineUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={18} /> LINE
        </a>
        <a href="#ติดต่อ">
          <Star size={18} /> นัดชมบ้าน
        </a>
      </div>
    </div>
  )
}

export default App
