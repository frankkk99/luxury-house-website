# Luxury House Website

เว็บไซต์ขายบ้านสไตล์เรียบหรู เน้นโชว์ภาพ รายละเอียดบ้าน ทำเล แกลเลอรี และช่องทางติดต่อสำหรับผู้สนใจ

## แนวคิดหลัก

- ภาพบ้านขนาดใหญ่ตั้งแต่หน้าแรก
- โทนเรียบหรู ขาว ดำ ครีม และทองหม่น
- ข้อมูลบ้านอ่านง่าย เช่น ราคา ทำเล ห้องนอน ห้องน้ำ พื้นที่ใช้สอย
- มีปุ่มติดต่อชัดเจนทั้ง โทร, LINE และฟอร์มนัดชมบ้าน
- รองรับมือถือ พร้อมแถบปุ่มติดต่อแบบ sticky ด้านล่าง

## Tech Stack

- React
- Vite
- CSS Responsive Layout
- Lucide React Icons

## วิธีรันโปรเจกต์

```bash
npm install
npm run dev
```

## วิธี build

```bash
npm run build
```

## Deploy บน Vercel

1. เข้า Vercel
2. กด Add New Project
3. เลือก repo `luxury-house-website`
4. Framework Preset เลือก Vite
5. Build Command ใช้ `npm run build`
6. Output Directory ใช้ `dist`
7. กด Deploy

## จุดที่ควรเปลี่ยนเป็นข้อมูลจริง

ในไฟล์ `src/App.jsx`

- เปลี่ยนเบอร์โทรในตัวแปร `contact.phone`
- เปลี่ยนลิงก์ LINE ในตัวแปร `contact.lineUrl`
- เปลี่ยนอีเมลในตัวแปร `contact.email`
- เปลี่ยนข้อมูลบ้านใน array `properties`
- เปลี่ยนรูปภาพบ้านจริงแทนภาพตัวอย่างจาก Unsplash
- เปลี่ยนสถานที่ใกล้เคียงใน array `nearby`

## โครง Section หน้าเว็บ

1. Hero Section
2. Selected Properties
3. Image Gallery
4. Property Detail
5. Selling Points
6. Location
7. Contact / Book a Visit
8. Sticky CTA สำหรับมือถือ
