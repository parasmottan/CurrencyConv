import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'


function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [exchange, setExchange] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);



  useEffect(() => {
    const apiUrl = `https://v6.exchangerate-api.com/v6/169f77f94356151998e15930/latest/${fromCurrency}`;
    axios.get(apiUrl)
      .then(response => {
      setExchange(response.data.conversion_rates)
      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error)
      })
  }, [fromCurrency])

  useEffect(() => {
    const conversionRate = exchange[toCurrency];
    if (conversionRate) {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2))
    }

}, [amount, fromCurrency , toCurrency, exchange])




  const handleChange = (e) => {

    const { name, value } = e.target;
  
    if (name === 'amount') {
      setAmount(Number(value));
    }
    if (name === 'fromCurrency') {
      setFromCurrency(value)
    }
  
    if (name === 'toCurrency') {
      setToCurrency(value)
    }
  


  }





    return (
      <div className='w-full h-[100vh] bg-[#F0F2F6] flex justify-center items-center'>

        <div id='card' className='w-[50vw] h-[40vh] bg-[#FFFFFF] rounded-md'>


          <h1 className='text-2xl p-7' id='head'>Currency Convertor</h1>

          <div className='flex justify-between items-center px-6'>

            <div className='flex flex-col'>

              <label id='label'>Amount:</label>
              <input type="number" id='inputfield' name='amount' className='bg-slate-100 h-12 p-3 border-none rounded-md' value={amount} onChange={handleChange} />

            </div>

            <div className='flex flex-col'>

              <label id='label'>FromCurrency:</label>
              <select name="fromCurrency" id='inputfield' className='bg-slate-100 h-12 border-none rounded-md' value={fromCurrency} onChange={handleChange}>
                {Object.keys(exchange).map(currency => (<option key={currency} value={currency}>{currency}</option>))}
              </select>


            </div>
            <div className='flex flex-col'>

              <label id='label'>ToCurrency:</label>
              <select name="toCurrency" id='inputfield' className='bg-slate-100 h-12 border-none rounded-md' value={toCurrency} onChange={handleChange}>
              {Object.keys(exchange).map(currency => (<option key={currency} value={currency}>{currency}</option>))}
              </select>


            </div>


          </div>


          <div id='footer' className='w-[40%] h-[7vh] rounded-md bg-[#E4F0F6] m-6 mt-10 flex items-center justify-center'>

            <h1>Converted Amount:<b>{convertedAmount}</b></h1>


          </div>



        </div>
      </div>
    )
  }

export default App
