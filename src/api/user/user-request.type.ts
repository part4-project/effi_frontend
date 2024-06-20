// request

// response
export interface TUserInfoRes {
  id: number;
  nickname: string;
  email: string;
  userState: string;
  profileImageUrl: string;
  isAdditionalProcess: boolean;
  createdAt: string;
  modifiedAt: string;
}
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
