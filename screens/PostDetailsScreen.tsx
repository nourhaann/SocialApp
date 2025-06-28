import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Post } from '../types';

// Define Comment type
type Comment = {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
};

// Define Props using React Navigation helper
type Props = NativeStackScreenProps<RootStackParamList, 'PostDetails'>;

const PostDetailsScreen = ({ route, navigation }: Props) => {
  const { post } = route.params;
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://gorest.co.in/public/v2/posts/${post.id}/comments`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const avatarUrl = `https://i.pravatar.cc/150?u=${post.user_id}`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postCard}>
        <View style={styles.header}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <Text style={styles.username}>User {post.user_id}</Text>
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
      </View>

      <Text style={styles.commentTitle}>Comments</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        comments.map(comment => (
          <View key={comment.id} style={styles.commentCard}>
            <View style={styles.header}>
              <Image
                source={{ uri: `https://i.pravatar.cc/150?u=${comment.email}` }}
                style={styles.avatar}
              />
              <Text style={styles.username}>{comment.name}</Text>
            </View>
            <Text>{comment.body}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default PostDetailsScreen;

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#fff' },
  postCard: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  commentCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    color: '#333',
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
