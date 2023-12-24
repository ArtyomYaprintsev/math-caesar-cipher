import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Result from "../../components/Result";

import { encodeText } from "../../utils/encodeCipher";

const EncodePage = () => {
  const [encoded, setEncoded] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <main>
      <div className='description'>
        <h3>Зашифровать текст</h3>
        <p>Зашифрование текста производится при помощи шифра Цезаря.</p>

        <ul>
          <li>Сдвиг может быть любым целым числом</li>
          <li>Текст может включать только русские или английские символы</li>
          <li>
            Символы, не относящиеся к русскому или английскому алфавиту, будут
            игнорироваться
          </li>
          <li>Буква 'Ё' будет заменена на 'Е'</li>
        </ul>
      </div>

      <form
        onSubmit={handleSubmit((data) => {
          setEncoded(encodeText(data["plain-text"], data.shift));
        })}
      >
        <div className='shift-input'>
          <label htmlFor='shift'>Сдвиг = </label>
          <input
            id='shift'
            type='number'
            {...register("shift", {
              required: "Сдвиг зашифрования - обязательное поле.",
            })}
          />

          {errors.shift && <span role='alert'>{errors.shift.message}</span>}
        </div>

        <div className='plain-text-input text-wrapper'>
          <label htmlFor='plain-text'>Текст</label>
          <textarea
            {...register("plain-text", {
              required: "Текст - обязательное поле",
            })}
          ></textarea>

          {errors["plain-text"] && (
            <span role='alert'>{errors["plain-text"].message}</span>
          )}
        </div>

        <Result result={encoded} />

        <button type='submit'>Зашифровать</button>
      </form>
    </main>
  );
};

export default EncodePage;
