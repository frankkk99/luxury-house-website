const money = new Intl.NumberFormat('th-TH')

export const propertyTypes = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'house', label: 'บ้านเดี่ยว' },
  { value: 'townhome', label: 'ทาวน์โฮม' },
  { value: 'commercial', label: 'อาคารพาณิชย์' },
  { value: 'land', label: 'ที่ดินเปล่า' },
  { value: 'condo', label: 'คอนโด' },
  { value: 'warehouse', label: 'โกดัง / โรงงาน' },
  { value: 'office', label: 'ออฟฟิศ' },
  { value: 'apartment', label: 'อพาร์ตเมนต์' },
  { value: 'villa', label: 'พูลวิลล่า' },
]

const locations = [
  { zone: 'ตัวเมืองนครราชสีมา', detail: 'ใกล้เดอะมอลล์และโรงเรียน', province: 'นครราชสีมา', lat: 14.9799, lng: 102.0977 },
  { zone: 'ถนนมิตรภาพ โคราช', detail: 'เดินทางเข้าเมืองสะดวก', province: 'นครราชสีมา', lat: 14.9837, lng: 102.1098 },
  { zone: 'หัวทะเล', detail: 'ใกล้แหล่งชุมชนและตลาด', province: 'นครราชสีมา', lat: 14.9574, lng: 102.1226 },
  { zone: 'จอหอ', detail: 'ใกล้วงแหวนและโซนธุรกิจ', province: 'นครราชสีมา', lat: 15.0269, lng: 102.1194 },
  { zone: 'เซฟวัน โคราช', detail: 'ใกล้ตลาดและถนนหลัก', province: 'นครราชสีมา', lat: 14.9442, lng: 102.0621 },
  { zone: 'สูงเนิน', detail: 'เหมาะพักอาศัยและทำโกดัง', province: 'นครราชสีมา', lat: 14.8987, lng: 101.8252 },
  { zone: 'ปักธงชัย', detail: 'ทำเลบ้านสวนและที่ดินลงทุน', province: 'นครราชสีมา', lat: 14.7191, lng: 102.0206 },
  { zone: 'โชคชัย', detail: 'เหมาะบ้านพักและกิจการครอบครัว', province: 'นครราชสีมา', lat: 14.7282, lng: 102.1654 },
  { zone: 'ปากช่อง', detail: 'ใกล้ถนนมิตรภาพและเขาใหญ่', province: 'นครราชสีมา', lat: 14.7089, lng: 101.4162 },
  { zone: 'เขาใหญ่', detail: 'บรรยากาศพักผ่อนและพูลวิลล่า', province: 'นครราชสีมา', lat: 14.5639, lng: 101.3721 },
  { zone: 'วังน้ำเขียว', detail: 'วิวธรรมชาติและบ้านพักตากอากาศ', province: 'นครราชสีมา', lat: 14.4195, lng: 101.8612 },
  { zone: 'ขอนแก่น เมือง', detail: 'ใกล้มหาวิทยาลัยและโรงพยาบาล', province: 'ขอนแก่น', lat: 16.4419, lng: 102.8359 },
  { zone: 'กรุงเทพฯ ลาดพร้าว', detail: 'ใกล้รถไฟฟ้าและสำนักงาน', province: 'กรุงเทพฯ', lat: 13.8123, lng: 100.6089 },
  { zone: 'กรุงเทพฯ พระราม 9', detail: 'ทำเลคอนโดและออฟฟิศ', province: 'กรุงเทพฯ', lat: 13.7563, lng: 100.5650 },
  { zone: 'บางนา', detail: 'ใกล้ทางด่วนและเมกาบางนา', province: 'สมุทรปราการ', lat: 13.6682, lng: 100.6140 },
  { zone: 'พัทยา', detail: 'เหมาะลงทุนปล่อยเช่า', province: 'ชลบุรี', lat: 12.9236, lng: 100.8825 },
  { zone: 'ระยอง', detail: 'ใกล้นิคมและท่าเรือ', province: 'ระยอง', lat: 12.6814, lng: 101.2816 },
  { zone: 'หัวหิน', detail: 'บ้านพักตากอากาศและพูลวิลล่า', province: 'ประจวบคีรีขันธ์', lat: 12.5684, lng: 99.9577 },
  { zone: 'เชียงใหม่ นิมมาน', detail: 'คอนโดและอาคารพาณิชย์', province: 'เชียงใหม่', lat: 18.7961, lng: 98.9676 },
  { zone: 'ภูเก็ต ราไวย์', detail: 'พูลวิลล่าและทรัพย์ลงทุน', province: 'ภูเก็ต', lat: 7.7791, lng: 98.3257 },
]

