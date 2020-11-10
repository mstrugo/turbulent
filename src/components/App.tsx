import React, { memo, useCallback, useEffect, useState } from 'react';
import { Input } from './Input';
import { DraggableList } from './List';
import { useDebounce } from 'hooks';
import { apiCall, splitString } from 'utils';
import { SplittedTextRow } from 'types';
import { API_CALL_DELAY, API_URL, DEFAULT_CHARS_LIMIT } from '../constants';
import '../styles/App.css';

export const App = memo(() => {
  const [message, setMessage] = useState<string>('');
  const [length, setLength] = useState<number>(DEFAULT_CHARS_LIMIT);
  const [rows, setRows] = useState<SplittedTextRow[]>([]);
  const [arrangement, setArrangement] = useState<SplittedTextRow[]>([]);
  const [saving, setSaving] = useState(false);
  const debouncedArrangement = useDebounce(arrangement, API_CALL_DELAY);

  const submitHandler = useCallback((msg: string, length: number) => {
    setMessage(msg);
    setLength(length);
  }, []);

  const handleChangeOrder = useCallback((list: any[]) => {
    setArrangement(list);
  }, []);

  useEffect(() => {
    setRows(splitString(message, length));
  }, [message, length]);

  useEffect(() => {
    if (!!debouncedArrangement.length) {
      setSaving(true);
      apiCall(debouncedArrangement, API_URL, 'POST').then(() => setSaving(false));
    }
  }, [debouncedArrangement]);

  return (
    <div className="App">
      <Input submitHandler={submitHandler} />
      {saving && <div>Saving...</div>}
      <DraggableList items={rows} onChangeOrder={handleChangeOrder} />
    </div>
  );
});
