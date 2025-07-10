import './App.css'
import { FormControl, Button, InputGroup, Container, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    console.log("Client ID:", clientID);
    console.log("Client Secret:", clientSecret);

    let authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
    };

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        console.log("Access Token:", data.access_token); // ✅ Add this too
        setAccessToken(data.access_token);
      });
  }, []);


  async function search() {
    let artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    // GET ARTIST
    try {
      const artistResult = await fetch(
        "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
        artistParams
      );
      const artistData = await artistResult.json();

      if (
        !artistData.artists ||
        !artistData.artists.items ||
        artistData.artists.items.length === 0
      ) {
        console.error("No artist found for:", searchInput);
        return;
      }

      const artistID = artistData.artists.items[0].id;
      console.log("Artist ID:", artistID);

      // GET ARTIST'S ALBUMS
      const albumResult = await fetch(
        `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`,
        artistParams
      );
      const albumData = await albumResult.json();

      console.log("Albums:", albumData.items); // 🔍 Show albums in console
      setAlbums(albumData.items);
    } catch (error) {
      console.error("Error fetching artist or albums:", error);
    }
  }


  return (
    <>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" alt="Spotify" width="200" />
        <h1>SPOTIFY ALBUM FINDER</h1>
      </div>


      <Container>
        <InputGroup>
          <FormControl
            placeholder="Search For Artist"
            type="input"
            aria-label="Search for an Artist"
            onKeyDown={(event) => {    // search function
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}  //setSearch
            style={{
              width: "300px",
              height: "35px",
              borderWidth: "0px",
              borderStyle: "solid",
              borderRadius: "5px",
              marginRight: "10px",
              paddingLeft: "10px"
            }}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
        <Container>
          <Row
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignContent: "center",
            }}
          >
            {albums.map((album) => {
              return (
                <Card
                  key={album.id}
                  style={{
                    backgroundColor: "white",
                    margin: "10px",
                    borderRadius: "5px",
                    marginBottom: "30px",
                  }}
                >
                  <Card.Img
                    width={200}
                    src={album.images[0].url}
                    style={{
                      borderRadius: "4%",
                    }}
                  />
                  <Card.Body>
                    <Card.Title
                      style={{
                        whiteSpace: "wrap",
                        fontWeight: "bold",
                        maxWidth: "200px",
                        fontSize: "18px",
                        marginTop: "10px",
                        color: "black",
                      }}
                    >
                      {album.name}
                    </Card.Title>
                    <Card.Text
                      style={{
                        color: "black",
                      }}
                    >
                      Release Date: <br /> {album.release_date}
                    </Card.Text>
                    <Button
                      href={album.external_urls.spotify}
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "15px",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      Album Link
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
        </Container>
      </Container>

    </>
  )
}

export default App
