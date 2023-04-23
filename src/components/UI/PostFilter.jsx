import React from 'react';
import Input from "./Input/Input";
import Select from "./Select/Select";

const PostFilter = ({filter, setFilter}) => {
  return (
      <div>
        <Input
            placeholder='search...'
            value={filter.query}
            onChange={e => setFilter({...filter, query: e.target.value})}
        />
        <Select
            value={filter.sort}
            onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            defaultValue='Sort by:'
            options={[
              {value: 'title', name: 'Sort by title'},
              {value: 'body', name: 'Sort by description'}
            ]}/>
      </div>
  );
};

export default PostFilter;