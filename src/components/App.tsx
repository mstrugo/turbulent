import React, { memo, useCallback, useEffect, useState } from 'react';
import { Input } from './Input';
import { DraggableList } from './List';
import { splitString } from 'utils/split-string';
import { SplittedTextRow } from 'types';
import { DEFAULT_CHARS_LIMIT } from '../constants';
import '../styles/App.css';

export const App = memo(() => {
  const [message, setMessage] = useState<string>('');
  const [length, setLength] = useState<number>(DEFAULT_CHARS_LIMIT);
  const [rows, setRows] = useState<SplittedTextRow[]>([]);

  const submitHandler = useCallback((msg: string, length: number) => {
    setMessage(msg);
    setLength(length);
  }, []);

  useEffect(() => {
    setRows(splitString(message, length));
  }, [message, length]);

  return (
    <div className="App">
      <Input submitHandler={submitHandler} />
      <DraggableList items={rows} />
    </div>
  );
});
