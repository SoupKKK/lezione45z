import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInfo, addFavoriteSong, addUser } from '../redux/actions';
import { Card, Col, Row, Button } from 'react-bootstrap';
import Player from './Player';
import { useParams } from 'react-router-dom';

const SongCard = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.info);
  const { artistName } = useParams();
  const [artist] = useState(artistName);
  const { pathname } = useLocation();
  const [playerData, setPlayerData] = useState(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [userId, setUserId] = useState(null);


  const handleAddToFavorite = (userId, song) => {
    dispatch(addFavoriteSong(userId, song));
  };

  useEffect(() => {
    fetchData(artist);
  }, [artist]);

  const fetchData = async (artist) => {
    dispatch(fetchInfo("eminem"));
  };

  const handleCardClick = (clickedItem) => {
    const { preview, album } = clickedItem;
    setPlayerData({
      track: preview,
      image: album.cover_small,
      title: album.title,
    });
    setIsPlayerVisible(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return (
      <div>
        <p>Data not available</p>
      </div>
    );
  }


  return (
    <div>
      {pathname === "/" && <h1>Ascoltati di recente: </h1>}
      <Row className="m-4">
        {data.data.map((item, i) => (
          <Col xl={2} md={3} sm={6} key={i} onClick={() => handleCardClick(item)}>
            <Card className="mt-3">
              <Card.Img variant="top" src={item.album.cover_big} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.artist.name}</Card.Text>

                {isAuthenticated && (
                  <div>
                    <Button
                      variant="primary"
                      onClick={() => handleAddToFavorite(userId, item)}
                    >
                      Aggiungi ai preferiti
                    </Button>
                  </div>

                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {isPlayerVisible && <Player {...playerData} />}
    </div>
  );
};

export default SongCard;
