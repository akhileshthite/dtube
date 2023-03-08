import React, { Component } from 'react';
import Identicon from 'identicon.js';
import dtube from '../dtube.png';

const Navbar = props => {
    return (
        <nav
            className={
                'navbar navbar-dark fixed-top flex-md-nowrap p-1 shadow text-monospace' +
                (props.isDarkModeEnabled ? ' bg-dark' : ' bg-white')
            }
        >
            <div className='px-5'>
                <a
                    className='navbar-brand col-sm-3 col-md-2 mr-0'
                    href='/'
                    rel='noopener noreferrer'
                >
                    <img
                        src={dtube}
                        width='30'
                        height='30'
                        className='d-inline-block align-top'
                        alt='DTube logo'
                    />
                    &nbsp;
                    <span
                        className={
                            props.isDarkModeEnabled
                                ? 'text-white'
                                : 'text-secondary'
                        }
                    >
                        DTube
                    </span>
                </a>
            </div>
            <ul
                className='navbar-nav px-5'
                style={{ display: 'flex', flexDirection: 'row' }}
            >
                <li style={{ display: 'flex', alignItems: 'center' }}>
                    <p
                        style={{ marginBottom: 0, marginRight: '10px' }}
                        className={
                            props.isDarkModeEnabled
                                ? 'text-white'
                                : 'text-secondary'
                        }
                    >
                        {props.isDarkModeEnabled ? 'Dark Mode' : 'Light Mode'}
                    </p>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                    <label className='switch' style={{ margin: 0 }}>
                        <input
                            type='checkbox'
                            onClick={props.toggleDarkMode}
                            checked={props.isDarkModeEnabled}
                        />
                        <span className='slider round'></span>
                    </label>
                </li>
                <li
                    style={{ margin: 0 }}
                    className='nav-item text-nowrap h5 d-none d-sm-none d-sm-block'
                >
                    <small
                        className={
                            'px-1' +
                            (props.isDarkModeEnabled
                                ? ' text-white'
                                : ' text-secondary')
                        }
                    >
                        <small id='account'>{props.account}</small>
                    </small>
                    {props.account ? (
                        <img
                            className='ml-2'
                            width='30'
                            height='30'
                            src={`data:image/png;base64,${new Identicon(
                                props.account,
                                30
                            ).toString()}`}
                            alt='DTube account address'
                        />
                    ) : (
                        <span></span>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
