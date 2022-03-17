import React, {useState} from 'react';
import './MiniExcel.css';

function MiniExcel(): JSX.Element {
    const [sheet, setSheet] = useState<Array<Array<number>>>(
        new Array(3).fill(0).map(() =>
            new Array(3).fill(0).map(() => Math.random() * 999 + 1 | 0))
    );

    function expandSheet() {
        const newSheet = [...sheet.map(arr => [...arr, Math.random() * 999 + 1 | 0]),
            new Array(sheet.length + 1).fill(0).map(() => Math.random() * 999 + 1 | 0)]
        setSheet(newSheet)
    }

    const shrinkSheet = () => {
        if (sheet.length > 1) {
            const newSheet = sheet.slice(0, sheet.length - 1).map(arr => arr.slice(0, arr.length - 1))
            setSheet(newSheet)
        }
    };

    function inputHandler(ev: React.FormEvent<HTMLInputElement>, row: number, col: number) {
        const value = +ev.currentTarget.value;
        if ((value === parseInt(ev.currentTarget.value, 10) || ev.currentTarget.value === "") && value <= 999 && value >= 0) {
            const newSheet = [...sheet]
            newSheet[row][col] = ev.currentTarget.value === "" ? NaN : +ev.currentTarget.value
            setSheet(newSheet)
        }
    }

    function blurHandler(ev: React.FocusEvent<HTMLInputElement>) {
        const value = +ev.currentTarget.value;
        if (value !== parseInt(ev.currentTarget.value, 10) || value > 999 || value < 0) {
            ev.target.focus()
        }
    }

    return (
        <div>
            <div>
                <button title={"Expand Sheet"} onClick={expandSheet}>+</button>
                <button title={"Shrink Sheet"} onClick={shrinkSheet}>-</button>
            </div>
            {sheet.map((row, i) => (
                <div key={i}>
                    <div style={{display: "flex"}}>
                        {row.map((col, j) => (
                            <input key={`${i}_${j}`} type={"text"}
                                   pattern="[0-9]{1,3}"
                                   size={3}
                                   value={isNaN(Number(sheet[i][j])) ? "" : sheet[i][j]}
                                   onBlur={(ev) => blurHandler(ev)}
                                   onInput={(ev) => inputHandler(ev, i, j)}
                                   onKeyPress={(ev) => {
                                       if (!/[0-9]/.test(ev.key)) {
                                           ev.preventDefault();
                                       }
                                   }}/>
                        ))}
                        <span
                            style={{whiteSpace: "nowrap"}}>&nbsp;= {sheet[i].reduce((a, v) => a + (isNaN(v) ? 0 : v), 0)}</span>
                    </div>
                </div>))}
            <div><b>Total</b>: {sheet.reduce((a, v) => a + v.reduce((ar, vr) => ar + (isNaN(vr) ? 0 : vr), 0), 0)}</div>
        </div>
    );
}

export default MiniExcel;
