# SiteScope

SiteScope is a modern Website SEO & Performance Audit Tool built with Next.js 15. It analyzes public websites and provides real-time SEO insights including page metadata, response time, heading structure, image accessibility, and content statistics through a high-performance dashboard.

---

## Features

- **Website SEO Audit:** Performs automated technical audits on target URLs.
- **Response Time Measurement:** Measures overall server response time.
- **HTTP Status Detection:** Identifies response status codes including success (200), redirects, and client/server errors (404, 500).
- **Page Title Extraction:** Inspects presence, length, and optimal bounds for HTML `<title>` tags.
- **Meta Description Extraction:** Evaluates meta description availability and character counts.
- **H1 Count Analysis:** Verifies document structure and single H1 usage.
- **Missing Image Alt Detection:** Scans DOM tree to report images missing accessibility `alt` attributes.
- **Word Count Analysis:** Estimates body text length to gauge page content depth.
- **Responsive Dashboard:** Renders clean score visualizations, metric breakdowns, and actionable recommendations.
- **Server-Side Auditing:** Executes requests server-side to avoid CORS restrictions and browser overhead.
- **URL Normalization:** Automatically handles protocol prefixes (`http://`, `https://`) and whitespace formatting.
- **Robust Error Handling:** Distinguishes between invalid URLs, DNS lookups, HTTP error codes, and timeout failures.
- **Modern UI:** Built with dark glassmorphism styling, responsive flex layouts, and smooth animations.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Server Execution:** Next.js Server Actions
- **DOM Parsing:** Cheerio
- **Hosting & Deployment:** Vercel

---

## Project Structure

```
SiteScope/
├── app/          # Next.js App Router pages, layout, and global styles
├── components/   # Modular React UI components (dashboard, hero, layout, UI primitives)
├── services/     # Server-side audit service execution logic
├── hooks/        # Client-side custom React hooks (useAudit, useKeyboard)
├── lib/          # Helper utilities and URL validation functions
├── constants/    # Centralized application configuration and error strings
├── mocks/        # Mock audit data generators for development testing
├── types/        # TypeScript interfaces and type definitions
└── public/       # Static assets and icons
```

---

## Getting Started

### Prerequisites

Ensure Node.js 18.x or later is installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rahulpradipbarman/SiteScope.git
   cd SiteScope
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## Usage

1. Enter a valid domain or target web address into the search input bar (e.g., `example.com` or `https://github.com`).
2. Click **Analyze Website** or press `Enter` (or `Cmd + Enter`).
3. View the generated audit report on the dashboard, including health score, SEO metrics, issue breakdowns, and recommendations.

---

## Design Decisions

1. **Server Actions for Network Fetching:**
   Cross-Origin Resource Sharing (CORS) policies prevent client browsers from directly fetching external HTML pages. Executing fetch requests inside Next.js Server Actions ensures reliable execution, custom header configuration, and direct access to server-side Node.js networking without exposing browser limitations.

2. **Modular Architecture:**
   The codebase follows a strict separation of concerns. UI elements reside in `components/`, audit orchestration in `services/`, state management in `hooks/`, and data schemas in `types/`. This decoupling ensures individual components can be modified or tested independently without side effects.

3. **Independent Error Classification:**
   Rather than wrapping all failures into a generic error message, the application evaluates validation, network resolution, HTTP responses, and content types separately. This provides explicit user feedback when a domain does not exist versus when a server returns a 404 or unsupported non-HTML content.

---

## Error Handling

The application categorizes and surfaces errors distinctly:

- **Invalid URLs:** Evaluated client-side and server-side using URL parsing to block malformed inputs before initiating network calls.
- **DNS Failures:** Catches `ENOTFOUND` address lookup errors and returns connection error states.
- **HTTP Errors:** Validates `response.ok`. Non-2xx responses (such as 404 Not Found or 500 Server Error) halt parsing and display explicit status messages.
- **Unsupported Content:** Inspects the `Content-Type` header to ensure only HTML responses (`text/html`) are parsed for SEO analysis.
- **Network Failures & Timeouts:** Implements an `AbortController` timeout (default 10s) to abort hanging requests and surface a timeout notification.

---

## Testing

The project includes an automated unit testing suite built with Vitest to validate the core audit service.

Current test coverage includes:

- Successful audit execution
- HTTP error handling
- Unsupported content type validation
- Missing Content-Type header handling
- Request timeout handling
- DNS / network failure handling
- Custom timeout configuration
- Verification of mock audit generation behavior

Run the test suite:

```bash
npm test
```

---

## Deployment

- **Live Demo:** (Coming Soon)
- **GitHub Repository:** https://github.com/Rahulpradipbarman/SiteScope

---

## AI Usage

AI tools were used during development for brainstorming, architecture planning, UI refinement, debugging, and code review, while implementation decisions, validation, and integration were executed by the developer.

---

## Future Improvements

- **Lighthouse Integration:** Incorporate Google Lighthouse CLI for performance scoring.
- **Core Web Vitals:** Measure LCP, FID, and CLS metrics.
- **Open Graph & Social Cards:** Audit Open Graph, Twitter Card, and JSON-LD schema markup.
- **Robots.txt Analysis:** Validate crawling permissions and directive configurations.
- **Sitemap.xml Validation:** Check sitemap availability and XML structure.
- **PDF Report Export:** Enable downloadable formatted PDF audit summaries.

---

## License

This project was created for the Digital Heroes Software Development Engineering Internship Qualification Task.
