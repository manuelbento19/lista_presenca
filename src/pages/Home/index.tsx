import React, { useState, useEffect } from 'react';
import './styles.css';

import { Card,CardProps } from '../../components/Card';

type ProfileResponse = {
  name:string;
  avatar_url:string;
}
type User = {
  name:string;
  avatar:string;
}

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);

  async function fetchData(username:string):Promise<ProfileResponse>{
    const result = await fetch(`https://api.github.com/users/${username}`)
    const data = await result.json() as ProfileResponse;
    return data
  }
  async function handleAddStudent() {
    const newStudent = {
      name: studentName,
      avatar: 'Manuel',
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };
    const result = await fetchData(studentName);
    setStudents(prevState => [...prevState, {
      name:result.name,
      avatar: result.avatar_url,
      time:new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }]);
  }

  useEffect(() => {
    async function load() {
      const result = await fetchData('manuelbento19');
      setUser({
        name:result.name,avatar:result.avatar_url
      });
    }
    load();
  }, []);

  return (
    <div className="container">
      <aside>
        <div className="content">
          <h1>Lista de Presença</h1>
          <form onSubmit={handleAddStudent}>
            <header id='avatar'>
              <strong>{user.name}</strong>
              <img src={user.avatar} alt="Foto de perfil" />
            </header>
            <div className='input-group'>
              <input type="text" placeholder="Digite o username do seu amigo no GitHub..." onChange={e => setStudentName(e.target.value)}/>
              <button type="button" onClick={handleAddStudent}>
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </aside>
      <main>
        <div className="content">
          {
            students.map(student => <Card key={student.time} name={student.name} time={student.time} avatar={student.avatar}/>)
          }
        </div>
      </main>    
    </div>
  )
}