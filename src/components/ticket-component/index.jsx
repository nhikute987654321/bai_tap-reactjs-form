import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomerName, setNumberOfSeats, toggleSeat } from '../store/ticketReducer';

export default function TicketComponent() {

  const seatData = useSelector((state) => state.ticketShopping.ticketData);
  console.log("check eff", seatData);

  const dispatch = useDispatch();
  const [isStart, setStart] = useState(false);
  const [isConfirm, setConfirm] = useState(false);

  const selectedSeats = useSelector((state) => state.ticketShopping.selectedSeats);
  const numberOfSeats = useSelector((state) => state.ticketShopping.numberOfSeats);
  const customerName = useSelector((state) => state.ticketShopping.customerName);

  const startSelecting = () => {
    setStart(true);
    const customerName = document.getElementById("customerName").value;
    const numberOfSeats = document.getElementById("numberOfSeats").value;

    if (!customerName || isNaN(numberOfSeats) || numberOfSeats <= 0) {
      alert("Please Enter your Name and Number of Seats");
      return;
    }

    dispatch(setCustomerName(customerName));
    dispatch(setNumberOfSeats(numberOfSeats));
  }

  const comfirmSelection = () => {
    const numberOfSeatsValue = document.getElementById("numberOfSeats").value;
    let check = Number(isNaN(numberOfSeatsValue) ? 0 : numberOfSeats)
    if (check != selectedSeats.length) {
      alert("Please select " + check + " seats");
      return;
    }
    setStart(false);
    setConfirm(true);
  }

  return (
    <div>
      <h1 className="text-5xl font-semibold text-white mb-4">Movie Seat Selection</h1>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10 px-4">

        <h2 className="text-xl font-semibold text-orange-500 mb-4">
          Fill The Required Details Below And Select Your Seats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full max-w-xl">
          <input
            id="customerName"
            placeholder="Name"
            className="bg-gray-800 border-none text-white"
          />
          <input
            id="numberOfSeats"
            placeholder="Number of Seats"
            className="bg-gray-800 border-none text-white"
            type="number"
          />
        </div>
        <button className="mb-6" onClick={startSelecting}>Start Selecting</button>

        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500" /> <span className="text-white">Selected Seat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500" /> <span className="text-white">Reserved Seat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-yellow-400 bg-white" /> <span className="text-white">Empty Seat</span>
          </div>
        </div>

        {isStart && (
          <b className="mb-0 bg-[#ff9800] tracking-wide"> Please Select your Seats NOW! </b>
        )
        }
        <div className="flex flex-col gap-2 mb-8">
          {seatData.map((rowData, rowIndex) => (
            <div className="flex justify-center gap-2" key={rowData.hang || `row-${rowIndex}`}>
              {rowData.hang && (
                <div className="bg-transparent w-6 h-6 rounded-sm text-xs flex items-center justify-center text-white font-bold">
                  {rowData.hang}
                </div>
              )}
              {rowData.danhSachGhe.map((seat, index) => {
                return (
                  <button
                    key={seat.soGhe}
                    onClick={() => { dispatch(toggleSeat(seat.soGhe)) }}
                    disabled={!isStart || isConfirm || !rowData.hang}
                    className={`w-6 h-6 rounded-[5px] !border-[3px] text-xs flex items-center justify-center border
                                        ${seat.daDat ? "!bg-green-500 text-green-500" : "!border-yellow-400 text-white"}
                                        ${!rowData.hang ? "cursor-default border-none !bg-transparent text-white" : ""}
                                    `}
                  >
                    {seat.hang ? seat.soGhe.replace(seat.hang, '') : seat.soGhe}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <h2 className="bg-[#ff9800] w-full mb-[25px] p-[0.8em] text-[1.2em] text-black uppercase font-semibold tracking-[7px] whitespace-nowrap word-spacing-[10px]">
          SCREEN THIS WAY
        </h2>

        <button className="mb-6 text-black" onClick={comfirmSelection}>Confirm Selection</button>

        <div className="bg-white text-black w-full max-w-3xl overflow-auto shadow rounded">
          <table className="min-w-full table-auto text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Number of Seats</th>
                <th className="px-4 py-2 border">Seats</th>
              </tr>
            </thead>
            <tbody>

              {isConfirm && (
                <tr className="py-[7px] px-[10px] ">
                  <td className="border">{customerName}</td> 
                  <td className="border">{numberOfSeats}</td>
                  <td className="border">{selectedSeats.join(", ")}</td>
                </tr>
              )
              }
            </tbody>
          </table>
        </div>

        <footer className="text-center text-gray-400 mt-6 text-sm">
          © 2018 Movie Seat Selection . All Rights Reserved | Design by W3layouts
        </footer>
      </div>
    </div>

  )
}