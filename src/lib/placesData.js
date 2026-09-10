// ข้อมูลสถานที่ท่องเที่ยวสมุทรปราการ (เก็บเป็น Array ของ Object)
// รูปภาพเป็น URL จากอินเทอร์เน็ตจริง (Wikimedia Commons, ฯลฯ)
export const places = [
  {
    id: 1,
    name: 'เมืองโบราณ (Ancient City)',
    category: 'วัฒนธรรม',
    address: 'ถนนสุขุมวิท กม.33, ต.บางปูใหม่, อ.เมือง, จ.สมุทรปราการ 10280',
    time: '09:00 - 19:00 (ทุกวัน)',
    fee: 'ผู้ใหญ่ 700 บาท, เด็ก 350 บาท (ราคาอาจเปลี่ยนแปลง)',
    highlight: 'พิพิธภัณฑ์กลางแจ้งขนาด 800 ไร่ จำลองสถาปัตยกรรมไทยจากทุกภาค',
    description:
      'เมืองโบราณก่อตั้งขึ้นในปี พ.ศ. 2506 โดยคุณเล็ก วิริยะพันธุ์ เป็นพิพิธภัณฑ์กลางแจ้งที่รวบรวมและจำลองสถานที่สำคัญทางประวัติศาสตร์และวัฒนธรรมจากทั่วประเทศไทยไว้ในพื้นที่เดียวกัน รวมกว่า 100 จุด แต่ละแห่งสร้างด้วยความประณีต ใช้ขนาด 3/4 ของของจริง เหมาะสำหรับการเรียนรู้ประวัติศาสตร์และศิลปวัฒนธรรมไทย',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Ancient_City_%28Muang_Boran%29_Thailand_01.jpg/800px-Ancient_City_%28Muang_Boran%29_Thailand_01.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Muang_Boran_06.jpg/800px-Muang_Boran_06.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Ancient_City_02.jpg/800px-Ancient_City_02.jpg',
    ],
    source: 'https://www.muangboranmuseum.com',
  },
  {
    id: 2,
    name: 'พิพิธภัณฑ์ช้างเอราวัณ (Erawan Museum)',
    category: 'พิพิธภัณฑ์',
    address: '99/9 หมู่1 ถนนสุขุมวิท, ต.บางเมืองใหม่, อ.เมือง, จ.สมุทรปราการ 10270',
    time: '08:00 - 17:00 (ทุกวัน)',
    fee: 'ผู้ใหญ่ 400 บาท, เด็ก 200 บาท',
    highlight: 'รูปปั้นช้างสามเศียรสูง 43.6 เมตร หล่อด้วยทองแดงหนัก 250 ตัน',
    description:
      'พิพิธภัณฑ์ช้างเอราวัณเริ่มก่อสร้างในปี พ.ศ. 2537 และเปิดให้บริการในปี พ.ศ. 2546 เป็นหนึ่งในสัญลักษณ์สำคัญของจังหวัด ภายในแบ่งเป็น 3 ชั้น แทนจักรวาลตามคติไตรภูมิ ได้แก่ ชั้นบาดาล (ใต้ดิน), ชั้นมนุษย์ (กลาง), และชั้นสวรรค์ (ยอดช้าง) มีโบราณวัตถุและศิลปวัตถุอันล้ำค่ามากมาย',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Erawan_Museum_03.jpg/800px-Erawan_Museum_03.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Erawan_Museum_Interior.jpg/800px-Erawan_Museum_Interior.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Erawan_Museum_01.jpg/800px-Erawan_Museum_01.jpg',
    ],
    source: 'https://www.erawan-museum.com',
  },
  {
    id: 3,
    name: 'สถานตากอากาศบางปู (Bang Pu Recreation Center)',
    category: 'ธรรมชาติ',
    address: 'ถนนสุขุมวิท, ต.บางปู, อ.เมือง, จ.สมุทรปราการ 10280',
    time: '06:00 - 18:00 (ทุกวัน)',
    fee: 'เข้าชมฟรี',
    highlight: 'ชมนกนางนวลอพยพช่วงฤดูหนาว และพระอาทิตย์ตกที่สวยงาม',
    description:
      'บางปูเป็นสถานที่พักผ่อนหย่อนใจยอดนิยมของคนกรุงและชาวสมุทรปราการ มีเส้นทางเดินเลียบชายทะเล ต้นสน และนกนางนวลจำนวนมากที่อพยพมาจากไซบีเรียในช่วงเดือนพฤศจิกายนถึงกุมภาพันธ์ จุดเด่นคือพระอาทิตย์ตกดินเหนืออ่าวไทยที่สวยงาม',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Bang_Pu_Beach_01.jpg/800px-Bang_Pu_Beach_01.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Bang_Pu_Sunset.jpg/800px-Bang_Pu_Sunset.jpg',
    ],
    source: 'https://www.tourismthailand.org',
  },
  {
    id: 4,
    name: 'พระสมุทรเจดีย์ (Phra Samut Chedi)',
    category: 'วัฒนธรรม',
    address: 'ตำบลพระสมุทรเจดีย์, อำเภอพระสมุทรเจดีย์, จ.สมุทรปราการ 10290',
    time: '08:00 - 18:00 (ทุกวัน)',
    fee: 'เข้าชมฟรี',
    highlight: 'เจดีย์สีขาวสูงตระหง่าน แลนด์มาร์クสำคัญริมแม่น้ำเจ้าพระยา',
    description:
      'พระสมุทรเจดีย์เป็นเจดีย์เก่าแก่ที่สร้างขึ้นในสมัยกรุงศรีอยุธยา ปัจจุบันเป็นสัญลักษณ์ของจังหวัดสมุทรปราการ ตั้งอยู่บริเวณปากแม่น้ำเจ้าพระยา มีความสูง 20 เมตร ฐานกว้าง 12 เมตร ภายในบรรจุพระบรมสารีริกธาตุ เป็นสถานที่ศักดิ์สิทธิ์ที่ชาวบ้านให้ความเคารพ',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Phra_Samut_Chedi_01.jpg/800px-Phra_Samut_Chedi_01.jpg',
    gallery: [],
    source: 'https://www.samutprakan.go.th',
  },
  {
    id: 5,
    name: 'ป้อมพระจุลจอมเกล้า (Phra Chulachomklao Fort)',
    category: 'ประวัติศาสตร์',
    address: 'ถนนสุขุมวิท, ตำบลบางปูใหม่, อ.เมือง, จ.สมุทรปราการ 10280',
    time: '08:30 - 16:30 (จันทร์-ศุกร์), 08:30-17:00 (เสาร์-อาทิตย์)',
    fee: 'ไม่เสียค่าเข้า',
    highlight: 'ป้อมปืนใหญ่สมัยรัชกาลที่ 5 ใช้ป้องกันปากอ่าวไทย',
    description:
      'ป้อมพระจุลจอมเกล้าสร้างขึ้นในปี พ.ศ. 2436 ตามพระราชดำริของพระบาทสมเด็จพระจุลจอมเกล้าเจ้าอยู่หัว เพื่อป้องกันการรุกรานทางทะเล ปัจจุบันเป็นอนุสรณ์สถานทางประวัติศาสตร์ ภายในมีปืนใหญ่ขนาดใหญ่และพิพิธภัณฑ์ให้ความรู้',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Phra_Chulachomklao_Fort_01.jpg/800px-Phra_Chulachomklao_Fort_01.jpg',
    gallery: [],
    source: 'https://www.royalthaiarmy.com',
  },
  {
    id: 6,
    name: 'ตลาดน้ำบางน้ำผึ้ง (Bang Nam Phueng Floating Market)',
    category: 'ตลาด/ชุมชน',
    address: 'ตำบลบางน้ำผึ้ง, อำเภอพระประแดง, จ.สมุทรปราการ 10130',
    time: '08:00 - 17:00 (เฉพาะวันเสาร์-อาทิตย์)',
    fee: 'ไม่เสียค่าเข้า',
    highlight: 'ตลาดน้ำที่ยังคงวิถีชีวิตดั้งเดิม ขนมไทยและของฝาก',
    description:
      'ตลาดน้ำบางน้ำผึ้งตั้งอยู่ริมคลองในพื้นที่อำเภอพระประแดง ยังคงบรรยากาศความเป็นตลาดน้ำไทยโบราณ มีเรือขายอาหารและของฝากมากมาย นักท่องเที่ยวสามารถนั่งชมวิถีชีวิตและชิมอาหารท้องถิ่น เช่น ขนมไทย อาหารทะเลสด และผลไม้ตามฤดูกาล',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bang_Nam_Phueng_Market_01.jpg/800px-Bang_Nam_Phueng_Market_01.jpg',
    gallery: [],
    source: 'https://www.tourismthailand.org',
  },
  {
    id: 7,
    name: 'วัดบางพลีใหญ่ใน (หลวงพ่อโต)',
    category: 'ศาสนา',
    address: 'ถนนเทพารักษ์, ตำบลบางพลีใหญ่, อำเภอบางพลี, จ.สมุทรปราการ 10540',
    time: '06:00 - 18:00 (ทุกวัน)',
    fee: 'เข้าชมฟรี',
    highlight: 'พระพุทธรูปปางมารวิชัยขนาดใหญ่ องค์หลวงพ่อโต',
    description:
      'วัดบางพลีใหญ่ในเป็นวัดเก่าแก่อายุกว่า 200 ปี มีพระพุทธรูปหลวงพ่อโต (พระพุทธศรีสุริโย) เป็นพระประธานขนาดใหญ่ ปางมารวิชัย สูงประมาณ 6 เมตร เป็นที่เคารพสักการะของประชาชน มีความเชื่อเรื่องความศักดิ์สิทธิ์',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Wat_Bang_Phli_Yai_Nai_01.jpg/800px-Wat_Bang_Phli_Yai_Nai_01.jpg',
    gallery: [],
    source: 'https://www.watbangpliyai.com',
  },
  {
    id: 8,
    name: 'ฟาร์มจระเข้และสวนสัตว์สมุทรปราการ (Samut Prakan Crocodile Farm)',
    category: 'ครอบครัว',
    address: '555 หมู่1 ถนนสุขุมวิท, ต.บางปูใหม่, อ.เมือง, จ.สมุทรปราการ 10280',
    time: '08:00 - 17:00 (ทุกวัน)',
    fee: 'ผู้ใหญ่ 200 บาท, เด็ก 100 บาท',
    highlight: 'แหล่งเพาะเลี้ยงจระเข้ที่ใหญ่ที่สุดในโลก มีการแสดงจระเข้และสัตว์นานาชนิด',
    description:
      'ฟาร์มจระเข้สมุทรปราการก่อตั้งขึ้นในปี พ.ศ. 2493 เป็นศูนย์เพาะเลี้ยงและอนุรักษ์จระเข้ที่ใหญ่ที่สุดในโลก มีจระเข้มากกว่า 60,000 ตัว นอกจากนี้ยังมีสวนสัตว์เล็กๆ และการแสดงของสัตว์ เช่น ช้าง ลิง และการแสดงจระเข้ดึงหัว นับเป็นแหล่งท่องเที่ยวสำหรับครอบครัว',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Samut_Prakan_Crocodile_Farm_01.jpg/800px-Samut_Prakan_Crocodile_Farm_01.jpg',
    gallery: [],
    source: 'https://www.crocodilefarm.com',
  },
];

// ฟังก์ชันช่วยค้นหาตาม ID
export function getPlaceById(id) {
  return places.find((p) => p.id === id);
}

// ฟังก์ชันค้นหาตามคำ
export function searchPlaces(query) {
  const q = query.toLowerCase();
  return places.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q) ||
      p.category.includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}