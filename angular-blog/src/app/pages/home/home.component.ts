import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postsDestaque: Post[] = [];
  todosPosts: Post[] = [];
  postsSecundarios: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsDestaque = this.postsService.getPostsEmDestaque();
    this.todosPosts = this.postsService.getTodosOsPosts();
    this.postsSecundarios = this.todosPosts.filter(p => !p.destaque);
  }
}
