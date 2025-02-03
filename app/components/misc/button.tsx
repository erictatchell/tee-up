interface ButtonProps {
    link: string;
    text: string;
    backgroundColor?: string;
    textColor?: string;
  }
  
  export default function Button({ link, text, backgroundColor = "teeUpGreen", textColor = "white" }: ButtonProps) {
    return (
      <a 
        href={link}
        className={`px-6 py-3 text-lg rounded-lg transition duration-300 
            hover:brightness-90 hover:shadow-lg bg-${backgroundColor} text-${textColor}`}
      >
        {text}
      </a>
    );
  }
  