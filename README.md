<div align="center">

# 🌱 Uyirmai
### *Bilingual Permaculture Website*

<img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/TinaCMS-EC4815?style=for-the-badge&logo=tinacms&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>

*A modern, responsive bilingual platform bridging sustainable agriculture with digital innovation*

[🌐 Live Demo](https://uyirmai.com) • [📖 Documentation](#documentation) • [🛠️ Installation](#installation)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🌍 **Bilingual Excellence**
- **Tamil ↔ English** seamless switching
- Dynamic content transformation
- Cultural context preservation
- RTL/LTR layout adaptation

### 🎨 **Modern Design**
- **Nature-inspired** color palette
- Smooth animations & micro-interactions
- Mobile-first responsive design
- Accessibility-compliant UI

</td>
<td width="50%">

### ⚡ **Content Management**
- **TinaCMS** headless integration
- Real-time content editing
- Media management system
- Non-technical user friendly

### 🚀 **Performance**
- **Lighthouse** optimized
- Code splitting & lazy loading
- SEO-friendly architecture
- Progressive Web App ready

</td>
</tr>
</table>

---

## 🏗️ Architecture

<div align="center">

```mermaid
graph TB
    A[React Frontend] --> B[TinaCMS]
    A --> C[Language Context]
    A --> D[Tailwind CSS]
    B --> E[Content API]
    C --> F[i18n System]
    E --> G[Database]
    F --> H[Language Files]
```

</div>

## 🛠️ Tech Stack

<div align="center">

### Frontend Framework
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF?style=flat-square&logo=vite)

### Styling & UI
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-0055FF?style=flat-square&logo=framer)

