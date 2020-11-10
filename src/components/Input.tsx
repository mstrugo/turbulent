import React, { ChangeEvent, FormEvent, memo, useCallback, useState } from 'react';
import { DEFAULT_CHARS_LIMIT, DEFAULT_INPUT } from '../constants';

interface UserInputProps {
  submitHandler: (msg: string, max: number) => void;
}

export const UserInput = memo(({ submitHandler }: UserInputProps) => {
  const [msg, setMsg] = useState(DEFAULT_INPUT);
  const [max, setMax] = useState(DEFAULT_CHARS_LIMIT);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      submitHandler(msg, max);
    },
    [max, msg, submitHandler],
  );

  const onChangeMsg = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setMsg(e.target.value);
    },
    [setMsg],
  );

  const onChangeMax = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setMax(parseInt(e.target.value));
    },
    [setMax],
  );

  return (
    <form onSubmit={onSubmit}>
      <fieldset className="mb-1">
        <label htmlFor="row-length" className="block">
          Max chars
        </label>
        <input
          type="number"
          id="row-length"
          placeholder={String(DEFAULT_CHARS_LIMIT)}
          onChange={onChangeMax}
          value={max}
          min={1}
        />
      </fieldset>
      <fieldset className="mb-1">
        <label htmlFor="user-input" className="block">
          Your text
        </label>
        <textarea id="user-input" rows={10} placeholder="Empty text" onChange={onChangeMsg} value={msg} />
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
});
