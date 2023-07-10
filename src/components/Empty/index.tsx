import { 
  View,
  Image,
  Text
} from "react-native";
import { styles } from "./styles";
import clipboard from '../../assets/clipboard.png';

export function Empty() {
  return(
    <View style={styles.emptyContainer}>
      <Image 
        style={styles.image}
        source={clipboard}
      />
      <Text style={styles.textBold}>Você ainda não tem tarefas cadastradas</Text>
      <Text style={styles.textRegular}>Crie tarefas e organize seus itens a fazer</Text>
    </View>
  )
}