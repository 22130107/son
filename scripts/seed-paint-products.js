/**
 * Script nạp dữ liệu đầy đủ các loại sơn nước trên thị trường vào MySQL và thư mục public/uploads/products/
 * Chạy: node scripts/seed-paint-products.js
 */

const mysql = require("mysql2/promise");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  database: process.env.DB_NAME || "sonuocvungtau",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "12345",
  charset: "utf8mb4",
  timezone: "+07:00",
};

const PRODUCTS_DIR = path.join(__dirname, "../public/uploads/products");

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      return resolve(dest);
    }
    const client = url.startsWith("https") ? https : http;
    client.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", reject);
  });
}

const IMG_BASE = "https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F";
const WP_BASE = "https://sonnuocvungtau.com/wp-content/uploads/2021/01/";

const PAINT_PRODUCTS = [
  // ── 1. SƠN DULUX ──────────────────────────────────────────
  {
    slug: "son-dulux-weathershield-colour-protect",
    name: "Sơn Ngoại Thất Dulux Weathershield Colour Protect",
    category: "Sơn Dulux",
    price: "Liên hệ",
    description: "Sơn ngoại thất cao cấp Dulux Weathershield Colour Protect với công nghệ Active Guard chống phai màu tối ưu, chống bám bụi và rêu mốc vượt trội cho khí hậu nhiệt đới.",
    full_description: `<p><strong>Dulux Weathershield Colour Protect</strong> là dòng sơn nước ngoại thất cao cấp nhất của AkzoNobel. Được tích hợp công nghệ Smart Release giải phóng các phân tử thông minh bảo vệ màu sơn gấp 2 lần dưới ánh nắng mặt trời và mưa bão miền biển Vũng Tàu.</p>
<h4>Ưu điểm vượt trội:</h4>
<ul>
  <li>Chống phai màu đỉnh cao, bền màu đến 8 năm.</li>
  <li>Chống bám bẩn và làm mát tường nhà tới 5 độ C (Keep Cool).</li>
  <li>Kháng kiềm, kháng nấm mốc và chống loang màu muối hóa.</li>
  <li>Đạt chứng nhận xanh Singapore Green Building Product.</li>
</ul>
<h4>Quy trình thi công:</h4>
<p>Bột trét ngoại thất Dulux (2 lớp) &rarr; Sơn lót ngoại thất Dulux Weathershield (1 lớp) &rarr; Sơn phủ Dulux Weathershield Colour Protect (2 lớp).</p>`,
    imgSource: `${WP_BASE}dulux-weathershield-powerflexx-250x250-1.png`,
    imgFilename: "dulux-weathershield.png",
    specs: {
      "Xuất xứ": "AkzoNobel (Hà Lan / Việt Nam)",
      "Loại sơn": "Sơn nước ngoại thất cao cấp",
      "Bề mặt hoàn thiện": "Bóng nhẹ (Sheen) & Mờ (Matt)",
      "Độ phủ lý thuyết": "11 – 13 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 15L",
      "Thời gian khô": "Khô bề mặt 30 phút, sơn lớp sau sau 2 giờ",
    },
  },
  {
    slug: "son-dulux-ambiance-5in1-superflexx",
    name: "Sơn Nội Thất Siêu Cao Cấp Dulux Ambiance 5in1",
    category: "Sơn Dulux",
    price: "Liên hệ",
    description: "Sơn nội thất siêu cao cấp Dulux Ambiance 5in1 mang lại bề mặt láng mịn hoàn hảo, màng sơn co giãn đàn hồi che lấp vết nứt nhỏ và kháng khuẩn bảo vệ sức khỏe.",
    full_description: `<p><strong>Dulux Ambiance 5in1</strong> khẳng định đẳng cấp không gian sống với 5 tính năng bảo vệ toàn diện: bề mặt láng mịn sang trọng, che lấp khe nứt nhỏ, dễ lau chùi, kháng khuẩn và nấm mốc.</p>
<h4>Tính năng nổi bật:</h4>
<ul>
  <li>Màng sơn co giãn Superflexx đàn hồi gấp 3 lần sơn thông thường.</li>
  <li>Kháng khuẩn tối đa, ngăn ngừa 99% vi khuẩn có hại bám trên tường.</li>
  <li>Màu sắc thanh lịch, độ bền màu tuyệt hảo.</li>
  <li>Không chứa chì, thủy ngân, mùi dịu nhẹ thân thiện môi trường.</li>
</ul>`,
    imgSource: `${WP_BASE}unnamed.png`,
    imgFilename: "dulux-ambiance-5in1.png",
    specs: {
      "Xuất xứ": "AkzoNobel (Việt Nam)",
      "Loại sơn": "Sơn nước nội thất siêu cao cấp",
      "Bề mặt hoàn thiện": "Bóng ngọc trai sang trọng",
      "Độ phủ lý thuyết": "13 – 16 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L",
      "Thời gian khô": "Khô bề mặt 30 phút",
    },
  },
  {
    slug: "son-dulux-easyclean-chong-bam-ban",
    name: "Sơn Nội Thất Dulux EasyClean Chống Bám Bẩn",
    category: "Sơn Dulux",
    price: "Liên hệ",
    description: "Sơn nội thất Dulux EasyClean với công nghệ Chống Bám Bẩn Chủ Động ngăn chặn các vết bẩn cứng đầu thấm sâu vào màng sơn, giúp lau chùi dễ dàng.",
    full_description: `<p><strong>Dulux EasyClean</strong> được thiết kế đặc biệt cho các gia đình có trẻ nhỏ. Công nghệ chống bám bẩn chủ động giúp các vết cà phê, nước ngọt, bút chì màu, tương cà có thể lau sạch chỉ bằng khăn ẩm xà phòng mà không làm trôi màng sơn.</p>`,
    imgSource: `${WP_BASE}son-nuoc-noi-that-dulux-easy-clean-lau-chui-hieu-qua-mo-ntp.jpg`,
    imgFilename: "dulux-easyclean.jpg",
    specs: {
      "Xuất xứ": "AkzoNobel (Việt Nam)",
      "Loại sơn": "Sơn nước nội thất dễ lau chùi",
      "Bề mặt hoàn thiện": "Bóng và Mờ",
      "Độ phủ lý thuyết": "12 – 14 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },
  {
    slug: "chat-chong-tham-dulux-aquatech-vuot-troi",
    name: "Chất Chống Thấm Cao Cấp Dulux Aquatech",
    category: "Sơn Dulux",
    price: "Liên hệ",
    description: "Chất chống thấm tường đứng Dulux Aquatech ứng dụng công nghệ Hydroshield tăng cường liên kết hóa học, ngăn nước thẩm thấu vào cấu trúc tường bê tông.",
    full_description: `<p><strong>Dulux Aquatech</strong> là giải pháp chống thấm tường ngoài hoàn hảo, không cần pha trộn xi măng, thi công trực tiếp nhanh chóng, che lấp các vết rạn nứt chân chim hiệu quả.</p>`,
    imgSource: `${WP_BASE}img-20181014-121320.jpg`,
    imgFilename: "dulux-aquatech.jpg",
    specs: {
      "Xuất xứ": "AkzoNobel (Việt Nam)",
      "Loại sơn": "Chất chống thấm tường đứng",
      "Bề mặt hoàn thiện": "Màu ghi xám / ghi nhạt",
      "Độ phủ lý thuyết": "4 – 5 m²/kg/2 lớp",
      "Quy cách đóng gói": "Thùng 6kg và Thùng 20kg",
      "Thời gian khô": "1 – 2 giờ",
    },
  },
  {
    slug: "son-lot-ngoai-that-dulux-weathershield-chong-kiem",
    name: "Sơn Lót Ngoại Thất Dulux Weathershield Chống Kiềm",
    category: "Sơn Dulux",
    price: "Liên hệ",
    description: "Sơn lót cao cấp ngoài trời Dulux Weathershield ngăn chặn sự kiềm hóa từ xi măng, tăng cường độ bám dính và giữ cho lớp sơn phủ luôn tươi màu.",
    full_description: `<p>Sơn lót ngoài trời Dulux là lớp màng đệm thiết yếu giúp trung hòa nồng độ pH của tường trát xi măng, chống kiềm hóa muối hóa gây ố vàng và bong tróc lớp sơn ngoài.</p>`,
    imgSource: `${IMG_BASE}37ac5fb801efb95cd460f6045dcd54df3a19203f.jpg?generation=1777545030665669&alt=media`,
    imgFilename: "dulux-weathershield-primer.jpg",
    specs: {
      "Xuất xứ": "AkzoNobel (Việt Nam)",
      "Loại sơn": "Sơn lót kháng kiềm ngoại thất",
      "Bề mặt hoàn thiện": "Trắng mờ",
      "Độ phủ lý thuyết": "10 – 12 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },

  // ── 2. SƠN JOTUN ──────────────────────────────────────────
  {
    slug: "son-jotun-jotashield-ben-mau-toi-uu",
    name: "Sơn Ngoại Thất Jotun Jotashield Bền Màu Tối Ưu",
    category: "Sơn Jotun",
    price: "Liên hệ",
    description: "Dòng sơn ngoại thất cao cấp nhất của Jotun với công nghệ chất tạo màu tiên tiến, chống tia UV vượt trội và chống bám bụi bẩn tối ưu.",
    full_description: `<p><strong>Jotun Jotashield Bền Màu Tối Ưu</strong> được thử nghiệm và chứng minh độ bền màu vượt thời gian tại vùng khí hậu khắc nghiệt miền duyên hải. Khả năng kháng tia cực tím tối đa giúp ngôi nhà luôn rạng rỡ như mới.</p>
<h4>Đặc tính kỹ thuật:</h4>
<ul>
  <li>Kháng tia cực tím UV gấp 2 lần.</li>
  <li>Chống bám bụi bẩn, tự rửa sạch màng sơn khi trời mưa.</li>
  <li>Ngăn ngừa nấm mốc và rêu phong triệt để.</li>
  <li>Bảo vệ công trình lên đến 12 năm.</li>
</ul>`,
    imgSource: `${WP_BASE}tai-xuong.jpg`,
    imgFilename: "jotun-jotashield.jpg",
    specs: {
      "Xuất xứ": "Jotun (Na Uy / Việt Nam)",
      "Loại sơn": "Sơn ngoại thất siêu cao cấp",
      "Bề mặt hoàn thiện": "Bóng / Mờ",
      "Độ phủ lý thuyết": "11 – 13 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 15L",
      "Thời gian khô": "Khô bề mặt 30 phút",
    },
  },
  {
    slug: "son-jotun-majestic-dep-hoan-hao",
    name: "Sơn Nội Thất Cao Cấp Jotun Majestic Đẹp Hoàn Hảo",
    category: "Sơn Jotun",
    price: "Liên hệ",
    description: "Sơn nội thất Majestic Đẹp Hoàn Hảo mang đến màu sắc rực rỡ, bề mặt láng mịn sang trọng và khả năng lau chùi vết bẩn dễ dàng.",
    full_description: `<p><strong>Jotun Majestic Đẹp Hoàn Hảo</strong> kết hợp công nghệ màu đích thực của Jotun, giúp tái hiện chính xác từng gam màu sắc nét, ấm cúng. Sơn không mùi, an toàn tuyệt đối cho trẻ em và người già.</p>`,
    imgSource: `${WP_BASE}2.jpg`,
    imgFilename: "jotun-majestic.jpg",
    specs: {
      "Xuất xứ": "Jotun (Việt Nam)",
      "Loại sơn": "Sơn nước nội thất cao cấp",
      "Bề mặt hoàn thiện": "Bóng ánh ngọc và Mờ mịn",
      "Độ phủ lý thuyết": "12 – 14 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 15L",
      "Thời gian khô": "30 phút",
    },
  },
  {
    slug: "son-jotun-waterguard-chong-tham",
    name: "Sơn Chống Thấm Tường Đứng Jotun WaterGuard",
    category: "Sơn Jotun",
    price: "Liên hệ",
    description: "Sơn chống thấm gốc acrylic biến tính Jotun WaterGuard bảo vệ tường nhà khỏi sự xâm nhập của nước mưa, độ đàn hồi cao che phủ vết nứt nhỏ.",
    full_description: `<p><strong>Jotun WaterGuard</strong> không cần pha xi măng, màu sắc phong phú (xám nhạt, xám đậm, vàng kem). Màng sơn đàn hồi cao giúp ngăn chặn rêu mốc và ẩm mốc chân tường hiệu quả.</p>`,
    imgSource: `${WP_BASE}son_wg.jpg`,
    imgFilename: "jotun-waterguard.jpg",
    specs: {
      "Xuất xứ": "Jotun (Việt Nam)",
      "Loại sơn": "Sơn chống thấm tường đứng",
      "Bề mặt hoàn thiện": "Mờ",
      "Độ phủ lý thuyết": "6 – 7 m²/lít/2 lớp",
      "Quy cách đóng gói": "Lon 6kg và Thùng 20kg",
      "Thời gian khô": "2 giờ",
    },
  },
  {
    slug: "son-jotun-essence-de-lau-chui",
    name: "Sơn Nội Thất Jotun Essence Dễ Lau Chùi",
    category: "Sơn Jotun",
    price: "Liên hệ",
    description: "Sơn nội thất Jotun Essence dễ lau chùi, độ che phủ cao, mùi nhẹ, thân thiện với môi trường và mang lại bề mặt tường sáng bóng mịn màng.",
    full_description: `<p>Jotun Essence Dễ Lau Chùi là sự lựa chọn kinh tế thông minh cho ngôi nhà của bạn. Các vết bẩn thông thường như cà phê, vết ố bẩn nhẹ dễ dàng được làm sạch mà không làm trôi màu sơn.</p>`,
    imgSource: `${IMG_BASE}f1f2b14887a0c2b9e3497e86d6eadb61a2fb03fa.jpg?generation=1777545030868159&alt=media`,
    imgFilename: "jotun-essence.jpg",
    specs: {
      "Xuất xứ": "Jotun (Việt Nam)",
      "Loại sơn": "Sơn nội thất dễ lau chùi",
      "Bề mặt hoàn thiện": "Mờ mịn",
      "Độ phủ lý thuyết": "10 – 12 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 17L",
      "Thời gian khô": "30 phút",
    },
  },
  {
    slug: "son-lot-jotun-ultra-primer-chong-kiem",
    name: "Sơn Lót Cao Cấp Jotun Ultra Primer Kháng Kiềm",
    category: "Sơn Jotun",
    price: "Liên hệ",
    description: "Sơn lót gốc nước cao cấp Jotun Ultra Primer có độ bám dính tuyệt hảo trên bề mặt bê tông mới và tường ẩm, chống kiềm hóa muối hóa cực mạnh.",
    full_description: `<p>Jotun Ultra Primer có khả năng thi công ngay trên tường bê tông còn độ ẩm cao (sau 3 ngày trát), giúp đẩy nhanh tiến độ hoàn thiện công trình mà vẫn đảm bảo độ bền tối đa.</p>`,
    imgSource: `${IMG_BASE}a45b046fd329713eda212f9f33d023d6f6a40684.jpg?generation=1777545030958176&alt=media`,
    imgFilename: "jotun-ultra-primer.jpg",
    specs: {
      "Xuất xứ": "Jotun (Việt Nam)",
      "Loại sơn": "Sơn lót kháng kiềm đa năng",
      "Bề mặt hoàn thiện": "Trắng sữa",
      "Độ phủ lý thuyết": "9 – 11 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 17L",
      "Thời gian khô": "30 phút",
    },
  },

  // ── 3. SƠN KOVA ───────────────────────────────────────────
  {
    slug: "chat-chong-tham-cao-cap-kova-ct-11a-plus",
    name: "Chất Chống Thấm Cao Cấp Kova CT-11A Plus Tường",
    category: "Sơn Kova",
    price: "Liên hệ",
    description: "Hợp chất chống thấm số 1 thị trường Việt Nam Kova CT-11A Plus có khả năng ngăn chặn nước thẩm thấu tuyệt hảo từ bên ngoài vào trong cấu trúc xi măng.",
    full_description: `<p><strong>Kova CT-11A Plus Tường</strong> được tổng hợp từ Acrylonitrile và Alkylsiloxan, tạo liên kết chặt chẽ với bê tông và vữa xi măng. Độ bền chống thấm đã được thử nghiệm thực tế lên đến 15 năm.</p>
<h4>Ưu điểm:</h4>
<ul>
  <li>Chống thấm tuyệt đối cho tường ngoài, sàn ban công, sân thượng.</li>
  <li>Chịu mài mòn, chịu nước mặn, kháng kiềm cực cao.</li>
  <li>Không chứa chất độc hại, an toàn tuyệt đối cho người thi công và người sử dụng.</li>
</ul>`,
    imgSource: `${WP_BASE}kova-ct11a.jpg`,
    imgFilename: "kova-ct11a.jpg",
    specs: {
      "Xuất xứ": "Tập đoàn Sơn Kova (Việt Nam)",
      "Loại sơn": "Chất chống thấm pha xi măng",
      "Bề mặt hoàn thiện": "Màu xi măng xám",
      "Độ phủ lý thuyết": "2.0 – 2.5 m²/kg/2 lớp",
      "Quy cách đóng gói": "Lon 4kg và Thùng 20kg",
      "Thời gian khô": "1 – 2 giờ",
    },
  },
  {
    slug: "son-bong-noi-that-cao-cap-kova-k-5500",
    name: "Sơn Bóng Cao Cấp Trong Nhà Kova K-5500",
    category: "Sơn Kova",
    price: "Liên hệ",
    description: "Sơn nước nội thất bóng cao cấp Kova K-5500 cho màng sơn nhẵn bóng lộng lẫy, lau chùi vết bẩn dễ dàng và kháng khuẩn bảo vệ không gian sống.",
    full_description: `<p>Kova K-5500 là dòng sơn nội thất cao cấp của Kova, bề mặt bóng lộng lẫy giúp phản chiếu ánh sáng tự nhiên, tăng vẻ sang trọng cho phòng khách, phòng ngủ và biệt thự cao cấp.</p>`,
    imgSource: `${WP_BASE}son-nuoc-noi-that-4140.jpg`,
    imgFilename: "kova-k5500.jpg",
    specs: {
      "Xuất xứ": "Kova (Việt Nam)",
      "Loại sơn": "Sơn nội thất siêu bóng",
      "Bề mặt hoàn thiện": "Bóng cao",
      "Độ phủ lý thuyết": "12 – 14 m²/kg/lớp",
      "Quy cách đóng gói": "Lon 4kg và Thùng 20kg",
      "Thời gian khô": "30 phút",
    },
  },
  {
    slug: "son-bong-ngoai-that-kova-k-5501",
    name: "Sơn Bóng Cao Cấp Ngoài Trời Kova K-5501",
    category: "Sơn Kova",
    price: "Liên hệ",
    description: "Sơn ngoại thất cao cấp Kova K-5501 màng sơn bóng đẹp, chống thấm nước, chống rêu mốc và tia UV, giữ màu sắc công trình luôn tươi mới.",
    full_description: `<p>Kova K-5501 là dòng sơn bóng ngoại thất danh tiếng chịu được nắng mưa nhiệt đới gió mùa của Vũng Tàu. Khả năng đàn hồi giúp màng sơn không bị nứt chân chim theo thời gian.</p>`,
    imgSource: `${WP_BASE}son-nuoc-ngoai-that-8665.jpg`,
    imgFilename: "kova-k5501.jpg",
    specs: {
      "Xuất xứ": "Kova (Việt Nam)",
      "Loại sơn": "Sơn ngoại thất bóng cao cấp",
      "Bề mặt hoàn thiện": "Bóng ngọc",
      "Độ phủ lý thuyết": "11 – 13 m²/kg/lớp",
      "Quy cách đóng gói": "Lon 4kg và Thùng 20kg",
      "Thời gian khô": "45 phút",
    },
  },
  {
    slug: "son-lot-khang-kiem-ngoai-troi-kova-k-209",
    name: "Sơn Lót Kháng Kiềm Ngoài Trời Kova K-209",
    category: "Sơn Kova",
    price: "Liên hệ",
    description: "Sơn lót kháng kiềm ngoài trời Kova K-209 bảo vệ lớp sơn phủ không bị loang ố do kiềm trong vữa hồ và độ ẩm cao.",
    full_description: `<p>Sơn lót Kova K-209 có độ bám dính cực tốt vào bề mặt bê tông, tạo lớp màng ngăn cản sự thấm ẩm và kiềm hóa, giữ cho lớp sơn bóng ngoài trời luôn sáng đẹp.</p>`,
    imgSource: `${WP_BASE}thung-son-gia-da.png`,
    imgFilename: "kova-k209-primer.png",
    specs: {
      "Xuất xứ": "Kova (Việt Nam)",
      "Loại sơn": "Sơn lót kháng kiềm ngoại thất",
      "Bề mặt hoàn thiện": "Trắng mờ",
      "Độ phủ lý thuyết": "9 – 11 m²/kg/lớp",
      "Quy cách đóng gói": "Lon 4kg và Thùng 20kg",
      "Thời gian khô": "30 phút",
    },
  },

  // ── 4. SƠN NIPPON ─────────────────────────────────────────
  {
    slug: "son-nippon-weathergard-plus",
    name: "Sơn Ngoại Thất Siêu Bền Nippon WeatherGard Plus+",
    category: "Sơn Nippon",
    price: "Liên hệ",
    description: "Sơn ngoại thất cao cấp Nippon WeatherGard Plus+ với công nghệ Micro-gel chống nóng phản xạ nhiệt, chống rêu mốc và bảo vệ màu sắc vượt trội.",
    full_description: `<p><strong>Nippon WeatherGard Plus+</strong> là sản phẩm sơn nước ngoại thất cao cấp của tập đoàn Nippon Paint Nhật Bản. Công nghệ tiên tiến giúp giảm nhiệt độ bề mặt tường tới 5 độ C, tiết kiệm điện năng cho điều hòa.</p>`,
    imgSource: `${WP_BASE}wg.jpg`,
    imgFilename: "nippon-weathergard.jpg",
    specs: {
      "Xuất xứ": "Nippon Paint (Nhật Bản / Việt Nam)",
      "Loại sơn": "Sơn ngoại thất siêu bền",
      "Bề mặt hoàn thiện": "Bóng và Mờ",
      "Độ phủ lý thuyết": "11 – 13 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },
  {
    slug: "son-nippon-odour-less-all-in-one",
    name: "Sơn Nội Thất Không Mùi Nippon Odour-less All-in-1",
    category: "Sơn Nippon",
    price: "Liên hệ",
    description: "Sơn nội thất Nippon Odour-less All-in-1 gần như không mùi trong quá trình thi công và sau khi sơn, hàm lượng VOC cực thấp, an toàn tuyệt đối.",
    full_description: `<p>Dòng sơn cao cấp thân thiện với môi trường của Nhật Bản, phù hợp sơn cho phòng ngủ, trường học, bệnh viện, nhà hàng nơi cần đưa vào sử dụng ngay sau khi thi công.</p>`,
    imgSource: `${WP_BASE}ol_crvt.jpg`,
    imgFilename: "nippon-odourless.jpg",
    specs: {
      "Xuất xứ": "Nippon Paint (Việt Nam)",
      "Loại sơn": "Sơn nội thất xanh không mùi",
      "Bề mặt hoàn thiện": "Bóng ngọc trai",
      "Độ phủ lý thuyết": "12 – 14 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },
  {
    slug: "son-nippon-matex-noi-that",
    name: "Sơn Nội Thất Kinh Tế Nippon Matex",
    category: "Sơn Nippon",
    price: "Liên hệ",
    description: "Sơn nước trong nhà Nippon Matex đem lại độ phủ cao, màng sơn mịn màng, dễ thi công và có chi phí vô cùng kinh tế.",
    full_description: `<p>Nippon Matex là dòng sơn nội thất thông dụng nhất của Nippon Paint, lý tưởng cho tường và trần thạch cao nội thất với màu sắc đa dạng và độ phủ tuyệt vời.</p>`,
    imgSource: `${WP_BASE}supermatex.jpg`,
    imgFilename: "nippon-matex.jpg",
    specs: {
      "Xuất xứ": "Nippon Paint (Việt Nam)",
      "Loại sơn": "Sơn nội thất kinh tế",
      "Bề mặt hoàn thiện": "Mờ",
      "Độ phủ lý thuyết": "12 – 14 m²/lít/lớp",
      "Quy cách đóng gói": "Thùng 5L và Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },
  {
    slug: "son-lot-nippon-weathergard-sealer",
    name: "Sơn Lót Ngoại Thất Nippon WeatherGard Sealer",
    category: "Sơn Nippon",
    price: "Liên hệ",
    description: "Sơn lót kháng kiềm ngoại thất Nippon WeatherGard Sealer ngăn ngừa sự phá hủy của kiềm và phấn hóa xi măng, tăng cường độ bám dính.",
    full_description: `<p>Được pha chế đặc biệt với hàm lượng keo acrylic cao, Nippon WeatherGard Sealer thẩm thấu sâu vào bề mặt tường bê tông, tạo chân bám vững chắc cho lớp sơn phủ.</p>`,
    imgSource: `${WP_BASE}NP-VATEX-17L.upload-280x280.jpg`,
    imgFilename: "nippon-sealer.jpg",
    specs: {
      "Xuất xứ": "Nippon Paint (Việt Nam)",
      "Loại sơn": "Sơn lót kháng kiềm ngoại thất",
      "Bề mặt hoàn thiện": "Trắng mờ",
      "Độ phủ lý thuyết": "10 – 12 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },

  // ── 5. SƠN MYKOLOR ────────────────────────────────────────
  {
    slug: "son-mykolor-grand-quartz-feel",
    name: "Sơn Ngoại Thất Siêu Bóng Mykolor Grand Quartz Feel",
    category: "Sơn Mykolor",
    price: "Liên hệ",
    description: "Sơn ngoại thất siêu bóng Mykolor Grand Quartz Feel sang trọng, chống bám bụi bẩn, chống rêu mốc và chịu được thời tiết nhiệt đới khắc nghiệt.",
    full_description: `<p><strong>Mykolor Grand Quartz Feel</strong> là dòng sơn ngoại thất đỉnh cao của 4 Oranges. Màng sơn siêu bóng sáng lấp lánh như pha lê, ngăn chặn hoàn toàn bụi bẩn bám dính vào bề mặt tường nhà.</p>`,
    imgSource: `${WP_BASE}son-nuoc-ngoai-that-1-2096.jpg`,
    imgFilename: "mykolor-grand-quartz.jpg",
    specs: {
      "Xuất xứ": "4 Oranges (Việt Nam)",
      "Loại sơn": "Sơn ngoại thất siêu bóng",
      "Bề mặt hoàn thiện": "Siêu bóng",
      "Độ phủ lý thuyết": "12 – 14 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 4.375L và Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },
  {
    slug: "son-mykolor-touch-ilka-finish",
    name: "Sơn Nội Thất Siêu Láng Mịn Mykolor Touch Ilka Finish",
    category: "Sơn Mykolor",
    price: "Liên hệ",
    description: "Sơn nội thất láng mịn cao cấp Mykolor Touch Ilka Finish với hơn 1040 màu sắc hiện đại, mang lại vẻ đẹp quý phái cho không gian nội thất.",
    full_description: `<p>Bộ sưu tập sơn Mykolor Touch được các kiến trúc sư yêu thích bởi bảng màu tinh tế, độ mịn màng như lụa và khả năng lau chùi vết bẩn hiệu quả.</p>`,
    imgSource: `${WP_BASE}son-nuoc-noi-that-1-9853.jpg`,
    imgFilename: "mykolor-touch-ilka.jpg",
    specs: {
      "Xuất xứ": "4 Oranges (Việt Nam)",
      "Loại sơn": "Sơn nội thất cao cấp láng mịn",
      "Bề mặt hoàn thiện": "Mờ sang trọng",
      "Độ phủ lý thuyết": "11 – 13 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 4.375L và Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },
  {
    slug: "hop-chat-chong-tham-mykolor-water-seal",
    name: "Hợp Chất Chống Thấm Pha Xi Măng Mykolor Water Seal",
    category: "Sơn Mykolor",
    price: "Liên hệ",
    description: "Chất chống thấm pha xi măng Mykolor Water Seal bảo vệ tối ưu chống ẩm và thấm dột cho tường đứng, bể nước, sân thượng và sàn nhà vệ sinh.",
    full_description: `<p>Hợp chất chống thấm chuyên dụng Mykolor liên kết chắc chắn với xi măng cát tạo nên lớp màng ngăn nước liên tục, bền vững cùng tuổi thọ công trình.</p>`,
    imgSource: `${WP_BASE}8eae1908cf222a7c7333-663.jpg`,
    imgFilename: "mykolor-water-seal.jpg",
    specs: {
      "Xuất xứ": "4 Oranges (Việt Nam)",
      "Loại sơn": "Chống thấm pha xi măng",
      "Bề mặt hoàn thiện": "Màu xám xi măng",
      "Độ phủ lý thuyết": "5 – 6 m²/kg/2 lớp",
      "Quy cách đóng gói": "Lon 4.375kg và Thùng 18kg",
      "Thời gian khô": "1 – 2 giờ",
    },
  },

  // ── 6. SƠN MAXILITE ───────────────────────────────────────
  {
    slug: "son-nuoc-ngoai-that-maxilite-tough",
    name: "Sơn Nước Ngoại Thất Maxilite Tough Bền Màu",
    category: "Sơn Maxilite",
    price: "Liên hệ",
    description: "Sơn ngoại thất Maxilite Tough từ AkzoNobel với công nghệ SuperLock chống bong tróc, màu sắc bền đẹp và chi phí đầu tư vô cùng hợp lý.",
    full_description: `<p><strong>Maxilite Tough</strong> là dòng sơn nước ngoài trời kinh tế bán chạy số một cho các công trình nhà phố, dãy trọ, văn phòng cho thuê với độ bền màu và màng sơn đanh chắc.</p>`,
    imgSource: `${IMG_BASE}d2bebc07683c9f6c3019ee50f589acb3a713a551.png?generation=1777545030716546&alt=media`,
    imgFilename: "maxilite-tough.png",
    specs: {
      "Xuất xứ": "AkzoNobel (Việt Nam)",
      "Loại sơn": "Sơn ngoại thất kinh tế",
      "Bề mặt hoàn thiện": "Mờ",
      "Độ phủ lý thuyết": "10 – 12 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },
  {
    slug: "son-nuoc-trong-nha-maxilite-total",
    name: "Sơn Nước Trong Nhà Maxilite Total",
    category: "Sơn Maxilite",
    price: "Liên hệ",
    description: "Sơn nội thất Maxilite Total có độ phủ cao, màng sơn mịn đẹp, màu sắc phong phú, giải pháp tiết kiệm hàng đầu cho ngôi nhà bạn.",
    full_description: `<p>Maxilite Total trong nhà cho bề mặt tường sáng láng mịn, che lấp các khuyết điểm nhỏ của tường trát hồ, thi công nhẹ tay và nhanh khô.</p>`,
    imgSource: `${IMG_BASE}8db009924f1c1e1ec837548cfebd88247697e7cd.png?generation=1777545030647762&alt=media`,
    imgFilename: "maxilite-total.png",
    specs: {
      "Xuất xứ": "AkzoNobel (Việt Nam)",
      "Loại sơn": "Sơn nội thất kinh tế",
      "Bề mặt hoàn thiện": "Mờ mịn",
      "Độ phủ lý thuyết": "11 – 13 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },
  {
    slug: "son-lot-khang-kiem-maxilite",
    name: "Sơn Lót Kháng Kiềm Maxilite",
    category: "Sơn Maxilite",
    price: "Liên hệ",
    description: "Sơn lót kháng kiềm Maxilite bảo vệ màng sơn phủ không bị loang ố kiềm hóa, gia tăng độ bám dính và tiết kiệm lượng sơn phủ bề mặt.",
    full_description: `<p>Sơn lót kháng kiềm Maxilite là bước chuẩn bị bề mặt hoàn hảo cho các công trình dùng sơn Maxilite hoặc Dulux, giúp tăng tuổi thọ toàn bộ hệ sơn.</p>`,
    imgSource: `${IMG_BASE}e7d250cd1f1e39d2ab8ef8d78d39c43789509bb9.jpg?generation=1777545030662315&alt=media`,
    imgFilename: "maxilite-primer.jpg",
    specs: {
      "Xuất xứ": "AkzoNobel (Việt Nam)",
      "Loại sơn": "Sơn lót kháng kiềm",
      "Bề mặt hoàn thiện": "Trắng mờ",
      "Độ phủ lý thuyết": "10 – 12 m²/lít/lớp",
      "Quy cách đóng gói": "Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },

  // ── 7. SƠN MẶT TRỜI VIỆT NASUN ────────────────────────────
  {
    slug: "son-ngoai-that-sieu-bong-nasun-diamond-shield",
    name: "Sơn Ngoại Thất Siêu Bóng NaSun Diamond Shield",
    category: "Sơn NaSun",
    price: "Liên hệ",
    description: "Sơn ngoại thất siêu bóng NaSun Diamond Shield công nghệ hạt Nano Kim Cương tự làm sạch, chống bám bụi và kháng kiềm muối ven biển cực tốt.",
    full_description: `<p><strong>Sơn Mặt Trời Việt NaSun Diamond Shield</strong> là dòng sản phẩm cao cấp được đặc chế riêng cho khí hậu nắng gió và hơi ẩm mặn của Vũng Tàu. Màng sơn siêu bóng sáng như ngọc trai, chống rêu mốc và tia UV bền vững trên 10 năm.</p>
<h4>Tính năng kỹ thuật:</h4>
<ul>
  <li>Công nghệ hạt Nano chống bám bẩn tự rửa sạch bề mặt.</li>
  <li>Chống kiềm hóa, muối hóa và ố vàng cực mạnh.</li>
  <li>Màu sắc tươi sáng, đa dạng lựa chọn theo phong thủy.</li>
</ul>`,
    imgSource: `${WP_BASE}son-chong-tham-tot-va-gia-re-vung-tau2.jpg`,
    imgFilename: "nasun-diamond-shield.jpg",
    specs: {
      "Xuất xứ": "Sơn Mặt Trời Việt NaSun (Việt Nam)",
      "Loại sơn": "Sơn ngoại thất siêu bóng công nghệ Nano",
      "Bề mặt hoàn thiện": "Bóng ngọc trai sang trọng",
      "Độ phủ lý thuyết": "12 – 14 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },
  {
    slug: "son-noi-that-khang-khuan-nasun-nano-silver",
    name: "Sơn Nội Thất Kháng Khuẩn NaSun Nano Silver",
    category: "Sơn NaSun",
    price: "Liên hệ",
    description: "Sơn nội thất cao cấp NaSun Nano Silver chứa các ion bạc kháng khuẩn 99.9%, lau chùi vết bẩn vượt trội, bảo vệ sức khỏe cho cả gia đình.",
    full_description: `<p>NaSun Nano Silver tạo nên không gian sống xanh, trong lành và thư thái. Màng sơn nhẵn mịn, màu sắc tinh tế, dễ lau chùi các vết bẩn sinh hoạt hàng ngày mà không sợ bay màu.</p>`,
    imgSource: `${IMG_BASE}661a15c10c9ed86b73edf7eb17d4642990cc86f4.png?generation=1777545199454855&alt=media`,
    imgFilename: "nasun-nano-silver.png",
    specs: {
      "Xuất xứ": "NaSun (Việt Nam)",
      "Loại sơn": "Sơn nội thất kháng khuẩn",
      "Bề mặt hoàn thiện": "Bóng mờ lụa",
      "Độ phủ lý thuyết": "12 – 15 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },
  {
    slug: "chat-chong-tham-da-nang-nasun-ct-01",
    name: "Hợp Chất Chống Thấm Đa Năng NaSun CT-01",
    category: "Sơn NaSun",
    price: "Liên hệ",
    description: "Chất chống thấm đa năng NaSun CT-01 pha xi măng chuyên trị thấm nứt sàn mái, ban công, vách hông nhà phố và nhà vệ sinh triệt để.",
    full_description: `<p>NaSun CT-01 tạo liên kết tinh thể bám sâu vào lỗ rỗng mao dẫn của bê tông, ngăn chặn tuyệt đối nguồn nước ngấm vào kết cấu công trình xây dựng.</p>`,
    imgSource: `${IMG_BASE}774ea9010fbe9ca2f453fb3286420a020e258fbe.png?generation=1777545199479168&alt=media`,
    imgFilename: "nasun-ct01.png",
    specs: {
      "Xuất xứ": "NaSun (Việt Nam)",
      "Loại sơn": "Chống thấm đa năng pha xi măng",
      "Bề mặt hoàn thiện": "Màu xám xi măng",
      "Độ phủ lý thuyết": "4 – 5 m²/kg/2 lớp",
      "Quy cách đóng gói": "Lon 5kg và Thùng 20kg",
      "Thời gian khô": "1 – 2 giờ",
    },
  },

  // ── 8. SƠN TOA ────────────────────────────────────────────
  {
    slug: "son-ngoai-that-toa-nanoshield",
    name: "Sơn Ngoại Thất TOA NanoShield Chống Bám Bẩn",
    category: "Sơn TOA",
    price: "Liên hệ",
    description: "Sơn nước ngoại thất cao cấp TOA NanoShield với công nghệ Nano từ Đức, chống bám bẩn, chống rêu mốc và bền màu trước thời tiết nhiệt đới.",
    full_description: `<p><strong>TOA NanoShield</strong> sở hữu các hạt Nano Silicon có tính năng đẩy lùi nước và chất bẩn, giúp bề mặt tường nhà luôn sạch bóng như mới sau mỗi cơn mưa rào.</p>`,
    imgSource: `${IMG_BASE}5fef1a46ece711b9c8fe34c127c7f1240a727283.jpg?generation=1777545199456994&alt=media`,
    imgFilename: "toa-nanoshield.jpg",
    specs: {
      "Xuất xứ": "TOA (Thái Lan / Việt Nam)",
      "Loại sơn": "Sơn ngoại thất công nghệ Nano",
      "Bề mặt hoàn thiện": "Bóng",
      "Độ phủ lý thuyết": "11 – 13 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },
  {
    slug: "son-noi-that-toa-nanoclean",
    name: "Sơn Nội Thất TOA NanoClean Kháng Khuẩn",
    category: "Sơn TOA",
    price: "Liên hệ",
    description: "Sơn nội thất TOA NanoClean với các hạt Nano Silver kháng khuẩn vượt trội, bề mặt nhẵn mịn, lau chùi vết bẩn dễ dàng.",
    full_description: `<p>Sơn nội thất TOA NanoClean diệt khuẩn đến 99.9%, bảo vệ sức khỏe cho các thành viên trong gia đình, mùi thơm dễ chịu và an toàn cho môi trường sống.</p>`,
    imgSource: `${IMG_BASE}439848eaac656467136c16a44ae91aa17dec0682.jpg?generation=1777545199464215&alt=media`,
    imgFilename: "toa-nanoclean.jpg",
    specs: {
      "Xuất xứ": "TOA (Thái Lan / Việt Nam)",
      "Loại sơn": "Sơn nội thất kháng khuẩn",
      "Bề mặt hoàn thiện": "Bóng mờ",
      "Độ phủ lý thuyết": "12 – 14 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút",
    },
  },
];

async function run() {
  console.log("🚀 Bắt đầu quá trình nạp sơn nước vào cơ sở dữ liệu...\n");

  // 1. Tải toàn bộ ảnh sản phẩm về thư mục public/uploads/products/
  console.log("📸 [1/3] Tải và lưu hình ảnh sản phẩm về local (public/uploads/products/)...");
  if (!fs.existsSync(PRODUCTS_DIR)) {
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
  }

  for (const p of PAINT_PRODUCTS) {
    const dest = path.join(PRODUCTS_DIR, p.imgFilename);
    try {
      await downloadFile(p.imgSource, dest);
      console.log(`  ✔ [OK] ${p.name} -> /uploads/products/${p.imgFilename}`);
    } catch (err) {
      console.warn(`  ⚠️ Không tải được ảnh ${p.imgSource}: ${err.message}`);
    }
  }

  // 2. Kết nối MySQL và chèn dữ liệu
  console.log("\n💾 [2/3] Kết nối MySQL và chèn dữ liệu bảng products, product_images, product_specs...");
  let conn;
  try {
    conn = await mysql.createConnection(DB_CONFIG);
    console.log("  ✔ Kết nối MySQL thành công!");

    // Xóa sản phẩm cũ (chỉ xóa bảng liên quan products)
    await conn.execute("DELETE FROM product_specs");
    await conn.execute("DELETE FROM product_images");
    await conn.execute("DELETE FROM products");
    await conn.execute("ALTER TABLE products AUTO_INCREMENT = 1");

    let count = 0;
    for (const p of PAINT_PRODUCTS) {
      const localImgPath = `/uploads/products/${p.imgFilename}`;

      const [res] = await conn.execute(
        `INSERT INTO products (slug, name, category, price, description, full_description, thumbnail, in_stock, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)`,
        [p.slug, p.name, p.category, p.price, p.description, p.full_description, localImgPath, count]
      );
      const productId = res.insertId;

      // product_images
      await conn.execute(
        `INSERT INTO product_images (product_id, url, alt_text, sort_order) VALUES (?, ?, ?, 0)`,
        [productId, localImgPath, p.name]
      );

      // product_specs
      let specOrder = 0;
      for (const [k, v] of Object.entries(p.specs)) {
        await conn.execute(
          `INSERT INTO product_specs (product_id, spec_key, spec_value, sort_order) VALUES (?, ?, ?, ?)`,
          [productId, k, v, specOrder++]
        );
      }

      count++;
    }

    console.log(`  🎉 Đã chèn thành công ${count} sản phẩm vào cơ sở dữ liệu MySQL!`);

  } catch (err) {
    console.error("  ❌ Lỗi MySQL:", err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }

  // 3. Cập nhật dữ liệu vào lib/data.ts làm dữ liệu dự phòng (fallback)
  console.log("\n📝 [3/3] Cập nhật danh sách sản phẩm dự phòng trong lib/data.ts...");
  const dataTsPath = path.join(__dirname, "../lib/data.ts");
  let dataContent = fs.readFileSync(dataTsPath, "utf-8");

  const fallbackProducts = PAINT_PRODUCTS.map((p, idx) => ({
    id: String(idx + 1),
    slug: p.slug,
    name: p.name,
    category: p.category,
    price: p.price,
    images: [`/uploads/products/${p.imgFilename}`],
    thumbnail: `/uploads/products/${p.imgFilename}`,
    description: p.description,
    full_description: p.full_description,
    specs: p.specs,
    inStock: true,
  }));

  const productsCode = `export const PRODUCTS: Product[] = ${JSON.stringify(fallbackProducts, null, 2)};`;
  dataContent = dataContent.replace(/export const PRODUCTS: Product\[\] = \[[\s\S]*?\n\];/, productsCode);
  fs.writeFileSync(dataTsPath, dataContent, "utf-8");
  console.log("  ✔ lib/data.ts đã được đồng bộ!");

  console.log("\n✅ Hoàn thành 100%!");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
