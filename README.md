# ONEXA - Your Parallel AI Self

**Tagline:** Simulate relationships and predict outcomes before they happen.

![ONEXA Banner](https://via.placeholder.com/1200x400/000000/00ffff?text=ONEXA+-+Parallel+AI+Life+Simulator)

## 🚀 Vision

ONEXA is a futuristic AI-powered parallel life simulator where your AI clone interacts with simulated personalities, analyzes compatibility, predicts outcomes of conversations and dates, and generates real-world strategies.

**This is NOT a dating app.** This is a **PARALLEL SOCIAL SIMULATION ENGINE** powered by AI agents.

## 🎯 Problem

Making decisions about relationships and social interactions is hard. We often wonder:
- "How will this conversation go?"
- "Are we actually compatible?"
- "What should I say to make a good impression?"
- "Will this relationship work long-term?"

Traditional dating apps connect you directly with people, forcing you to learn through trial and error. ONEXA lets you simulate these interactions first, giving you strategic insights before reality happens.

## ✨ Solution

ONEXA creates a parallel reality where:

1. **Your AI Clone** - A digital twin that mirrors your personality, communication style, and social goals
2. **Simulated Personalities** - AI-generated profiles of other people based on their bios, chats, or descriptions
3. **Parallel Simulations** - AI agents interact in real-time, analyzing compatibility and predicting outcomes
4. **Strategic Insights** - Actionable recommendations for real-world success (unlocked via blockchain)

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - State management

### Backend
- **Next.js API Routes** - Serverless functions
- **Node.js** - Runtime environment

### AI
- **Google Gemini 1.5 Flash** - All AI generation tasks
- **Structured Prompting** - Consistent, high-quality outputs

### Blockchain
- **SKALE Testnet** - Transaction unlock mechanism (mock for demo)
- **ethers.js** - Wallet interaction

### Design
- **Glassmorphism** - Frosted glass UI effects
- **Neon Aesthetics** - Cyan, pink, purple accents
- **Dark Theme** - Futuristic black background

## 🏗 Architecture

\`\`\`
┌─────────────────────────────────────────┐
│         Frontend (Next.js 14)           │
│  ┌──────────┐  ┌──────────┐            │
│  │ Landing  │  │  Create  │            │
│  │   Page   │  │   Flow   │            │
│  └──────────┘  └──────────┘            │
│  ┌──────────┐  ┌──────────┐            │
│  │Simulation│  │ Premium  │            │
│  │  Engine  │  │ Insights │            │
│  └──────────┘  └──────────┘            │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│      API Routes (Serverless)            │
│  /api/clone/create                      │
│  /api/personality/create                │
│  /api/simulation/run                    │
│  /api/insights/generate                 │
│  /api/unlock/verify                     │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│         AI Services Layer               │
│  ┌──────────────┐  ┌─────────────┐    │
│  │  Gemini API  │  │  Blockchain │    │
│  │  (Google)    │  │   (SKALE)   │    │
│  └──────────────┘  └─────────────┘    │
└─────────────────────────────────────────┘
\`\`\`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/onexa.git
   cd onexa
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   
   Create a \`.env.local\` file in the root directory:
   \`\`\`env
   GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Demo Flow (For Judges)

### Quick Demo (15 seconds)
1. Click **"Try Instant Demo"** on the landing page
2. Watch as the system auto-generates profiles and runs a simulation
3. View compatibility analysis and metrics
4. See the premium insights unlock flow

### Full Demo (2-3 minutes)
1. Click **"Start Demo"** on the landing page
2. **Create Your AI Clone:**
   - Enter your name
   - Select personality type
   - Add interests (comma-separated)
   - Choose communication style
   - Describe social goals
3. **Create Simulated Personality:**
   - Choose input type (Bio, Chat, or Description)
   - Paste sample text
4. **Run Parallel Simulation:**
   - Watch AI agents converse in real-time
   - View compatibility metrics (attraction, compatibility, ghost risk)
   - See red flags and green flags
5. **Unlock Premium Insights:**
   - Click "Unlock Full Parallel Outcome"
   - Mock blockchain transaction executes
   - View strategic recommendations:
     - Exact message to send
     - Ideal date plan
     - Topics to avoid
     - Success probability
     - Confidence tips
     - Future date simulation
     - Psychological analysis
     - Long-term potential

## 🔗 Onchain Component

ONEXA integrates blockchain technology for premium feature unlocking:

- **Network:** SKALE Testnet (mock for demo)
- **Mechanism:** Users initiate a transaction to unlock premium insights
- **Verification:** Transaction hash is verified before granting access
- **Status Display:** "Verified Unlock" indicator with transaction hash
- **Persistence:** Unlock status stored in session state

**Note:** For demo purposes, the blockchain integration is mocked. In production, this would connect to SKALE testnet with real wallet integration (MetaMask/WalletConnect).

## 📁 Project Structure

\`\`\`
onexa/
├── app/
│   ├── api/              # API routes
│   │   ├── clone/
│   │   ├── personality/
│   │   ├── simulation/
│   │   ├── insights/
│   │   └── unlock/
│   ├── create/           # AI clone & personality creation
│   ├── simulate/         # Simulation engine & results
│   ├── demo/             # Instant demo mode
│   ├── build-log/        # AI architecture documentation
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/
│   └── ui/               # Reusable UI components
├── lib/
│   ├── gemini.ts         # Gemini API client
│   ├── aiClone.ts        # AI clone generation
│   ├── personality.ts    # Personality extraction
│   ├── simulation.ts     # Parallel simulation engine
│   ├── insights.ts       # Premium insights generation
│   └── demoData.ts       # Demo data generator
├── store/
│   └── sessionStore.ts   # Zustand state management
├── types/
│   └── index.ts          # TypeScript interfaces
└── README.md
\`\`\`

## 🎨 Design Philosophy

ONEXA's design embodies a futuristic, high-tech aesthetic:

- **Glassmorphism:** Frosted glass effects with transparency and blur
- **Neon Accents:** Cyan (#00ffff), Pink (#ff00ff), Purple (#9d00ff)
- **Dark Theme:** Pure black (#000000) background
- **Smooth Animations:** Framer Motion for fluid transitions
- **Modern Typography:** Clean sans-serif fonts
- **Responsive:** Mobile-first design approach

## 🧠 AI Methodology

### 1. Personality Modeling
Each personality is modeled as a structured data object containing traits, communication patterns, and behavioral tendencies.

### 2. Contextual Conversation Generation
The AI generates conversations by considering both personalities simultaneously, ensuring responses reflect each character's unique traits.

### 3. Compatibility Analysis
After generating the conversation, the AI analyzes the interaction for compatibility signals, identifying positive indicators and potential concerns.

### 4. Predictive Modeling
Using the conversation and compatibility analysis, the system predicts future outcomes including interest levels, ghost probability, and long-term relationship potential.

## 🏆 Hackathon Highlights

### Originality
- First-of-its-kind parallel life simulator
- Novel approach to social prediction using AI agents
- Unique blend of AI, blockchain, and social technology

### AI Depth
- Multi-stage AI pipeline (clone → personality → simulation → insights)
- Structured prompt engineering for consistent outputs
- Real-time agent-based conversation generation
- Comprehensive compatibility analysis

### Real-World Usability
- Intuitive user flow from creation to insights
- Actionable recommendations for real-world application
- Demo mode for instant evaluation
- Clean, production-ready UI

### Technical Excellence
- Modern tech stack (Next.js 14, TypeScript, Gemini AI)
- Clean architecture with separation of concerns
- Type-safe development
- Responsive design

### Onchain Integration
- Blockchain-based premium unlock mechanism
- Transaction verification
- SKALE testnet compatibility

## 📝 Environment Variables

Create a \`.env.local\` file with:

\`\`\`env
# Required: Google Gemini API Key
GEMINI_API_KEY=your_api_key_here
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here

# Optional: For production blockchain integration
# NEXT_PUBLIC_SKALE_RPC_URL=https://testnet.skalenodes.com/v1/...
# NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
\`\`\`

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- **Netlify:** Configure build command as \`npm run build\`
- **AWS Amplify:** Use Next.js SSR configuration
- **Docker:** Use provided Dockerfile (if available)

## 🤝 Contributing

This is a hackathon project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning and inspiration!

## 🙏 Acknowledgments

- **Google Gemini** for powerful AI capabilities
- **SKALE Network** for blockchain infrastructure
- **Next.js Team** for an amazing framework
- **Vercel** for seamless deployment

## 📧 Contact

Built with ❤️ for the hackathon

- **Demo:** [https://onexa.vercel.app](https://onexa.vercel.app)
- **GitHub:** [https://github.com/yourusername/onexa](https://github.com/yourusername/onexa)

---

**ONEXA** - Your Parallel AI Self © 2026
