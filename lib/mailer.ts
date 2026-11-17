import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // App Password của Gmail
  },
});

export function escapeHtml(value?: string | number | null): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function sanitizeHeader(value?: string | number | null): string {
  if (value === null || value === undefined) return "";
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

export interface OrderEmailData {
  order_code: string;
  gender: string;
  customer_name: string;
  phone: string;
  email?: string | null;
  address?: string | null;
  note?: string | null;
  source?: string;
  items: {
    product_name: string;
    quantity: number;
    price_note?: string;
  }[];
}

export function buildOrderEmailHtml(order: OrderEmailData, siteUrl: string): string {
  const cleanPhone = String(order.phone || "").replace(/[^0-9+]/g, "");

  const itemsHtml = order.items
    .map(
      (item, i) => `
      <tr style="background:${i % 2 === 0 ? "#f9fafb" : "#ffffff"}">
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb">${escapeHtml(item.product_name)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center">${escapeHtml(item.quantity)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right">${escapeHtml(item.price_note || "Liên hệ")}</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
    
    <!-- Header -->
    <div style="background:#1a3a8f;padding:24px 32px">
      <h1 style="margin:0;color:#ffffff;font-size:20px">🛒 Đơn hàng mới</h1>
      <p style="margin:4px 0 0;color:#93c5fd;font-size:14px">Hoàng Quang Minh</p>
    </div>

    <!-- Order code -->
    <div style="background:#eff6ff;padding:16px 32px;border-bottom:1px solid #dbeafe">
      <p style="margin:0;font-size:14px;color:#1e40af">
        Mã đơn hàng: <strong style="font-size:16px">${escapeHtml(order.order_code)}</strong>
      </p>
    </div>

    <div style="padding:24px 32px">

      <!-- Thông tin khách hàng -->
      <h2 style="margin:0 0 16px;font-size:16px;color:#111827;border-bottom:2px solid #e5e7eb;padding-bottom:8px">
        👤 Thông tin khách hàng
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151">
        <tr>
          <td style="padding:6px 0;width:140px;color:#6b7280">Họ tên:</td>
          <td style="padding:6px 0"><strong>${order.gender === "chi" ? "Chị" : "Anh"} ${escapeHtml(order.customer_name)}</strong></td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280">Điện thoại:</td>
          <td style="padding:6px 0"><a href="tel:${cleanPhone}" style="color:#1a3a8f;font-weight:bold">${escapeHtml(order.phone)}</a></td>
        </tr>
        ${order.email ? `<tr><td style="padding:6px 0;color:#6b7280">Email:</td><td style="padding:6px 0">${escapeHtml(order.email)}</td></tr>` : ""}
        ${order.address ? `<tr><td style="padding:6px 0;color:#6b7280">Địa chỉ:</td><td style="padding:6px 0">${escapeHtml(order.address)}</td></tr>` : ""}
        ${order.note ? `<tr><td style="padding:6px 0;color:#6b7280">Ghi chú:</td><td style="padding:6px 0;color:#dc2626">${escapeHtml(order.note)}</td></tr>` : ""}
        <tr>
          <td style="padding:6px 0;color:#6b7280">Nguồn:</td>
          <td style="padding:6px 0">${escapeHtml(order.source || "website")}</td>
        </tr>
      </table>

      <!-- Sản phẩm -->
      <h2 style="margin:24px 0 16px;font-size:16px;color:#111827;border-bottom:2px solid #e5e7eb;padding-bottom:8px">
        📦 Sản phẩm đặt hàng
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <thead>
          <tr style="background:#1a3a8f;color:#ffffff">
            <th style="padding:10px 12px;text-align:left;font-weight:600">Sản phẩm</th>
            <th style="padding:10px 12px;text-align:center;font-weight:600">SL</th>
            <th style="padding:10px 12px;text-align:right;font-weight:600">Giá</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      <!-- CTA -->
      <div style="margin-top:24px;text-align:center">
        <a href="${siteUrl}/admin/don-hang"
           style="display:inline-block;background:#1a3a8f;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px">
          Xem đơn hàng trong Admin
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;text-align:center">
      <p style="margin:0;font-size:12px;color:#9ca3af">
        Email tự động từ hệ thống Hoàng Quang Minh · ${siteUrl}
      </p>
    </div>
  </div>
</body>
</html>`;
}

export function buildOrderEmailSubject(order: OrderEmailData): string {
  const code = sanitizeHeader(order.order_code);
  const title = order.gender === "chi" ? "Chị" : "Anh";
  const name = sanitizeHeader(order.customer_name);
  return `[Đơn hàng mới] ${code} – ${title} ${name}`;
}

export async function sendNewOrderEmail(order: OrderEmailData): Promise<void> {
  const adminEmail = process.env.MAIL_TO || "huynh080104@gmail.com";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const subject = buildOrderEmailSubject(order);
  const html = buildOrderEmailHtml(order, siteUrl);

  await transporter.sendMail({
    from: `"Hoàng Quang Minh" <${process.env.MAIL_USER}>`,
    to: adminEmail,
    subject,
    html,
  });
}

export interface ContactEmailData {
  name: string;
  phone: string;
  email?: string | null;
  message: string;
}

export function buildContactEmailHtml(data: ContactEmailData, siteUrl: string): string {
  const cleanPhone = String(data.phone || "").replace(/[^0-9+]/g, "");

  return `
<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
    <div style="background:#1a3a8f;padding:24px 32px">
      <h1 style="margin:0;color:#ffffff;font-size:20px">📩 Liên hệ mới từ website</h1>
      <p style="margin:4px 0 0;color:#93c5fd;font-size:14px">Hoàng Quang Minh</p>
    </div>
    <div style="padding:24px 32px">
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151">
        <tr>
          <td style="padding:8px 0;width:140px;color:#6b7280;vertical-align:top">Họ tên:</td>
          <td style="padding:8px 0"><strong>${escapeHtml(data.name)}</strong></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;vertical-align:top">Điện thoại:</td>
          <td style="padding:8px 0"><a href="tel:${cleanPhone}" style="color:#1a3a8f;font-weight:bold">${escapeHtml(data.phone)}</a></td>
        </tr>
        ${data.email ? `<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">Email:</td><td style="padding:8px 0">${escapeHtml(data.email)}</td></tr>` : ""}
        <tr>
          <td style="padding:8px 0;color:#6b7280;vertical-align:top">Nội dung:</td>
          <td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(data.message)}</td>
        </tr>
      </table>
      <div style="margin-top:24px;text-align:center">
        <a href="${siteUrl}/admin"
           style="display:inline-block;background:#1a3a8f;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px">
          Xem trong Admin
        </a>
      </div>
    </div>
    <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;text-align:center">
      <p style="margin:0;font-size:12px;color:#9ca3af">Email tự động từ hệ thống Hoàng Quang Minh · ${siteUrl}</p>
    </div>
  </div>
</body>
</html>`;
}

export function buildContactEmailSubject(data: ContactEmailData): string {
  const name = sanitizeHeader(data.name);
  const phone = sanitizeHeader(data.phone);
  return `[Liên hệ mới] ${name} – ${phone}`;
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const adminEmail = process.env.MAIL_TO || "huynh080104@gmail.com";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const subject = buildContactEmailSubject(data);
  const html = buildContactEmailHtml(data, siteUrl);

  await transporter.sendMail({
    from: `"Hoàng Quang Minh" <${process.env.MAIL_USER}>`,
    to: adminEmail,
    subject,
    html,
  });
}
