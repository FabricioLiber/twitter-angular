import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from 'src/app/shared/posts';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Observable<Post[]>;
  postsSabadoTematico: Observable<Post[]>;
  postsDiretos: Observable<Post[]>;

  post = new Post('');

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSabadoTematico = this.postsService.getPostsSabadoTematico();
    this.postsDiretos = this.postsService.getPostsDiretos();
  }

  sliceUsername () {
    let posicaoInicial = this.post.texto.indexOf('@')
    if (posicaoInicial > -1) {
      this.post.paraUsuario = this.post.texto.slice(posicaoInicial + 1);
      this.post.texto = this.post.texto.slice(0, posicaoInicial);
    } else {
      this.post.paraUsuario = null;
    }
  }

  enviarPost() {
    this.sliceUsername();
    this.postsService.enviarPost(this.post);
    this.post = new Post('');
  }

}
