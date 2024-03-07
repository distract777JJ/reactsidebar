import  { useState, useEffect } from "react";

import { getUserBoard } from "../../services/UserService";

const Expense: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getUserBoard().then(
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
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
      <h3>Expense</h3>
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Expense;