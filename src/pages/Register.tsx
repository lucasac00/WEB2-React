import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import img1 from "../assets/img1.jpg";
import criatura from "../assets/criatura.png";
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const Register = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');

  // This function is called when the CEP input loses focus.
  const handleCepBlur = async () => {
    if (!cep) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        alert('CEP não encontrado!');
        setStreet('');
      } else {
        setStreet(data.logradouro);
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('Erro ao buscar CEP');
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Validate that the passwords match
    if (password !== confirmPassword) {
      alert("As senhas não conferem!");
      return;
    }
    
    // Create a user object and save to localStorage
    const user = { name, email, password, cep, street, loggedIn: true };
    localStorage.setItem('user', JSON.stringify(user));
    console.log("Usuário registrado:", user);
    navigate("/");
  };

  return (
    <section className="md:bg-orange-200 bg-[#FFE8C9] min-h-screen md:flex items-center justify-center">
      <div className="md:bg-[#FFE8C9] md:flex md:rounded-2xl md:shadow-lg md:max-w-6xl md:p-5 md:items-center">
        {/* Left Image for larger screens */}
        <div className="w-1/2 hidden lg:block h-screen">
          <img 
            className="rounded-2xl w-full h-full object-cover" 
            src={img1} 
            alt="Imagem ilustrativa ao lado do formulário" 
          />
        </div>
        {/* Form Section */}
        <div className="lg:w-1/2 px-8">
          <img 
            src={criatura} 
            className="max-w-32 mx-auto pt-10" 
            alt="Logo" 
          />
          <p className="text-center font-bold text-base">Empresa Pets Organizados</p>
          <h2 className="font-bold text-2xl mt-2">Registre-se</h2>
          <p className="text-sm mt-4">Preencha os dados abaixo para criar sua conta</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
            {/* Name Field */}
            <div className="relative">
              <input
                className="bg-white p-2 pl-3 rounded-xl border w-full md:text-lg"
                type="text"
                name="name"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {/* Email Field */}
            <div className="relative">
              <input
                className="bg-white p-2 pl-3 pr-10 rounded-xl border w-full md:text-lg"
                type="email"
                name="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <EmailIcon className="absolute top-1/2 right-3 -translate-y-1/2" />
            </div>
            {/* Password Field */}
            <div className="relative">
              <input
                className="bg-white p-2 pl-3 pr-10 rounded-xl border w-full md:text-lg"
                type="password"
                name="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <VpnKeyIcon className="absolute top-1/2 right-3 -translate-y-1/2" />
            </div>
            {/* Confirm Password Field */}
            <div className="relative">
              <input
                className="bg-white p-2 pl-3 pr-10 rounded-xl border w-full md:text-lg"
                type="password"
                name="confirmPassword"
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <VpnKeyIcon className="absolute top-1/2 right-3 -translate-y-1/2" />
            </div>
            {/* CEP Field */}
            <div className="relative">
              <input
                className="bg-white p-2 pl-3 rounded-xl border w-full md:text-lg"
                type="text"
                name="cep"
                placeholder="CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={handleCepBlur}
                required
              />
            </div>
            {/* Street Field */}
            <div className="relative">
              <input
                className="bg-white p-2 pl-3 rounded-xl border w-full md:text-lg"
                type="text"
                name="street"
                placeholder="Rua"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="bg-[#3B94FC] mt-4 rounded-xl text-white py-2 md:text-lg hover:bg-blue-700 hover:scale-105 duration-300"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
