# MiMo Content Studio

Multi-modal AI content generator powered by Xiaomi MiMo V2.5 models. Built for the Xiaomi MiMo Orbit 100T Creator Incentive Program.

## 🚀 Features

- **Text Generation**: Creative writing, marketing copy, stories using MiMo V2.5 Text Model
- **Image Generation**: Stunning visuals from text prompts using MiMo V2.5 Image Model
- **Voice Generation**: Natural-sounding speech synthesis using MiMo V2.5 Voice Model
- **Multi-modal Pipeline**: Combine text, image, and voice generation in one workflow
- **Modern UI**: Responsive design with dark theme, smooth animations
- **API Integration**: Ready for real MiMo API integration

## 🏗️ Architecture

```
Frontend (Next.js 14) → Backend (FastAPI) → MiMo V2.5 API
    │                        │
    ├── React 18            ├── Python 3.11
    ├── TypeScript          ├── FastAPI
    ├── Tailwind CSS        ├── Uvicorn
    └── Framer Motion       └── Pydantic
```

## 📦 Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS + Framer Motion
- Responsive design

**Backend:**
- FastAPI (Python)
- Uvicorn server
- Pydantic validation
- CORS enabled

## 🚀 Quick Start

### 1. Clone & Setup

```bash
# Clone repository
git clone <repository-url>
cd mimo-content-studio

# Backend setup
cd server
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend setup
cd ../client
npm install
```

### 2. Environment Configuration

**Backend (.env file in server/):**
```env
MIMO_API_KEY=your_mimo_api_key_here
PORT=5000
```

**Frontend (.env.local file in client/):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Get MiMo API Key

1. Register at [platform.xiaomimimo.com](https://platform.xiaomimimo.com)
2. Create new project
3. Generate API key
4. Add to backend .env file

### 4. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd server
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 5. Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/docs

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Text Generation
```
POST /api/generate/text
{
  "prompt": "Write a story about...",
  "max_tokens": 500,
  "temperature": 0.7
}
```

### Image Generation
```
POST /api/generate/image
{
  "prompt": "A futuristic city...",
  "size": "1024x1024",
  "quality": "hd"
}
```

### Voice Generation
```
POST /api/generate/voice
{
  "text": "Hello world...",
  "voice": "default",
  "speed": 1.0
}
```

### Multi-modal Pipeline
```
POST /api/pipeline/create
{
  "text_prompt": "Create marketing content...",
  "generate_image": true,
  "generate_voice": true
}
```

## 🚢 Deployment

### Option 1: Vercel + Railway (Recommended)

**Backend (Railway):**
1. Create new project on Railway
2. Connect GitHub repository
3. Set environment variable: `MIMO_API_KEY`
4. Deploy from `server/` directory
5. Copy backend URL

**Frontend (Vercel):**
1. Import project on Vercel
2. Set environment variable: `NEXT_PUBLIC_API_URL=<backend_url>`
3. Deploy from `client/` directory
4. Copy frontend URL

### Option 2: Docker

**Build and run:**
```bash
# Backend
cd server
docker build -t mimo-backend .
docker run -p 5000:5000 --env-file .env mimo-backend

# Frontend
cd client
docker build -t mimo-frontend .
docker run -p 3000:3000 --env-file .env.local mimo-frontend
```

### Option 3: Manual Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed manual deployment instructions.

## 📝 Submission Requirements

For Xiaomi MiMo Orbit 100T Creator Incentive Program:

1. **Live Demo URL**: Publicly accessible application
2. **GitHub Repository**: Full source code
3. **Documentation**: Setup and usage instructions
4. **Video Demo**: 3-minute showcase (see [DEMO_SCRIPT.md](DEMO_SCRIPT.md))
5. **Proof of MiMo API Usage**: API calls and model outputs
6. **Screenshots**: Application interface

**Deadline**: May 28, 2026

## 🎯 Project Status

✅ **Completed:**
- Backend API with 4 endpoints
- Frontend UI with 4 tabs
- Mock API integration
- Documentation
- Build scripts

🔧 **Ready for Integration:**
- Real MiMo API key integration
- Production deployment
- Performance optimization

## 📊 MiMo V2.5 Models

| Model | Capabilities | Credits/Request |
|-------|-------------|-----------------|
| **mimo-v2.5-text** | Creative writing, code generation, translation | 5 credits |
| **mimo-v2.5-image** | High-quality image generation, style transfer | 10 credits |
| **mimo-v2.5-voice** | Natural speech synthesis, multiple voices | 5 credits |

## 🔧 Development

### Project Structure

```
mimo-content-studio/
├── server/                 # FastAPI backend
│   ├── main.py            # API endpoints
│   ├── requirements.txt   # Python dependencies
│   ├── .env              # Environment variables
│   └── Dockerfile        # Container config
├── client/                # Next.js frontend
│   ├── app/              # Next.js app router
│   │   ├── page.tsx      # Main page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── package.json      # Frontend dependencies
│   └── next.config.js    # Next.js config
├── docs/                  # Documentation
│   ├── DEMO_SCRIPT.md    # Video demo script
│   ├── DEPLOYMENT.md     # Deployment guide
│   └── SUBMISSION.md     # Submission checklist
└── README.md             # This file
```

### Testing

```bash
# Backend tests
cd server
python -m pytest

# Frontend build test
cd client
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 📞 Support

- **Issues**: GitHub Issues
- **Email**: support@example.com
- **Discord**: Community server

## 🙏 Acknowledgments

- Xiaomi MiMo Team for the V2.5 models
- 100T Creator Incentive Program
- Open source community

---

**Built with ❤️ for the Xiaomi MiMo Orbit 100T Creator Incentive Program**

*Submission Deadline: May 28, 2026*
