import React, { useState, useEffect } from 'react';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import DTube from '../abis/DTube.json';
import Navbar from './Navbar';
import Main from './Main';
import Footer from './Footer';
import Web3 from 'web3';
import './App.css';

require('dotenv').config();

const token = process.env.REACT_APP_API_TOKEN;
const client = new Web3Storage({ token });

const loaderStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const App = () => {
    const [file, setFile] = useState(null);
    const [account, setAccount] = useState('');
    const [dtube, setDtube] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentHash, setCurrentHash] = useState(null);
    const [currentTitle, setCurrentTitle] = useState(null);
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
        setIsDarkModeEnabled(getDarkModeFromLocalStorage());
    }, []);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                'Non-Ethereum browser detected. You should consider trying MetaMask!'
            );
        }
    };

    const loadBlockchainData = async () => {
        const web3 = window.web3;
        // Load account
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        // Network ID
        const networkId = await web3.eth.net.getId();
        const networkData = DTube.networks[networkId];
        if (networkData) {
            const dtube = new web3.eth.Contract(DTube.abi, networkData.address);
            setDtube(dtube);
            const videosCount = await dtube.methods.videoCount().call();
            // Load videos, sort by newest
            for (var i = videosCount; i >= 1; i--) {
                const video = await dtube.methods.videos(i).call();
                setVideos(videos => [...videos, video]);
            }
            //Set latest video with title to view as default
            const latest = await dtube.methods.videos(videosCount).call();
            setCurrentHash(latest.hash);
            setCurrentTitle(latest.title);
            setLoading(false);
        } else {
            window.alert('DTube contract not deployed to detected network.');
        }
    };

    const captureFile = event => {
        event.preventDefault();
        const file = document.querySelector('input[type="file"]');
        return setFile(file);
    };

    const uploadVideo = async title => {
        console.log('Submitting file to IPFS...');
        const videoFile = file;
        //adding file to the IPFS
        const cid = await client.put(videoFile.files, {
            wrapWithDirectory: false,
        });
        setLoading(true);
        console.log('Hello');
        dtube.methods
            .uploadVideo(cid, title)
            .send({ from: account })
            .on('transactionHash', hash => {
                setLoading(false);
            });
    };

    const changeVideo = (hash, title) => {
        setCurrentHash(hash);
        setCurrentTitle(title);
    };

    const toggleDarkMode = event => {
        event.stopPropagation();
        setDarkModeToLocalStorage(!isDarkModeEnabled);
        setIsDarkModeEnabled(!isDarkModeEnabled);
    };

    const setDarkModeToLocalStorage = val => {
        try {
            localStorage.setItem('isDarkModeEnabled', val);
        } catch (err) {
            console.log(err);
        }
    };

    const getDarkModeFromLocalStorage = () => {
        try {
            const isDarkModeEnabled = localStorage.getItem('isDarkModeEnabled');
            if (isDarkModeEnabled !== undefined || isDarkModeEnabled !== null) {
                if (isDarkModeEnabled === 'true') return true;
                else return false;
            }
            return false;
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={isDarkModeEnabled ? 'bg-dark' : 'bg-light'}>
            <Navbar
                account={account}
                toggleDarkMode={toggleDarkMode}
                isDarkModeEnabled={isDarkModeEnabled}
            />
            {loading ? (
                <div id='loader' style={loaderStyle}>
                    <p
                        className={
                            isDarkModeEnabled ? 'text-white' : 'text-secondary'
                        }
                    >
                        Loading...
                    </p>
                </div>
            ) : (
                <>
                    <Main
                        videos={videos}
                        account={account}
                        uploadVideo={uploadVideo}
                        captureFile={captureFile}
                        changeVideo={changeVideo}
                        currentHash={currentHash}
                        currentTitle={currentTitle}
                        isDarkModeEnabled={isDarkModeEnabled}
                    />
                    <Footer isDarkModeEnabled={isDarkModeEnabled} />
                </>
            )}
        </div>
    );
};

export default App;
