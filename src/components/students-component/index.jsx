import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSinhvien, suaSinhvien, themSinhvien, timKiemSv } from '../store/studentReducer';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid';

export default function Students() {
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState('');
    const [action, setAction] = useState('themmoi');

    useEffect(() => {
        dispatch(timKiemSv(textSearch));
    }, [textSearch])

    const dsSinhvien = useSelector((state) => state.qlsv.dsSinhvien);
    const sinhvien = useSelector((state) => state.qlsv.sinhvien);
    const dsSinhvienFilter = useSelector((state) => state.qlsv.dsSinhvienFilter);

    const [state, setState] = useState({
        values: {
            ...sinhvien
        },
        errors: {
            ...sinhvien
        },
    });

    const resetState = () => {
        setState({
            values: Object.fromEntries(Object.keys(state.values).map(key => [key, ''])),
            errors: Object.fromEntries(Object.keys(state.errors).map(key => [key, '']))
        });
    }

    const [formHasError, setFormHasError] = useState(false);

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            values: {
                ...state.values,
                [name]: value,
            },
        });
    };

    const handleError = (event) => {
        const { name, value } = event.target;
        let mess = "";
        switch (name) {
            case "maSv":
                if (value.trim() === "")
                    mess = "Ma SV không được để trống`";
                break;
            case "hoten":
                if (value.trim() === "")
                    mess = "Họ tên không được để trống`";
                break;
            case "email":
                const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if (value.trim() === "")
                    mess = "Email không được để trống`";
                else if (!value.match(regexEmail)) {
                    mess = "Email không đúng định dạng";
                }
                break;
            case "sdt":
                const regex = /[0-9]{10}$/;
                if (value.trim() === "")
                    mess = "Số điện thoại không được để trống`";
                else if (!value.match(regex)) {
                    mess =
                        "Số điện thoại đúng định dạng";
                }
                break;
            default:
                break;
        }

        setState({
            ...state,
            errors: {
                ...state.errors,
                [name]: mess,
            },
        });

        mess ? setFormHasError(true) : setFormHasError(false);
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        setAction('themmoi')
        if (!formHasError) {
            let check = dsSinhvien.find(sv => sv.maSv == state.values.maSv);
            if (check) {
                setState({
                    ...state,
                    errors: {
                        ...state.errors,
                        maSv: "Ma Sv existed",
                    },
                });
                return;
            }
            dispatch(themSinhvien(state.values));
            dispatch(timKiemSv(""));
            resetState();
        }
    };

    const handleOnEdit = () => {
        if (!formHasError) {
            dispatch(suaSinhvien(state.values));
            dispatch(timKiemSv(""));
            setAction('themmoi');
            resetState();
        }
    };

    const fillFormData = (id) => {
        setAction('sua');
        const data = dsSinhvien.find(sv => sv.id == id);
        if (data) {
            setState({
                ...state,
                values: {
                    ...data
                },
            });
        }
    }

    const handleOnDelete = (id) => {
        const data = dsSinhvien.find(sv => sv.id == id);
        if (data) {
            dispatch(deleteSinhvien(data));
            dispatch(timKiemSv(""));
            setAction('themmoi');
            resetState();
        }
    };

    return (
        <div className='min-h-screen p-6 flex flex-col justify-center item-start'>

            <div className="bg-trasparent p-8 w-full mb-8">
                <h2 className="bg-black text-3xl w-full py-[10px] font-bold text-left px-[10px] text-white mb-5 ">Thông tin sinh viên</h2>

                <form className="mx-auto space-y-4 relative" onSubmit={handleOnSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <label
                                htmlFor="SDT"
                                className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Ma SV
                            </label>
                            <input
                                name="maSv"
                                onChange={handleOnChange}
                                onBlur={handleError}
                                type="text"
                                id="maSv"
                                value={state.values.maSv}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=""
                                required
                            />
                            {state.errors.maSv && (
                                <div
                                    className="text-left p-1 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                    role="alert"
                                >
                                    {state.errors.maSv}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="hoten"
                                className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Họ tên
                            </label>
                            <input
                                name="hoten"
                                onChange={handleOnChange}
                                onBlur={handleError}
                                type="text"
                                id="hoten"
                                value={state.values.hoten}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Nguyễn Văn A"
                                required
                            />
                            {state.errors.hoten && (
                                <div
                                    className="text-left p-1 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                    role="alert"
                                >
                                    {state.errors.hoten}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="SDT"
                                className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Số điện thoại
                            </label>
                            <input
                                name="sdt"
                                onChange={handleOnChange}
                                onBlur={handleError}
                                type="text"
                                id="sdt"
                                value={state.values.sdt}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="0988866888"
                                required
                            />
                            {state.errors.sdt && (
                                <div
                                    className="text-left  p-1 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                    role="alert"
                                >
                                    {state.errors.sdt}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Email
                            </label>
                            <input
                                name="email"
                                onChange={handleOnChange}
                                onBlur={handleError}
                                type="email"
                                id="email"
                                value={state.values.email}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@gmail.com"
                                required
                            />
                            {state.errors.email && (
                                <div
                                    className="text-left  p-1 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                    role="alert"
                                >
                                    {state.errors.email}
                                </div>
                            )}
                        </div>
                    </div>
                    {action && action == 'themmoi' && (
                        <button
                            type="submit"
                            className="absolute left-0 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black !bg-green-600 hover:!bg-green-700 focus:outline-none"
                        >
                            Thêm sinh viên
                        </button>
                    )
                    }
                    {action && action == 'sua' && (
                        <button
                            type="button"
                            onClick={handleOnEdit}
                            className="absolute left-0 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black !bg-green-600 hover:!bg-green-700 focus:outline-none"
                        >
                            Sửa sinh viên
                        </button>
                    )
                    }
                </form>
            </div>
            <div className="bg-white p-8 rounded-lg w-full">

                <div className="overflow-x-auto">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sinh viên..."
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                        className=" mb-2 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-black">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                                >
                                    STT
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                                >
                                    Họ tên
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-bold  text-white uppercase tracking-wider"
                                >
                                    Số điện thoại
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-bold te text-white uppercase tracking-wider"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-bold te text-white uppercase tracking-wider"
                                >

                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {dsSinhvienFilter.length > 0 ? (
                                dsSinhvienFilter.map((sv, index) => (
                                    <tr key={sv.maSv} className='cursor-pointer hover:bg-gray-100'>
                                        <td className="text-left px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sv.maSv}</td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sv.hoten}</td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sv.sdt}</td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sv.email}</td>

                                        <td className="text-left px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <button className="btn btn-info" data-toggle="modal" onClick={() => fillFormData(sv.id)}><PencilSquareIcon className="h-5 w-5 text-purple-500" /></button>
                                            <button className="btn btn-danger" onClick={() => handleOnDelete(sv.id)}><TrashIcon className="h-5 w-5 text-red-500" /> </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                        Không tìm thấy sinh viên nào.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}