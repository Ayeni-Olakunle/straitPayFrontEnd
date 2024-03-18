import think from "../asset/think.png";
import ListTodo from "./listTodo";
import AddTodo from "./addTodo";
import { useState } from "react";

function TodoApp() {
  const [toggle, setToggle] = useState(false);

  const handleToggle = (e) => {
    setToggle(e)
  }

  return (
    <main className="h-screen w-full flex justify-between items-center overflow-hidden">
      <div className="w-1/2 bg-[#407BFF] h-full flex justify-center items-center">
        <img src={think} alt="Not Available" className="h-[500px]"/>
      </div>
      <div className="w-1/2 h-full p-[20px] overflow-y-scroll">
        <h1 className="text-[#407BFF] text-[40px] font-bold text-center mx-[0] my-[10px]">Todo List App</h1>

        <div className="w-full flex justify-center items-center">
          <div className="w-[60%] flex justify-between items-center mx-[0] my-[15px] border-[2px] border-solid border-[#407BFF] rounded-[5px]">
            <p className={`w-1/2 p-[12px] text-center bg-[${toggle === false ? "#407bff" : "white"}] text-[${toggle === false ? "white" : "#407bff"}] text-xl font-semibold cursor-pointer`} onClick={() => {handleToggle(false)}}>List of Todo</p>
            <p className={`w-1/2 p-[12px] text-center  bg-[${toggle === true ? "#407bff" : "white"}] text-[${toggle === true ? "white" : "#407bff"}] text-xl font-semibold cursor-pointer`} onClick={() => {handleToggle(true)}}>Add Todo</p>
          </div>
        </div>

        {toggle === false && <ListTodo />}
        {toggle === true && <AddTodo />}

      </div>
    </main>
  );
}

export default TodoApp;
