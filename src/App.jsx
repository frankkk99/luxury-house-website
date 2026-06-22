import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CalendarCheck,
  Car,
  CheckCircle2,
  ChevronRight,
  House,
  LandPlot,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Ruler,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trees,
  X,
} from 'lucide-react'

const contact = {
  brand: 'ALPHA ESTATE',
  phone: '080-899-8155',
  phoneHref: '0808998155',
  email: 'alphalab.official.th@gmail.com',
  lineUrl: 'https://line.me/R/ti/p/@alphalab.official.th',
}

const intentOptions = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'sale', label: 'ซื้อ' },
  { value: 'rent', label: 'เช่า' },
]

const typeOptions = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'house', label: 'บ้านเดี่ยว' },
  { value: 'townhome', label: 'ทาวน์โฮม' },
  { value: 'land', label: 'ที่ดินเปล่า' },
  { value: 'commercial', label: 'อาคารพาณิชย์' },
  { value: 'villa', label: 'พูลวิลล่า' },
]

const properties = [
  {
    id: 1,
    title: 'The Grand Courtyard Residence',
    location: 'โคราช · ใกล้ถนนมิตรภาพ',
    area: 'ตัวเมืองนครราชสีมา',
    listingType: 'sale',
    propertyType: 'house',
    propertyLabel: 'บ้านเดี่ยว',
    priceText: '4.59 ล้านบาท',
    status: 'พร้อมนัดชม',
    coordinates: { lat: 14.9799, lng: 102.0977 },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    specs: { bedrooms: 4, bathrooms: 4, parking: 3, land: '82 ตร.วา', usable: '245 ตร.ม.' },
    highlight: 'บ้านเดี่ยวหลังใหญ่ ฟังก์ชันครบ มีคอร์ทยาร์ดกลางบ้าน เหมาะกับครอบครัวที่ต้องการพื้นที่ใช้ชีวิตจริง',
    description: 'เหมาะสำหรับคนที่ต้องการบ้านพร้อมอยู่ในเมือง เดินทางสะดวก ใกล้ถนนหลัก ห้าง โรงเรียน และโรงพยาบาล พร้อมพื้นที่สวนส่วนตัวและที่จอดรถหลายคัน',
    tags: ['บ้านขายโคราช', 'บ้านพร้อมอยู่', 'บ้านเดี่ยว', 'ถนนมิตรภาพ'],
  },
  {
    id: 2,
    title: 'Serene Pool Villa Khao Yai',
    location: 'เขาใหญ่ · บรรยากาศส่วนตัว',
    area: 'เขาใหญ่',
    listingType: 'sale',
    propertyType: 'villa',
    propertyLabel: 'พูลวิลล่า',
    priceText: '8.90 ล้านบาท',
    status: 'เปิดจอง',
    coordinates: { lat: 14.5639, lng: 101.3721 },
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    specs: { bedrooms: 3, bathrooms: 4, parking: 2, land: '96 ตร.วา', usable: '310 ตร.ม.' },
    highlight: 'พูลวิลล่าส่วนตัว โทนอบอุ่น มีพื้นที่พักผ่อนกลางแจ้ง เหมาะทั้งอยู่อาศัยและปล่อยเช่ารายวัน',
    description: 'ออกแบบให้รับวิวธรรมชาติและแสงธรรมชาติ เหมาะกับครอบครัว นักลงทุน หรือผู้ที่ต้องการบ้านพักตากอากาศในทำเลเขาใหญ่',
    tags: ['พูลวิลล่า', 'เขาใหญ่', 'บ้านพักตากอากาศ', 'ลงทุน'],
  },
  {
    id: 3,
    title: 'Minimal Urban Townhome',
    location: 'เมืองโคราช · ใกล้ห้างและโรงเรียน',
    area: 'ตัวเมืองนครราชสีมา',
    listingType: 'rent',
    propertyType: 'townhome',
    propertyLabel: 'ทาวน์โฮม',
    priceText: '25,000 บาท / เดือน',
    status: 'ให้เช่า',
    coordinates: { lat: 14.9837, lng: 102.1098 },
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
    specs: { bedrooms: 3, bathrooms: 3, parking: 2, land: '42 ตร.วา', usable: '188 ตร.ม.' },
    highlight: 'ทาวน์โฮมโมเดิร์น ดูแลง่าย เดินทางสะดวก เหมาะกับครอบครัวเริ่มต้นหรือทีมทำงานในเมือง',
    description: 'บ้านให้เช่าพร้อมเฟอร์บางส่วน พื้นที่ใช้สอยลงตัว ใกล้สิ่งอำนวยความสะดวก และมีพื้นที่จอดรถในตัว',
    tags: ['บ้านเช่าโคราช', 'ทาวน์โฮม', 'เช่าบ้าน', 'ใกล้ห้าง'],
  },
  {
    id: 4,
    title: 'Prime Roadside Land',
    location: 'โคราช · ติดถนนใหญ่ เหมาะลงทุน',
    area: 'ถนนมิตรภาพ',
    listingType: 'sale',
    propertyType: 'land',
    propertyLabel: 'ที่ดินเปล่า',
    priceText: '8.90 ล้านบาท',
    status: 'ขาย',
    coordinates: { lat: 14.9455, lng: 102.0604 },
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85',
    specs: { bedrooms: 0, bathrooms: 0, parking: 0, land: '2 ไร่ 1 งาน', usable: 'ติดถนนใหญ่' },
    highlight: 'ที่ดินเปล่าทำเลติดถนน เหมาะสำหรับสร้างบ้าน โกดัง อาคารพาณิชย์ หรือถือระยะยาวเพื่อการลงทุน',
    description: 'หน้ากว้างติดถนน เข้าออกสะดวก เหมาะกับผู้ที่กำลังมองหาที่ดินเพื่อทำธุรกิจหรือพัฒนาโครงการในอนาคต',
    tags: ['ที่ดินเปล่าโคราช', 'ที่ดินติดถนน', 'ลงทุน', 'ถนนใหญ่'],
  },
  {
    id: 5,
    title: 'Commercial Corner Building',
    location: 'เซฟวัน · ทำเลค้าขาย',
    area: 'เซฟวัน',
    listingType: 'sale',
    propertyType: 'commercial',
    propertyLabel: 'อาคารพาณิชย์',
    priceText: '6.80 ล้านบาท',
    status: 'นัดชมได้',
    coordinates: { lat: 14.9468, lng: 102.0527 },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    specs: { bedrooms: 2, bathrooms: 3, parking: 2, land: '24 ตร.วา', usable: '220 ตร.ม.' },
    highlight: 'อาคารพาณิชย์หัวมุม เหมาะกับหน้าร้าน ออฟฟิศ หรือธุรกิจที่ต้องการทำเลใกล้แหล่งคนพลุกพล่าน',
    description: 'ตำแหน่งดี มองเห็นง่าย เหมาะสำหรับทำธุรกิจหน้าร้านหรือปล่อยเช่า พร้อมพื้นที่ชั้นบนสำหรับพักอาศัยหรือเก็บสินค้า',
    tags: ['อาคารพาณิชย์โคราช', 'เซฟวัน', 'ตึกแถว', 'ค้าขาย'],
  },
  {
    id: 6,
    title: 'Garden Family Home',
    location: 'จอหอ · โซนอยู่อาศัยเงียบสงบ',
    area: 'จอหอ',
    listingType: 'sale',
    propertyType: 'house',
    propertyLabel: 'บ้านเดี่ยว',
    priceText: '3.95 ล้านบาท',
    status: 'พร้อมเข้าอยู่',
    coordinates: { lat: 15.0378, lng: 102.1072 },
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    specs: { bedrooms: 3, bathrooms: 3, parking: 2, land: '65 ตร.วา', usable: '190 ตร.ม.' },
    highlight: 'บ้านครอบครัวพร้อมสวน บรรยากาศสงบ เหมาะกับคนที่อยากได้พื้นที่ส่วนตัวแต่ยังเดินทางเข้าเมืองสะดวก',
    description: 'พื้นที่ใช้สอยครบ ห้องนอนใหญ่ ห้องรับแขก ครัว และสวนรอบบ้าน เหมาะกับครอบครัวที่กำลังมองหาบ้านหลังแรก',
    tags: ['บ้านเดี่ยวจอหอ', 'บ้านครอบครัว', 'บ้านพร้อมสวน', 'พร้อมเข้าอยู่'],
  },
]

