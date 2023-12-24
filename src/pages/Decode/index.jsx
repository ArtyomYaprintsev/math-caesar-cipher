import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Result from "../../components/Result";

import { decodeText } from "../../utils/decodeCipher";

const DecodePage = () => {
  const [decoded, setDecoded] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <main>
      <div className='description'>
        <h3>Расшифровать текст</h3>
        <p>
          Рашифрование текста производится при помощи шифра Цезаря. Для
          корректной расшифроки, сдвиг должен быть равен сдвигу при
          зашифровании.
        </p>

        <ul>
          <li>Сдвиг может быть любым целым числом </li>
          <li>
            Шифр может включать только русские или английские символы в верхнем
            регистре
          </li>
          <li>
            Символы, не относящиеся к русскому или английскому алфавиту, будут
            игнорироваться
          </li>
          <li>Буква 'Ё' будет заменена на 'Е'</li>
        </ul>
      </div>

      <form
        onSubmit={handleSubmit((data) => {
          setDecoded(decodeText(data.cipher, data.shift));
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

        <div className='cipher-input text-wrapper'>
          <label htmlFor='cipher'>Шифр</label>
          <textarea
            {...register("cipher", {
              required: "Шифр - обязательное поле",
              validate: {
                onlyAvailableChars: (value) => {
                  if (/[^A-ZА-ЯЁ\s-]/.test(value)) {
                    return "Шифр должен состоять заглавных букв русского или латинского алфавита, пробела и `-` символа";
                  }
                },
              },
            })}
          ></textarea>

          {errors.cipher && <span role='alert'>{errors.cipher.message}</span>}
        </div>

        <Result result={decoded} />

        <button type='submit'>Расшифровать</button>
      </form>
    </main>
  );
};

export default DecodePage;
