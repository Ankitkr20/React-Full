import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [strength, setStrength] = useState("");

  //useRef hook
  const passwordRef = useRef(null)

  // To generate the password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    let score = 0;
    if(length >= 3) score++;
    if(length >= 4) score++;
    if(length >= 5) score++;
    if(length >= 6) score++;
    if(length >= 7) score++;
    if(length >= 8) score++;
    if(numberAllowed) score++;
    if(characterAllowed) score++;

    if (score <= 3) setStrength(" Weak");
    else if(score >= 3 && score < 8) setStrength(" Medium");
    else setStrength(" Strong");
  },[length, numberAllowed, characterAllowed]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,4);
    window.navigator.clipboard.writeText(password);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    },1500);
  },[password])

  // Auto regenrate with useEffect()length, numberAllowed, characterAllowed
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-4 px-4 my-12 text-orange-500 bg-gray-700">
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
              strength === " Strong"
                ? "text-green-400"
                : strength === " Medium"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            Strength: {strength.charAt(0).toUpperCase() + strength.slice(1)}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
