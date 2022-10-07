// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DTube {

  error NotProperHash();
  error NotProperTitle();
    
  uint256 public videoCount;
  string public constant name = "DTube";
  mapping(uint => Video) public videos;

  struct Video {
    uint id;
    string hash;
    string title;
    address author;
  }

  event VideoUploaded(
    uint id,
    string hash,
    string title,
    address author
  );

  function uploadVideo(string calldata _videoHash, string calldata _title) public {
    // Make sure the video hash exists
    if(bytes(_videoHash).length == 0){
      revert NotProperHash();
    }
   
    // Make sure video title exists
    if(bytes(_title).length == 0){
      revert NotProperTitle();
    }

    // Increment video id
    videoCount ++;

    // Add video to the contract
    videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);
    // Trigger an event
    emit VideoUploaded(videoCount, _videoHash, _title, msg.sender);
  }
}
