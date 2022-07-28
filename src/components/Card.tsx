import React from 'react';
import './styles.css';

export type CardProps = {
  name: string;
  avatar: string;
  time:string;
}

export function Card(props:CardProps) {
  return (
    <div className="card">
       <header>
          <strong>{props.name}</strong>
          <img src={props.avatar||'https://avatars.githubusercontent.com/u/65732773?v=4'} alt="Foto de perfil" />
        </header>
        <main>
          <small>{props.time}</small>
        </main>
    </div>
  )
}