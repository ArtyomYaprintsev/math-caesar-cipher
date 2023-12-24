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
      <h3>Взломать шифр</h3>

      <div className='description'>
        <p>
          Взлом работает только для шифров, зашированных методов "Шифр Цезаря",
          взлом производится при помощи метода наименьших квадратов.
        </p>

        <ul>
          <li>Все небуквенные символы будут игнорироваться</li>
          <li>Шифр может быть составлен только из русских символов</li>
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
