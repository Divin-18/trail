import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Todo = {
  id: string;
  title: string;
};

export default function TodoPage() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (!todo.trim()) return;

    setTodos([...todos, { id: Date.now().toString(), title: todo }]);
    setTodo("");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todos 📝</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter todo"
          value={todo}
          onChangeText={setTodo}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.title}</Text>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.delete}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No todos yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  inputRow: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },
  addBtn: {
    marginLeft: 10,
    backgroundColor: "#4f46e5",
    paddingHorizontal: 18,
    borderRadius: 8,
    justifyContent: "center",
  },
  addText: { color: "#fff", fontSize: 24 },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    marginBottom: 10,
  },
  todoText: { fontSize: 16 },
  delete: { fontSize: 18 },
  empty: { textAlign: "center", color: "#999", marginTop: 40 },
});
