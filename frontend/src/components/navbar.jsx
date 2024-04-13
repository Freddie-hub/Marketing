import React from 'react';
import Modal from './modal';
import { CircleUserRound } from 'lucide-react';

export default function Navbar() {
 
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white font-bold text-lg">R and J Group</a>
        <ul className="flex">
          <li className="mr-5">
            <a href="/" className="text-white">Home</a>
          </li>
          <li className="mr-5">
            <a href="/projects" className="text-white">Projects</a>
          </li>
          <li className="mr-5">
            <a href="/services" className="text-white">Services</a>
          </li>
          <li className="mr-5">
            <a href="/about-us" className="text-white">About Us</a>
          </li>
          <li className='mr-5'>
            <Modal innerText="How it works">
              <p>This is a how it works</p>
            </Modal>
          </li>
          <li className='mr-5'>
            <Modal innerText="FAQs" className={"border-red-400"} modalClasses={""}>
              <p>This are the FAQs</p>
            </Modal>
          </li>
          <li className="mr-5">
            <a href="/contact" className="text-white">Contact</a>
          </li>
        </ul>
        <div className='flex items-center gap-2'>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Login</button>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Start Working</button>
        <CircleUserRound size={40}  className="text-white cursor-pointer"/>
        </div>

      </div>
    </nav>
  );
}
