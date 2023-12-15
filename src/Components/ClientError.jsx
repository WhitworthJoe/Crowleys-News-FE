const ClientErrorComponent = ({ message }) => {
    return (
      <div>
        <h2>Error</h2>
        <p>{message}</p>
      </div>
    );
  };
  
  export default ClientErrorComponent;