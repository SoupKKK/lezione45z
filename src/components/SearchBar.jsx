import Form from 'react-bootstrap/Form';
import { fetchInfo } from '../redux/actions';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SongCard from './SongsCard';
import { addUser } from '../redux/actions';
import { setUserId } from '../redux/actions';

function SearchBar() {
    const dispatch = useDispatch();
    const [artistSearch, setArtistSearch] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        if (artistSearch.trim() === '') {
            fetchData();
        } else {
            fetchData(artistSearch);
        }
    }, [artistSearch]);

    useEffect(() => {
        const savedSearches = localStorage.getItem('searchHistory');
        if (savedSearches) {
            setSearchHistory(JSON.parse(savedSearches));
        }
    }, []);

    const saveSearchToHistory = (searchTerm) => {
        const updatedHistory = [...searchHistory, searchTerm];
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    const fetchData = async (artist) => {
        dispatch(fetchInfo(artist));
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        setSearchTimeout(setTimeout(() => saveSearchToHistory(artist), 1000));
    };

    const handleInputChange = (event) => {
        setArtistSearch(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData(artistSearch);
    };

    return (
        <div>
            
            <Form onSubmit={handleSubmit}>
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                    </svg>
                </Link>
                <Form.Control
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2 m-3"
                    value={artistSearch}
                    onChange={handleInputChange}
                />
            </Form>
            {searchHistory.length > 0 && (
                <div>
                    <h4>Recent Searches:</h4>
                    <ul>
                        {searchHistory.filter(search => typeof search === 'string' && search.trim() !== "").map((search, index) => (
                            <li key={index}>{search}</li>
                        ))}
                    </ul>
                </div>
            )}
            {artistSearch.trim() !== '' ? <SongCard ArtistName={artistSearch} /> : null}
        
           
        </div>
    );
}

export default SearchBar;
