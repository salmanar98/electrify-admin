# ⚡ Electrify Admin

> A powerful, feature-rich admin dashboard for managing UPS (Uninterruptible Power Supply) systems, service partners, dealers, and technical data — all in one place.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-v5-007FFF?logo=mui&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white)
![AG Grid](https://img.shields.io/badge/AG_Grid-v30-FF6600)
![License](https://img.shields.io/badge/license-Private-red)

---

## 🚀 What Is Electrify Admin?

Electrify Admin is a comprehensive operations dashboard built for managing a large-scale UPS infrastructure. Whether you're tracking hundreds of deployed systems, managing a network of authorized service partners, monitoring real-time battery and voltage data, or importing bulk system records via CSV — Electrify Admin has you covered.

Built with React 18 and Material UI v5, the interface is fast, responsive, and designed for daily operations use. It features live UPS metrics, role-based access control, full audit trails, and a clean, modern UI that makes complex data easy to understand at a glance.

---

## ✨ Features

### 🖥️ System Management
- View, search, and filter all registered UPS systems
- Drill into individual systems to see real-time battery voltage, input/output voltage, MAC address, and activation date
- Create, edit, and deactivate systems with full form validation
- Bulk import systems via CSV with a live preview table before confirming

### 👥 User & Admin Management
- Manage BESI admin accounts with role assignment
- Create, edit, and deactivate admin users
- Filter by role and search by name or email

### 🤝 Authorized Service Partner Management
- Full CRUD for authorized service partners
- Bulk CSV upload with import preview and row-level error reporting
- Filter partners by status and region

### 📊 Technical Data
- View and edit UPS technical configuration data per system
- Read-only metrics alongside editable configuration fields
- Redux-powered state with optimistic UI updates

### ⚙️ Settings
- Application-wide configuration management
- Persistent settings saved via API with instant feedback

### 📈 Dashboard
- At-a-glance KPI widgets: total systems, active partners, battery status overview
- ApexCharts visualisations for system health trends
- Quick-access summary cards for each module

### 📥 Import & Export
- Download sample CSV templates for systems and service partners
- Bulk import with real-time row validation and error messaging
- Export system data as CSV with active filters applied

### 🗺️ Map Integration
- Mapbox-powered map view showing geographic distribution of deployed systems
- Geocoding search to locate systems by address

### 🔐 Authentication
- Secure login with email and password
- Two-factor OTP verification step
- Forgot password and reset password flows
- JWT-based session management with auto-refresh on expiry

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 |
| UI Library | Material UI v5 |
| State Management | Redux Toolkit |
| Data Tables | AG Grid v30 |
| Charts | ApexCharts / react-apexcharts |
| Maps | Mapbox GL / react-map-gl |
| Forms | Formik + Yup |
| HTTP Client | Axios (with interceptor chain) |
| Routing | React Router v6 |
| Date Handling | Moment.js |
| CSV Parsing | PapaParse |
| Notifications | react-hot-toast |
| Rich Text | CKEditor 5 |

---

## 📁 Project Structure

```
src/
├── ApiCalls/           # All API call modules (Auth, Admin, System, Partner, etc.)
├── assets/             # SVG icons and image assets
├── components/         # Reusable UI primitives (Scrollbar, TextField, PageContainer)
├── layouts/
│   ├── blank/          # Auth page layout (no sidebar)
│   └── full/           # Main app layout (header + sidebar)
│       ├── header/     # Top navigation bar with profile menu
│       └── sidebar/    # Collapsible navigation sidebar
├── reducers/           # Redux store and feature slices
├── routes/             # React Router route configuration
├── shared/             # Cross-module shared components (dialogs, loaders, tables)
├── theme/              # MUI theme: colours, typography, shadows
├── utils/              # Axios instance, helpers, constants
└── views/
    ├── authentication/ # Login, OTP, forgot/reset password
    ├── besiadminmanagement/    # Admin user management
    ├── authorizedservicepartner/  # Service partner CRUD
    ├── systemmanagement/       # UPS system management
    ├── technicaldata/          # Technical data editor
    ├── settings/               # App settings
    └── dashboard/              # Overview dashboard
```

---

## 🏁 Getting Started

### Prerequisites

- Node.js **v16+** (v18 LTS recommended)
- npm v8+
- Access to the Electrify backend API

### Installation

```bash
# Clone the repository
git clone https://github.com/salmanar98/electrify-admin.git
cd electrify-admin

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
REACT_APP_URL=https://your-backend-api-url.com
```

> **Never commit `.env` files.** Use `.env.dev` and `.env.prod` for environment-specific values.

### Running Locally

```bash
# Start the development server
npm start

# Build for development environment
npm run build:dev

# Build for production environment
npm run build:prod
```

---

## 🚢 Deployment

The project uses GitHub Actions for CI/CD. Deployment scripts are included for both dev and production environments:

```bash
# Deploy to dev
bash deploy-dev.sh

# Deploy to prod
bash deploy-prod.sh
```

The `.htaccess` file handles client-side routing on Apache-based servers so all routes resolve to `index.html`.

---

## 🌿 Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code |
| `staging` | Pre-production testing and QA |
| `dev` | Active development integration branch |
| `feature/*` | Feature branches merged into `dev` |
| `hotfix/*` | Emergency production fixes |

---

## 📜 Sample CSV Templates

Sample import templates are available in `public/assets/`:

- `system-managment-sample.csv` — Template for bulk system import
- `authorized-partner-sample.csv` — Template for bulk service partner import
- `sample.csv` — General import template

---

## 📄 License

Private repository — all rights reserved.
