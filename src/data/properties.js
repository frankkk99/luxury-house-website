const images = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85',
]

const locations = [
  ['ตัวเมืองนครราชสีมา', 14.9799, 102.0977],
  ['ถนนมิตรภาพ', 14.9851, 102.0902],
  ['หัวทะเล', 14.9501, 102.1257],
  ['จอหอ', 15.0378, 102.1072],
  ['เซฟวัน', 14.9468, 102.0527],
  ['สูงเนิน', 14.9009, 101.8205],
  ['ปากช่อง', 14.708, 101.4161],
  ['เขาใหญ่', 14.439, 101.372],
  ['วังน้ำเขียว', 14.4189, 101.8612],
  ['กรุงเทพฯ', 13.7563, 100.5018],
  ['พัทยา', 12.9236, 100.8825],
  ['ระยอง', 12.6814, 101.2816],
  ['หัวหิน', 12.5684, 99.9577],
  ['เชียงใหม่', 18.7883, 98.9853],
  ['ภูเก็ต', 7.8804, 98.3923],
]

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

const typeData = {
  house: { label: 'บ้านเดี่ยว', titles: ['บ้านเดี่ยวโมเดิร์น', 'บ้านครอบครัวพร้อมสวน', 'บ้านหรูพร้อมเข้าอยู่'], baseSale: 4200000, baseRent: 26000 },
  townhome: { label: 'ทาวน์โฮม', titles: ['ทาวน์โฮมฟังก์ชันครบ', 'ทาวน์โฮมใกล้เมือง', 'ทาวน์โฮมพร้อมเฟอร์'], baseSale: 2600000, baseRent: 15000 },
  commercial: { label: 'อาคารพาณิชย์', titles: ['อาคารพาณิชย์ติดถนน', 'ตึกแถวทำเลค้าขาย', 'อาคารธุรกิจใกล้ชุมชน'], baseSale: 5500000, baseRent: 32000 },
  land: { label: 'ที่ดินเปล่า', titles: ['ที่ดินเปล่าติดถนน', 'ที่ดินเหมาะลงทุน', 'ที่ดินทำเลโครงการ'], baseSale: 1800000, baseRent: 0 },
  condo: { label: 'คอนโด', titles: ['คอนโดวิวเมือง', 'คอนโดใกล้รถไฟฟ้า', 'คอนโดพร้อมอยู่'], baseSale: 1900000, baseRent: 12000 },
  warehouse: { label: 'โกดัง / โรงงาน', titles: ['โกดังให้เช่า', 'โรงงานพร้อมออฟฟิศ', 'คลังสินค้าใกล้ถนนใหญ่'], baseSale: 9800000, baseRent: 55000 },
  office: { label: 'ออฟฟิศ', titles: ['ออฟฟิศให้เช่า', 'สำนักงานพร้อมใช้', 'ออฟฟิศใกล้เมือง'], baseSale: 7200000, baseRent: 28000 },
  apartment: { label: 'อพาร์ตเมนต์', titles: ['อพาร์ตเมนต์ลงทุน', 'หอพักใกล้ชุมชน', 'อพาร์ตเมนต์พร้อมผู้เช่า'], baseSale: 12500000, baseRent: 0 },
  villa: { label: 'พูลวิลล่า', titles: ['พูลวิลล่าพักผ่อน', 'วิลล่าเขาใหญ่', 'บ้านพักตากอากาศ'], baseSale: 8900000, baseRent: 45000 },
}

const typeKeys = Object.keys(typeData)
const statuses = ['พร้อมเข้าอยู่', 'มือสองสภาพดี', 'สร้างใหม่', 'เหมาะลงทุน', 'ใกล้ถนนหลัก']
const tags = ['ภาพจริง', 'ติดต่อไว', 'นัดชมได้', 'ทำเลดี', 'ข้อมูลครบ', 'เดโมขายเว็บ']

const money = (value) => new Intl.NumberFormat('th-TH').format(value)

export const properties = Array.from({ length: 200 }, (_, index) => {
  const id = index + 1
  const type = typeKeys[index % typeKeys.length]
  const typeInfo = typeData[type]
  const location = locations[index % locations.length]
  const listingType = index % 3 === 0 ? 'rent' : 'sale'
  const isRent = listingType === 'rent' && typeInfo.baseRent > 0
  const salePrice = typeInfo.baseSale + (index % 17) * 310000
  const rentPrice = typeInfo.baseRent + (index % 12) * 2200
  const price = isRent ? rentPrice : salePrice
  const title = `${typeInfo.titles[index % typeInfo.titles.length]} ${location[0]} #${String(id).padStart(3, '0')}`
  const lat = Number((location[1] + ((index % 9) - 4) * 0.012).toFixed(6))
  const lng = Number((location[2] + ((index % 7) - 3) * 0.012).toFixed(6))

  return {
    id,
    title,
    listingType: isRent ? 'rent' : 'sale',
    listingLabel: isRent ? 'ให้เช่า' : 'ขาย',
    propertyType: type,
    propertyLabel: typeInfo.label,
    location: location[0],
    price,
    priceText: isRent ? `${money(price)} บาท / เดือน` : `${money(price)} บาท`,
    bedrooms: type === 'land' || type === 'warehouse' || type === 'office' ? 0 : 2 + (index % 5),
    bathrooms: type === 'land' ? 0 : 1 + (index % 4),
    parking: type === 'land' ? 0 : 1 + (index % 6),
    landSize: type === 'land' ? `${1 + (index % 6)} ไร่ ${index % 4} งาน` : `${42 + (index % 80)} ตร.วา`,
    usableArea: type === 'land' ? '-' : `${80 + (index % 240)} ตร.ม.`,
    status: statuses[index % statuses.length],
    image: images[index % images.length],
    lat,
    lng,
    tags: [typeInfo.label, location[0], isRent ? 'เช่า' : 'ขาย', tags[index % tags.length]],
    summary: `รายการเดโมสำหรับทดสอบเว็บอสังหา ครอบคลุมข้อมูลราคา ทำเล ภาพประกอบ และช่องทางติดต่อ เหมาะสำหรับพรีเซนต์ระบบให้ลูกค้าเห็นภาพการใช้งานจริง`,
  }
})

export const featuredProperties = properties.filter((item) => item.id % 11 === 0 || item.id < 10).slice(0, 18)
