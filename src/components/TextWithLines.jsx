const splitSentence = (str) => {
    const words = str.trim().split(" ");
    const firstWord = words.shift();
    const restOfSentence = words.join(" ");
    return [firstWord, restOfSentence];
}

const TextWithLines = ({ text, color = "#CD3242", height = 4, dualColor = true, bold = true}) => {

    const [firstWord, restOfSentence] = splitSentence(text);

    return (
        <div className="relative">
            <div style={{ height: height+"px" }} className="absolute left-0 top-1/2 md:w-[55px]  w-[30px] bg-gray-400 transform-translate-y-1/2"></div>
            {
                dualColor === true ?
                    <div className="uppercase md:ml-20 ml-12">
                        <p style={{fontWeight:bold? 700 : 500}} className="text-2xl md:text-2xl leading-relaxed uppercase"><span style={{color:color}} > {firstWord} </span><span className='text-white'> {restOfSentence} </span></p>
                    </div>
                    :
                    <div className="uppercase md:ml-20 ml-12">
                        <p style={{fontWeight:bold? 700 : 500}} className="text-2xl md:text-2xl font-bold leading-relaxed uppercase"><span style={{color: color}} className='text-white'> {text} </span></p>
                    </div>
            }
        </div>
    );
}

export default TextWithLines