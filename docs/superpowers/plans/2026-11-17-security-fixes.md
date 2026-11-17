# Security Vulnerabilities Remediation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remediate all critical, high, and medium security vulnerabilities discovered across the Next.js and Node.js server codebase, including Path Traversal, Default JWT Secrets, Stored XSS, Email HTML Injection, Information Disclosure, Broken RBAC, and Pagination SQL syntax errors.

**Architecture:**
- Patch server-level static file serving in `server.js` with directory confinement checks.
- Enforce strict environment secrets and remove insecure hardcoded credentials.
- Add `isomorphic-dompurify` to sanitize all dangerously rendered HTML across pages.
- Sanitize email templates with HTML escaping utility functions.
- Secure API endpoints (RBAC checks, auth checks for draft content, safe diagnostics in health check, remove one-off maintenance routes).
- Add HTTP security headers in `next.config.ts` and harden pagination parameter validation against `NaN`.

**Tech Stack:** Next.js 16, Node.js HTTP server, MySQL2, JSON Web Token, Zod, DOMPurify / isomorphic-dompurify.

## Global Constraints
- Preserve existing functionality, API contracts, and user experience.
- Maintain TypeScript compilation without any type errors (`npx tsc --noEmit`).
- Ensure no regressions in admin dashboard or public-facing storefront.

---

### Task 1: Fix Path Traversal in `server.js`

**Files:**
- Modify: `server.js:20-37`

**Interfaces:**
- Consumes: Node.js `path`, `fs`, `url`
- Produces: Safe static file streaming restricted strictly to `public/uploads` directory

- [ ] **Step 1: Update static file serving in `server.js`**
Ensure `pathname` is resolved against `public/uploads` and verified using `startsWith` on the canonical resolved directory to prevent any directory traversal (e.g., `/uploads/../../.env`).

- [ ] **Step 2: Verify path traversal protection**
Test that normal uploads like `/uploads/logo.png` serve properly, while paths attempting to traverse up (such as `/uploads/../package.json` or `/uploads/../../.env`) are blocked with HTTP 403 / 404.

---

### Task 2: Remove Hardcoded JWT Secret Fallback & Database Credentials

**Files:**
- Modify: `lib/auth.ts:4-5`
- Modify: `lib/db.ts:18`

**Interfaces:**
- Consumes: `process.env.JWT_SECRET`, `process.env.DB_PASSWORD`
- Produces: Strict secret resolution that throws in production if `JWT_SECRET` is missing

- [ ] **Step 1: Update `lib/auth.ts`**
Check for `JWT_SECRET`. If undefined in production, throw an explicit fatal error preventing startup with default secrets. In development, fallback to a local warning.
- [ ] **Step 2: Update `lib/db.ts`**
Remove hardcoded `"12345"` password fallback; default to `process.env.DB_PASSWORD ?? ""`.

---

### Task 3: Install `isomorphic-dompurify` and Mitigate Stored XSS

**Files:**
- Modify: `package.json` (add `isomorphic-dompurify`)
- Modify: `app/tin-tuc/[slug]/page.tsx:94`
- Modify: `app/san-pham/[slug]/page.tsx:101`
- Modify: `app/san-pham/[slug]/ProductTabs.tsx:61`
- Modify: `app/dich-vu/[slug]/page.tsx:84,98`
- Modify: `app/cong-trinh/[slug]/page.tsx:93`
- Modify: `app/gioi-thieu/page.tsx:85`

**Interfaces:**
- Consumes: `isomorphic-dompurify`
- Produces: Sanitized HTML strings before passing to `dangerouslySetInnerHTML`

- [ ] **Step 1: Install `isomorphic-dompurify`**
Run `npm install isomorphic-dompurify`.
- [ ] **Step 2: Create a reusable sanitization helper in `lib/sanitize.ts`**
Create `lib/sanitize.ts` exporting `sanitizeHtml(dirty: string | null | undefined): string`.
- [ ] **Step 3: Update all pages using `dangerouslySetInnerHTML`**
Wrap raw HTML input with `sanitizeHtml(...)` in all news, products, services, projects, and intro pages.

---

### Task 4: Prevent HTML/Content Injection in Admin Emails

