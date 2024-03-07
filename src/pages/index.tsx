
import { useParams,  } from 'react-router-dom';
// import BoardAdmin from './BoardAdmin';
// import BoardUser from './BoardUser';
// import BoardModerator from './BoardModerator';

const GLAccount = () => {
  const { aID } = useParams();

  return (
    <div>
      <h1>GLAccount/{aID}</h1>
      
      
      {/* <Routes>
        <Route path="/analytics/BoardAdmin" element={<BoardAdmin />} />
        <Route path="/analytics/BoardUser" element={<BoardUser />} />
        <Route path="/analytics/BoardModerator" element={<BoardModerator />} />
       
      </Routes> */}
    </div>
  );
};

export default GLAccount;