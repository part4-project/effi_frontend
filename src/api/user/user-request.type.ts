// request
export interface TUserNicknameReq {
  nickname: string;
}

// response
export interface TUserNicknameRes {
  id: number;
  nickname: string;
}

export interface TUserProfileImgRes {
  id: number;
  profileImageUrl: string;
}

export interface TUserProfileDefaultImgRes {
  id: number;
  profileImageUrl: string;
}
