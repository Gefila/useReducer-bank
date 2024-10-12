import { act, useReducer, useState } from "react";

const initialState = {
	balance: 0,
	loan: 0,
	isActive: false,
};

function App() {
	const [{ balance, loan, isActive }, dispatch] = useReducer(
		reducer,
		initialState
	);

	function reducer(state, action) {
		switch (action.type) {
			case "openAccount":
				return { ...state, isActive: true, balance: 500 };
			case "deposit":
				return { ...state, balance: state.balance + action.payload };
			case "withdraw":
				if (state.balance < action.payload) return state;
				return { ...state, balance: state.balance - action.payload };
			case "reqLoan":
				if (state.loan > 0) return state;
				return {
					...state,
					loan: state.loan + action.payload,
					balance: state.balance + action.payload,
				};
			case "payLoan":
				return { ...state, loan: 0, balance: state.balance - state.loan };
			case "closeAccount":
				if(state.balance !== 0 || state.loan > 0) return state;
				return { ...state, isActive: false };
			default:
				return `Invalid action type: ${action.type}`;
		}
	}

	return (
		<div className="App">
			<h1>useReducer Bank Account</h1>
			<p>Balance: {balance}</p>
			<p>Loan: {loan}</p>

			<p>
				<button
					onClick={() => {
						dispatch({ type: "openAccount" });
					}}
					disabled={isActive}
				>
					Open account
				</button>
			</p>
			<p>
				<button
					onClick={() => {
						dispatch({ type: "deposit", payload: 150 });
					}}
					disabled={!isActive}
				>
					Deposit 150
				</button>
			</p>
			<p>
				<button
					onClick={() => {
						dispatch({ type: "withdraw", payload: 50 });
					}}
					disabled={!isActive}
				>
					Withdraw 50
				</button>
			</p>
			<p>
				<button
					onClick={() => {
						dispatch({ type: "reqLoan", payload: 5000 });
					}}
					disabled={!isActive}
				>
					Request a loan of 5000
				</button>
			</p>
			<p>
				<button
					onClick={() => {
						dispatch({ type: "payLoan" });
					}}
					disabled={!isActive}
				>
					Pay loan
				</button>
			</p>
			<p>
				<button
					onClick={() => {
						dispatch({ type: "closeAccount" });
					}}
					disabled={!isActive}
				>
					Close account
				</button>
			</p>
		</div>
	);
}

export default App;
