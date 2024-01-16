import React, { useState, useRef, useEffect } from 'react';
import './chip.css';
import zepto from './assets/zepto.png';
import fruits from './assets/fruitsandveg.svg';

type Category = {
    name: string,
    icon:string
}

const ZeptoCategories = () => {
  const [categories, setCategories] = useState<Category[]>([{name:'Fruits',icon:fruits},{name:'Vegetables',icon:fruits},{name:'Meat',icon:fruits},{name:'Beverages',icon:fruits},{name:'Biscuits and Chocolates',icon:fruits},{name:'Munchies and Chips',icon:fruits},{name:'Bath, Body and Hair',icon:fruits},{name:'Tea, coffee and More',icon:fruits}]);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [search, setSearch] = useState('');
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const changeInput = (e) => {
    setSearch(e.target.value);
  };

  const removeItem = (removedItem) => {
    setSelectedCategories(selectedCategories.filter((item) => item !== removedItem));
    setCategories([...categories, removedItem]);
  };

  const handleBackspace = (e) => {
    if (selectedCategories.length > 0 && e.key === 'Backspace' && search === '') {
      const lastSelectedItem = selectedCategories[selectedCategories.length - 1];
      setSelectedCategories(selectedCategories.slice(0, -1));
      setCategories([...categories, lastSelectedItem]);
    }
  };

  const clickItem = (item) => {
    setSelectedCategories([...selectedCategories, item]);
    setCategories(categories.filter((availableItem) => availableItem !== item));
    setSearch('');
  };

  return (
    <div className="body">
       <img src={zepto} style={{width:'20rem',height:'15rem',marginLeft:'13rem'}}></img>
      <div className="container">
        {selectedCategories.map((item) => (
          <div key={item} className="chip">
             {item.name}
            <span style={{cursor:'pointer',marginLeft:'4px',color:'red'}} onClick={() => removeItem(item)}>
              x
            </span>
          </div>
        ))}
        <input
          ref={input}
          type="text"
          value={search}
          onChange={changeInput}
          onKeyDown={handleBackspace}
          placeholder='Pick your items'
        />
      </div>
      <ul className="categories">
        {categories
          .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
          .map((item) => (
            <li style={{padding: '8px',cursor: 'pointer'}} key={item.name} onClick={() => clickItem(item)}>
             {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ZeptoCategories;
