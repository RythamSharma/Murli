import { useEffect, useState } from "react";

let recognition: any = null;
if ("webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
}

const useSpeechRecognition = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const result = event.results[event.results.length - 1];
            console.log(result)
            const transcript = result[0].transcript;
            setText(transcript);
            recognition.stop();
            setIsListening(false);
        };
    }, []);

    const startListening = () => {
        setText('');
        setIsListening(true);
        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition,
    };
};

export default useSpeechRecognition;
