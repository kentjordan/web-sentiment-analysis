"use client";
import axios from "axios";
import {
  PytorchOriginal,
  PandasOriginal,
  NumpyOriginal,
  FastapiOriginal,
} from "devicons-react";
import { useState } from "react";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://heartfelt-victory-production.up.railway.app"
    : "http://127.0.0.1:8000";

export default function Home() {
  const [sentiment, setSentiment] = useState<number | undefined>();
  const [probability, setProbability] = useState<number | undefined>();
  const [input, setInput] = useState<string | undefined>();

  const onAnalyze = async () => {
    try {
      if (!input) {
        alert("Invalid input.");
        return;
      }

      const res = await axios.post(`${API_URL}/analyze`, {
        text: input,
      });

      const { probability, sentiment } = res.data;

      setSentiment(sentiment);
      setProbability(probability);
    } catch (error) {
      alert("I'm sorry the server has been under maintenance.");
    }
  };

  const generateResult = (probability: number | undefined) => {
    if (!probability) return <></>;
    console.log(probability);

    return probability > 0.5 ? (
      <>
        Your input sounds <b>POSITIVE</b>. 😄
      </>
    ) : (
      <>
        Your input sounds <b>NEGATIVE</b>. 😔
      </>
    );
  };

  return (
    <div className='w-full h-screen flex items-center justify-center bg-white'>
      <div className='w-full h-full max-w-[600px] flex flex-col justify-between rounded-md p-4'>
        <div className='flex-1 flex flex-col justify-center'>
          <div className='flex flex-col items-start'>
            <div className='flex items-center'>
              <h1 className='text-2xl font-bold'>Sentiment Analysis</h1>
            </div>
            <p className='text-sm'>
              Trained in{" "}
              <a
                className='cursor-pointer text-blue-500'
                href='https://www.kaggle.com/datasets/kazanova/sentiment140'>
                Sentiment140 dataset
              </a>
              . Built with:
            </p>
            <div className='flex gap-2 my-4'>
              <PytorchOriginal size={32} />
              <PandasOriginal size={32} />
              <FastapiOriginal size={32} />
            </div>
          </div>
          <div className='my-16'>
            <div className='flex-col flex flex-wrap gap-2'>
              <textarea
                onChange={(e) => {
                  setInput(e.currentTarget.value);
                }}
                placeholder='Enter your text to analyze its sentiment...'
                className='p-2 border rounded-md h-24 align-text-top resize-none'
              />
              <button
                onClick={onAnalyze}
                className='mt-2 bg-stone-800 text-white p-2 rounded-md'>
                Analyze
              </button>
            </div>
            <p className='mt-8 text-xl'>{generateResult(probability)}</p>
          </div>
        </div>
        <p className='text-sm text-red-600 py-4'>
          * My lil&apos; A.I model can make a mistake so be kind. :)
        </p>
        <div className='border-t py-4'>
          <p className='text-sm'>
            Made by{" "}
            <a
              className='cursor-pointer text-blue-500 font-bold'
              href='https://kentjordan.xyz'>
              Kent Jordan
            </a>{" "}
            with 💖
          </p>
        </div>
      </div>
    </div>
  );
}