const catalogs = [
  {
    propertyType: 'house',
    propertyLabel: 'บ้านเดี่ยว',
    titlePrefix: ['Modern Family Home', 'Courtyard Residence', 'Warm Minimal House', 'Private Garden Home'],
    saleBase: 3_200_000,
    saleStep: 240_000,
    rentBase: 18_000,
    rentStep: 1_800,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    highlight: 'บ้านเดี่ยวฟังก์ชันครบ เหมาะกับครอบครัวที่ต้องการพื้นที่ใช้ชีวิตจริงและเดินทางสะดวก',
  },
  {
    propertyType: 'townhome',
    propertyLabel: 'ทาวน์โฮม',
    titlePrefix: ['Urban Townhome', 'Minimal Townhouse', 'City Link Townhome', 'Compact Family Townhome'],
    saleBase: 2_100_000,
    saleStep: 150_000,
    rentBase: 12_000,
    rentStep: 1_200,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
    highlight: 'ทาวน์โฮมดูแลง่าย ใกล้เมือง เหมาะกับครอบครัวเริ่มต้นหรือคนทำงานที่ต้องการความสะดวก',
  },
  {
    propertyType: 'commercial',
    propertyLabel: 'อาคารพาณิชย์',
    titlePrefix: ['Prime Commercial Building', 'Main Road Shophouse', 'Business Corner Building', 'Retail Office Building'],
    saleBase: 4_800_000,
    saleStep: 330_000,
    rentBase: 25_000,
    rentStep: 2_700,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85',
    highlight: 'อาคารพาณิชย์เหมาะทำร้าน ออฟฟิศ หรือปล่อยเช่า อยู่ในโซนที่มีคนผ่านและเข้าถึงง่าย',
  },
  {
    propertyType: 'land',
    propertyLabel: 'ที่ดินเปล่า',
    titlePrefix: ['Prime Roadside Land', 'Investment Land Plot', 'Future Project Land', 'Green Land Parcel'],
    saleBase: 1_600_000,
    saleStep: 420_000,
    rentBase: 35_000,
    rentStep: 3_000,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85',
    highlight: 'ที่ดินเปล่าพร้อมต่อยอด เหมาะสร้างบ้าน ทำโกดัง ทำโครงการ หรือถือเป็นทรัพย์ลงทุนระยะยาว',
  },
  {
    propertyType: 'condo',
    propertyLabel: 'คอนโด',
    titlePrefix: ['City View Condo', 'Smart Living Condo', 'Metro Residence', 'Skyline Condominium'],
    saleBase: 1_450_000,
    saleStep: 120_000,
    rentBase: 8_500,
    rentStep: 950,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=85',
    highlight: 'คอนโดเดินทางง่าย เหมาะกับคนทำงาน นักศึกษา หรือผู้ลงทุนที่ต้องการปล่อยเช่ารายเดือน',
  },
  {
    propertyType: 'warehouse',
    propertyLabel: 'โกดัง / โรงงาน',
    titlePrefix: ['Warehouse Space', 'Factory Compound', 'Logistics Warehouse', 'Industrial Property'],
    saleBase: 6_500_000,
    saleStep: 610_000,
    rentBase: 45_000,
    rentStep: 4_500,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85',
    highlight: 'โกดังและโรงงานเหมาะสำหรับธุรกิจขนส่ง คลังสินค้า งานผลิต หรือขยายกิจการในทำเลติดถนนหลัก',
  },
  {
    propertyType: 'office',
    propertyLabel: 'ออฟฟิศ',
    titlePrefix: ['Modern Office Space', 'Creative Office Building', 'Corporate Office', 'Business Suite'],
    saleBase: 5_200_000,
    saleStep: 370_000,
    rentBase: 32_000,
    rentStep: 2_500,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
    highlight: 'พื้นที่ออฟฟิศพร้อมปรับใช้งาน เหมาะกับทีมงาน ธุรกิจบริการ บริษัทขนาดเล็ก และสำนักงานขาย',
  },
  {
    propertyType: 'apartment',
    propertyLabel: 'อพาร์ตเมนต์',
    titlePrefix: ['Rental Apartment Asset', 'Student Apartment', 'Monthly Room Building', 'Income Apartment'],
    saleBase: 9_900_000,
    saleStep: 720_000,
    rentBase: 60_000,
    rentStep: 6_000,
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=85',
    highlight: 'อพาร์ตเมนต์และอาคารปล่อยเช่า เหมาะกับนักลงทุนที่ต้องการทรัพย์สร้างรายได้สม่ำเสมอ',
  },
  {
    propertyType: 'villa',
    propertyLabel: 'พูลวิลล่า',
    titlePrefix: ['Serene Pool Villa', 'Private Holiday Villa', 'Mountain View Villa', 'Luxury Retreat Villa'],
    saleBase: 7_800_000,
    saleStep: 620_000,
    rentBase: 55_000,
    rentStep: 5_500,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
    highlight: 'พูลวิลล่าบรรยากาศส่วนตัว เหมาะพักผ่อน ปล่อยเช่ารายวัน หรือทำเป็นทรัพย์ลงทุนสายท่องเที่ยว',
  },
]

