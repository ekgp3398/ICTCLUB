import React from 'react';
import ReactLoading from 'react-loading';

function Loader({type}) {
  return (
    <div className="contentWrap">
      <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}>
        <h2>Loading...</h2>
        <ReactLoading
          type={type}
          color={'#123'}
          height={'80%'}
          width={'80%'} />
      </div>
    </div>
  );
}

export default Loader;