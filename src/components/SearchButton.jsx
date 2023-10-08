import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchAllGalleries } from "../store/galleries/slice";


const SearchButton = () => {

const [searchQuery, setSearchQuery] = useState({
    take: 10,
    skip: 0, 
    field: '',
    query: ''
})


const navigate = useNavigate();
const dispatch = useDispatch();

const handleInputChange = (e) => {
const {value, name} = e.target
setSearchQuery((prevValue) => ({ ...prevValue, [name]: value }))
};

const handleSubmit = (e) => {
e.preventDefault();
dispatch(searchAllGalleries(searchQuery));
navigate("/search");
};

console.log(searchQuery)


return (
    <div className='container'>
<form class="form-inline mr-auto" onSubmit={handleSubmit}>
      <input 
      onChange={handleInputChange} 
      name='query' 
      class="form-control" 
      type="text" 
      placeholder="Search" 
      required
    />
      <select 
      onChange={handleInputChange} 
      name="field" 
      class="form-select form-select-lg mb-3"
      required>
  <option>Select Search criteria</option>
  <option value='Name'>Name</option>
  <option value='Description'>Description</option>
  <option value='Author'>Author</option>
</select>
      <button class="btn btn-primary me-3" type="submit">Search</button>
    </form>
    </div>
)

}

export default SearchButton;