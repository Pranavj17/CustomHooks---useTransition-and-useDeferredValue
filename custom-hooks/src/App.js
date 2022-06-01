import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDeferredValue, useTransition } from './customHooks';


function App() {
  const [value, deferredValue, bindInput] = useDeferredValue('');
  const [loading, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const withUseTransition = (value) => {
    setInput(value);
    startTransition(() => {
      const array = [...Array(2000).keys()];
      const result = [];
      array.forEach((d) => {
        result.push(`${d}-${value}`);
      })
      setList(result);
    });
  };
  const withoutUseTransition = (value) => {
    setInput(value);
    const array = [...Array(2000).keys()];
    const result = [];
    array.forEach((d) => {
      result.push(`${d}-${value}`);
    })
    setList(result);
  };
  return (
    <div className="App">
      <header>CUSTOM HOOKS</header>
      <label>USE DEFERRED VALUE</label>
      <input {...bindInput} type="text" />
      <div className='fs-16 w-100'>
        value: {value}
      </div>
      <div className='fs-16 w-100'>
        deferredValue: {deferredValue}
      </div>
      <br />
      <label>USE TRANSITION</label>
      {loading ? 'loading...' : ''}
      <h6>With:</h6><input onChange={(e) => withUseTransition(e.target.value)} type="text" value={input} onBlur={() => { setInput(''); setList([]); }}/>
      <br />
      <h6>WithOut:</h6><input onChange={(e) => withoutUseTransition(e.target.value)} type="text" value={input} onBlur={() =>  { setInput(''); setList([]); }} />
      <br />
      {list?.map((e) => {
        return (
          <div className='w-100 fs-16'>
            {e}
          </div>
        );
      })}
    </div>
  );
}

export default App;
