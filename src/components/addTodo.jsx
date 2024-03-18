import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function AddTodo() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        title: "",
        link: "",
        desc: ""
      })

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
          ...data,
          [e.target.name]: value
        });
      };
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true);
        axios.post("https://straitpaybackend.onrender.com/api/todo", {
            todoName: data.title,
            todoLink: data.link,
            todoDescription: data.desc,
        })
        .then((response) => {
        setData({ title: "", link: "", desc: "" });
        toast.success("Success Notification !", {
            position: "top-right"
        });
        setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            toast.error(err.response.data.message, {
                position: "top-right"
            });
        });
    }
  return (
    <form onSubmit={handleSubmit}>
            <div className="w-full flex justify-start items-start flex-col mx-[0] my-[20px]">
                <label htmlFor="title" className="text-[#818181] text-lg w-full">Title</label>
                <input type="text" id="title" name="title" placeholder="Title" className="border-[1.4px] border-solid border-[#afafaf] w-full p-[10px] text-[17px] rounded-[5px] mx-[0] my-[5px] outline-none bg-[white] text-[#606060]" value={data.title} onChange={handleChange}/>
            </div>
            <div className="w-full flex justify-start items-start flex-col mx-[0] my-[20px]">
                <label htmlFor="link" className="text-[#818181] text-lg w-full outline-none">Link</label>
                <input type="url" id="link" name="link" placeholder="Link" className="border-[1.4px] border-solid border-[#afafaf] w-full p-[10px] text-[17px] rounded-[5px] mx-[0] my-[5px] outline-none bg-[white] text-[#606060]" value={data.link} onChange={handleChange} />
            </div>
            <div className="w-full flex justify-start items-start flex-col mx-[0] my-[20px]">
                <label htmlFor="desc" className="text-[#818181] text-lg w-full outline-none">Description</label>
                <textarea name="desc" id="desc" rows="5" placeholder="Description" className="border-[1.4px] border-solid border-[#afafaf] w-full p-[10px] text-[17px] rounded-[5px] mx-[0] my-[5px] outline-none bg-[white] text-[#606060]" value={data.desc} onChange={handleChange}></textarea>
            </div>
            <div className="w-full flex justify-end items-end flex-col mx-[0] my-[20px]">
                <button type="submit" className="bg-[#407BFF] text-[17px] px-[25px] py-[12px] text-[white] rounded-[5px]">{loading ? "Please wait..." : "Add Todo"}</button>
            </div>
            <ToastContainer />
    </form>
  );
}

export default AddTodo;
