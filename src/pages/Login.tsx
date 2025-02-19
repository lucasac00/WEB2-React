import React, { useState } from 'react';
import img1 from "../assets/img1.jpg"
import criatura from "../assets/criatura.png"
import iconeGoogle from "../assets/iconeGoogle.png"
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey'; 
import { Link, useNavigate } from 'react-router';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e : any) => {
    e.preventDefault();
    const user = { email, password, loggedIn: true };
    localStorage.setItem('user', JSON.stringify(user));
    console.log("Usuário logado:", user);
    navigate("/")
  };

  return (
    <section className="md:bg-orange-200 bg-[#FFE8C9] min-h-screen md:flex items-center justify-center">
      <div className="md:bg-[#FFE8C9] md:flex md:rounded-2xl md:shadow-lg md:max-w-6xl md:p-5 md:items-center">
        {/* Imagem à esquerda para telas maiores */}
        <div className="w-1/2 hidden lg:block h-screen">
          <img className="rounded-2xl w-full h-full object-cover" src={img1} alt="Imagem do pet ao lado do login" />
        </div>
        {/* Seção do Formulário */}
        <div className="lg:w-1/2 px-8">
          <img src={criatura} className="max-w-32 mx-auto pt-10" alt="Logo" />
          <p className="text-center font-bold text-base">Empresa Pets Organizados</p>
          <h2 className="font-bold text-2xl mt-2">Login</h2>
          <p className="text-sm mt-4">Se você já está cadastrado, faça o login</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
            <div className="relative">
              <input
                className="bg-[#3B94FC] p-2 pl-3 pr-10 rounded-xl border w-full placeholder-white text-white md:text-lg"
                type="email"
                name="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <EmailIcon className="absolute top-1/2 right-3 -translate-y-1/2 text-white" />
            </div>
            <div className="relative">
              <input
                className="bg-[#3B94FC] p-2 pl-3 pr-10 rounded-xl border w-full placeholder-white text-white md:text-lg"
                type="password"
                name="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <VpnKeyIcon className="absolute top-1/2 right-3 -translate-y-1/2 text-white" />
            </div>
            <button 
              type="submit" 
              className="bg-[#3B94FC] mt-4 rounded-xl text-white py-2 md:text-lg hover:bg-blue-700 hover:scale-105 duration-300"
            >
              Entrar
            </button>
          </form>
          <div className="mt-7 text-gray-400">
            <hr className="border-gray-400" />
          </div>
          <div className="relative">
            <button className="bg-white border py-2 px w-full rounded-xl mt-5 flex justify-center items-center text-sm md:text-lg hover:bg-gray-200 hover:scale-105 duration-300">
              Entre com o Google
              <img src={iconeGoogle} alt="Ícone Google" className="absolute top-1/2 left-3 -translate-y-1/2 w-6 h-6" />
            </button>
          </div>
          <div className="mt-10 text-sm border-b border-gray-400 py-4">
            <a href="#" className="hover:text-blue-700 md:text-base">Esqueceu sua senha?</a>
          </div>
          <div className="mt-3 text-sm flex justify-between items-center md:text-base">
            <p>Ainda não tem uma conta?</p>
            <Link 
            to="/register" 
            className="py-2 px-2 bg-[#3B94FC] text-white border rounded-xl md:text-base hover:bg-blue-700 hover:scale-110 duration-300">
              Registre-se
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
