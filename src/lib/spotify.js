
import axios from "axios";

class SpotifyClient {
  static async initialize() {
    // Spotify APIのクライアントIDとシークレットを環境変数から取得
    const response = await axios.post("https://accounts.spotify.com/api/token", {
      grant_type: "client_credentials",
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    let spotify = new SpotifyClient();
    spotify.token = response.data.access_token;
    return spotify;
  }

  // 人気曲を取得するメソッド
  async getPopularSongs() {
    const response = await axios.get(
      "https://api.spotify.com/v1/playlists/5SLPaOxQyJ8Ne9zpmTOvSe",
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    )
    return response.data.tracks;
  }

  async getAlbum() {
    const response = await axios.get(
      "https://api.spotify.com/v1/albums/3bRSI9DOQA2KdJ7t6zdW0V",
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    )
    return response.data;
  }
  // 曲を検索するメソッド
  async searchSongs(keyword, limit, offset) {
    const response = await axios.get(
      `https://api.spotify.com/v1/search`,
      {
        headers: { Authorization: `Bearer ${this.token}` },
        params: { q: keyword, type: "track", limit, offset },
      }
    )
    return response.data.tracks;
  }


}

const spotify = await SpotifyClient.initialize();
export default spotify;
