import { Injectable } from '@angular/core';
import { Post } from './posts';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsCollection: AngularFirestoreCollection<Post>;
  postsSabadoTematicoCollection: AngularFirestoreCollection<Post>;
  postsDiretosCollection: AngularFirestoreCollection<Post>;

  constructor(private afs: AngularFirestore) {
    this.postsCollection = afs.collection('posts');
    this.postsSabadoTematicoCollection = afs.collection('posts', ref => ref.where('texto', '>', '#sabadotematico').where('texto', '<', '#sabadotematicoz'));
    this.postsDiretosCollection = afs.collection('posts', ref => ref.where('paraUsuario', '>', ''));
  }
  
  getPosts(): Observable<Post[]> {
    return this.postsCollection.valueChanges();
  }
  
  enviarPost(post: Post) {
    this.postsCollection.add({texto: post.texto, paraUsuario: post.paraUsuario});
  }

  getPostsSabadoTematico(): Observable<Post[]> {
    return this.postsSabadoTematicoCollection.valueChanges();
  }

  getPostsDiretos(): Observable<Post[]> {
    return this.postsDiretosCollection.valueChanges();
  }
}
