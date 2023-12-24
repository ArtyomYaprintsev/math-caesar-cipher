import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Result from "../../components/Result";

import { breakCipher } from "../../utils/breakCipher";

const BreakPage = () => {
  const [broken, setBroken] = useState({
    shift: 0,
    brokenText: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <main>
      <div className='description'>
        <h3>Взломать шифр</h3>
        <p>
          Взлом работает только для шифров, зашированных методов "Шифр Цезаря",
          взлом производится при помощи метода наименьших квадратов.
        </p>

        <ul>
          <li>Символы, не относящиеся к русскому, будут игнорироваться</li>
          <li>
            Шифр может быть составлен только из русских символов в верхнем
            регистре
          </li>
        </ul>
      </div>

      <form
        onSubmit={handleSubmit((data) => setBroken(breakCipher(data.cipher)))}
      >
        <div className='cipher-input text-wrapper'>
          <label htmlFor='cipher'>Шифр</label>
          <textarea
            {...register("cipher", {
              required: "Шифр - обязательное поле",
              validate: {
                onlyAvailableChars: (value) => {
                  if (/[^А-ЯЁ\s-]/.test(value)) {
                    return "Шифр должен состоять заглавных букв русского алфавита, пробела и `-` символа";
                  }
                },
              },
            })}
          ></textarea>

          {errors.cipher && <span role='alert'>{errors.cipher.message}</span>}
        </div>

        <Result result={broken.brokenText}>
          <span>
            {`Сдвиг взломанного сообщения: ${
              broken.brokenText ? broken.shift : "Неизвестно"
            }`}
          </span>
        </Result>

        <button type='submit'>Взломать</button>
      </form>
    </main>
  );
};

export default BreakPage;
