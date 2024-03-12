import { useState, useEffect } from "react";

import { getModeratorBoard } from "../../services/UserService";
import EventBus from "../../services/EventBus";

const BoardModerator: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getModeratorBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
      <h3>Moderator</h3>
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardModerator;