// src/components/PetDetail.jsx

const PetDetails = (props) => {
    // return if props.selected is null
    if (!props.selected)
      return (
        <div className="details-container">
          <h1>NO DETAILS</h1>
        </div>
      );
  
    return (
      // return statement if props.selected has a truthy value
      <div className="details-container">
        <h1>{props.selected.name}</h1>
        <h2>Breed: {props.selected.breed}</h2>
        <h2>
          Age: {props.selected.age} year{props.selected.age > 1 ? 's' : ''} old
        </h2>
        
        <div className="button-container">
        <button onClick={() => props.handleFormView(props.selected)}>Edit</button>
        <button onClick={() => props.handleRemovePet(props.selected._id)}>Delete</button>
        </div>
      </div>
    );
  };
  
  export default PetDetails;
  