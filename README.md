# saynbox

This is a web app I designed for my 5-year-old daughter. It lets kids say or type simple words to bring images to life. The image can be something they’ve drawn or one fetched from the web. The goal is to inspire children to love drawing, explore technology, and stretch their imagination.

**SaynBox** is a **voice-controlled creative sandbox** built with **React + TypeScript**.
It lets kids upload an image (for example, their own drawing) and bring it to life by talking to it — saying things like **“faster,” “slower,” “stop,”** or **“go.”**
The image moves smoothly across the screen as a single object, with motion controlled entirely by speech.

---

## ✨ Features

| Feature                            | Description                                                           |
| ---------------------------------- | --------------------------------------------------------------------- |
| 🎨**Image Upload**           | Upload any image — a drawing, picture, or photo.                     |
| 🎤**Voice Commands**         | Control motion by saying “faster,” “slower,” “stop,” or “go.” |
| 🌀**Smooth Motion**          | The image falls continuously and loops from bottom to top.            |
| ⚡**Real-time Reactivity**   | Speech instantly updates animation speed and state.                   |
| 🧠**Ref-based Architecture** | Ensures the animation reads the latest voice input every frame.       |
| 🧱**Container-ready**        | Includes a Dockerfile for reproducible builds and deployment.         |

---

## 🧠 Design Philosophy

> *“Technology should feel magical — especially to kids.”*

SaynBox is designed to spark creativity by blending **art, motion, and voice interaction**.
It helps children experience how computers can **see and listen**, encouraging imagination and curiosity.

---

## 🏗️ Architecture


🎤 Voice Input

↓

Web Speech API (Recognition)

↓

React State (speed, running)

↓

CanvasRenderer via Refs

↓

🎞️ Continuous Animation Loop


- **`useSpeech.ts`** — Custom hook that captures voice commands using the **Web Speech API**.
- **`App.tsx`** — Interprets recognized words (“faster,” “stop,” etc.) and updates React state.
- **`CanvasRenderer.tsx`** — Draws the uploaded image on a canvas and animates it using real-time refs.

---

## ⚙️ How It Works

1. 🎤 The browser listens using the Web Speech API.
2. 🧠 Recognized phrases (like *“faster”*) trigger React state changes.
3. 🎞️ The canvas animation loop reads `speedRef.current` and `runningRef.current` every frame.
4. 🪄 The image moves smoothly — stopping, starting, or accelerating based on your voice.

This design separates **speech logic**, **state management**, and **rendering**, keeping everything modular and responsive.

---

## 🧱 Tech Stack

- **React + TypeScript** – UI and state management
- **HTML5 Canvas** – Real-time image animation
- **Web Speech API** – Voice recognition
- **Docker** – Optional containerized deployment

---

## 🚀 Getting Started

### 1️⃣ Clone & Install

```bash
git clone https://github.com/<your-username>/saynbox.git
cd saynbox
npm install
```

### 2️⃣ Run Locally

<pre class="overflow-visible!" data-start="3301" data-end="3322"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm start
</span></span></code></div></div></pre>

Open [http://localhost:3000](http://localhost:3000)

### 3️⃣ Voice Permissions

When prompted, allow **microphone access** in your browser (Chrome or Edge recommended)


## Docker Build

<pre class="overflow-visible!" data-start="3517" data-end="3584"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>docker build -t saynbox .
docker run -p 8080:80 saynbox
</span></span></code></div></div></pre>

Then open [http://localhost:8080](http://localhost:8080)


## 📁 Project Structure

<pre class="overflow-visible!" data-start="3675" data-end="3964"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>saynbox/
 ├── </span><span>public</span><span>/
 ├── src/
 │    ├── components/
 │    │    ├── CanvasRenderer.tsx
 │    │    └── ImageLoader.tsx
 │    ├── hooks/
 │    │    └── useSpeech.ts
 │    ├── App.tsx
 │    └── </span><span>index</span><span>.tsx
 ├── Dockerfile
 ├── .dockerignore
 ├── .nvmrc
 ├── package.json
 └── README.md
</span></span></code></div></div></pre>

---

## 💡 Future Ideas

* 🗣️ **Voice feedback** — App speaks back (“Okay, speeding up!”).
* 🌧️ **Environmental modes** — Rain, wind, gravity flip.
* 🖍️ **Draw inside the app** — Kids sketch directly and animate their own art.
* 🤖 **AI image generation** — Use keywords to generate scenes to animate.
* 💫 **AR version** — Project images onto the wall using a phone or projector.

---

## 👩‍👧 Author’s Note

> *“I built SaynBox for my 5-year-old daughter.
>
> I wanted her to see that computers can listen, respond, and turn her drawings into motion —
>
> not through menus or buttons, but through imagination.”*

---

## 📜 License

This project is licensed under the  **MIT License** .

Feel free to fork, remix, and play — creativity is meant to be shared. 🎨

---

<pre class="overflow-visible!" data-start="4747" data-end="4937" data-is-last-node=""><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"></div></div></pre>
