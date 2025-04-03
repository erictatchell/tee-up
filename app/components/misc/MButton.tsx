interface ButtonProps {
    link: string;
    text: string;
    backgroundColor?: string;
    textColor?: string;
    submit?: boolean;
  }
  
  export default function MButton({ link, text, backgroundColor = "teeUpGreen", textColor = "white", submit = false }: ButtonProps) {
      if(submit) {
        return (
          <button 
            type="submit" 
            className={`px-6 py-3 text-lg rounded-lg transition duration-300 text-center
            hover:brightness-90 hover:shadow-lg bg-${backgroundColor} text-${textColor}`}
          >
            {text}
          </button>
        );
      } else {
        return (
          <a 
          href={link}
          className={`px-6 py-3 text-lg rounded-lg transition duration-300 text-center
              hover:brightness-90 hover:shadow-lg bg-${backgroundColor} text-${textColor}`}
        >
          {text}
          </a>
        );
      }
  }
  
