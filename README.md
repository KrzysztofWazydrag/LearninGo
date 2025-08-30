# LearninGo

LearninGo is a mobile app for planning, tracking, and sharing your learning journey. It helps you organize your learning path (e.g., for cybersecurity), mix easy and hard tasks, and keep your motivation high. You can also build and update your digital CV, visible to recruiters, and track your progress on a timeline—just like GitHub contributions.

## Features
- Personal learning plan and schedule
- Timeline of your learning activity
- Digital CV builder and updater
- Expo Router navigation
- Supabase authentication and backend
- Modular, clean codebase (TypeScript, React Native)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### Installation
Clone the repository:
```sh
git clone https://github.com/KrzysztofWazydrag/LearninGo.git
cd LearninGo/project
```
Install dependencies:
```sh
npm install
```

### Running the App
Start the Expo development server:
```sh
npx expo start
```
Scan the QR code with Expo Go (Android/iOS) or run on an emulator.

### Environment
Supabase credentials are pre-configured for demo/testing. For production, set your own keys in `src/utils/supabaseClient.ts`.

### Project Structure
- `app/` — Expo Router screens and navigation
- `src/hooks/` — Custom React hooks
- `src/utils/` — Utility modules (e.g., Supabase client)
- `assets/` — App icons and images

## License
MIT
