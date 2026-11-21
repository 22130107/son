import { Product, Project, Service, NewsArticle } from "./types";

// Base image URL from the original design
const IMG_BASE =
  "https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F";

export const COMPANY_INFO = {
  name: "Sơn Hoàng Quang Minh",
  fullName: "CÔNG TY TNHH XL HOÀNG QUANG MINH",
  address: "09 Phan Thanh Giản, P. Rạch Dừa, Hồ Chí Minh (TP. Vũng Tàu cũ)",
  phone: "0963 910 248",
  phoneRaw: "0963910248", // Dùng cho tel: link
  phoneSupport: "0973 507 903",
  phoneSupportRaw: "0973507903", // Dùng cho tel: link
  website: "sonnuocvungtau.com.vn",
  email: "hoangquangminhgroup@gmail.com",
  facebook: "https://www.facebook.com/hoangquangminhgroup.sonnuocvungtau",
  zalo: "https://zalo.me/0963910248",
  mapUrl: "https://maps.google.com/?q=09+Phan+Thanh+Gian+Rach+Dua+Vung+Tau",
  lat: 10.3459,
  lng: 107.0843,
};

export const PRODUCTS: Product[] = [
  {
    "id": "1",
    "slug": "son-dulux-weathershield-colour-protect",
    "name": "Sơn Ngoại Thất Dulux Weathershield Colour Protect",
    "category": "Sơn Dulux",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/dulux-weathershield.png"
    ],
    "thumbnail": "/uploads/products/dulux-weathershield.png",
    "description": "Sơn ngoại thất cao cấp Dulux Weathershield Colour Protect với công nghệ Active Guard chống phai màu tối ưu, chống bám bụi và rêu mốc vượt trội cho khí hậu nhiệt đới.",
    "full_description": "<p><strong>Dulux Weathershield Colour Protect</strong> là dòng sơn nước ngoại thất cao cấp nhất của AkzoNobel. Được tích hợp công nghệ Smart Release giải phóng các phân tử thông minh bảo vệ màu sơn gấp 2 lần dưới ánh nắng mặt trời và mưa bão miền biển Vũng Tàu.</p>\n<h4>Ưu điểm vượt trội:</h4>\n<ul>\n  <li>Chống phai màu đỉnh cao, bền màu đến 8 năm.</li>\n  <li>Chống bám bẩn và làm mát tường nhà tới 5 độ C (Keep Cool).</li>\n  <li>Kháng kiềm, kháng nấm mốc và chống loang màu muối hóa.</li>\n  <li>Đạt chứng nhận xanh Singapore Green Building Product.</li>\n</ul>\n<h4>Quy trình thi công:</h4>\n<p>Bột trét ngoại thất Dulux (2 lớp) &rarr; Sơn lót ngoại thất Dulux Weathershield (1 lớp) &rarr; Sơn phủ Dulux Weathershield Colour Protect (2 lớp).</p>",
    "specs": {
      "Xuất xứ": "AkzoNobel (Hà Lan / Việt Nam)",
      "Loại sơn": "Sơn nước ngoại thất cao cấp",
      "Bề mặt hoàn thiện": "Bóng nhẹ (Sheen) & Mờ (Matt)",
      "Độ phủ lý thuyết": "11 – 13 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 15L",
      "Thời gian khô": "Khô bề mặt 30 phút, sơn lớp sau sau 2 giờ"
    },
    "inStock": true
  },
  {
    "id": "2",
    "slug": "son-dulux-ambiance-5in1-superflexx",
    "name": "Sơn Nội Thất Siêu Cao Cấp Dulux Ambiance 5in1",
    "category": "Sơn Dulux",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/dulux-ambiance-5in1.png"
    ],
    "thumbnail": "/uploads/products/dulux-ambiance-5in1.png",
    "description": "Sơn nội thất siêu cao cấp Dulux Ambiance 5in1 mang lại bề mặt láng mịn hoàn hảo, màng sơn co giãn đàn hồi che lấp vết nứt nhỏ và kháng khuẩn bảo vệ sức khỏe.",
    "full_description": "<p><strong>Dulux Ambiance 5in1</strong> khẳng định đẳng cấp không gian sống với 5 tính năng bảo vệ toàn diện: bề mặt láng mịn sang trọng, che lấp khe nứt nhỏ, dễ lau chùi, kháng khuẩn và nấm mốc.</p>\n<h4>Tính năng nổi bật:</h4>\n<ul>\n  <li>Màng sơn co giãn Superflexx đàn hồi gấp 3 lần sơn thông thường.</li>\n  <li>Kháng khuẩn tối đa, ngăn ngừa 99% vi khuẩn có hại bám trên tường.</li>\n  <li>Màu sắc thanh lịch, độ bền màu tuyệt hảo.</li>\n  <li>Không chứa chì, thủy ngân, mùi dịu nhẹ thân thiện môi trường.</li>\n</ul>",
    "specs": {
      "Xuất xứ": "AkzoNobel (Việt Nam)",
      "Loại sơn": "Sơn nước nội thất siêu cao cấp",
      "Bề mặt hoàn thiện": "Bóng ngọc trai sang trọng",
      "Độ phủ lý thuyết": "13 – 16 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L",
      "Thời gian khô": "Khô bề mặt 30 phút"
    },
    "inStock": true
  },
  {
    "id": "3",
    "slug": "son-dulux-easyclean-chong-bam-ban",
    "name": "Sơn Nội Thất Dulux EasyClean Chống Bám Bẩn",
    "category": "Sơn Dulux",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/dulux-easyclean.jpg"
    ],
    "thumbnail": "/uploads/products/dulux-easyclean.jpg",
    "description": "Sơn nội thất Dulux EasyClean với công nghệ Chống Bám Bẩn Chủ Động ngăn chặn các vết bẩn cứng đầu thấm sâu vào màng sơn, giúp lau chùi dễ dàng.",
    "full_description": "<p><strong>Dulux EasyClean</strong> được thiết kế đặc biệt cho các gia đình có trẻ nhỏ. Công nghệ chống bám bẩn chủ động giúp các vết cà phê, nước ngọt, bút chì màu, tương cà có thể lau sạch chỉ bằng khăn ẩm xà phòng mà không làm trôi màng sơn.</p>",
    "specs": {
      "Xuất xứ": "AkzoNobel (Việt Nam)",
      "Loại sơn": "Sơn nước nội thất dễ lau chùi",
      "Bề mặt hoàn thiện": "Bóng và Mờ",
      "Độ phủ lý thuyết": "12 – 14 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "4",
    "slug": "chat-chong-tham-dulux-aquatech-vuot-troi",
    "name": "Chất Chống Thấm Cao Cấp Dulux Aquatech",
    "category": "Sơn Dulux",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/dulux-aquatech.jpg"
    ],
    "thumbnail": "/uploads/products/dulux-aquatech.jpg",
    "description": "Chất chống thấm tường đứng Dulux Aquatech ứng dụng công nghệ Hydroshield tăng cường liên kết hóa học, ngăn nước thẩm thấu vào cấu trúc tường bê tông.",
    "full_description": "<p><strong>Dulux Aquatech</strong> là giải pháp chống thấm tường ngoài hoàn hảo, không cần pha trộn xi măng, thi công trực tiếp nhanh chóng, che lấp các vết rạn nứt chân chim hiệu quả.</p>",
    "specs": {
      "Xuất xứ": "AkzoNobel (Việt Nam)",
      "Loại sơn": "Chất chống thấm tường đứng",
      "Bề mặt hoàn thiện": "Màu ghi xám / ghi nhạt",
      "Độ phủ lý thuyết": "4 – 5 m²/kg/2 lớp",
      "Quy cách đóng gói": "Thùng 6kg và Thùng 20kg",
      "Thời gian khô": "1 – 2 giờ"
    },
    "inStock": true
  },
  {
    "id": "5",
    "slug": "son-lot-ngoai-that-dulux-weathershield-chong-kiem",
    "name": "Sơn Lót Ngoại Thất Dulux Weathershield Chống Kiềm",
    "category": "Sơn Dulux",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/dulux-weathershield-primer.jpg"
    ],
    "thumbnail": "/uploads/products/dulux-weathershield-primer.jpg",
    "description": "Sơn lót cao cấp ngoài trời Dulux Weathershield ngăn chặn sự kiềm hóa từ xi măng, tăng cường độ bám dính và giữ cho lớp sơn phủ luôn tươi màu.",
    "full_description": "<p>Sơn lót ngoài trời Dulux là lớp màng đệm thiết yếu giúp trung hòa nồng độ pH của tường trát xi măng, chống kiềm hóa muối hóa gây ố vàng và bong tróc lớp sơn ngoài.</p>",
    "specs": {
      "Xuất xứ": "AkzoNobel (Việt Nam)",
      "Loại sơn": "Sơn lót kháng kiềm ngoại thất",
      "Bề mặt hoàn thiện": "Trắng mờ",
      "Độ phủ lý thuyết": "10 – 12 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "6",
    "slug": "son-jotun-jotashield-ben-mau-toi-uu",
    "name": "Sơn Ngoại Thất Jotun Jotashield Bền Màu Tối Ưu",
    "category": "Sơn Jotun",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/jotun-jotashield.jpg"
    ],
    "thumbnail": "/uploads/products/jotun-jotashield.jpg",
    "description": "Dòng sơn ngoại thất cao cấp nhất của Jotun với công nghệ chất tạo màu tiên tiến, chống tia UV vượt trội và chống bám bụi bẩn tối ưu.",
    "full_description": "<p><strong>Jotun Jotashield Bền Màu Tối Ưu</strong> được thử nghiệm và chứng minh độ bền màu vượt thời gian tại vùng khí hậu khắc nghiệt miền duyên hải. Khả năng kháng tia cực tím tối đa giúp ngôi nhà luôn rạng rỡ như mới.</p>\n<h4>Đặc tính kỹ thuật:</h4>\n<ul>\n  <li>Kháng tia cực tím UV gấp 2 lần.</li>\n  <li>Chống bám bụi bẩn, tự rửa sạch màng sơn khi trời mưa.</li>\n  <li>Ngăn ngừa nấm mốc và rêu phong triệt để.</li>\n  <li>Bảo vệ công trình lên đến 12 năm.</li>\n</ul>",
    "specs": {
      "Xuất xứ": "Jotun (Na Uy / Việt Nam)",
      "Loại sơn": "Sơn ngoại thất siêu cao cấp",
      "Bề mặt hoàn thiện": "Bóng / Mờ",
      "Độ phủ lý thuyết": "11 – 13 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 15L",
      "Thời gian khô": "Khô bề mặt 30 phút"
    },
    "inStock": true
  },
  {
    "id": "7",
    "slug": "son-jotun-majestic-dep-hoan-hao",
    "name": "Sơn Nội Thất Cao Cấp Jotun Majestic Đẹp Hoàn Hảo",
    "category": "Sơn Jotun",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/jotun-majestic.jpg"
    ],
    "thumbnail": "/uploads/products/jotun-majestic.jpg",
    "description": "Sơn nội thất Majestic Đẹp Hoàn Hảo mang đến màu sắc rực rỡ, bề mặt láng mịn sang trọng và khả năng lau chùi vết bẩn dễ dàng.",
    "full_description": "<p><strong>Jotun Majestic Đẹp Hoàn Hảo</strong> kết hợp công nghệ màu đích thực của Jotun, giúp tái hiện chính xác từng gam màu sắc nét, ấm cúng. Sơn không mùi, an toàn tuyệt đối cho trẻ em và người già.</p>",
    "specs": {
      "Xuất xứ": "Jotun (Việt Nam)",
      "Loại sơn": "Sơn nước nội thất cao cấp",
      "Bề mặt hoàn thiện": "Bóng ánh ngọc và Mờ mịn",
      "Độ phủ lý thuyết": "12 – 14 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 15L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "8",
    "slug": "son-jotun-waterguard-chong-tham",
    "name": "Sơn Chống Thấm Tường Đứng Jotun WaterGuard",
    "category": "Sơn Jotun",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/jotun-waterguard.jpg"
    ],
    "thumbnail": "/uploads/products/jotun-waterguard.jpg",
    "description": "Sơn chống thấm gốc acrylic biến tính Jotun WaterGuard bảo vệ tường nhà khỏi sự xâm nhập của nước mưa, độ đàn hồi cao che phủ vết nứt nhỏ.",
    "full_description": "<p><strong>Jotun WaterGuard</strong> không cần pha xi măng, màu sắc phong phú (xám nhạt, xám đậm, vàng kem). Màng sơn đàn hồi cao giúp ngăn chặn rêu mốc và ẩm mốc chân tường hiệu quả.</p>",
    "specs": {
      "Xuất xứ": "Jotun (Việt Nam)",
      "Loại sơn": "Sơn chống thấm tường đứng",
      "Bề mặt hoàn thiện": "Mờ",
      "Độ phủ lý thuyết": "6 – 7 m²/lít/2 lớp",
      "Quy cách đóng gói": "Lon 6kg và Thùng 20kg",
      "Thời gian khô": "2 giờ"
    },
    "inStock": true
  },
  {
    "id": "9",
    "slug": "son-jotun-essence-de-lau-chui",
    "name": "Sơn Nội Thất Jotun Essence Dễ Lau Chùi",
    "category": "Sơn Jotun",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/jotun-essence.jpg"
    ],
    "thumbnail": "/uploads/products/jotun-essence.jpg",
    "description": "Sơn nội thất Jotun Essence dễ lau chùi, độ che phủ cao, mùi nhẹ, thân thiện với môi trường và mang lại bề mặt tường sáng bóng mịn màng.",
    "full_description": "<p>Jotun Essence Dễ Lau Chùi là sự lựa chọn kinh tế thông minh cho ngôi nhà của bạn. Các vết bẩn thông thường như cà phê, vết ố bẩn nhẹ dễ dàng được làm sạch mà không làm trôi màu sơn.</p>",
    "specs": {
      "Xuất xứ": "Jotun (Việt Nam)",
      "Loại sơn": "Sơn nội thất dễ lau chùi",
      "Bề mặt hoàn thiện": "Mờ mịn",
      "Độ phủ lý thuyết": "10 – 12 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 17L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "10",
    "slug": "son-lot-jotun-ultra-primer-chong-kiem",
    "name": "Sơn Lót Cao Cấp Jotun Ultra Primer Kháng Kiềm",
    "category": "Sơn Jotun",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/jotun-ultra-primer.jpg"
    ],
    "thumbnail": "/uploads/products/jotun-ultra-primer.jpg",
    "description": "Sơn lót gốc nước cao cấp Jotun Ultra Primer có độ bám dính tuyệt hảo trên bề mặt bê tông mới và tường ẩm, chống kiềm hóa muối hóa cực mạnh.",
    "full_description": "<p>Jotun Ultra Primer có khả năng thi công ngay trên tường bê tông còn độ ẩm cao (sau 3 ngày trát), giúp đẩy nhanh tiến độ hoàn thiện công trình mà vẫn đảm bảo độ bền tối đa.</p>",
    "specs": {
      "Xuất xứ": "Jotun (Việt Nam)",
      "Loại sơn": "Sơn lót kháng kiềm đa năng",
      "Bề mặt hoàn thiện": "Trắng sữa",
      "Độ phủ lý thuyết": "9 – 11 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 17L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "11",
    "slug": "chat-chong-tham-cao-cap-kova-ct-11a-plus",
    "name": "Chất Chống Thấm Cao Cấp Kova CT-11A Plus Tường",
    "category": "Sơn Kova",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/kova-ct11a.jpg"
    ],
    "thumbnail": "/uploads/products/kova-ct11a.jpg",
    "description": "Hợp chất chống thấm số 1 thị trường Việt Nam Kova CT-11A Plus có khả năng ngăn chặn nước thẩm thấu tuyệt hảo từ bên ngoài vào trong cấu trúc xi măng.",
    "full_description": "<p><strong>Kova CT-11A Plus Tường</strong> được tổng hợp từ Acrylonitrile và Alkylsiloxan, tạo liên kết chặt chẽ với bê tông và vữa xi măng. Độ bền chống thấm đã được thử nghiệm thực tế lên đến 15 năm.</p>\n<h4>Ưu điểm:</h4>\n<ul>\n  <li>Chống thấm tuyệt đối cho tường ngoài, sàn ban công, sân thượng.</li>\n  <li>Chịu mài mòn, chịu nước mặn, kháng kiềm cực cao.</li>\n  <li>Không chứa chất độc hại, an toàn tuyệt đối cho người thi công và người sử dụng.</li>\n</ul>",
    "specs": {
      "Xuất xứ": "Tập đoàn Sơn Kova (Việt Nam)",
      "Loại sơn": "Chất chống thấm pha xi măng",
      "Bề mặt hoàn thiện": "Màu xi măng xám",
      "Độ phủ lý thuyết": "2.0 – 2.5 m²/kg/2 lớp",
      "Quy cách đóng gói": "Lon 4kg và Thùng 20kg",
      "Thời gian khô": "1 – 2 giờ"
    },
    "inStock": true
  },
  {
    "id": "12",
    "slug": "son-bong-noi-that-cao-cap-kova-k-5500",
    "name": "Sơn Bóng Cao Cấp Trong Nhà Kova K-5500",
    "category": "Sơn Kova",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/kova-k5500.jpg"
    ],
    "thumbnail": "/uploads/products/kova-k5500.jpg",
    "description": "Sơn nước nội thất bóng cao cấp Kova K-5500 cho màng sơn nhẵn bóng lộng lẫy, lau chùi vết bẩn dễ dàng và kháng khuẩn bảo vệ không gian sống.",
    "full_description": "<p>Kova K-5500 là dòng sơn nội thất cao cấp của Kova, bề mặt bóng lộng lẫy giúp phản chiếu ánh sáng tự nhiên, tăng vẻ sang trọng cho phòng khách, phòng ngủ và biệt thự cao cấp.</p>",
    "specs": {
      "Xuất xứ": "Kova (Việt Nam)",
      "Loại sơn": "Sơn nội thất siêu bóng",
      "Bề mặt hoàn thiện": "Bóng cao",
      "Độ phủ lý thuyết": "12 – 14 m²/kg/lớp",
      "Quy cách đóng gói": "Lon 4kg và Thùng 20kg",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "13",
    "slug": "son-bong-ngoai-that-kova-k-5501",
    "name": "Sơn Bóng Cao Cấp Ngoài Trời Kova K-5501",
    "category": "Sơn Kova",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/kova-k5501.jpg"
    ],
    "thumbnail": "/uploads/products/kova-k5501.jpg",
    "description": "Sơn ngoại thất cao cấp Kova K-5501 màng sơn bóng đẹp, chống thấm nước, chống rêu mốc và tia UV, giữ màu sắc công trình luôn tươi mới.",
    "full_description": "<p>Kova K-5501 là dòng sơn bóng ngoại thất danh tiếng chịu được nắng mưa nhiệt đới gió mùa của Vũng Tàu. Khả năng đàn hồi giúp màng sơn không bị nứt chân chim theo thời gian.</p>",
    "specs": {
      "Xuất xứ": "Kova (Việt Nam)",
      "Loại sơn": "Sơn ngoại thất bóng cao cấp",
      "Bề mặt hoàn thiện": "Bóng ngọc",
      "Độ phủ lý thuyết": "11 – 13 m²/kg/lớp",
      "Quy cách đóng gói": "Lon 4kg và Thùng 20kg",
      "Thời gian khô": "45 phút"
    },
    "inStock": true
  },
  {
    "id": "14",
    "slug": "son-lot-khang-kiem-ngoai-troi-kova-k-209",
    "name": "Sơn Lót Kháng Kiềm Ngoài Trời Kova K-209",
    "category": "Sơn Kova",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/kova-k209-primer.png"
    ],
    "thumbnail": "/uploads/products/kova-k209-primer.png",
    "description": "Sơn lót kháng kiềm ngoài trời Kova K-209 bảo vệ lớp sơn phủ không bị loang ố do kiềm trong vữa hồ và độ ẩm cao.",
    "full_description": "<p>Sơn lót Kova K-209 có độ bám dính cực tốt vào bề mặt bê tông, tạo lớp màng ngăn cản sự thấm ẩm và kiềm hóa, giữ cho lớp sơn bóng ngoài trời luôn sáng đẹp.</p>",
    "specs": {
      "Xuất xứ": "Kova (Việt Nam)",
      "Loại sơn": "Sơn lót kháng kiềm ngoại thất",
      "Bề mặt hoàn thiện": "Trắng mờ",
      "Độ phủ lý thuyết": "9 – 11 m²/kg/lớp",
      "Quy cách đóng gói": "Lon 4kg và Thùng 20kg",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "15",
    "slug": "son-nippon-weathergard-plus",
    "name": "Sơn Ngoại Thất Siêu Bền Nippon WeatherGard Plus+",
    "category": "Sơn Nippon",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/nippon-weathergard.jpg"
    ],
    "thumbnail": "/uploads/products/nippon-weathergard.jpg",
    "description": "Sơn ngoại thất cao cấp Nippon WeatherGard Plus+ với công nghệ Micro-gel chống nóng phản xạ nhiệt, chống rêu mốc và bảo vệ màu sắc vượt trội.",
    "full_description": "<p><strong>Nippon WeatherGard Plus+</strong> là sản phẩm sơn nước ngoại thất cao cấp của tập đoàn Nippon Paint Nhật Bản. Công nghệ tiên tiến giúp giảm nhiệt độ bề mặt tường tới 5 độ C, tiết kiệm điện năng cho điều hòa.</p>",
    "specs": {
      "Xuất xứ": "Nippon Paint (Nhật Bản / Việt Nam)",
      "Loại sơn": "Sơn ngoại thất siêu bền",
      "Bề mặt hoàn thiện": "Bóng và Mờ",
      "Độ phủ lý thuyết": "11 – 13 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "16",
    "slug": "son-nippon-odour-less-all-in-one",
    "name": "Sơn Nội Thất Không Mùi Nippon Odour-less All-in-1",
    "category": "Sơn Nippon",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/nippon-odourless.jpg"
    ],
    "thumbnail": "/uploads/products/nippon-odourless.jpg",
    "description": "Sơn nội thất Nippon Odour-less All-in-1 gần như không mùi trong quá trình thi công và sau khi sơn, hàm lượng VOC cực thấp, an toàn tuyệt đối.",
    "full_description": "<p>Dòng sơn cao cấp thân thiện với môi trường của Nhật Bản, phù hợp sơn cho phòng ngủ, trường học, bệnh viện, nhà hàng nơi cần đưa vào sử dụng ngay sau khi thi công.</p>",
    "specs": {
      "Xuất xứ": "Nippon Paint (Việt Nam)",
      "Loại sơn": "Sơn nội thất xanh không mùi",
      "Bề mặt hoàn thiện": "Bóng ngọc trai",
      "Độ phủ lý thuyết": "12 – 14 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "17",
    "slug": "son-nippon-matex-noi-that",
    "name": "Sơn Nội Thất Kinh Tế Nippon Matex",
    "category": "Sơn Nippon",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/nippon-matex.jpg"
    ],
    "thumbnail": "/uploads/products/nippon-matex.jpg",
    "description": "Sơn nước trong nhà Nippon Matex đem lại độ phủ cao, màng sơn mịn màng, dễ thi công và có chi phí vô cùng kinh tế.",
    "full_description": "<p>Nippon Matex là dòng sơn nội thất thông dụng nhất của Nippon Paint, lý tưởng cho tường và trần thạch cao nội thất với màu sắc đa dạng và độ phủ tuyệt vời.</p>",
    "specs": {
      "Xuất xứ": "Nippon Paint (Việt Nam)",
      "Loại sơn": "Sơn nội thất kinh tế",
      "Bề mặt hoàn thiện": "Mờ",
      "Độ phủ lý thuyết": "12 – 14 m²/lít/lớp",
      "Quy cách đóng gói": "Thùng 5L và Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "18",
    "slug": "son-lot-nippon-weathergard-sealer",
    "name": "Sơn Lót Ngoại Thất Nippon WeatherGard Sealer",
    "category": "Sơn Nippon",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/nippon-sealer.jpg"
    ],
    "thumbnail": "/uploads/products/nippon-sealer.jpg",
    "description": "Sơn lót kháng kiềm ngoại thất Nippon WeatherGard Sealer ngăn ngừa sự phá hủy của kiềm và phấn hóa xi măng, tăng cường độ bám dính.",
    "full_description": "<p>Được pha chế đặc biệt với hàm lượng keo acrylic cao, Nippon WeatherGard Sealer thẩm thấu sâu vào bề mặt tường bê tông, tạo chân bám vững chắc cho lớp sơn phủ.</p>",
    "specs": {
      "Xuất xứ": "Nippon Paint (Việt Nam)",
      "Loại sơn": "Sơn lót kháng kiềm ngoại thất",
      "Bề mặt hoàn thiện": "Trắng mờ",
      "Độ phủ lý thuyết": "10 – 12 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "19",
    "slug": "son-mykolor-grand-quartz-feel",
    "name": "Sơn Ngoại Thất Siêu Bóng Mykolor Grand Quartz Feel",
    "category": "Sơn Mykolor",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/mykolor-grand-quartz.jpg"
    ],
    "thumbnail": "/uploads/products/mykolor-grand-quartz.jpg",
    "description": "Sơn ngoại thất siêu bóng Mykolor Grand Quartz Feel sang trọng, chống bám bụi bẩn, chống rêu mốc và chịu được thời tiết nhiệt đới khắc nghiệt.",
    "full_description": "<p><strong>Mykolor Grand Quartz Feel</strong> là dòng sơn ngoại thất đỉnh cao của 4 Oranges. Màng sơn siêu bóng sáng lấp lánh như pha lê, ngăn chặn hoàn toàn bụi bẩn bám dính vào bề mặt tường nhà.</p>",
    "specs": {
      "Xuất xứ": "4 Oranges (Việt Nam)",
      "Loại sơn": "Sơn ngoại thất siêu bóng",
      "Bề mặt hoàn thiện": "Siêu bóng",
      "Độ phủ lý thuyết": "12 – 14 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 4.375L và Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "20",
    "slug": "son-mykolor-touch-ilka-finish",
    "name": "Sơn Nội Thất Siêu Láng Mịn Mykolor Touch Ilka Finish",
    "category": "Sơn Mykolor",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/mykolor-touch-ilka.jpg"
    ],
    "thumbnail": "/uploads/products/mykolor-touch-ilka.jpg",
    "description": "Sơn nội thất láng mịn cao cấp Mykolor Touch Ilka Finish với hơn 1040 màu sắc hiện đại, mang lại vẻ đẹp quý phái cho không gian nội thất.",
    "full_description": "<p>Bộ sưu tập sơn Mykolor Touch được các kiến trúc sư yêu thích bởi bảng màu tinh tế, độ mịn màng như lụa và khả năng lau chùi vết bẩn hiệu quả.</p>",
    "specs": {
      "Xuất xứ": "4 Oranges (Việt Nam)",
      "Loại sơn": "Sơn nội thất cao cấp láng mịn",
      "Bề mặt hoàn thiện": "Mờ sang trọng",
      "Độ phủ lý thuyết": "11 – 13 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 4.375L và Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "21",
    "slug": "hop-chat-chong-tham-mykolor-water-seal",
    "name": "Hợp Chất Chống Thấm Pha Xi Măng Mykolor Water Seal",
    "category": "Sơn Mykolor",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/mykolor-water-seal.jpg"
    ],
    "thumbnail": "/uploads/products/mykolor-water-seal.jpg",
    "description": "Chất chống thấm pha xi măng Mykolor Water Seal bảo vệ tối ưu chống ẩm và thấm dột cho tường đứng, bể nước, sân thượng và sàn nhà vệ sinh.",
    "full_description": "<p>Hợp chất chống thấm chuyên dụng Mykolor liên kết chắc chắn với xi măng cát tạo nên lớp màng ngăn nước liên tục, bền vững cùng tuổi thọ công trình.</p>",
    "specs": {
      "Xuất xứ": "4 Oranges (Việt Nam)",
      "Loại sơn": "Chống thấm pha xi măng",
      "Bề mặt hoàn thiện": "Màu xám xi măng",
      "Độ phủ lý thuyết": "5 – 6 m²/kg/2 lớp",
      "Quy cách đóng gói": "Lon 4.375kg và Thùng 18kg",
      "Thời gian khô": "1 – 2 giờ"
    },
    "inStock": true
  },
  {
    "id": "22",
    "slug": "son-nuoc-ngoai-that-maxilite-tough",
    "name": "Sơn Nước Ngoại Thất Maxilite Tough Bền Màu",
    "category": "Sơn Maxilite",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/maxilite-tough.png"
    ],
    "thumbnail": "/uploads/products/maxilite-tough.png",
    "description": "Sơn ngoại thất Maxilite Tough từ AkzoNobel với công nghệ SuperLock chống bong tróc, màu sắc bền đẹp và chi phí đầu tư vô cùng hợp lý.",
    "full_description": "<p><strong>Maxilite Tough</strong> là dòng sơn nước ngoài trời kinh tế bán chạy số một cho các công trình nhà phố, dãy trọ, văn phòng cho thuê với độ bền màu và màng sơn đanh chắc.</p>",
    "specs": {
      "Xuất xứ": "AkzoNobel (Việt Nam)",
      "Loại sơn": "Sơn ngoại thất kinh tế",
      "Bề mặt hoàn thiện": "Mờ",
      "Độ phủ lý thuyết": "10 – 12 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "23",
    "slug": "son-nuoc-trong-nha-maxilite-total",
    "name": "Sơn Nước Trong Nhà Maxilite Total",
    "category": "Sơn Maxilite",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/maxilite-total.png"
    ],
    "thumbnail": "/uploads/products/maxilite-total.png",
    "description": "Sơn nội thất Maxilite Total có độ phủ cao, màng sơn mịn đẹp, màu sắc phong phú, giải pháp tiết kiệm hàng đầu cho ngôi nhà bạn.",
    "full_description": "<p>Maxilite Total trong nhà cho bề mặt tường sáng láng mịn, che lấp các khuyết điểm nhỏ của tường trát hồ, thi công nhẹ tay và nhanh khô.</p>",
    "specs": {
      "Xuất xứ": "AkzoNobel (Việt Nam)",
      "Loại sơn": "Sơn nội thất kinh tế",
      "Bề mặt hoàn thiện": "Mờ mịn",
      "Độ phủ lý thuyết": "11 – 13 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "24",
    "slug": "son-lot-khang-kiem-maxilite",
    "name": "Sơn Lót Kháng Kiềm Maxilite",
    "category": "Sơn Maxilite",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/maxilite-primer.jpg"
    ],
    "thumbnail": "/uploads/products/maxilite-primer.jpg",
    "description": "Sơn lót kháng kiềm Maxilite bảo vệ màng sơn phủ không bị loang ố kiềm hóa, gia tăng độ bám dính và tiết kiệm lượng sơn phủ bề mặt.",
    "full_description": "<p>Sơn lót kháng kiềm Maxilite là bước chuẩn bị bề mặt hoàn hảo cho các công trình dùng sơn Maxilite hoặc Dulux, giúp tăng tuổi thọ toàn bộ hệ sơn.</p>",
    "specs": {
      "Xuất xứ": "AkzoNobel (Việt Nam)",
      "Loại sơn": "Sơn lót kháng kiềm",
      "Bề mặt hoàn thiện": "Trắng mờ",
      "Độ phủ lý thuyết": "10 – 12 m²/lít/lớp",
      "Quy cách đóng gói": "Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "25",
    "slug": "son-ngoai-that-sieu-bong-nasun-diamond-shield",
    "name": "Sơn Ngoại Thất Siêu Bóng NaSun Diamond Shield",
    "category": "Sơn NaSun",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/nasun-diamond-shield.jpg"
    ],
    "thumbnail": "/uploads/products/nasun-diamond-shield.jpg",
    "description": "Sơn ngoại thất siêu bóng NaSun Diamond Shield công nghệ hạt Nano Kim Cương tự làm sạch, chống bám bụi và kháng kiềm muối ven biển cực tốt.",
    "full_description": "<p><strong>Sơn Mặt Trời Việt NaSun Diamond Shield</strong> là dòng sản phẩm cao cấp được đặc chế riêng cho khí hậu nắng gió và hơi ẩm mặn của Vũng Tàu. Màng sơn siêu bóng sáng như ngọc trai, chống rêu mốc và tia UV bền vững trên 10 năm.</p>\n<h4>Tính năng kỹ thuật:</h4>\n<ul>\n  <li>Công nghệ hạt Nano chống bám bẩn tự rửa sạch bề mặt.</li>\n  <li>Chống kiềm hóa, muối hóa và ố vàng cực mạnh.</li>\n  <li>Màu sắc tươi sáng, đa dạng lựa chọn theo phong thủy.</li>\n</ul>",
    "specs": {
      "Xuất xứ": "Sơn Mặt Trời Việt NaSun (Việt Nam)",
      "Loại sơn": "Sơn ngoại thất siêu bóng công nghệ Nano",
      "Bề mặt hoàn thiện": "Bóng ngọc trai sang trọng",
      "Độ phủ lý thuyết": "12 – 14 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "26",
    "slug": "son-noi-that-khang-khuan-nasun-nano-silver",
    "name": "Sơn Nội Thất Kháng Khuẩn NaSun Nano Silver",
    "category": "Sơn NaSun",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/nasun-nano-silver.png"
    ],
    "thumbnail": "/uploads/products/nasun-nano-silver.png",
    "description": "Sơn nội thất cao cấp NaSun Nano Silver chứa các ion bạc kháng khuẩn 99.9%, lau chùi vết bẩn vượt trội, bảo vệ sức khỏe cho cả gia đình.",
    "full_description": "<p>NaSun Nano Silver tạo nên không gian sống xanh, trong lành và thư thái. Màng sơn nhẵn mịn, màu sắc tinh tế, dễ lau chùi các vết bẩn sinh hoạt hàng ngày mà không sợ bay màu.</p>",
    "specs": {
      "Xuất xứ": "NaSun (Việt Nam)",
      "Loại sơn": "Sơn nội thất kháng khuẩn",
      "Bề mặt hoàn thiện": "Bóng mờ lụa",
      "Độ phủ lý thuyết": "12 – 15 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "27",
    "slug": "chat-chong-tham-da-nang-nasun-ct-01",
    "name": "Hợp Chất Chống Thấm Đa Năng NaSun CT-01",
    "category": "Sơn NaSun",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/nasun-ct01.png"
    ],
    "thumbnail": "/uploads/products/nasun-ct01.png",
    "description": "Chất chống thấm đa năng NaSun CT-01 pha xi măng chuyên trị thấm nứt sàn mái, ban công, vách hông nhà phố và nhà vệ sinh triệt để.",
    "full_description": "<p>NaSun CT-01 tạo liên kết tinh thể bám sâu vào lỗ rỗng mao dẫn của bê tông, ngăn chặn tuyệt đối nguồn nước ngấm vào kết cấu công trình xây dựng.</p>",
    "specs": {
      "Xuất xứ": "NaSun (Việt Nam)",
      "Loại sơn": "Chống thấm đa năng pha xi măng",
      "Bề mặt hoàn thiện": "Màu xám xi măng",
      "Độ phủ lý thuyết": "4 – 5 m²/kg/2 lớp",
      "Quy cách đóng gói": "Lon 5kg và Thùng 20kg",
      "Thời gian khô": "1 – 2 giờ"
    },
    "inStock": true
  },
  {
    "id": "28",
    "slug": "son-ngoai-that-toa-nanoshield",
    "name": "Sơn Ngoại Thất TOA NanoShield Chống Bám Bẩn",
    "category": "Sơn TOA",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/toa-nanoshield.jpg"
    ],
    "thumbnail": "/uploads/products/toa-nanoshield.jpg",
    "description": "Sơn nước ngoại thất cao cấp TOA NanoShield với công nghệ Nano từ Đức, chống bám bẩn, chống rêu mốc và bền màu trước thời tiết nhiệt đới.",
    "full_description": "<p><strong>TOA NanoShield</strong> sở hữu các hạt Nano Silicon có tính năng đẩy lùi nước và chất bẩn, giúp bề mặt tường nhà luôn sạch bóng như mới sau mỗi cơn mưa rào.</p>",
    "specs": {
      "Xuất xứ": "TOA (Thái Lan / Việt Nam)",
      "Loại sơn": "Sơn ngoại thất công nghệ Nano",
      "Bề mặt hoàn thiện": "Bóng",
      "Độ phủ lý thuyết": "11 – 13 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  },
  {
    "id": "29",
    "slug": "son-noi-that-toa-nanoclean",
    "name": "Sơn Nội Thất TOA NanoClean Kháng Khuẩn",
    "category": "Sơn TOA",
    "price": "Liên hệ",
    "images": [
      "/uploads/products/toa-nanoclean.jpg"
    ],
    "thumbnail": "/uploads/products/toa-nanoclean.jpg",
    "description": "Sơn nội thất TOA NanoClean với các hạt Nano Silver kháng khuẩn vượt trội, bề mặt nhẵn mịn, lau chùi vết bẩn dễ dàng.",
    "full_description": "<p>Sơn nội thất TOA NanoClean diệt khuẩn đến 99.9%, bảo vệ sức khỏe cho các thành viên trong gia đình, mùi thơm dễ chịu và an toàn cho môi trường sống.</p>",
    "specs": {
      "Xuất xứ": "TOA (Thái Lan / Việt Nam)",
      "Loại sơn": "Sơn nội thất kháng khuẩn",
      "Bề mặt hoàn thiện": "Bóng mờ",
      "Độ phủ lý thuyết": "12 – 14 m²/lít/lớp",
      "Quy cách đóng gói": "Lon 5L và Thùng 18L",
      "Thời gian khô": "30 phút"
    },
    "inStock": true
  }
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "chuyen-nhan-sua-chua-nha-tai-ba-ria-vung-tau",
    title: "Chuyên Nhận Sửa Chữa Nhà Tại Bà Rịa Vũng Tàu",
    category: "chung-cu",
    image: `${IMG_BASE}501b139efa8dfd5cec279d32118c4cace0c5909c.jpg?generation=1777545030327700&alt=media`,
    description:
      "Dự án sửa chữa và sơn lại toàn bộ chung cư tại Bà Rịa Vũng Tàu, hoàn thiện đúng tiến độ.",
  },
  {
    id: "2",
    slug: "don-vi-thi-cong-son-nuoc-chuyen-nghiep-tai-vung-tau",
    title: "Đơn Vị Thi Công Sơn Nước Chuyên Nghiệp Tại Vũng Tàu",
    category: "biet-thu",
    image: `${IMG_BASE}dacece20e0cec9d4fbd116290a8c34f2ef603939.jpg?generation=1777545030357214&alt=media`,
    description: "Thi công sơn nước biệt thự cao cấp, hoàn thiện nội ngoại thất chuyên nghiệp.",
  },
  {
    id: "3",
    slug: "nhung-thong-tin-ve-son-nuoc-khong-nen-bo-qua",
    title: "Những Thông Tin Về Sơn Nước Không Nên Bỏ Qua",
    category: "nha-pho",
    image: `${IMG_BASE}4badd65dfb72967d486eae34f5d08ad389d3cce4.jpg?generation=1777545030593481&alt=media`,
    description: "Thi công sơn nhà phố, hoàn thiện nội ngoại thất chuyên nghiệp.",
  },
  {
    id: "4",
    slug: "thi-cong-tran-thach-cao",
    title: "Thi Công Trần Thạch Cao",
    category: "phong-bep",
    image: `${IMG_BASE}3bcd878b6a6b3f90400ea953044c837f37b77ea9.jpg?generation=1777545030670871&alt=media`,
    description: "Thi công trần thạch cao phòng bếp, thiết kế hiện đại, thẩm mỹ cao.",
  },
  {
    id: "5",
    slug: "cong-trinh-thi-cong-son-nuoc-uy-tin-nhat-tinh-ba-ria-vung-tau",
    title: "Công Trình Thi Công Sơn Nước Uy Tín Nhất Bà Rịa Vũng Tàu",
    category: "phong-ngu",
    image: `${IMG_BASE}85cd9bb1aecc99871b6716bc66abe0165df2eabd.jpg?generation=1777545199453240&alt=media`,
    description: "Sơn phòng ngủ với màu sắc nhẹ nhàng, tạo không gian nghỉ ngơi lý tưởng.",
  },
  {
    id: "6",
    slug: "son-phong-tre-em-dep",
    title: "Sơn Phòng Trẻ Em Đẹp, An Toàn",
    category: "phong-tre-em",
    image: `${IMG_BASE}f334133616ff93bf6d1e74cd2565285406b54950.jpg?generation=1777545199522701&alt=media`,
    description:
      "Sơn phòng trẻ em với màu sắc tươi sáng, sử dụng sơn an toàn không độc hại.",
  },
];

