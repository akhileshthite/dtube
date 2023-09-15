import React from 'react';
import './App.css';

const Footer = props => {
    return (
        <div
            className={
                'footer shadow' +
                (props.isDarkModeEnabled ? ' bg-dark' : ' bg-light')
            }
        >
            <section className='content-container'>
                <div className='text-center p-5'>
                    <a
                        href='https://github.com/AkhileshThite/dtube/'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        GitHub repository
                        <span role='img' aria-label=''>
                            🔗
                        </span>
                    </a>
                    <br />
                    <br />
                    <span
                        className={
                            props.isDarkModeEnabled
                                ? 'text-white'
                                : 'text-secondary'
                        }
                    >
                        <i>
                            <span role='img' aria-label=''>
                                ⚠️
                            </span>
                            Use this DApp for educational purposes only! DTube
                            is not responsible for the harm caused by the
                            content you're uploading.
                        </i>
                    </span>
                </div>
            </section>
        </div>
    );
};

export default Footer;
