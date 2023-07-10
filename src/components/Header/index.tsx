import { 
  Image,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from "./styles";
import logoImage from "../../assets/logo.png";
import { theme } from "../../theme";

type HeaderProps = {
  task: string,
  onChangeText: (task: string) => void,
  onPress: () => void,
  inputRef: React.RefObject<TextInput>
}

export function Header({
  task,
  inputRef,
  onChangeText,
  onPress
}: HeaderProps) {
  return(
    <View style={styles.headerContainer}>
      <Image source={logoImage}/>

      <View style={styles.form}>
        <TextInput 
          placeholder="Adicione uma nova tarefa"
          placeholderTextColor={theme.colors.base.gray300}
          style={[styles.input, inputRef.current?.isFocused() && task ? styles.inputBorder : null ]}
          value={task}
          onChangeText={onChangeText}
          ref={inputRef}
          autoCorrect={false}
          onSubmitEditing={onPress}
          returnKeyType="done"
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={onPress}
        >
          <MaterialCommunityIcons 
            name='plus-circle-outline'
            size={22}
            color={theme.colors.base.gray100}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}