export const SERVICES: Service[] = [
  {
    id: "1",
    slug: "thi-cong-son-nuoc",
    title: "Thi Công Sơn Nước",
    description:
      "Chuyên thi công sơn nước nội thất và ngoại thất cho mọi loại công trình. Đội ngũ thợ lành nghề, kinh nghiệm nhiều năm.",
    image: `${IMG_BASE}dacece20e0cec9d4fbd116290a8c34f2ef603939.jpg?generation=1777545030357214&alt=media`,
    details:
      "Dịch vụ thi công sơn nước chuyên nghiệp tại Vũng Tàu. Chúng tôi nhận thi công sơn nhà mới, sơn sửa nhà cũ, sơn chung cư, biệt thự, văn phòng...",
  },
  {
    id: "2",
    slug: "son-nha-moi",
    title: "Sơn Nhà Mới",
    description:
      "Hoàn thiện sơn nhà mới xây, đảm bảo chất lượng bề mặt, màu sắc đồng đều và bền đẹp theo thời gian.",
    image: `${IMG_BASE}501b139efa8dfd5cec279d32118c4cace0c5909c.jpg?generation=1777545030327700&alt=media`,
    details:
      "Thi công sơn nhà mới với quy trình chuẩn: xử lý bề mặt, bả matit, sơn lót, sơn phủ 2 lớp. Bảo hành công trình.",
  },
  {
    id: "3",
    slug: "son-sua-nha-cu",
    title: "Sơn Sửa Nhà Cũ",
    description:
      "Làm mới nhà cũ với dịch vụ sơn sửa chuyên nghiệp. Xử lý tường nứt, ố vàng, rong rêu trước khi sơn.",
    image: `${IMG_BASE}4badd65dfb72967d486eae34f5d08ad389d3cce4.jpg?generation=1777545030593481&alt=media`,
    details:
      "Chuyên xử lý và sơn lại nhà cũ. Khắc phục các vấn đề: tường nứt, thấm dột, ố vàng, bong tróc sơn cũ.",
  },
  {
    id: "4",
    slug: "thi-cong-tran-thach-cao",
    title: "Thi Công Trần Thạch Cao",
    description:
      "Thiết kế và thi công trần thạch cao các loại: trần phẳng, trần giật cấp, trần thả. Đẹp, bền, cách âm tốt.",
    image: `${IMG_BASE}3bcd878b6a6b3f90400ea953044c837f37b77ea9.jpg?generation=1777545030670871&alt=media`,
    details:
      "Thi công trần thạch cao theo yêu cầu. Đa dạng mẫu mã, phù hợp mọi không gian từ nhà ở đến văn phòng, khách sạn.",
  },
  {
    id: "5",
    slug: "xu-ly-tuong-nut-tham-dot",
    title: "Xử Lý Tường Nứt, Thấm Dột",
    description:
      "Chuyên xử lý các sự cố tường nứt, thấm dột, ố vàng, đóng rong rêu. Giải pháp triệt để, bảo hành dài hạn.",
    image: `${IMG_BASE}85cd9bb1aecc99871b6716bc66abe0165df2eabd.jpg?generation=1777545199453240&alt=media`,
    details:
      "Sử dụng vật liệu chống thấm cao cấp để xử lý triệt để tình trạng thấm dột, nứt tường.",
  },
];

