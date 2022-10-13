import React, { Component } from "react";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
import DTube from "../abis/DTube.json";
import Navbar from "./Navbar";
import Main from "./Main";
import Footer from "./Footer";
import Web3 from "web3";
import "./App.css";
import "dotenv/config";

const token = process.env.REACT_APP_API_TOKEN;
const client = new Web3Storage({ token });

const loaderStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = DTube.networks[networkId];
    if (networkData) {
      const dtube = new web3.eth.Contract(DTube.abi, networkData.address);
      this.setState({ dtube });
      const videosCount = await dtube.methods.videoCount().call();
      this.setState({ videosCount });
      // Load videos, sort by newest
      for (var i = videosCount; i >= 1; i--) {
        const video = await dtube.methods.videos(i).call();
        this.setState({
          videos: [...this.state.videos, video],
        });
      }
      //Set latest video with title to view as default
      const latest = await dtube.methods.videos(videosCount).call();
      this.setState({
        currentHash: latest.hash,
        currentTitle: latest.title,
      });
      this.setState({ loading: false });
    } else {
      window.alert("DTube contract not deployed to detected network.");
    }
  }

  captureFile = (event) => {
    event.preventDefault();
    const file = document.querySelector('input[type="file"]');
    return this.setState({ file: file });
  };

  async uploadVideo(title) {
    console.log("Submitting file to IPFS...");
    const videoFile = this.state.file;
    //adding file to the IPFS
    const cid = await client.put(videoFile.files, { wrapWithDirectory: false });
    this.setState({ loading: true });
    this.state.dtube.methods
      .uploadVideo(cid, title)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  }

  changeVideo = (hash, title) => {
    this.setState({ currentHash: hash });
    this.setState({ currentTitle: title });
  };

  toggleDarkMode(event) {
    event.stopPropagation();
    this.setState((prevState) => {
      this.setDarkModeToLocalStorage(!prevState.isDarkModeEnabled);
      return { isDarkModeEnabled: !prevState.isDarkModeEnabled };
    });
  }

  setDarkModeToLocalStorage(val) {
    try {
      localStorage.setItem("isDarkModeEnabled", val);
    } catch (err) {
      console.log(err);
    }
  }

  getDarkModeFromLocalStorage() {
    try {
      const isDarkModeEnabled = localStorage.getItem("isDarkModeEnabled");
      if (isDarkModeEnabled !== undefined || isDarkModeEnabled !== null) {
        if (isDarkModeEnabled === "true") return true;
        else return false;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      account: "",
      dtube: null,
      videos: [],
      loading: true,
      currentHash: null,
      currentTitle: null,
      isDarkModeEnabled: false,
    };

    this.uploadVideo = this.uploadVideo.bind(this);
    this.captureFile = this.captureFile.bind(this);
    this.changeVideo = this.changeVideo.bind(this);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  componentDidMount() {
    this.setState({ isDarkModeEnabled: this.getDarkModeFromLocalStorage() });
  }

  render() {
    return (
      <div className={this.state.isDarkModeEnabled ? "bg-dark" : "bg-light"}>
        <Navbar
          account={this.state.account}
          toggleDarkMode={this.toggleDarkMode}
          isDarkModeEnabled={this.state.isDarkModeEnabled}
        />
        {this.state.loading ? (
          <div id="loader" style={loaderStyle}>
            <p
              className={
                this.state.isDarkModeEnabled ? "text-white" : "text-secondary"
              }
            >
              Loading...
            </p>
          </div>
        ) : (
          <>
            <Main
              videos={this.state.videos}
              account={this.state.account}
              uploadVideo={this.uploadVideo}
              captureFile={this.captureFile}
              changeVideo={this.changeVideo}
              currentHash={this.state.currentHash}
              currentTitle={this.state.currentTitle}
              isDarkModeEnabled={this.state.isDarkModeEnabled}
            />
            <Footer isDarkModeEnabled={this.state.isDarkModeEnabled} />
          </>
        )}
      </div>
    );
  }
}

export default App;
