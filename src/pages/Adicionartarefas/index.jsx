import styles from './AdicionarTarefas.module.css'
import React, { useState } from 'react';
import Tarefas from '../Tarefas';


function AdicionarTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleChange = (inputType, e) => {
    if (inputType === 'titulo') {
      setTitulo(e.target.value);
    } else if (inputType === 'descricao') {
      setDescricao(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaTarefa = {
      id: Date.now(),
      titulo,
      descricao,
    };
    setTarefas([...tarefas, novaTarefa]);
    setTitulo('');
    setDescricao('');
  };

  const handleEdit = (tarefaAtualizada) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa
      )
    );
  };

  const handleDelete = (id) => {
    const resultado = confirm("Quer mesmo excluir a tarefa?")
    if(resultado) {
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
      alert("Tarefa excluida com sucesso!")
    }  
  };

  return (
    <>
    <div className={`${styles.input__container} ${styles.input__container__variant}`}>
      <div className={`${styles.shadow__input} ${styles.shadow__input__variant}`} />
      <input 
        className={`${styles.input__search} ${styles.input__search__variant}`} 
        placeholder="Digite o título da tarefa" 
          type="text"
          value={titulo}
          onChange={(e) => handleChange('titulo', e)}
          required 
      />
      <br/>
      <input 
        className={`${styles.input__search} ${styles.input__search__variant}`} 
        placeholder="Digite a descrição da tarefa" 
          type="text"
          value={descricao}
          onChange={(e) => handleChange('descricao', e)}
          required
      />
      <br/>
      <br/>
      <button className={`${styles.input__button__shadow} ${styles.input__button__shadow__variant}`}
        type="submit" 
        onClick={handleSubmit}
      >
        Adicionar Tarefa
      </button>
    </div>
      
      <Tarefas
        tarefas={tarefas}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
        
    </>
  );
}

export default AdicionarTarefas