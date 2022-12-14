import React, {useState} from 'react';
import {calculate, isSpecial} from "../../utility/Funcs";
import Switcher from "../switcher/Switcher";
import "./window.css"

const Window = () => {
    const [exp, setExp] = useState("0")

    const addOnScreen = (event) => {

        let value

        if (event._reactName === "onClick") {
            value = event.target.innerHTML
        } else if (event._reactName === "onChange") {
            value = event.target.value
        }

        if (isSpecial(value)) { // Если вводится специальный символ, то добавить пробелы
            if (exp !== "0") {
                setExp(exp + " " + value + " ")
            } else if (value === "-") {
                clear()
                setExp(value)
            }

        } else { // Вводится не специальный символ
            if ((exp === "0") && (value !== "00")) { // если в поле ноль и вводится не 00, то заменить на новое число
                if (value === ".") { // Если это точка (не специальный символ, но и замена не требуется, то оставить 0
                    setExp(exp + value)
                    return
                }

                clear()
                setExp(value)

            } else {
                if (((exp === "0") || (exp === "-")) && (value === "00")) return

                setExp(exp + value)
            }
        }
    }

    const clear = () => {
        setExp("0")
    }

    const calc = (event) => {
        event.preventDefault()

        setExp(calculate(exp))
    }

    const fixInput = (e) => {
        e.target.value = "";
    }

    return (
        <div>
            <form className="calculator" onSubmit={(e) => calc(e)}>
                <div className="neonName">
                    <h1>Cute Calculator!</h1>
                    <div className="neonLight"/>
                </div>

                <Switcher/>

                <input className="input" type="text" value={exp} onChange={(e) => setExp(e.target.value)} onClick={(e) => fixInput(e)}/>

                <div className="buttons">
                    <span className="clear" onClick={clear}>Clear</span>
                    <span onClick={(event) => addOnScreen(event)}>/</span>
                    <span onClick={(event) => addOnScreen(event)}>*</span>
                    <span onClick={(event) => addOnScreen(event)}>7</span>
                    <span onClick={(event) => addOnScreen(event)}>8</span>
                    <span onClick={(event) => addOnScreen(event)}>9</span>
                    <span onClick={(event) => addOnScreen(event)}>-</span>
                    <span onClick={(event) => addOnScreen(event)}>4</span>
                    <span onClick={(event) => addOnScreen(event)}>5</span>
                    <span onClick={(event) => addOnScreen(event)}>6</span>
                    <span className="plus" onClick={(event) => addOnScreen(event)}>+</span>
                    <span onClick={(event) => addOnScreen(event)}>1</span>
                    <span onClick={(event) => addOnScreen(event)}>2</span>
                    <span onClick={(event) => addOnScreen(event)}>3</span>
                    <span onClick={(event) => addOnScreen(event)}>0</span>
                    <span onClick={(event) => addOnScreen(event)}>00</span>
                    <span onClick={(event) => addOnScreen(event)}>.</span>
                    <span className="equal" onClick={(e) => calc(e)}>=</span>
                </div>
            </form>
        </div>
    );
};

export default Window;