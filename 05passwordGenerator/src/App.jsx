import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const passwordRef = useRef(null);
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(0);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [copySuccess, setcopySuccess] = useState(false);
  const [strength, setStrength] = useState();
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) string += "0123456789";
    if(characterAllowed) string += "!@#$%&";
    for(let i = 0;i<length;i++){
      pass += string.charAt(Math.floor(Math.random()*string.length))
    }
    setPassword(pass);
  },[length,numberAllowed,characterAllowed,setPassword])
  
  useEffect(() => {
    let passwordStrength = 0;
    if(length >= 3) passwordStrength++;
    if(length >= 4) passwordStrength++;
    if(length >= 5) passwordStrength++;
    if(length >= 6) passwordStrength++;
    if(length >= 7) passwordStrength++;
    if(length >= 8) passwordStrength++;
    if(numberAllowed) passwordStrength++;
    if(characterAllowed) passwordStrength++;
    if(passwordStrength < 3) setStrength("Weak");
    if(passwordStrength >3 && passwordStrength< 8) setStrength("Medium");
    if(passwordStrength >= 8) setStrength("Strong");
  },[length, numberAllowed, characterAllowed])

  const copyPassword = useCallback(() =>{
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password);
      setcopySuccess(true);
      setTimeout(() => {
        setcopySuccess(false);
      },1500)
    },[password])

    useEffect(() => {
      passwordGenerator();
    },[length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[450px] aspect-square mx-auto shadow-md rounded-lg py-4 px-4 my-12 text-orange-500 bg-gray-700 flex flex-col justify-between">
          <h1 className="text-white text-center my-3">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-3 bg-white text-black "
              placeholder="Password"
              readOnly
              ref = {passwordRef}
              
            />
            <button
              className=" cursor-pointer hover:bg-blue-800 outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
              onClick={copyPassword}
            >
              Copy
            </button>
            
          </div>
          <div className="flex flex-row items-center gap-4 mb-2">
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={20}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(Number(e.target.value));
                }}
              />
              <label htmlFor="setLength">Length: {length}</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Number</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={characterAllowed}
                id="characterInput"
                onChange={() => setCharacterAllowed((prev) => !prev)}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
          {copySuccess && (
              <p className="text-green-400 text-sm text-center mb-2">
                Copied to Clipboard!
              </p>
            )}
          <p
            className={`text-sm mb-2 font-semibold text-center ${
              strength === "Strong"
                ? "text-green-400"
                : strength === "Medium"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            Strength: {strength}
          </p>
          <p className="text-white"><span className="text-red-400">Note: </span>Choose a Character and Number to make your password Strong</p>
        </div>
      </div>
    </>
  );
}


export default App;
