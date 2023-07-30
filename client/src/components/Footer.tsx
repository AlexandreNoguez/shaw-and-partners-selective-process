import { IoLogoGithub, IoLogoCodepen, IoLogoLinkedin } from 'react-icons/io';

export const Footer = () => {
  return (
    <nav>
      <ul className="bg-slate-800 p-2 my-auto bottom-0 w-full flex items-center justify-center gap-2 text-white">
        <li className='hover:animate-bounce'>
          <a href="https://github.com/AlexandreNoguez" target="_blank">
            <IoLogoGithub className="w-10 h-10" />
          </a>
        </li>
        <li className='hover:animate-bounce'>
          <a href="https://codepen.io/alexandrenoguez/full/OJzzLwz" target="_blank">
            <IoLogoCodepen className="w-10 h-10" />
          </a>
        </li>
        <li className='hover:animate-bounce'>
          <a href="https://www.linkedin.com/in/alexandre-noguez/" target="_blank">
            <IoLogoLinkedin className="w-10 h-10" />
          </a>
        </li>
      </ul>
    </nav >
  )
}