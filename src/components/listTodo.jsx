import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosCheckbox } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { timeStampDate } from "./helper";

function ListTodo() {
    const [toggle, setToggle] = useState(true)
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [modalData, setModalData] = useState({})
    const [load, setLoad] = useState(false)
    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")
    const [desc, setDesc] = useState("")
    const [createAt, setCreatedAt] = useState("")
    const [updatedAt, setUpdateAt] = useState("")
    const [completed, setCompleted] = useState(false)

    const handleToggle = (e) => {
        setToggle(e)
    }
    
    const handleModal = (e) => {
        setModal(e)
    }

    const handleRender = () => {
        axios.get("https://straitpaybackend.onrender.com/api/todo")
        .then((response) => {
        setData(response.data)
        toast.success("Success Notification !", {
            position: "top-right"
        });
        })
        .catch((err) => {
            toast.error(err.message, {
                position: "top-right"
            });
        });
    }
    
    const handleDelete = (e) => {
        setLoading(true)
        axios.delete(`https://straitpaybackend.onrender.com/api/todo/${e}`)
        .then((response) => {
            handleRender()
            setLoading(false)
            toast.success("Todo Deleted Successfully !", {
                position: "top-right"
            });
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
            toast.error(err.message, {
                position: "top-right"
            });
        });
    }

    const handleView = (e) => {
        setModalData(data[e])
        setTitle(data[e].todoName)
        setLink( data[e].todoLink)
        setDesc(data[e].todoDescription)
        setCreatedAt(data[e].createdAt.slice(0, 10));
        setUpdateAt(data[e].updatedAt.slice(0, 10));
    }

    const handleEdit = (e) => {
        e.preventDefault()
        setCompleted(!completed)
        setLoad(true);
        axios.put(`https://straitpaybackend.onrender.com/api/todo/${modalData?._id}`, {
            todoName: title,
            todoLink: link,
            todoDescription: desc,
            completed: completed
        })
        .then((response) => {
            handleRender()
            toast.success("Updated Successfully Notification !", {
                position: "top-right"
            });
            setLoad(false);
            setModal(false);
        })
        .catch((err) => {
            setLoad(false);
            toast.error(err.message, {
                position: "top-right"
            });
        });
    }
    
    const handleCheck = (e, bool) => {
        console.log("Click");
        axios.put(`https://straitpaybackend.onrender.com/api/todo/${e}`, {
            todoName: e.todoName,
            todoLink: e.todoLink,
            todoDescription: e.todoDescription,
            completed: bool
        })
        .then((response) => {
            handleRender()
            toast.success("Todo Completed Notification !", {
                position: "top-right"
            });
        })
        .catch((err) => {
            toast.error(err.message, {
                position: "top-right"
            });
        });
    }

    useEffect(() => {
        handleRender()
    }, [0])
  return (
    <section>
        <div className="flex justify-between items-center p-[10px] bg-[#407bff] text-[white] font-semibold rounded-[5px] cursor-pointer mx-[0] my-[20px]" onClick={() => handleToggle(true)}>
          <p>List of Todos</p>
          <IoMdArrowDropdown className="text-[25px]"/>
        </div>

        {toggle === true && <div>
            {data.map((item, index) => {
                if (item.completed === false) {
                    return (
                        <div className="flex justify-between items-center [border-bottom:2px_solid_#B3B3B3] px-[0] py-[12px]">
                            <div className="flex justify-start items-center gap-[20px] text-[17px] text-[#8D8D8D]">
                            <IoIosCheckbox className="cursor-pointer text-xl" onClick={() => {handleCheck(item._id, true)}}/>
                            <p>{item.todoName}</p>
                            </div>
                            <div className="flex justify-between items-center gap-[15px] text-[17px]">
                            <FaEye className="text-[#66C566] cursor-pointer text-xl" onClick={() => {
                                handleModal(true)
                                handleView(index)
                                }} />
                            {loading && index === index ? <div role="status">
                                    <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-[whitesmoke] fill-[tomato]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div> : <IoClose className="text-[#FF6347] text-[22px] cursor-pointer" onClick={() => handleDelete(item._id)} />}
                            </div>
                        </div>
                    )
                }
            })}
          
        </div>}
        

        
        <div className="flex justify-between items-center p-[10px] bg-[#407bff] text-[white] font-semibold rounded-[5px] cursor-pointer mx-[0] my-[20px]" onClick={() => handleToggle(false)}>
          <p>Completed Task</p>
          <IoMdArrowDropdown className="text-[25px]"/>
        </div>

        {toggle === false && <div>
            {data.map((item, index) => {
                if (item.completed === true) {
                    return (
                        <div className="flex justify-between items-center [border-bottom:2px_solid_#B3B3B3] px-[0] py-[12px]" key={index}>
                <div className="flex justify-start items-center gap-[20px] text-[17px] text-[#8D8D8D]">
                <IoIosCheckbox className="cursor-pointer text-xl text-[#407bff]"  onClick={() => {handleCheck(item._id, false)}}/>
                <p className="line-through">{item.todoName}</p>
                </div>

                <div className="flex justify-between items-center gap-[15px] text-[17px]">
                <FaEye className="text-[#66C566] cursor-pointer text-xl" onClick={() => {
                    handleModal(true)
                    handleView(index)
                }}/>
                {loading && index === index ? <div role="status">
                                    <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-[whitesmoke] fill-[tomato]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div> : <IoClose className="text-[#FF6347] text-[22px] cursor-pointer" onClick={() => handleDelete(item._id)} />}
                </div>
            </div>
                    )
                }
            })}
          
        </div>}

        {/* Details Modal */}
        {modal && <form onSubmit={handleEdit} className="absolute top-[0] w-full left-[0] h-screen flex justify-center bg-[#000000a6] overflow-y-scroll items-start">
            <div className="w-[450px] bg-[white] h-auto p-[20px] rounded-[5px] mx-[0] my-[40px]">
                <h1 className="text-center text-[22px] font-bold">View or Edit Todo</h1>

                <div className="w-full flex justify-start items-start flex-col mx-[0] my-[10px]">
                    <label htmlFor="title" className="text-[#818181] text-lg w-full">Title</label>
                    <input type="text" id="title" name="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}  className="border-[1.4px] border-solid border-[#afafaf] w-full p-[10px] text-[17px] rounded-[5px] mx-[0] my-[5px] outline-none bg-[#F6F6F6] text-[#606060]" />
                </div>
            <div className="w-full flex justify-start items-start flex-col mx-[0] my-[10px]">
                <label htmlFor="link" className="text-[#818181] text-lg w-full outline-none">Link</label>
                <input type="url" id="link" name="link" placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)}  className="border-[1.4px] border-solid border-[#afafaf] w-full p-[10px] text-[17px] rounded-[5px] mx-[0] my-[5px] outline-none bg-[#F6F6F6] text-[#606060]" />
            </div>
            <div className="flex justify-between items-center gap-[50px]">
                <div className="w-full flex justify-start items-start flex-col mx-[0] my-[10px]">
                    <label htmlFor="createdAT" className="text-[#818181] text-lg w-full outline-none">Created Date</label>
                    <input type="date" id="createdAT" name="createdAT" defaultValue={createAt} placeholder="Create" className="border-[1.4px] border-solid border-[#afafaf] w-full p-[10px] text-[17px] rounded-[5px] mx-[0] my-[5px] outline-none bg-[#F6F6F6] text-[#606060]" disabled />
                </div>
                <div className="w-full flex justify-start items-start flex-col mx-[0] my-[10px]">
                    <label htmlFor="update" className="text-[#818181] text-lg w-full outline-none">Update Date</label>
                    <input type="date" id="update" name="update" placeholder="update" defaultValue={updatedAt} className="border-[1.4px] border-solid border-[#afafaf] w-full p-[10px] text-[17px] rounded-[5px] mx-[0] my-[5px] outline-none bg-[#F6F6F6] text-[#606060]" disabled />
                </div>
            </div>
            <div className="w-full flex justify-start items-start flex-col mx-[0] my-[10px]">
                <label htmlFor="desc" className="text-[#818181] text-lg w-full outline-none">Description</label>
                <textarea name="desc" id="desc" rows="3" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} className="border-[1.4px] border-solid bg-[#F6F6F6] border-[#afafaf] w-full p-[10px] text-[17px] rounded-[5px] mx-[0] my-[5px] outline-none text-[#606060]" ></textarea>
            </div>
            <div className="w-full flex justify-between items-end mx-[0] my-[10px]">
                <button type="button" className="bg-[tomato] text-lg font-bold px-[25px] py-[10px] text-[white] rounded-[5px]" onClick={() => handleModal(false)}>Close</button>
                <button type="submit" className="bg-[#407BFF] text-lg font-bold px-[25px] py-[10px] text-[white] rounded-[5px]">{load ? "Please wait..." : "Update"}</button>
            </div>
            </div>
        </form>}
        <ToastContainer />
    </section>
  );
}

export default ListTodo;
