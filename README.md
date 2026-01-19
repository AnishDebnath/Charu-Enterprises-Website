# Charu Enterprises - Global Fence Fittings Leader (Website)

A high-converting B2B industrial website for **Charu Enterprises**, a premier manufacturer and exporter of fence fittings with over 50 years of expertise. This project showcases global compliance, manufacturing excellence, and a comprehensive product catalog serving four continents.

## 🚀 Key Features

-   **Comprehensive Product Catalog**: Showcases 32+ industrial-grade fencing components including barbed wire arms, tension bands, post caps, and custom cast components.
-   **AI Product Consultant**: Integrated with Google Gemini to provide technical guidance and product recommendations for global procurement teams.
-   **Global Footprint**: Dedicated sections for regional standards (USA/Canada - ASTM F626, Europe - DIN/ISO, Middle East).
-   **Technical Compliance**: Highlights ISO 9001:2015 certifications and EEPC Star Performer status.
-   **Export Optimization**: Features an RFQ (Request for Quotation) system tailored for international B2B logistics.
-   **Premium UI/UX**: Built with a sleek dark-mode aesthetic, featuring:
    -   Animated counters for key achievements.
    -   Responsive product comparison tools.
    -   Dynamic mobile-first navigation.
    -   Parallax backgrounds and glassmorphism elements.

## 🛠️ Tech Stack

-   **Frontend**: React 19 + TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS (via Play CDN) + Vanilla CSS + Font Awesome
-   **Intelligence**: Google Gemini AI (@google/genai)
-   **Deployment**: Production-ready builds via Vite

## 📦 Project Structure

```text
├── assets/             # Local product images and brand assets
├── services/           # External API integrations (Gemini AI)
├── types.ts            # TypeScript interfaces and shared types
├── constants.tsx       # Core data (Products, Awards, Testimonials, etc.)
├── App.tsx             # Main application layout and routing
├── index.html          # Entry point with Tailwind & Font Awesome integration
└── vite.config.ts      # Vite configuration and aliases
```

## 🚦 Getting Started

### Prerequisites

-   Node.js (Latest LTS recommended)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone [repository-url]
    cd charu-enterprises-website
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment:
    Create a `.env.local` file in the root directory and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

### Development

Run the development server:
```bash
npm run dev
```
The site will be available at `http://localhost:3000`.

### Production

Build the production bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

## 📜 Compliance & Standards

The components showcased in this project are engineered to meet global benchmarks:
-   **ASTM F626**: Standard Specification for Fence Fittings.
-   **ASTM A153/ISO 1461**: Hot-Dip Galvanizing standards.
-   **DIN EN 10242**: Malleable iron fitting requirements.

---

© 2026 Charu Enterprises. All Rights Reserved. Forging the Future of Fencing Solutions.