### Content Management
![TinaCMS](https://img.shields.io/badge/TinaCMS-Headless-EC4815?style=flat-square&logo=tinacms)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.43+-EC5990?style=flat-square&logo=reacthookform)

</div>

---

## 📱 Page Showcase

<table>
<tr>
<td align="center" width="33%">
<img src="https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Home+Page" alt="Home Page"/>
<br><b>🏠 Home</b><br>
<sub>Hero banner with dynamic content</sub>
</td>
<td align="center" width="33%">
<img src="https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Philosophy" alt="Philosophy"/>
<br><b>💭 Philosophy</b><br>
<sub>Mission, vision & values</sub>
</td>
<td align="center" width="33%">
<img src="https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Projects" alt="Projects"/>
<br><b>🎯 Projects</b><br>
<sub>Interactive project gallery</sub>
</td>
</tr>
<tr>
<td align="center" width="33%">
<img src="https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Blog" alt="Blog"/>
<br><b>📝 Blog</b><br>
<sub>Rich content management</sub>
</td>
<td align="center" width="33%">
<img src="https://via.placeholder.com/300x200/607D8B/FFFFFF?text=Resources" alt="Resources"/>
<br><b>📚 Resources</b><br>
<sub>Educational materials</sub>
</td>
<td align="center" width="33%">
<img src="https://via.placeholder.com/300x200/795548/FFFFFF?text=Products" alt="Products"/>
<br><b>🛒 Products</b><br>
<sub>Organic product showcase</sub>
</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites
```bash
node --version  # v16.0.0 or higher
npm --version   # v8.0.0 or higher
```

### Installation

1. **Clone & Setup**
   ```bash
   git clone https://github.com/VithyabavanS/uyirmai-website.git
   cd uyirmai-website
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Add your configuration variables
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```
   ```
   🌐 Frontend:    http://localhost:3000
   ⚙️  Admin Panel: http://localhost:3000/admin
   ```

4. **Production Build**
   ```bash
   npm run build
   npm run preview
   ```

---

## 📂 Project Structure

```
uyirmai-website/
├── 🎨 src/
│   ├── 🧩 components/          # Reusable UI components
│   │   ├── common/            # Shared components
│   │   ├── forms/             # Form components
│   │   └── layout/            # Layout components
│   ├── 📄 pages/              # Page components
│   ├── 🌐 context/            # React contexts
│   │   ├── LanguageContext.tsx
│   │   └── ThemeContext.tsx
│   ├── 🎣 hooks/              # Custom React hooks
│   ├── 🛠️ utils/              # Utility functions
│   ├── 🎯 types/              # TypeScript definitions
│   └── 📦 assets/             # Static assets
├── 🌍 public/                 # Public assets
├── ⚙️ tina/                   # TinaCMS configuration
├── 📚 docs/                   # Documentation
└── 🔧 config/                 # Build configurations
```

---

## 🔧 Development Workflow

### 1. Content Editing
```bash
# Start dev server
npm run dev

# Navigate to http://localhost:8080/admin
# Login with TinaCMS credentials
# Edit content through visual editor
```

### 2. Code Development
```
Files are organized in src/ directory:
├── src/components/     # Reusable UI components
├── src/pages/         # Page components  
├── src/components/ui/ # Base UI components
└── src/context/       # React contexts
```

### 3. Building for Production
```bash
# Build static files
npm run build

# Files output to dist/ directory
# Ready for deployment to any static host
```

---

## 📄 Available Pages & Features

### **Core Pages**
- **Home** (`/`) - Hero section, features showcase
- **Philosophy** (`/philosophy`) - Mission, vision, values  
- **Projects** (`/projects`) - Project listings and events
- **Blog** (`/blog`) - Blog posts with individual post pages (`/blog/post/:slug`)
- **Resources** (`/resources`) - Downloadable materials
- **Get Involved** (`/get-involved`) - Volunteer opportunities
- **Products** (`/products`) - Product/service listings

### **Content Management Features**
1. **Admin Panel**: Visit `/admin` for content editing
2. **Live Editing**: Content changes reflect immediately in development
3. **Multi-language Support**: Switch between Tamil/English
4. **Rich Text Editor**: Full WYSIWYG editing capabilities

### **Content Types Managed via TinaCMS**
- Home page content and hero sections
- Philosophy sections (mission, vision, values)
- Project listings with images and descriptions  
- Blog posts with rich text and media
- Resource files (PDFs, videos, documents)
- Product catalogs with pricing
- Volunteer opportunities and courses

---

## ⚙️ TinaCMS Setup (Optional)

For full CMS functionality:

1. **Get TinaCMS Account**: Sign up at [tina.io](https://tina.io)
2. **Create Project**: Obtain your CLIENT_ID and TOKEN
3. **Update Environment**:
   ```bash
   VITE_TINA_CLIENT_ID=your_client_id_here
   VITE_TINA_TOKEN=your_token_here
   ```

---

## 🚀 Deployment

### **Static Hosting Options**
- **Vercel**: `vercel --prod`
- **Netlify**: Connect to Git repository
- **GitHub Pages**: Deploy `dist/` folder

### **Build Configuration**
```bash
# Build Command
npm run build

# Output Directory  
dist/

# Development Build
npm run build:dev
```

---

## 🛠️ Troubleshooting

### **Common Issues & Solutions**

| Issue | Solution |
|-------|----------|
| Port 8080 in use | Change port in `vite.config.ts` |
| TinaCMS errors | Check environment variables in `.env` |
| Build failures | Run `npm run lint` first to check code |
| Content not saving | Verify TinaCMS credentials |

### **Development Tips**
- Use browser dev tools for responsive testing
- Content changes auto-save in TinaCMS admin
- TypeScript provides compile-time error checking
- Hot reload is enabled for instant development feedback

### 🌍 Internationalization System

```typescript
// Language Context Implementation
interface LanguageContextType {
  language: 'en' | 'ta';
  setLanguage: (lang: 'en' | 'ta') => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
```

### 📝 Content Management Workflow

```typescript
// TinaCMS Schema Example
export const pageSchema: Template = {
  name: 'page',
  label: 'Page',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      isTitle: true,
      required: true,
    },
    {
      type: 'rich-text',
      name: 'content',
      label: 'Content',
    },
  ],
};
```

### 🎨 Design System

<div align="center">

| Component | Purpose | Features |
|-----------|---------|----------|
| `Button` | Primary actions | Multiple variants, loading states |
| `Card` | Content containers | Hover effects, responsive layout |
| `Modal` | Overlays | Accessible, keyboard navigation |
| `Form` | Data input | Validation, error handling |

</div>

---

## 📊 Performance Metrics

<div align="center">

| Metric | Score | Target |
|--------|-------|---------|
| 🚀 **Performance** | 95+ | 90+ |
| ♿ **Accessibility** | 100 | 95+ |
| 🔍 **SEO** | 100 | 95+ |
| ✅ **Best Practices** | 95+ | 90+ |

</div>

---

## 🎯 Project Goals & Impact

<table>
<tr>
<td width="50%">

### 🌱 **Sustainability Mission**
- Promote permaculture practices
- Bridge language barriers in agriculture
- Create accessible educational resources
- Build community around sustainable farming

</td>
<td width="50%">

### 💻 **Technical Achievement**
- Modern React architecture
- Comprehensive i18n implementation
- Headless CMS integration
- Performance optimization
- Accessibility compliance

</td>
</tr>
</table>

---

## 🔮 Roadmap

- [ ] **Phase 2**: E-commerce integration
- [ ] **Phase 3**: Community forum
- [ ] **Phase 4**: Mobile application
- [ ] **Phase 5**: AI-powered recommendations
- [ ] **Phase 6**: Multi-region deployment

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is developed for the Uyirmai organization. All rights reserved.

---

<div align="center">

## 👨‍💻 Developer

**Vithyabavan Sunthareswaran**  
*Full Stack Developer & ML Engineer*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/vithyabavan-sunthareswaran/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/VithyabavanS)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail)](mailto:vithyabavans2001@gmail.com)

---

### 💚 *"Technology meets sustainability. Innovation serves nature."*

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![For Nature](https://img.shields.io/badge/For-🌱%20Nature-green?style=for-the-badge)

</div>
