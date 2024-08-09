import { BsFillChatRightDotsFill } from "react-icons/bs";
import "../../scss/chat/chat.css";

const ChatStart = () => {
  return (
    <div className="chat-wrap-style">
      <div className="chat-header">
        <BsFillChatRightDotsFill size={30} />
        <span>해솔</span>
      </div>

      <div className="chat-info-wrap">
        <div className="chat-time">
          <span>채팅 가능시간</span>
          <ul>
            <li>월요일 : 09:00 - 20:00</li>
            <li>화요일 : 09:00 - 20:00</li>
            <li>수요일 : 09:00 - 20:00</li>
            <li>목요일 : 09:00 - 20:00</li>
            <li>금요일 : 09:00 - 20:00</li>
          </ul>
        </div>

        <div className="chat-instructions">
          <p>
            안녕하세요, 해솔입니다. <br />
            욕설 및 폭언 등으로부터 직원을 보호하고 있습니다.
            <br />
            <br /> 따뜻한 말 한마디, 배려의 시작입니다.
            <br />
            <br />* 선생님의 일정에 따라 채팅 시간이 유동적일 수 있습니다.
          </p>
        </div>
      </div>

      <div className="chat-field">
        <button className="chat-button">채팅 시작하기</button>
      </div>
    </div>
  );
};

export default ChatStart;
