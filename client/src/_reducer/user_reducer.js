import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  NOTICE_POST,
  SCHOOL_POST,
  COMMENT_POST
} from "../_action/types";

//reducer은 이전 state와 현재 state를 다음 state로 만듦.
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload }; //... <- 빈 state를 똑같이 가져옴 / action.payload는 server에서 보내온 정보
      break;
    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;
    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;
    case NOTICE_POST:
      return { ...state, noticeData: action.payload };
      break;
    case SCHOOL_POST:
      return { ...state, schoolData: action.payload };
      break;
    case COMMENT_POST:
      return { ...state, commentData: action.payload};
      break;
    default:
      return state;
  }
}
