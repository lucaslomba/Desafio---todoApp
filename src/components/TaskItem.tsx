import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit.png'
import cancelIcon from '../assets/icons/X.png'
import { EditTaskArgs } from '../pages/Home';
import { Task } from './TasksList';

interface TasksItemProps {
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle } : EditTaskArgs) => void;
}

export function TaskItem({ item, toggleTaskDone, removeTask, editTask }: TasksItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(item.title);

    const textInputRef = useRef<TextInput>(null)

    useEffect(() => {
        if (textInputRef.current) {
          if (isEditing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [isEditing])

    function handleStartEditing() {
        setIsEditing(true)
    }

    function handleCancelEditing() {
        setNewTitle(item.title)
        setIsEditing(false)
    }

    function handleSubmitEditing() {
        editTask({ taskId: item.id, taskNewTitle: newTitle })
        setIsEditing(false)
    }
  
    return (
    <>
        <View>
            <TouchableOpacity
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={() => toggleTaskDone(item.id)}
            >
            <View 
                style={item.done ? styles.taskMarkerDone : styles.taskMarker }
            >
                { item.done && (
                <Icon 
                    name="check"
                    size={12}
                    color="#FFF"
                />
                )}
            </View>

            <TextInput 
                ref={textInputRef}
                style={item.done ? styles.taskTextDone : styles.taskText }
                value={newTitle}
                onChangeText={setNewTitle}
                editable={isEditing}
                onSubmitEditing={handleSubmitEditing}
            />
            </TouchableOpacity>
        </View>

        <View style={styles.iconsContainer}>
            { isEditing ? (
                <TouchableOpacity
                style={{ paddingRight: 6 }}
                onPress={handleCancelEditing}
                >
                <Icon name="x" size={24} color="#b2b2b2" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                style={{ paddingRight: 6 }}
                onPress={handleStartEditing}
                >
                <Image source={editIcon} />
                </TouchableOpacity>
            ) }

            <View style={styles.iconsDivider}></View>

            <TouchableOpacity
                style={{ paddingRight: 24, paddingLeft: 6 }}
                onPress={() => removeTask(item.id)}
            >
                <Image source={trashIcon} />
            </TouchableOpacity>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconsDivider: {
      width: 1,
      height: 24,
      backgroundColor: 'rgba(196, 196, 196, 0.147)'
  }
})