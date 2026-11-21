# Header Brand Text Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuyển đổi khối ảnh raster `download.jpg` trong `components/Header.tsx` sang dạng văn bản HTML/CSS chuẩn, responsive trên cả máy tính và điện thoại, đồng bộ nền 100% với header.

**Architecture:** Gộp Logo tròn và khối chữ thương hiệu (3 dòng + divider) vào chung một thẻ `Link` trỏ về trang chủ `/`. Áp dụng CSS Tailwind responsive cho kích thước chữ và khoảng cách để hiển thị sắc nét trên cả mobile (<768px) lẫn desktop (≥768px).

**Tech Stack:** Next.js (App Router), React, Tailwind CSS, TypeScript.

## Global Constraints

- Không làm ảnh hưởng đến các thành phần khác của Header (menu, ô tìm kiếm, thông tin liên hệ, giỏ hàng).
- Màu sắc tuân thủ nhận diện thương hiệu: Nền Header `#1a3a8f`, màu vàng chữ `GOLD = #e8b800`, màu trắng `text-white`.
- Không sử dụng ảnh raster `/uploads/download.jpg` trong Header nữa.

---

### Task 1: Thay thế khối ảnh `/uploads/download.jpg` bằng khối chữ HTML/CSS trong Header

**Files:**
- Modify: `components/Header.tsx:163-185`

**Interfaces:**
- Consumes: `LOGO_URL`, `GOLD`, `BLUE` từ `components/Header.tsx` và `lib/data.ts`.
- Produces: Khối thương hiệu `<Link href="/">` mới chứa logo và chữ văn bản.

- [x] **Step 1: Cập nhật khối Logo & Brand trong `components/Header.tsx`**

Thay thế đoạn mã hiển thị logo và `download.jpg`:
```tsx
          {/* Logo & Brand Name */}
          <div className="flex items-center mr-2 md:mr-4 ml-0 md:ml-8 flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 md:gap-3 leading-none group select-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LOGO_URL}
                alt="Hoàng Quang Minh – Nhà phân phối sơn cao cấp"
                className="h-[52px] w-[52px] sm:h-[60px] sm:w-[60px] md:h-[68px] md:w-[68px] object-contain rounded-full flex-shrink-0"
              />
              <div className="flex flex-col justify-center leading-tight min-w-0">
                <span className="text-white font-bold text-[10px] sm:text-[11px] md:text-[13px] uppercase tracking-wider">
                  Sơn nước
                </span>
                <span
                  className="font-black text-[14px] sm:text-[16px] md:text-[20px] uppercase tracking-wide whitespace-nowrap"
                  style={{ color: GOLD }}
                >
                  Hoàng Quang Minh
                </span>
                <div className="h-[1px] w-full bg-white/35 my-[1px] md:my-[2px]" />
                <span className="text-white/95 font-bold text-[7.5px] sm:text-[9px] md:text-[10.5px] uppercase tracking-wider whitespace-nowrap">
                  Uy tín – Chất lượng – Bền vững
                </span>
              </div>
            </Link>
          </div>
```

- [x] **Step 2: Chạy TypeScript type-check và Next.js build để xác nhận không có lỗi cú pháp**

Run: `npx tsc --noEmit`
Expected: Không có lỗi TypeScript.

- [x] **Step 3: Commit thay đổi vào git**

```bash
git add components/Header.tsx
git commit -m "feat(header): convert brand image to responsive HTML/CSS text"
```

---

### Task 2: Kiểm tra xác minh giao diện trên cả Desktop & Mobile

**Files:**
- Test/Verify: `components/Header.tsx`

- [x] **Step 1: Chạy build dự án với `npm run build`**

Run: `npm run build`
Expected: Build thành công (exit code 0).

- [x] **Step 2: Commit cập nhật kế hoạch thực hiện**

```bash
git add docs/superpowers/plans/2026-11-21-header-brand-text.md
git commit -m "docs: add implementation plan for header brand text"
```
