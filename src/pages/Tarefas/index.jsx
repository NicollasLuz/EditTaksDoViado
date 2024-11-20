import React, { useState } from 'react';
import Card from "../../components/Card";
import styles from "./Tarefas.module.css";  
import Container from '../../components/Container'; 

function Tarefas({ tarefas, onEdit, onDelete }) {
    const [editingId, setEditingId] = useState(null);
    const [completedTasks, setCompletedTasks] = useState({});

    const handleEdit = (tarefa) => {
        if (editingId === tarefa.id) {
            onEdit(tarefa);
            setEditingId(null);
        } else {
            setEditingId(tarefa.id);
        }
    }

    const handleCheckboxChange = (taskId) => {
        setCompletedTasks((prev) => ({
            ...prev,
            [taskId]: !prev[taskId], // Alterna o estado do checkbox
        }));
    }

    return (
        <>
            <Container>
                {tarefas.map((task) => (
                    <div key={task.id}>
                        {editingId === task.id ? (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleEdit({
                                        ...task,
                                        titulo: e.target.titulo.value,
                                        descricao: e.target.descricao.value,
                                    });
                                }}
                            >  
                            <div className={styles.inputedit}>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <input className={`${styles.input__search} ${styles.input__search__variant}`} name="titulo" defaultValue={task.titulo} />
                                <br/>
                                <input className={`${styles.input__search} ${styles.input__search__variant}`}  name="descricao" defaultValue={task.descricao} />
                                <br/>
                                <button className={`${styles.input__button__shadow} ${styles.input__button__shadow__variant}`} type="submit">Salvar</button>
                            </div>
                            </form>
                        ) : (
                            <div className={styles.card}>
                                <div className={styles.cookieCard}>
                                    <span className={styles.cookieHeading}>{task.titulo}</span>
                                    <hr className={styles.line} />
                                    <span className={styles.cookieDescription}>{task.descricao}</span>
                                    <button className={styles.acceptButton} onClick={() => setEditingId(task.id)}>Editar</button>
                                    <button className={styles.acceptButton_2} onClick={() => onDelete(task.id)}>Excluir</button>
                                    <div className={styles.checkbox_wrapper_10}>
                                        <input 
                                            type="checkbox" 
                                            id={`cb-${task.id}`} // ID único para cada checkbox
                                            className={`${styles.tgl} ${styles.tgl_flip}`} 
                                            checked={!!completedTasks[task.id]} // Controla o estado do checkbox
                                            onChange={() => handleCheckboxChange(task.id)} // Atualiza o estado ao mudar
                                        />
                                        <label htmlFor={`cb-${task.id}`} data-tg-on="Feito" data-tg-off="Afazer" className={styles.tgl_btn} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </Container>
        </>
    );
}

export default Tarefas;