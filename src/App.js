import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  return (
    <div>
      <Logo />
      <Form />
      <PackagingList />
      <Summary />
    </div>
  );
}
function Logo() {
  return <h1>🌴 FarAway 💼</h1>;
}
function Form() {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  function handleSubmit(e) {
    // Context: e.preventDefault(); prevents a white reload after submitting form
    //"e" is passed into handleSubmit as "e"/event object contain all the necessary information of current event
    e.preventDefault();
    // if no value is entered then do nothing. Default value of description is ""
    if (!description) return;
    // created a new object "newItem" with calculated values and adding some default values like "packed:false"
    const newItem = { description, quantity, packed: false, id: Date.now() };
    // Resetting Quantity and Description back to default values after form is submitted
    setDescription("");
    setQuantity(1);
  }
  return (
    // onSubmit eventhandler get to know if form is submitted, and that can be known by pressing "enter" key
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for 😍 trip? </h3>
      {/* Context: <select value={5} onChange={handlesit}> */}
      {/* 1. "value and onChange" are two properties tied together in <select> tag so that the default selected value could be anything you defined in "value" and while changing to different item in list will set only with onChange event property that will trigger a setQuantity function using hook */}
      {/* 2. value wont be changed from default "value" to selected value after selecting from dropdown.
      To FIX This behaviour, need to use onChange={()=>eventhandlefunction} > */}
      <select
        value={quantity}
        // e is an event holding the current selected value which is then passed to be set as current quantity value in <select>
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        // e is an event holding the current selected value which is then passed to be set as current "description" value in <input>
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      {/* Context: Could have used <button onSubmit={handleSubmit}>Add</button> "instead of adding onChange on <form> tag. But this will only take input from button and not from enter key"*/}
      <button>Add</button>
    </form>
  );
}
function PackagingList() {
  return (
    <div>
      <ul className="list">
        {initialItems.map((item) => (
          <List description={item.description} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function List(props) {
  return <span>{props.description}</span>;
}
function Summary() {
  return <footer className="stats"></footer>;
}
export default App;
