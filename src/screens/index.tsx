import { useState, useRef } from "react";
import { 
  View, 
  Text,
  FlatList,
  Alert,
  TextInput
} from "react-native";

import { styles } from "./styles";
import { uuid } from "../utils/uuid";

import { Header } from "../components/Header";
import { Task } from "../components/Task";

import { TaskDTO } from "../dtos/TaskDTO";
import { Empty } from "../components/Empty";

export function HomeScreen() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [newTask, setNewTask] = useState('');
  const newTaskInputRef = useRef<TextInput>(null);

  const totalTaskCreated = tasks.length;
  const totalTaskCompleted = tasks.filter(({isCompleted}) => isCompleted).length;

  function handleTaskAdd() {
    if(newTask !== '' && newTask.length >= 5) {
      setTasks((tasks) => [
        ...tasks,
        {id: uuid(), isCompleted: false, title: newTask.trim()}
      ])

      setNewTask(''); //Limpando o input depois de adicionar tarefa

      newTaskInputRef.current?.blur();
    } 
  }

  function handleTaskDone(id: string) {
    setTasks((task) => 
      task.map((task) => 
      {
        task.id === id ? (task.isCompleted = !task.isCompleted) : null
        return task
      }),
    )
  }

  function handleTaskDelete(id: string) {
    Alert.alert('Excluir Tarefa', 'Desejar excluir esta tarefa?', [
      {
        text: 'Sim',
        style: 'default',
        onPress: () => setTasks(tasks => tasks.filter((task) => task.id !== id ))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
    
  }

  return(
    <View style={styles.container}>
      <Header 
        inputRef={newTaskInputRef}
        task={newTask} 
        onChangeText={setNewTask} 
        onPress={handleTaskAdd}
      />

      <View style={styles.tasksContainer}>

        <View style={styles.info}>
          <View style={styles.row}>
            <Text style={styles.tasksCreated}>Criadas</Text>

            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>
                {totalTaskCreated}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.tasksDone}>Concluídas</Text>

            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>
                {totalTaskCompleted}
              </Text>
            </View>
          </View>          
        </View>

        <FlatList 
          data={tasks}
          keyExtractor={(tasks) => tasks.id} // Qdo o item é opcional colocando a ! dizemos ao typescript que o item ira chegar
          renderItem={({ item }) => (
            <Task 
              key={item.id} 
              onTaskDone={() => handleTaskDone(item.id)}
              onTaskDelete={() => handleTaskDelete(item.id)}
              {...item}
            />
          )}
          ListEmptyComponent={<Empty />}
        />      
      </View>
    </View>
  )
}