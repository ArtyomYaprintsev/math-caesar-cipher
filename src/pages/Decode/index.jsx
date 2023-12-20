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
      <h3>Расшифровать текст</h3>

      <div className='description'>
        <p>
          Рашифрование текста производится при помощи шифра Цезаря. Для
          корректной расшифроки, сдвиг должен быть равен сдвигу при
          зашифровании.
        </p>

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

        <div className='cipher-input text-wrapper'>
          <label htmlFor='cipher'>Шифр</label>
          <textarea
            {...register("cipher", {
              required: "Шифр - обязательное поле",
              validate: {
                onlyOneAlphabet: (value) => {
                  const isContainLatin = /[A-Z]/i.test(value);
                  const isContainRussian = /[А-Я]/i.test(value);

                  if (isContainLatin && isContainRussian) {
                    return "Шифр может включать только русские или только английские символы";
                  }
                },
                isContainDigits: (value) => {
                  if (/[0-9]/.test(value)) {
                    return "Шифр не должен содержать числа, заменить на буквенный формат";
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
