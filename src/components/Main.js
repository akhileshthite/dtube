import React, { useRef } from 'react';
import './App.css';

const Main = props => {
    const videoTitle = useRef(null);
    console.log(`https://w3s.link/ipfs/${props.currentHash}`);
    return (
        <div
            className={
                'container-fluid text-monospace main p-2' +
                (props.isDarkModeEnabled ? ' bg-dark' : ' bg-white')
            }
        >
            <br></br>
            &nbsp;
            <br></br>
            <div className='row'>
                <div className='col-md-10'>
                    <div
                        className='embed-responsive embed-responsive-16by9'
                        style={{ maxHeight: '720px' }}
                    >
                        <video
                            src={`https://w3s.link/ipfs/${props.currentHash}`}
                            controls
                            autoPlay
                        ></video>
                    </div>
                    <div className='mt-3 ml-5'>
                        <h3
                            className={
                                props.isDarkModeEnabled
                                    ? 'text-white'
                                    : 'text-dark'
                            }
                        >
                            <b>
                                <i className='video-title'>
                                    {props.currentTitle}
                                </i>
                            </b>
                        </h3>
                        <div className='mt-3'>
                            <p
                                style={{ fontWeight: 'bold' }}
                                className={
                                    props.isDarkModeEnabled
                                        ? 'text-light'
                                        : 'text-dark'
                                }
                            >
                                IPFS CID:
                                <span
                                    className={
                                        props.isDarkModeEnabled
                                            ? 'text-white'
                                            : 'text-secondary'
                                    }
                                >
                                    {props.currentHash}
                                </span>
                            </p>
                            <p
                                style={{ fontWeight: 'bold' }}
                                className={
                                    props.isDarkModeEnabled
                                        ? 'text-light'
                                        : 'text-dark'
                                }
                            >
                                Share IPFS URL:
                                <a
                                    href={`https://w3s.link/ipfs/${props.currentHash}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >{`https://w3s.link/ipfs/${props.currentHash}`}</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className='vide-feed col-md-2 border border-secondary overflow-auto text-center'
                    style={{ maxHeight: '1400px', minWidth: '175px' }}
                >
                    <h5 className='feed-title'>
                        <b
                            className={
                                props.isDarkModeEnabled
                                    ? 'text-white'
                                    : 'text-secondary'
                            }
                        >
                            Video Feed
                            <span role='img' aria-label='video-emote'>
                                📺
                            </span>
                        </b>
                    </h5>
                    <form
                        onSubmit={event => {
                            event.preventDefault();
                            const title = videoTitle.current.value;
                            props.uploadVideo(title);
                        }}
                    >
                        &nbsp;
                        <input
                            type='file'
                            accept='video/*'
                            onChange={props.captureFile}
                            style={{ width: '250px' }}
                        />
                        <div className='form-group mr-sm-2'>
                            <input
                                id='videoTitle'
                                type='text'
                                ref={videoTitle}
                                className='form-control-sm mt-3 mr-3'
                                placeholder='Video title..'
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            className='btn border border-dark btn-primary btn-block btn-sm'
                        >
                            Upload
                        </button>
                        &nbsp;
                    </form>
                    {props.videos.map((video, key) => {
                        return (
                            <div
                                className='card mb-4 text-center bg-secondary mx-auto'
                                style={{ width: '250px', height: '175px' }}
                                key={key}
                            >
                                <div className='card-title bg-dark'>
                                    <small className='text-white'>
                                        <b>{video.title}</b>
                                    </small>
                                </div>
                                <div>
                                    <p
                                        onClick={() =>
                                            props.changeVideo(
                                                video.hash,
                                                video.title
                                            )
                                        }
                                    >
                                        <video
                                            src={`https://w3s.link/ipfs/${video.hash}`}
                                            style={{
                                                width: '200px',
                                                height: '110px',
                                            }}
                                        />
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Main;
