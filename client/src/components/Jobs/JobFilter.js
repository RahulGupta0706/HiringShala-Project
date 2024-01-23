import React, { useState,useEffect,useRef} from "react";

function JobFilter({ filterName, filterValue, handleFilterChange,clearCheckedItems,clearSearchItems,clearSearchValue,setIsSearchPerformed,dropdownNum}) {
  const [dropdown0, setDropdown0] = useState(false);
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);
  const dropdownList=[dropdown0,dropdown1,dropdown2,dropdown3];
  const setDropdownList=[setDropdown0,setDropdown1,setDropdown2,setDropdown3];
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        const setFunc=setDropdownList[dropdownNum];
        setFunc(false);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });


  const handleClick = (filterName) => {
    if(filterName==="All"){
      clearCheckedItems();
      clearSearchItems();
      clearSearchValue();
      setIsSearchPerformed(false);
    }
    const setFunc=setDropdownList[dropdownNum];
    setFunc(!dropdownList[dropdownNum]);
    
  };

  

  const renderCheckbox = (jobType) => {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          value={jobType}
          onChange={handleFilterChange}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          {jobType}
        </label>
      </div>
    );
  };

  
  return (
    <div className="job-filter-container" ref={menuRef}>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-success filter-btn"
          onClick={()=>{handleClick(filterName)}}
        >
          {filterName}
        </button>
      </div>
      {(dropdownList[dropdownNum] && filterValue.length!==0) &&(
        <div className={`flex flex-col dropdown-filter ${dropdownList[dropdownNum]?'active':'inactive'}`}>
          <ul className="flex flex-col gap-4">
            {filterValue.map((val, index) => (
              <div key={index}>{renderCheckbox(val)}</div>
            ))}
            
          </ul>
          
        </div>
      )}
    </div>
  );
}

export default JobFilter;