const galleryItems = [
  { label: 'Facade', title: 'ภายนอกบ้าน', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Living', title: 'ห้องรับแขก', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Kitchen', title: 'ครัวและพื้นที่ทานอาหาร', image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1200&q=85' },
  { label: 'Bedroom', title: 'ห้องนอนใหญ่', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85' },
]

const sellingPoints = [
  { icon: Sparkles, title: 'ภาพต้องขายก่อนข้อความ', text: 'วางภาพใหญ่ คุมแสง สี และระยะห่างให้บ้านดูแพงตั้งแต่ช่วงแรกที่เข้าเว็บ' },
  { icon: ShieldCheck, title: 'ข้อมูลอ่านง่าย', text: 'ราคา ทำเล สถานะ ขนาดพื้นที่ และปุ่มติดต่ออยู่ในตำแหน่งที่ผู้ซื้อเห็นได้ทันที' },
  { icon: CalendarCheck, title: 'นำไปสู่นัดชมบ้าน', text: 'ออกแบบปุ่ม LINE โทร และฟอร์มติดต่อให้ใช้งานง่ายทั้งมือถือและเดสก์ท็อป' },
]

const seoCards = [
  { title: 'บ้านขายโคราช', text: 'รวมบ้านเดี่ยว ทาวน์โฮม และพูลวิลล่าในนครราชสีมา สำหรับผู้ที่ต้องการซื้อบ้านพร้อมอยู่หรือบ้านเพื่อการลงทุน' },
  { title: 'บ้านเช่าโคราช', text: 'ค้นหาบ้านเช่าและทาวน์โฮมให้เช่าในตัวเมืองโคราช พร้อมข้อมูลค่าเช่า ทำเล จำนวนห้อง และช่องทางสอบถามทันที' },
  { title: 'ที่ดินและอาคารพาณิชย์', text: 'เหมาะสำหรับคนที่ต้องการที่ดินเปล่า อาคารพาณิชย์ หรือทรัพย์เพื่อทำธุรกิจ โกดัง ออฟฟิศ และการลงทุนระยะยาว' },
]

const relatedKeywords = ['บ้านขายโคราช', 'บ้านเช่าโคราช', 'บ้านเดี่ยวโคราช', 'ทาวน์โฮมโคราช', 'ที่ดินเปล่าโคราช', 'อาคารพาณิชย์โคราช', 'บ้านพร้อมอยู่', 'อสังหาเขาใหญ่']

const faqs = [
  { question: 'เว็บนี้เหมาะกับอสังหาประเภทไหน?', answer: 'เหมาะกับบ้านขาย บ้านเช่า ที่ดินเปล่า อาคารพาณิชย์ พูลวิลล่า และทรัพย์เพื่อการลงทุนที่ต้องการภาพสวย รายละเอียดชัด และช่องทางติดต่อเร็ว' },
  { question: 'ปุ่มใช้พิกัดทำงานอย่างไร?', answer: 'ระบบจะขออนุญาตจากเบราว์เซอร์ก่อน แล้วคำนวณระยะทางโดยประมาณเพื่อเรียงรายการที่อยู่ใกล้ผู้ใช้ขึ้นมาก่อน' },
  { question: 'ถ้าจะใช้ขายจริงควรเพิ่มอะไร?', answer: 'ควรเพิ่มรูปจริงของแต่ละทรัพย์ สถานะล่าสุด รายละเอียดกรรมสิทธิ์ แผนที่จริง และระบบจัดการข้อมูลจาก Google Sheets หรือ Supabase' },
]

const nearby = [
  ['ถนนหลัก', '3 นาที'],
  ['ห้างสรรพสินค้า', '8 นาที'],
  ['โรงพยาบาล', '10 นาที'],
  ['โรงเรียน', '12 นาที'],
]

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

function App() {
  const [selectedProperty, setSelectedProperty] = useState(properties[0])
  const [menuOpen, setMenuOpen] = useState(false)
  const [intent, setIntent] = useState('all')
  const [type, setType] = useState('all')
  const [query, setQuery] = useState('')
  const [userLocation, setUserLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState('')
  const [formStatus, setFormStatus] = useState('')

  const enrichedProperties = useMemo(() => {
    return properties.map((property) => ({
      ...property,
      distanceKm: userLocation ? getDistanceKm(userLocation, property.coordinates) : null,
    }))
  }, [userLocation])

  const filteredProperties = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return enrichedProperties
      .filter((property) => intent === 'all' || property.listingType === intent)
      .filter((property) => type === 'all' || property.propertyType === type)
      .filter((property) => {
        if (!keyword) return true
        const text = [property.title, property.location, property.area, property.propertyLabel, property.status, property.tags.join(' ')].join(' ').toLowerCase()
        return text.includes(keyword)
      })
      .sort((a, b) => {
        if (a.distanceKm === null || b.distanceKm === null) return a.id - b.id
        return a.distanceKm - b.distanceKm
      })
  }, [enrichedProperties, intent, query, type])

  const visibleProperties = filteredProperties.length ? filteredProperties : enrichedProperties
  const activeProperty = enrichedProperties.find((property) => property.id === selectedProperty.id) || selectedProperty

  const propertySpecs = [
    { icon: BedDouble, label: 'ห้องนอน', value: activeProperty.specs.bedrooms > 0 ? `${activeProperty.specs.bedrooms} ห้อง` : '-' },
    { icon: Bath, label: 'ห้องน้ำ', value: activeProperty.specs.bathrooms > 0 ? `${activeProperty.specs.bathrooms} ห้อง` : '-' },
    { icon: Car, label: 'ที่จอดรถ', value: activeProperty.specs.parking > 0 ? `${activeProperty.specs.parking} คัน` : '-' },
    { icon: LandPlot, label: 'ที่ดิน', value: activeProperty.specs.land },
    { icon: Ruler, label: 'พื้นที่ใช้สอย', value: activeProperty.specs.usable },
  ]

  const requestLocation = () => {
    if (!('geolocation' in navigator)) {
      setLocationStatus('เบราว์เซอร์นี้ยังไม่รองรับการใช้พิกัด')
      return
    }

    setLocationStatus('กำลังขออนุญาตใช้พิกัดจากเครื่องของคุณ...')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        setLocationStatus('ใช้พิกัดแล้ว ระบบเรียงรายการใกล้คุณขึ้นมาก่อน')
      },
      () => setLocationStatus('ยังไม่ได้อนุญาตให้ใช้พิกัด สามารถกดใหม่แล้วเลือก Allow ได้'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  const submitLead = (event) => {
    event.preventDefault()
    setFormStatus('บันทึกข้อมูลตัวอย่างแล้ว ขั้นต่อไปสามารถเชื่อมฟอร์มกับ LINE, Email, Google Sheets หรือ CRM ได้')
  }

  const navItems = [
    ['บ้านเด่น', 'featured'],
    ['แกลเลอรี', 'gallery'],
    ['รายละเอียด', 'detail'],
    ['ทำเล', 'location'],
    ['คำค้นหา', 'seo'],
    ['ติดต่อ', 'contact'],
  ]

  return (
    <div className="siteShell">
      <header className="siteHeader">
        <a href="#top" className="brand" aria-label="ALPHA ESTATE บ้านขาย บ้านเช่า โคราช">
          <span className="brandMark"><House size={18} /></span>
          <span>
            <strong>{contact.brand}</strong>
            <small>บ้านขาย · บ้านเช่า · ที่ดินโคราช</small>
          </span>
        </a>

        <nav className="desktopNav" aria-label="เมนูหลัก">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>

        <div className="headerActions">
          <a className="ghostLink" href={contact.lineUrl} target="_blank" rel="noreferrer">LINE</a>
          <a className="primaryLink" href={`tel:${contact.phoneHref}`}>โทรเลย</a>
          <button className="menuButton" type="button" onClick={() => setMenuOpen((current) => !current)} aria-label="เปิดเมนู">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobileNav">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </div>
      )}

      <main id="top">
        <section className="heroSection" aria-labelledby="mainTitle">
          <div className="heroBg" style={{ backgroundImage: `url(${activeProperty.image})` }} />
          <div className="heroOverlay" />

          <div className="heroContent">
            <div className="searchPanel" aria-label="ค้นหาอสังหาริมทรัพย์">
              <div className="searchPanelHeader">
                <span>ค้นหาอสังหา</span>
                <h1 id="mainTitle">บ้านขาย บ้านเช่า โคราช และอสังหาริมทรัพย์ใกล้คุณ</h1>
                <p>เลือกซื้อ เช่า หรือดูทั้งหมด แล้วกรองประเภทบ้าน อาคาร หรือที่ดินเปล่าได้ทันที</p>
              </div>

              <div className="segmentedControl" aria-label="เลือกซื้อ เช่า หรือทั้งหมด">
                {intentOptions.map((option) => (
                  <button key={option.value} className={intent === option.value ? 'active' : ''} type="button" onClick={() => setIntent(option.value)}>
                    {option.label}
                  </button>
                ))}
              </div>

              <label className="searchField">
                ทำเล / โครงการ
                <span>
                  <Search size={18} />
                  <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="เช่น โคราช, เขาใหญ่, ใกล้ห้าง" />
                </span>
              </label>

              <div className="propertyTypeFilter" aria-label="ประเภทอสังหา">
                {typeOptions.map((option) => (
                  <button key={option.value} className={type === option.value ? 'active' : ''} type="button" onClick={() => setType(option.value)}>
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="locationRow">
                <button className="useLocationButton" type="button" onClick={requestLocation}><MapPin size={17} /> ใช้พิกัดของฉัน</button>
                <a className="searchSubmit" href="#featured">ดูผลลัพธ์ <ArrowRight size={17} /></a>
              </div>
              {locationStatus && <p className="locationStatus">{locationStatus}</p>}
            </div>

            <aside className="heroCard" aria-label="บ้านเด่น">
              <span>{activeProperty.status}</span>
              <h2>{activeProperty.title}</h2>
              <p><MapPin size={16} /> {activeProperty.location}</p>
              <strong>{activeProperty.priceText}</strong>
              {activeProperty.distanceKm !== null && <small>ห่างจากคุณประมาณ {activeProperty.distanceKm} กม.</small>}
            </aside>
          </div>
        </section>

        <section className="section propertySection" id="featured">
          <div className="sectionHeading">
            <p className="eyebrow">Selected Properties</p>
            <h2>รายการอสังหาที่ตรงกับการค้นหา</h2>
            <p>พบ {filteredProperties.length} รายการจากตัวกรองปัจจุบัน{userLocation ? ' · เรียงจากระยะใกล้ที่สุด' : ' · กดใช้พิกัดเพื่อดูรายการใกล้คุณ'}</p>
          </div>

          <div className="propertyGrid">
            {visibleProperties.map((property) => (
              <button key={property.id} className={`propertyCard ${property.id === activeProperty.id ? 'active' : ''}`} type="button" onClick={() => setSelectedProperty(property)}>
                <img src={property.image} alt={`${property.propertyLabel} ${property.status} ${property.location} ${property.title}`} loading="lazy" />
                <div className="propertyCardBody">
                  <div className="cardBadges">
                    <span>{property.status}</span>
                    <span>{property.propertyLabel}</span>
                  </div>
                  <h3>{property.title}</h3>
                  <p><MapPin size={15} /> {property.location}</p>
                  <strong>{property.priceText}</strong>
                  {property.distanceKm !== null && <small>ห่างจากคุณประมาณ {property.distanceKm} กม.</small>}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="gallerySection" id="gallery">
          <div className="galleryIntro">
            <p className="eyebrow">Image-first Gallery</p>
            <h2>แกลเลอรีบ้านขาย บ้านเช่า และที่ดินแบบเว็บอสังหาหรู</h2>
            <p>ใช้ภาพใหญ่ คุมระยะห่าง และลดข้อความ เพื่อให้ผู้ซื้อหรือผู้เช่าเห็นบรรยากาศบ้าน ทำเล และรายละเอียดสำคัญได้เร็ว</p>
          </div>
          <div className="galleryGrid">
            {galleryItems.map((item, index) => (
              <article className={`galleryCard gallery${index + 1}`} key={item.title}>
                <img src={item.image} alt={`${item.title} สำหรับประกาศบ้านขาย บ้านเช่า โคราช`} loading="lazy" />
                <div>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section detailSection" id="detail">
          <div className="detailCopy">
            <p className="eyebrow">Property Detail</p>
            <h2>{activeProperty.title}</h2>
            <p className="largeText">{activeProperty.highlight}</p>
            <p>{activeProperty.description}</p>
            <ul className="checkList">
              <li><CheckCircle2 size={18} /> ภาพบ้านจริงควรถูกจัดเป็นหมวด Exterior, Living, Bedroom, Kitchen, Bathroom</li>
              <li><CheckCircle2 size={18} /> ข้อมูลสำคัญต้องอ่านจบได้ภายใน 5–10 วินาที</li>
              <li><CheckCircle2 size={18} /> ปุ่ม LINE / โทร / นัดชมบ้าน ต้องเห็นชัดทั้งเดสก์ท็อปและมือถือ</li>
            </ul>
          </div>

          <div className="specPanel">
            <div className="priceBox">
              <span>ราคา</span>
              <strong>{activeProperty.priceText}</strong>
              <p>{activeProperty.status}</p>
            </div>
            <div className="specGrid">
              {propertySpecs.map((spec) => {
                const Icon = spec.icon
                return (
                  <div className="specItem" key={spec.label}>
                    <Icon size={22} />
                    <span>{spec.label}</span>
                    <strong>{spec.value}</strong>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="sellingSection" id="why">
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

        <section className="section locationSection" id="location">
          <div className="mapCard">
            <div className="mapVisual">
              <MapPin size={44} />
              <span>Google Maps Area</span>
            </div>
            <div className="mapDetails">
              <p className="eyebrow">Location</p>
              <h2>ทำเลโคราช เขาใหญ่ และนครราชสีมา ช่วยให้ตัดสินใจง่ายขึ้น</h2>
              <p>พื้นที่นี้สามารถฝัง Google Maps จริง หรือใส่ภาพแผนที่โครงการพร้อมจุดสำคัญรอบบ้านได้</p>
              <div className="nearbyList">
                {nearby.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section seoSection" id="seo" aria-labelledby="seoTitle">
          <div className="sectionHeading seoHeading">
            <p className="eyebrow">Search-friendly Content</p>
            <h2 id="seoTitle">ค้นหาอสังหาริมทรัพย์โคราชตามความต้องการ</h2>
            <p>หน้าเว็บนี้จัดคอนเทนต์ให้ผู้ใช้และ Google เข้าใจว่าเว็บเกี่ยวกับบ้านขาย บ้านเช่า ที่ดินเปล่า อาคารพาณิชย์ และทำเลนครราชสีมา</p>
          </div>
          <div className="seoGrid">
            {seoCards.map((card) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
          <div className="seoKeywords" aria-label="คำค้นหาที่เกี่ยวข้อง">
            {relatedKeywords.map((keyword) => <a href="#featured" key={keyword}>{keyword}</a>)}
          </div>
          <div className="seoFaq" aria-label="คำถามที่พบบ่อย">
            <h3>คำถามที่พบบ่อยเกี่ยวกับการค้นหาบ้านและที่ดินในโคราช</h3>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section contactSection" id="contact">
          <div className="contactCopy">
            <p className="eyebrow">Book a Visit</p>
            <h2>สนใจบ้าน ที่ดิน หรืออาคารพาณิชย์ นัดชมทรัพย์ได้ทันที</h2>
            <p>ฟอร์มนี้ทำเป็นตัวอย่าง สามารถเชื่อมต่อกับ Email, LINE, Google Sheets, CRM หรือระบบหลังบ้านได้ภายหลัง</p>
            <div className="contactMethods">
              <a href={`tel:${contact.phoneHref}`}><Phone size={20} /><span>โทร<strong>{contact.phone}</strong></span></a>
              <a href={contact.lineUrl} target="_blank" rel="noreferrer"><MessageCircle size={20} /><span>LINE<strong>สอบถาม / นัดชมบ้าน</strong></span></a>
              <a href={`mailto:${contact.email}`}><Mail size={20} /><span>Email<strong>{contact.email}</strong></span></a>
            </div>
          </div>

          <form className="contactForm" onSubmit={submitLead}>
            <label>ชื่อผู้ติดต่อ<input type="text" placeholder="กรอกชื่อของคุณ" required /></label>
            <label>เบอร์โทร<input type="tel" placeholder="เช่น 080-899-8155" required /></label>
            <label>บ้านที่สนใจ
              <select defaultValue={activeProperty.title}>
                {properties.map((property) => <option key={property.id}>{property.title}</option>)}
              </select>
            </label>
            <label>ข้อความเพิ่มเติม<textarea placeholder="ต้องการนัดชมวันไหน หรือสอบถามข้อมูลเพิ่มเติม" rows="4" /></label>
            <button type="submit">ส่งข้อมูลให้ติดต่อกลับ <ChevronRight size={18} /></button>
            {formStatus && <p className="formStatus">{formStatus}</p>}
          </form>
        </section>
      </main>

      <footer className="siteFooter">
        <div><Building2 size={22} /><span>{contact.brand}</span></div>
        <p>บ้านขาย บ้านเช่า ที่ดินเปล่า และอาคารพาณิชย์โคราช · Built with React + Vite</p>
      </footer>

      <div className="stickyCta" aria-label="ช่องทางติดต่อด่วน">
        <a href={`tel:${contact.phoneHref}`}><Phone size={18} /> โทร</a>
        <a href={contact.lineUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} /> LINE</a>
        <a href="#contact"><Star size={18} /> นัดชมบ้าน</a>
      </div>
    </div>
  )
}

export default App