**Files:**
- Modify: `lib/mailer.ts`

**Interfaces:**
- Consumes: `OrderEmailData`, `ContactEmailData`
- Produces: Escaped HTML content in emails

- [ ] **Step 1: Add HTML escape helper to `lib/mailer.ts`**
Implement `escapeHtml(str?: string | null): string` that converts `&`, `<`, `>`, `"`, `'` to HTML entities.
- [ ] **Step 2: Apply escaping to user-controlled fields**
Escape `customer_name`, `phone`, `email`, `address`, `note`, `data.message`, `item.product_name`, etc.

---

### Task 5: Harden `/api/health` and Remove Obsolete Route `/api/admin/fix-urls`

**Files:**
- Modify: `app/api/health/route.ts`
- Delete: `app/api/admin/fix-urls/route.ts`

**Interfaces:**
- Consumes: `GET /api/health`
- Produces: Minimal `{ status: "ok" }` response without infrastructure leakage

- [ ] **Step 1: Modify `app/api/health/route.ts`**
Remove exposed MySQL version, database name, host, and port. Return `{ status: "ok" }` and generic error message on failure.
- [ ] **Step 2: Delete temporary maintenance script `app/api/admin/fix-urls/route.ts`**
Remove the file as instructed in its header.

---

### Task 6: Implement RBAC and Role Enforcement on Sensitive Routes

**Files:**
- Modify: `app/api/settings/route.ts`
- Modify: `app/api/orders/[id]/route.ts`
- Modify: `app/api/products/[id]/route.ts`

**Interfaces:**
- Consumes: `requireRole(req, ["admin", "superadmin"])` from `lib/auth.ts`
- Produces: HTTP 403 Forbidden for unauthorized roles like `editor` on delete/settings operations

- [ ] **Step 1: Enforce `requireRole` on `PUT /api/settings`**
Allow only `admin` and `superadmin` to modify site settings.
- [ ] **Step 2: Enforce `requireRole` on `DELETE /api/orders/[id]`**
Allow only `admin` and `superadmin` to delete orders.

---

### Task 7: Fix Pagination `NaN` Parsing Bug in `lib/api-response.ts` & Query Files

**Files:**
- Modify: `lib/api-response.ts:40-46`

**Interfaces:**
- Consumes: URL search parameters
- Produces: Guaranteed non-NaN integers `{ page, limit, offset }`

- [ ] **Step 1: Update `parsePagination` in `lib/api-response.ts`**
Validate `isNaN` after `parseInt` and provide safe positive defaults.
- [ ] **Step 2: Verify `lib/queries/*.ts` defaults**
Ensure `limit` and `offset` in query helpers cannot be `NaN`.

---

### Task 8: Restrict Draft/Inactive Access in News and Sliders

**Files:**
- Modify: `app/api/news/route.ts:14-16`
- Modify: `app/api/sliders/route.ts:11-16`

**Interfaces:**
- Consumes: `getAuthUser(req)`
- Produces: Draft/all items only if the caller provides a valid admin token

- [ ] **Step 1: Check authentication before honoring `?published=all` in `app/api/news/route.ts`**
If `url.searchParams.get("published") === "all"`, check `getAuthUser(req)`. If not authenticated, force `published = true`.
- [ ] **Step 2: Check authentication before honoring `?all=1` in `app/api/sliders/route.ts`**
If `url.searchParams.get("all") === "1"`, check `getAuthUser(req)`. If not authenticated, force `is_active = 1`.

---

### Task 9: Add HTTP Security Headers in `next.config.ts`

**Files:**
- Modify: `next.config.ts:37-40`

**Interfaces:**
- Produces: Standard secure HTTP headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`)

- [ ] **Step 1: Configure security headers in `next.config.ts`**
Add security headers array in `async headers()`.

---

### Task 10: Run Dependency Fixes and Typecheck Build Verification

**Files:**
- All touched files

**Interfaces:**
- Command: `npm audit fix`, `npx tsc --noEmit`

- [ ] **Step 1: Run non-breaking npm audit fix**
Run `npm audit fix` to patch automated dependency vulnerabilities.
- [ ] **Step 2: Run TypeScript compiler check**
Execute `npx tsc --noEmit` to ensure zero compilation or type errors.
