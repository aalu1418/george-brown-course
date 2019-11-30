import React from "react";
import "./App.css";

function App() {
	  const Timer = () => {
		      const [count, setCount] = React.useState(0);
		      const [isActive, setIsActive] = React.useState(false);
		      const [activeBtnName,setActiveBtnName] = React.useState('Start');
		      const toggle = () => {
			            if(isActive){
					            setActiveBtnName('Resume');
					          }
			            setIsActive(!isActive);
			          };

		      const reset = () => {
			            setActiveBtnName('Start');
			            setCount(0);
			            setIsActive(false);
			          };

		      React.useEffect(() => {
			            let interval = null;
			            if (isActive) {
					            setActiveBtnName('Pause');
					            interval = setInterval(() => {
							              setCount(count => {
									                  return count + 1;
									                });
							            }, 1000);
					          } else if (!isActive && count !== 0) {
							          clearInterval(interval);
							        }
			            return () => clearInterval(interval);
			          }, [isActive, count]);

		      return (
			            <div>
			              <div className="count">{count}</div>
			              <div>
			                <button onClick={toggle}>
			                  {" "}
			                  {activeBtnName} {" "}
			                </button>
			                <button onClick={reset}>Reset</button>
			              </div>
			            </div>
			          );
		    };
	  return (
		      <div className="App">
		        <h1> useEffect hook - countdown </h1>
		        <Timer />
		      </div>
		    );
}

export default App;