const saleStatuses = ['ขาย', 'พร้อมเข้าอยู่', 'เปิดจอง', 'ทรัพย์ลงทุน', 'ราคาพิเศษ']
const rentStatuses = ['ให้เช่า', 'ว่างพร้อมเข้าอยู่', 'เช่าระยะยาว', 'เหมาะทำธุรกิจ']

const formatSalePrice = (amount) => {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(amount >= 10_000_000 ? 1 : 2).replace(/\.00$/, '').replace(/\.0$/, '')} ล้านบาท`
  }
  return `${money.format(amount)} บาท`
}

const buildSpecs = (catalog, index) => {
  if (catalog.propertyType === 'land') {
    return {
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      area: `${1 + (index % 7)} ไร่ ${index % 4} งาน`,
      usable: `หน้ากว้าง ${14 + (index % 28)} ม.`,
    }
  }

  if (catalog.propertyType === 'commercial') {
    return {
      bedrooms: 0,
      bathrooms: 2 + (index % 4),
      parking: 1 + (index % 5),
      area: `${18 + (index % 38)} ตร.วา`,
      usable: `${180 + (index % 9) * 45} ตร.ม. · ${3 + (index % 3)} ชั้น`,
    }
  }

  if (catalog.propertyType === 'warehouse') {
    return {
      bedrooms: 0,
      bathrooms: 1 + (index % 4),
      parking: 4 + (index % 12),
      area: `${1 + (index % 9)} ไร่`,
      usable: `${420 + (index % 12) * 120} ตร.ม.`,
    }
  }

  if (catalog.propertyType === 'office') {
    return {
      bedrooms: 0,
      bathrooms: 2 + (index % 5),
      parking: 2 + (index % 10),
      area: `${120 + (index % 10) * 20} ตร.ม.`,
      usable: `${160 + (index % 8) * 35} ตร.ม.`,
    }
  }

  if (catalog.propertyType === 'apartment') {
    return {
      bedrooms: 12 + (index % 36),
      bathrooms: 12 + (index % 36),
      parking: 4 + (index % 14),
      area: `${70 + (index % 80)} ตร.วา`,
      usable: `${480 + (index % 12) * 80} ตร.ม.`,
    }
  }

  if (catalog.propertyType === 'condo') {
    return {
      bedrooms: 1 + (index % 3),
      bathrooms: 1 + (index % 2),
      parking: index % 2,
      area: `${28 + (index % 55)} ตร.ม.`,
      usable: `${28 + (index % 55)} ตร.ม.`,
    }
  }

  return {
    bedrooms: 2 + (index % 4),
    bathrooms: 2 + (index % 4),
    parking: 1 + (index % 4),
    area: `${42 + (index % 86)} ตร.วา`,
    usable: `${118 + (index % 10) * 24} ตร.ม.`,
  }
}

const generateProperties = () =>
  Array.from({ length: 200 }, (_, index) => {
    const id = index + 1
    const catalog = catalogs[index % catalogs.length]
    const location = locations[(index * 7) % locations.length]
    const listingType = catalog.propertyType === 'land' ? (index % 8 === 0 ? 'rent' : 'sale') : index % 5 === 0 || index % 7 === 0 ? 'rent' : 'sale'
    const priceNumber = listingType === 'sale' ? catalog.saleBase + (index % 23) * catalog.saleStep : catalog.rentBase + (index % 17) * catalog.rentStep
    const title = `${catalog.titlePrefix[index % catalog.titlePrefix.length]} ${String(id).padStart(3, '0')}`
    const offsetLat = ((index % 9) - 4) * 0.006
    const offsetLng = (((index * 3) % 9) - 4) * 0.006

    return {
      id,
      title,
      location: `${location.zone} · ${location.detail}`,
      listingType,
      propertyType: catalog.propertyType,
      propertyLabel: catalog.propertyLabel,
      price: listingType === 'sale' ? formatSalePrice(priceNumber) : `${money.format(priceNumber)} บาท / เดือน`,
      status: listingType === 'sale' ? saleStatuses[index % saleStatuses.length] : rentStatuses[index % rentStatuses.length],
      coordinates: {
        lat: Number((location.lat + offsetLat).toFixed(6)),
        lng: Number((location.lng + offsetLng).toFixed(6)),
      },
      image: catalog.image,
      specs: buildSpecs(catalog, index),
      highlight: `${catalog.highlight} ทำเล${location.zone} ${location.province} เหมาะสำหรับใช้เดโมระบบค้นหา กรองประเภท และเรียงตามพิกัดใกล้ผู้ใช้`,
      tags: [
        location.zone,
        location.province,
        location.detail,
        catalog.propertyLabel,
        listingType === 'sale' ? 'ขาย' : 'เช่า',
        'ตัวอย่างข้อมูลทดสอบ',
      ],
    }
  })

export const properties = generateProperties()
