# 🎧 Spotify Album Finder

A React-based project that lets users search for any artist and view their albums using the Spotify Web API.

This project was built by following [Codedex’s tutorial](https://www.codedex.io/projects/build-an-album-finder-with-spotify-api).  
It helped me understand how to interact with public APIs, handle authentication, and manage state in a React app.

---

## 🧠 What I Learned

- How to fetch access tokens using **Spotify’s Client Credentials flow**
- Handling API requests and responses using `fetch` and `async/await`
- Using **React hooks** like `useState` and `useEffect`
- Managing environment variables using `.env` files
- Debugging real API errors like `401 Unauthorized`
- Structuring a React project and working with **React-Bootstrap** for UI

---

## 🔧 Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Spotify Web API](https://developer.spotify.com/)
- [React-Bootstrap](https://react-bootstrap.github.io/)

---

## 🚀 How to Run Locally

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Vandana-Ss/spotify-album-finder.git
   cd spotify-album-finder
2. **Install dependencies**
   ```bash
   npm install
3. **Create a .env file in the root directory and add your Spotify API credentials**
   ```bash
   VITE_CLIENT_ID=your_spotify_client_id
   VITE_CLIENT_SECRET=your_spotify_client_secret
4. **Start the development server**
   ```bash
   npm run dev

