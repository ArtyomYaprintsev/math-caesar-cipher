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
      <h3>Зашифровать текст</h3>

      <div className='description'>
        <p>Зашифрование текста производится при помощи шифра Цезаря.</p>

        <ul>
          <li>
            Числа необходимо записать в буквенном формате (например: 1 - один)
          </li>
          <li>Сдвиг может быть любым целым числом </li>
          <li>
            Текст может включать только русские или только английские символы
          </li>
          <li>Все небуквенные символы будут игнорироваться</li>
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
              max: {
                value: 1000,
                message: "Максимальное значение сдвига - 1000",
              },
              min: {
                value: -1000,
                message: "Минимальное значение сдвига - -1000",
              },
            })}
          />

          {errors.shift && <span role='alert'>{errors.shift.message}</span>}
        </div>

        <div className='plain-text-input text-wrapper'>
          <label htmlFor='plain-text'>Текст</label>
          <textarea
            {...register("plain-text", {
              required: "Текст - обязательное поле",
              validate: {
                onlyOneAlphabet: (value) => {
                  const isContainLatin = /[A-Z]/i.test(value);
                  const isContainRussian = /[А-Я]/i.test(value);

                  if (isContainLatin && isContainRussian) {
                    return "Текст может включать только русские или только английские символы";
                  }
                },
                isContainDigits: (value) => {
                  if (/[0-9]/.test(value)) {
                    return "Текст не должен содержать числа, заменить на буквенный формат";
                  }
                },
              },
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