export const NEWS: NewsArticle[] = [
  {
    id: "1",
    slug: "chuyen-nhan-sua-chua-nha-tai-ba-ria-vung-tau",
    title: "Chuyên Nhận Sửa Chữa Nhà Tại Bà Rịa Vũng Tàu",
    excerpt:
      "Hoàng Quang Minh chuyên nhận sửa chữa nhà tại Bà Rịa Vũng Tàu với đội ngũ thợ lành nghề, giá cả hợp lý.",
    content:
      "Với nhiều năm kinh nghiệm trong lĩnh vực thi công sơn nước và sửa chữa nhà tại Vũng Tàu, Hoàng Quang Minh tự hào là đơn vị uy tín được nhiều khách hàng tin tưởng lựa chọn...",
    image: `${IMG_BASE}501b139efa8dfd5cec279d32118c4cace0c5909c.jpg?generation=1777545030327700&alt=media`,
    publishedAt: "2024-01-15",
    category: "Dịch vụ",
  },
  {
    id: "2",
    slug: "don-vi-thi-cong-son-nuoc-chuyen-nghiep-tai-vung-tau",
    title: "Đơn Vị Thi Công Sơn Nước Chuyên Nghiệp Tại Vũng Tàu",
    excerpt:
      "Tìm hiểu về quy trình thi công sơn nước chuyên nghiệp của Hoàng Quang Minh tại Vũng Tàu.",
    content:
      "Quy trình thi công sơn nước chuyên nghiệp bao gồm nhiều bước quan trọng: chuẩn bị bề mặt, bả matit, sơn lót và sơn phủ...",
    image: `${IMG_BASE}dacece20e0cec9d4fbd116290a8c34f2ef603939.jpg?generation=1777545030357214&alt=media`,
    publishedAt: "2024-01-20",
    category: "Dịch vụ",
  },
  {
    id: "3",
    slug: "nhung-thong-tin-ve-son-nuoc-khong-nen-bo-qua",
    title: "Những Thông Tin Về Sơn Nước Không Nên Bỏ Qua",
    excerpt:
      "Tổng hợp những thông tin quan trọng về sơn nước mà bạn cần biết trước khi thi công.",
    content:
      "Sơn nước là vật liệu hoàn thiện không thể thiếu trong xây dựng. Để chọn đúng loại sơn và thi công đúng cách, bạn cần nắm rõ các thông tin sau...",
    image: `${IMG_BASE}4badd65dfb72967d486eae34f5d08ad389d3cce4.jpg?generation=1777545030593481&alt=media`,
    publishedAt: "2024-02-01",
    category: "Tin tức",
  },
  {
    id: "4",
    slug: "thi-cong-tran-thach-cao-dep",
    title: "THI CÔNG TRẦN THẠCH CAO",
    excerpt:
      "Hướng dẫn chi tiết về thi công trần thạch cao, các loại trần phổ biến và chi phí tham khảo.",
    content:
      "Trần thạch cao ngày càng được ưa chuộng trong thiết kế nội thất hiện đại. Bài viết này sẽ giúp bạn hiểu rõ hơn về các loại trần thạch cao và quy trình thi công...",
    image: `${IMG_BASE}3bcd878b6a6b3f90400ea953044c837f37b77ea9.jpg?generation=1777545030670871&alt=media`,
    publishedAt: "2024-02-10",
    category: "Tin tức",
  },
  {
    id: "5",
    slug: "cong-trinh-thi-cong-son-nuoc-uy-tin-nhat-tinh-ba-ria-vung-tau",
    title: "Công Trình Thi Công Sơn Nước Uy Tín Nhất Bà Rịa Vũng Tàu",
    excerpt:
      "Giới thiệu các công trình tiêu biểu đã được Hoàng Quang Minh thi công thành công tại Bà Rịa Vũng Tàu.",
    content:
      "Hoàng Quang Minh đã hoàn thành hàng trăm công trình lớn nhỏ tại Bà Rịa Vũng Tàu. Dưới đây là một số công trình tiêu biểu...",
    image: `${IMG_BASE}85cd9bb1aecc99871b6716bc66abe0165df2eabd.jpg?generation=1777545199453240&alt=media`,
    publishedAt: "2024-02-15",
    category: "Công trình",
  },
];

export const SLIDER_IMAGES = [
  {
    src: `${IMG_BASE}0081477e131ab91a47682e6ea17e8ef751cf4fba.jpg?generation=1777545030309979&alt=media`,
    alt: "Sơn nước Vũng Tàu - Hoàng Quang Minh",
  },
  {
    src: `${IMG_BASE}bdd77ab9e1fa1e88cb19af1ceb7c9937bf9c97d7.jpg?generation=1777545030356216&alt=media`,
    alt: "Thi công sơn nước chuyên nghiệp tại Vũng Tàu",
  },
  {
    src: `${IMG_BASE}7441281fd879eb54ae054b4497fbfa6d4d851dc6.jpg?generation=1777545030359047&alt=media`,
    alt: "Sơn nước chính hãng tại Vũng Tàu",
  },
];

export const LOGO_URL = "/logo.png";
export const CART_ICON_URL = `${IMG_BASE}e63cfcd394677b12b9a121e469cbbd3f76974609.png?generation=1777545030333650&alt=media`;

// Thay đổi domain thực tế của bạn tại đây
export const SITE_URL = "https://sonnuocvungtau.com.vn";
