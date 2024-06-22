// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const PARTICIPANT_MAIN_CLASS = 'participant main';
const PARTICIPANT_CLASS = 'participant';

class Participant {
  constructor(userId, userInfo, sendMessage) {
    this.userId = userId;

    this.container = document.createElement('div');
    this.container.className = this.isPresentMainParticipant() ? PARTICIPANT_CLASS : PARTICIPANT_MAIN_CLASS;
    this.container.id = userId;
    this.span = document.createElement('span');
    this.video = document.createElement('video');

    // dummy comtainer
    this.dummy = document.createElement('div');
    this.dummy.id = 'dummy-' + userId;
    this.profileImg = document.createElement('img');
    this.profileImg.id = 'profile-' + userId;
    this.profileImg.src = userInfo.profileImageUrl;
    this.dummy.appendChild(this.profileImg);

    //audio mute icon
    this.muteIcon = document.createElement('span');
    this.muteIcon.id = 'muteIcon-' + userId;
    this.muteIconImage = document.createElement('img');
    this.muteIconImage.src = '/mute-icon.svg';
    this.muteIcon.appendChild(this.muteIconImage);

    this.rtcPeer = null;
    this.sendMessage = sendMessage;
    this.onIceCandidate = this.onIceCandidate.bind(this);

    this.container.appendChild(this.video);
    this.container.appendChild(this.span);
    this.container.appendChild(this.dummy);
    this.container.appendChild(this.muteIcon);

    this.container.onclick = this.switchContainerClass.bind(this);
    document.getElementsByClassName('participants')[0].appendChild(this.container);

    this.span.appendChild(document.createTextNode(userInfo.nickname));

    this.video.id = 'video-' + userId;
    this.video.autoplay = true;
    this.video.controls = false;
  }

  getElement() {
    return this.container;
  }

  getVideoElement() {
    return this.video;
  }

  switchContainerClass() {
    if (this.container.className === PARTICIPANT_CLASS) {
      const elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_MAIN_CLASS));
      elements.forEach(function (item) {
        item.className = PARTICIPANT_CLASS;
      });

      this.container.className = PARTICIPANT_MAIN_CLASS;
    } else {
      this.container.className = PARTICIPANT_CLASS;
    }
  }

  isPresentMainParticipant() {
    return document.getElementsByClassName(PARTICIPANT_MAIN_CLASS).length !== 0;
  }

  offerToReceiveVideo(error, offerSdp, wp) {
    if (error) return console.error('sdp offer error');
    // console.log('Invoking SDP offer callback function');

    const msg = {
      id: 'receiveVideoFrom',
      sender: this.userId,
      sdpOffer: offerSdp,
    };
    this.sendMessage(msg);
  }

  onIceCandidate(candidate, wp) {
    // console.log('Local candidate' + JSON.stringify(candidate));

    const message = {
      id: 'onIceCandidate',
      userId: this.userId,
      candidate: candidate,
    };
    this.sendMessage(message);
  }

  dispose() {
    // console.log('Disposing participant ' + this.userId);
    if (this.rtcPeer) {
      this.rtcPeer.dispose();
    }
    this.container.parentNode.removeChild(this.container);
  }
}

export default Participant;
